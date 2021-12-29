/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { log } from './log_utils'
import { importMap } from './src/import-map.1b3be'
declare const require: any;
declare const System: any;

// TODO: CommonJS Module Mapping
const commonJSModuleMap: Record<string, Function> = {
    '/src/application.79b93.js' () { require('./src/application.79b93.js'); },
    '/src/cocos-js/cc.494d9.js' () { require('./src/cocos-js/cc.494d9.js'); },
}
function loadModule (name: string) {
    const moduleExecutor = commonJSModuleMap[name];
    moduleExecutor?.();
}

export function launchEngine (): Promise<void> {
    return new Promise((resolve, reject) => {
        const systemReady = require('./jsb-adapter/sys-ability-polyfill.js');
        systemReady().then(() => {
            try {
                require("./jsb-adapter/jsb-builtin.js");
            } catch (e) {
                log('error in builtin ', e.stack, e.message);
            }


            require("./src/system.bundle.615d0.js");
            System.warmup({
                importMap,
                importMapUrl: './src/import-map.1b3be.ts',
                defaultHandler: (urlNoSchema: string) => {
                    log('urlNoSchema ', urlNoSchema);
                    loadModule(urlNoSchema);
                },
            });
            System.import('./src/application.79b93.js').then(({ createApplication }) => {
                log('imported createApplication', createApplication)
                return createApplication({
                    loadJsListFile: (url: string) => require(url),
                    fetchWasm: (url: string) => url,
                }).then((application) => {
                    log('created application', application)
                    return application.import('cc').then((cc) => {
                        log('importing cc');
                        require('./jsb-adapter/jsb-engine.js');
                        cc.macro.CLEANUP_IMAGE_CACHE = false;
                    }).then(() => {
                        log('start application');
                        return application.start({
                            // @ts-ignore
                            settings: window._CCSettings,
                            findCanvas: () => {
                                // @ts-ignore
                                return { frame: {}, canvas: window.windowHandler, container: {} };
                            },
                        });
                    });
                });
            }).catch((e: any) => {
                log('imported failed', e.message, e.stack)
                reject(e);
            })


            //            System.import('./src/application.79b93.js').then(({ createApplication }) => {
            //                return createApplication({
            //                    loadJsListFile: (url) => require(url),
            //                    fetchWasm: (url) => url,
            //                });
            //            })
            //            .then((application) => {
            //            return application.import('cc').then((cc) => {
            //                require('jsb-adapter/jsb-engine.js');
            //                cc.macro.CLEANUP_IMAGE_CACHE = false;
            //            }).then(() => {
            //                return application.start({
            //                    settings: window._CCSettings,
            //                    findCanvas: () => {
            //                        var container = document.createElement('div');
            //                        var frame = document.documentElement;
            //                        var canvas = window.__canvas;
            //                        return { frame, canvas, container };
            //                    },
            //                });
            //            });
            //            }).catch((err) => {
            //                console.error(err.toString());
            //            });
        });
    })
}


