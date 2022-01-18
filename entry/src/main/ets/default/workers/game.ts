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
import resourceManager from '@ohos.resourceManager';
declare const require: any;
declare const System: any;

//resourceManager.getResourceManager().then(result => {
//    result.getMedia($r('app.media.test').id).then(media => {
//        // @ts-ignore
//        console.log("kee cocos getMedia buffer = " + String.fromCharCode.apply(null, new Uint8Array(media.buffer)));
//        console.log("kee cocos getMedia byteLength = " + media.byteLength);
//        console.log("kee cocos getMedia byteOffset = " + media.byteOffset);
//        console.log("kee cocos getMedia BYTES_PER_ELEMENT = " + media.BYTES_PER_ELEMENT);
//        console.log("kee cocos getMedia length = " + media.length);
//        console.log("kee cocos media type = " + typeof(media));
//    }).catch(e => {
//        console.log('pptest ' + e.stack)
//    })
//}).catch(err => {
//    console.log("kee cocos getResourceManager error = " + err);
//});


// TODO: CommonJS Module Mapping
const commonJSModuleMap: Record<string, Function> = {
    '/src/application.79b93.js' () { require('./src/application.79b93.js'); },
    '/src/cocos-js/cc.js' () { require('./src/cocos-js/cc.js'); },
}
function loadModule (name: string) {
    const moduleExecutor = commonJSModuleMap[name];
    moduleExecutor?.();
}

// @ts-ignore
const onTouch = () => new Promise<void>(resolve => jsb.onTouchStart = function () {
    log('promise onTouch')
    resolve();
})

export function launchEngine (): Promise<void> {
    return new Promise((resolve, reject) => {
        const systemReady = require('./jsb-adapter/sys-ability-polyfill.js');
        systemReady().then(() => {
            try {
                require("./jsb-adapter/jsb-builtin.js");
            } catch (e) {
                log('error in builtin ', e.stack, e.message);
            }

            try{

                console.log('pptest window.require1')
                // @ts-ignore
                window.require('workers/assets/main/index.js');
            }catch(e) {

                console.log('pptest error window.require ' + e)
            }

            console.log('pptest window.require2')
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
                    return onTouch().then(() => {
                        log('onTouch')
                        application.import('cc').then((cc) => {
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
                                    var container = document.createElement('div');
                                    // @ts-ignore
                                    var frame = document.documentElement;
                                    // @ts-ignore
                                    var canvas = window.__canvas;
                                    // @ts-ignore
                                    return { frame, canvas, container };
                                },
                            });
                        });

                    })
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


