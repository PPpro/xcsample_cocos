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
declare let System: any;

export function launchEngine (): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            System.warmup({
                importMap,
                importMapUrl: 'src/import-map.1b3be.json',
                defaultHandler: (urlNoSchema: string) => {
                    require(urlNoSchema.startsWith('/') ? urlNoSchema.substr(1) : urlNoSchema);
                },
            });
            System.import('./src/application.79b93.js').then(({ createApplication }) => {
                log('imported')
            })


            resolve();
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
        } catch (e) {
            reject(e);
        }
    });
}


