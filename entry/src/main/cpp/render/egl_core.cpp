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

#include "egl_core.h"

#include "plugin_common.h"
#include "plugin_render.h"

EGLConfig getConfig(int version, EGLDisplay eglDisplay) {
    int renderableType = EGL_OPENGL_ES2_BIT;
    if (version >= 3) {
        renderableType |= EGL_OPENGL_ES3_BIT_KHR;
    }
    int attribList[] = {
        EGL_SURFACE_TYPE, EGL_PBUFFER_BIT,
        EGL_RENDERABLE_TYPE, renderableType,
        EGL_RED_SIZE, 8,
        EGL_GREEN_SIZE, 8,
        EGL_BLUE_SIZE, 8,
        EGL_ALPHA_SIZE, 8,
        EGL_DEPTH_SIZE, 16,
        EGL_STENCIL_SIZE, 8,
        EGL_NONE, 0,         // placeholder for recordable [@-3]
        EGL_NONE
    };
    int length = sizeof(attribList) / sizeof(attribList[0]);
    attribList[length - 3] = EGL_RECORDABLE_ANDROID;
    attribList[length - 2] = 1;
    EGLConfig configs = nullptr;
    int numConfigs;
    if (!eglChooseConfig(eglDisplay, attribList, &configs, 1, &numConfigs)) {
        LOGE("eglChooseConfig ERROR");
        return nullptr;
    }
    return configs;
}

char vertexShader[] =
"#version 300 es\n"
"layout(location = 0) in vec4 a_position;\n"
"layout(location = 1) in vec4 a_color;\n"
"out vec4 v_color;\n"
"void main()\n"
"{\n"
"   gl_Position = a_position;\n"
"   v_color = a_color;\n"
"}\n";

char fragmentShader[] =
"#version 300 es\n"
"precision mediump float;\n"
"in vec4 v_color;\n"
"out vec4 fragColor;\n"
"void main()\n"
"{\n"
"   fragColor = v_color;\n"
"}\n";

void EGLCore::GLContextInit(void* window, int w, int h)
{
    width_ = w;
    height_ = h;
    mEglWindow = static_cast<EGLNativeWindowType>(window);

    // 1. create sharedcontext
    mEGLDisplay = eglGetDisplay(EGL_DEFAULT_DISPLAY);
    if (mEGLDisplay == EGL_NO_DISPLAY) {
        LOGE("EGLCore::unable to get EGL display.");
        return;
    }

    EGLint eglMajVers, eglMinVers;
    if (!eglInitialize(mEGLDisplay, &eglMajVers, &eglMinVers)) {
        mEGLDisplay = EGL_NO_DISPLAY;
        LOGE("EGLCore::unable to initialize display");
        return;
    }

    // 尝试使用GLES3
    mEGLConfig = getConfig(2, mEGLDisplay);

    if (mEGLConfig == nullptr) {
        LOGE("EGLCore::GLContextInit config ERROR");
        return;
    }

    // 2. Create EGL Surface from Native Window
    if (mEglWindow) {
        LOGI("EGLCore::eglCreateContext eglSurface from mEglWindow");
        mEGLSurface = eglCreateWindowSurface(mEGLDisplay, mEGLConfig, mEglWindow, nullptr);
        if (mEGLSurface == nullptr) {
            LOGE("EGLCore::eglCreateContext eglSurface = null");
            return;
        }
    }

    // 3. Create EGLContext from
    int attrib3_list[] = {
        EGL_CONTEXT_CLIENT_VERSION, 2,
        EGL_NONE
    };

    mEGLContext = eglCreateContext(mEGLDisplay, mEGLConfig, mSharedEGLContext, attrib3_list);
    int error = eglGetError();
    if (error == EGL_SUCCESS) {
        LOGI("EGLCore::Create mEGLContext ok");
    } else {
        LOGE("EGLCore::eglCreateContext error %x", error);
    }

    if (!eglMakeCurrent(mEGLDisplay, mEGLSurface, mEGLSurface, mEGLContext)) {
        LOGE("EGLCore::eglMakeCurrent error = %d", eglGetError());
    }

    mProgramHandle = CreateProgram(vertexShader, fragmentShader);
    if (!mProgramHandle) {
        LOGE("EGLCore::Could not create CreateProgram");
        return;
    }

    DrawTriangle();
}

void EGLCore::DrawTriangle()
{
    if (!eglMakeCurrent(mEGLDisplay, mEGLSurface, mEGLSurface, mEGLContext)) {
        LOGE("EGLCore::eglMakeCurrent error = %d", eglGetError());
    }

    GLfloat color[] = {
        0.5f, 0.6f, 0.3f, 1.0f
    };

    const GLfloat triangleVertices[] = {
        0.0f, 1.0f,
        -1.0f, -1.0f,
        1.0f, -1.0f
    };

    glViewport(0, 0, width_, height_);
    glClear(GL_COLOR_BUFFER_BIT);

    glUseProgram(mProgramHandle);

    GLint positionHandle = glGetAttribLocation(mProgramHandle, "a_position");
    glVertexAttribPointer(positionHandle, 2, GL_FLOAT, GL_FALSE, 0, triangleVertices);
    glEnableVertexAttribArray(positionHandle);
    glVertexAttrib4fv(1, color);

    glDrawArrays(GL_TRIANGLES, 0, 3);

    glDisableVertexAttribArray(positionHandle);

    Update();
}

