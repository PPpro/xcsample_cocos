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

console.log("kee cocos Game JS")
declare var jsb:any;
declare var window:any;

if (jsb) {
    console.log("kee cocos Game napi init ok" + Object.keys(jsb));
}else {
    console.log("kee cocos Game napi init fail");
}

if (window) {
    console.log("kee cocos Game napi window init ok" + Object.keys(window));
    if (window.windowHandler) {
        console.log("kee cocos Game napi window innerWidth : " + window.windowHandler);
    }
}else {
    console.log("kee cocos Game napi window init fail");
}

export class Game {
    constructor() {
        console.log("kee cocos Game constructor")
    }
    public runGame(): void {
        console.log("kee cocos Game run")
    }
}