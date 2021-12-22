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

#ifndef _PLUGIN_RENDER_H_
#define _PLUGIN_RENDER_H_

#include <ace/xcomponent/native_interface_xcomponent.h>
#include <napi/native_api.h>
#include <string>
#include <unordered_map>

#include "egl_core.h"

class PluginRender {
public:
    PluginRender(std::string& id);
    static PluginRender* GetInstance(std::string& id);
    static NativeXComponentCallback* GetNXComponentCallback();

    void SetNativeXComponent(NativeXComponent* component);

public:
    // NAPI interface
    napi_value Export(napi_env env, napi_value exports);

    // Exposed to JS developers by NAPI
    static napi_value NapiChangeShape(napi_env env, napi_callback_info info);
    static napi_value NapiDrawTriangle(napi_env env, napi_callback_info info);
    static napi_value NapiChangeColor(napi_env env, napi_callback_info info);
    static napi_value NapiChangeColorWorker(napi_env env, napi_callback_info info);

    // Callback, called by ACE XComponent
    void OnSurfaceCreated(NativeXComponent* component, void* window);

    void OnSurfaceChanged(NativeXComponent* component, void* window);

    void OnSurfaceDestroyed(NativeXComponent* component, void* window);

    void DispatchTouchEvent(NativeXComponent* component, void* window);

public:
    static std::unordered_map<std::string, PluginRender*> instance_;
    static NativeXComponentCallback callback_;

    NativeXComponent* component_;
    EGLCore* eglCore_;

    std::string id_;
    uint64_t width_;
    uint64_t height_;

    double x_;
    double y_;
    TouchInfo touchInfo_;
};

#endif // _PLUGIN_RENDER_H_