void EGLCore::ChangeShape()
{
    if (!eglMakeCurrent(mEGLDisplay, mEGLSurface, mEGLSurface, mEGLContext)) {
        LOGE("EGLCore::eglMakeCurrent error = %d", eglGetError());
    }

    GLfloat color[] = {
        0.7f, 0.2f, 0.2f, 1.0f
    };

    const GLfloat triangleVertices[] = {
        -1.0f, 1.0f,
        -1.0f, -1.0f,
        1.0f, 0.0f
    };

    glViewport(0, 0, width_, height_);
    glClear(GL_COLOR_BUFFER_BIT);

    glUseProgram(mProgramHandle);

    GLint positionHandle = glGetAttribLocation(mProgramHandle, "a_position");
    glVertexAttribPointer(positionHandle, 2, GL_FLOAT, GL_FALSE, 0, triangleVertices);
    glEnableVertexAttribArray(positionHandle);
    glVertexAttrib4fv(1, color);

    glDrawArrays(GL_TRIANGLES, 0, 3);

    glDisableVertexAttribArray(positionHandle);

    Update();
}

void EGLCore::ChangeColor()
{
    if (!eglMakeCurrent(mEGLDisplay, mEGLSurface, mEGLSurface, mEGLContext)) {
        LOGE("EGLCore::eglMakeCurrent error = %d", eglGetError());
    }

    GLfloat color[] = {
        0.9f, 0.5f, 0.7f, 1.0f
    };

    const GLfloat triangleVertices[] = {
        0.0f, 1.0f,
        -1.0f, -1.0f,
        1.0f, -1.0f
    };

    glViewport(0, 0, width_, height_);
    glClear(GL_COLOR_BUFFER_BIT);

    glUseProgram(mProgramHandle);

    GLint positionHandle = glGetAttribLocation(mProgramHandle, "a_position");
    glVertexAttribPointer(positionHandle, 2, GL_FLOAT, GL_FALSE, 0, triangleVertices);
    glEnableVertexAttribArray(positionHandle);
    glVertexAttrib4fv(1, color);

    glDrawArrays(GL_TRIANGLES, 0, 3);

    glDisableVertexAttribArray(positionHandle);

    Update();
}

void EGLCore::Update()
{
    eglSwapBuffers(mEGLDisplay, mEGLSurface);
    checkGlError("EGLCore eglSwapBuffers");
}

GLuint EGLCore::LoadShader(GLenum type, const char *shaderSrc)
{
    GLuint shader;
    GLint compiled;
    // 创建shader
    shader = glCreateShader(type);
    if (shader == 0) {
        LOGE("LoadShader shader error");
        return 0;
    }
    // 加载着色器的源码
    glShaderSource(shader, 1, &shaderSrc, nullptr);

    // 编译源码
    glCompileShader(shader);

    // 检查编译状态
    glGetShaderiv(shader, GL_COMPILE_STATUS, &compiled);

    if (!compiled) {
        GLint infoLen = 0;
        // 查询日志的长度判断是否有日志产生
        glGetShaderiv(shader, GL_INFO_LOG_LENGTH, &infoLen);

        if (infoLen > 1) {
            // 分配一个足以存储日志信息的字符串
            char *infoLog = (char*)malloc(sizeof(char) * infoLen);
            // 检索日志信息
            glGetShaderInfoLog(shader, infoLen, nullptr, infoLog);
            LOGE("Error compiling shader:\n%s\n",infoLog);
            // 使用完成后需要释放字符串分配的内存
            free(infoLog);
        }
        // 删除编译出错的着色器释放内存
        glDeleteShader(shader);
        return 0;
    }
    return shader;
}

GLuint EGLCore::CreateProgram(const char *vertexShader, const char *fragShader)
{
    GLuint vertex;
    GLuint fragment;
    GLuint program;
    GLint linked;

    // 加载顶点shader
    vertex = LoadShader(GL_VERTEX_SHADER, vertexShader);
    if (vertex == 0) {
        LOGE("CreateProgram vertex error");
        return 0;
    }
    // 加载片元着色器
    fragment = LoadShader(GL_FRAGMENT_SHADER, fragShader);
    if (fragment == 0) {
        LOGE("CreateProgram fragment error");
        glDeleteShader(vertex);
        return 0;
    }
    // 创建program
    program = glCreateProgram();
    if (program == 0) {
        LOGE("CreateProgram program error");
        glDeleteShader(vertex);
        glDeleteShader(fragment);
        return 0;
    }
    // 绑定shader
    glAttachShader(program, vertex);
    glAttachShader(program, fragment);

    // 链接program程序
    glLinkProgram(program);
    // 检查链接状态
    glGetProgramiv(program, GL_LINK_STATUS, &linked);
    if (!linked) {
        LOGE("CreateProgram linked error");
        GLint infoLen = 0;
        // 检查日志信息长度
        glGetProgramiv(program, GL_INFO_LOG_LENGTH, &infoLen);
        if (infoLen > 1) {
            // 分配一个足以存储日志信息的字符串
            char *infoLog = (char *)malloc(sizeof(char) * infoLen);
            // 检索日志信息
            glGetProgramInfoLog(program, infoLen, nullptr, infoLog);
            LOGE("Error linking program:\n%s\n",infoLog);
            // 使用完成后需要释放字符串分配的内存
            free(infoLog);
        }
        // 删除着色器释放内存
        glDeleteShader(vertex);
        glDeleteShader(fragment);
        glDeleteProgram(program);
        return 0;
    }
    // 删除着色器释放内存
    glDeleteShader(vertex);
    glDeleteShader(fragment);

    return program;
}

bool EGLCore::checkGlError(const char* op)
{
    GLint error;
    for (error = glGetError(); error; error = glGetError()) {
        LOGE("ERROR: %s, ERROR CODE = %x", op, error);
        return true;
    }
    return false;
}