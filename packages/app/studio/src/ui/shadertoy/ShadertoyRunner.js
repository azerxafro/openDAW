"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadertoyRunner = void 0;
var ShadertoyRunner = /** @class */ (function () {
    function ShadertoyRunner(state, gl) {
        _ShadertoyRunner_instances.add(this);
        _ShadertoyRunner_state.set(this, void 0);
        _ShadertoyRunner_gl.set(this, void 0);
        _ShadertoyRunner_uniformLocations.set(this, {
            iResolution: null,
            iTime: null,
            iTimeDelta: null,
            iFrame: null,
            iBeat: null,
            iPeaks: null,
            iChannelResolution: null,
            iChannel0: null,
            iMidiCC: null,
            iMidiNotes: null
        });
        _ShadertoyRunner_program.set(this, null);
        _ShadertoyRunner_vao.set(this, null);
        _ShadertoyRunner_audioTexture.set(this, null);
        _ShadertoyRunner_midiCCTexture.set(this, null);
        _ShadertoyRunner_midiNoteTexture.set(this, null);
        _ShadertoyRunner_startTime.set(this, 0.0);
        _ShadertoyRunner_lastFrameTime.set(this, 0.0);
        _ShadertoyRunner_frameCount.set(this, 0);
        __classPrivateFieldSet(this, _ShadertoyRunner_state, state, "f");
        __classPrivateFieldSet(this, _ShadertoyRunner_gl, gl, "f");
        __classPrivateFieldGet(this, _ShadertoyRunner_instances, "m", _ShadertoyRunner_initGeometry).call(this);
        __classPrivateFieldGet(this, _ShadertoyRunner_instances, "m", _ShadertoyRunner_initAudioTexture).call(this);
        __classPrivateFieldGet(this, _ShadertoyRunner_instances, "m", _ShadertoyRunner_initMidiCCTexture).call(this);
        __classPrivateFieldGet(this, _ShadertoyRunner_instances, "m", _ShadertoyRunner_initMidiNoteTexture).call(this);
    }
    /**
     * Compiles and links a Shadertoy fragment shader.
     * @param fragmentSource The mainImage() function source code (Shadertoy format)
     */
    ShadertoyRunner.prototype.compile = function (fragmentSource) {
        var gl = __classPrivateFieldGet(this, _ShadertoyRunner_gl, "f");
        if (__classPrivateFieldGet(this, _ShadertoyRunner_program, "f")) {
            gl.deleteProgram(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"));
            __classPrivateFieldSet(this, _ShadertoyRunner_program, null, "f");
        }
        while (gl.getError() !== gl.NO_ERROR) { }
        var vertexShader = __classPrivateFieldGet(this, _ShadertoyRunner_instances, "m", _ShadertoyRunner_compileShader).call(this, gl.VERTEX_SHADER, __classPrivateFieldGet(_a, _a, "f", _ShadertoyRunner_VERTEX_SHADER));
        var fullFragmentSource = __classPrivateFieldGet(_a, _a, "f", _ShadertoyRunner_FRAGMENT_PREFIX) + fragmentSource + __classPrivateFieldGet(_a, _a, "f", _ShadertoyRunner_FRAGMENT_SUFFIX);
        var fragmentShader = __classPrivateFieldGet(this, _ShadertoyRunner_instances, "m", _ShadertoyRunner_compileShader).call(this, gl.FRAGMENT_SHADER, fullFragmentSource);
        __classPrivateFieldSet(this, _ShadertoyRunner_program, gl.createProgram(), "f");
        if (!__classPrivateFieldGet(this, _ShadertoyRunner_program, "f")) {
            throw new Error("Failed to create program");
        }
        gl.attachShader(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), vertexShader);
        gl.attachShader(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), fragmentShader);
        gl.linkProgram(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"));
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        if (!gl.getProgramParameter(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), gl.LINK_STATUS)) {
            var info = gl.getProgramInfoLog(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"));
            gl.deleteProgram(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"));
            __classPrivateFieldSet(this, _ShadertoyRunner_program, null, "f");
            throw new Error("Program linking failed: ".concat(info));
        }
        __classPrivateFieldSet(this, _ShadertoyRunner_uniformLocations, {
            iResolution: gl.getUniformLocation(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), "iResolution"),
            iTime: gl.getUniformLocation(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), "iTime"),
            iTimeDelta: gl.getUniformLocation(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), "iTimeDelta"),
            iFrame: gl.getUniformLocation(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), "iFrame"),
            iBeat: gl.getUniformLocation(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), "iBeat"),
            iPeaks: gl.getUniformLocation(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), "iPeaks"),
            iChannelResolution: gl.getUniformLocation(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), "iChannelResolution"),
            iChannel0: gl.getUniformLocation(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), "iChannel0"),
            iMidiCC: gl.getUniformLocation(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), "iMidiCC"),
            iMidiNotes: gl.getUniformLocation(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"), "iMidiNotes")
        }, "f");
    };
    /**
     * Renders a single frame.
     * @param time Optional explicit time in seconds. If omitted, uses elapsed time since resetTime().
     */
    ShadertoyRunner.prototype.render = function (time) {
        var _b;
        var gl = __classPrivateFieldGet(this, _ShadertoyRunner_gl, "f");
        if (!__classPrivateFieldGet(this, _ShadertoyRunner_program, "f")) {
            return;
        }
        var _c = __classPrivateFieldGet(this, _ShadertoyRunner_state, "f"), audioData = _c.audioData, midiCCData = _c.midiCCData, midiNoteData = _c.midiNoteData, beat = _c.beat, peaks = _c.peaks;
        var currentTime = time !== null && time !== void 0 ? time : (performance.now() / 1000.0 - __classPrivateFieldGet(this, _ShadertoyRunner_startTime, "f"));
        var timeDelta = currentTime - __classPrivateFieldGet(this, _ShadertoyRunner_lastFrameTime, "f");
        __classPrivateFieldSet(this, _ShadertoyRunner_lastFrameTime, currentTime, "f");
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.disable(gl.BLEND);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, __classPrivateFieldGet(this, _ShadertoyRunner_audioTexture, "f"));
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 512, 2, gl.RED, gl.UNSIGNED_BYTE, audioData);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, __classPrivateFieldGet(this, _ShadertoyRunner_midiCCTexture, "f"));
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 128, 1, gl.RED, gl.UNSIGNED_BYTE, midiCCData);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, __classPrivateFieldGet(this, _ShadertoyRunner_midiNoteTexture, "f"));
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 128, 1, gl.RED, gl.UNSIGNED_BYTE, midiNoteData);
        gl.useProgram(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"));
        gl.uniform3f(__classPrivateFieldGet(this, _ShadertoyRunner_uniformLocations, "f").iResolution, gl.drawingBufferWidth, gl.drawingBufferHeight, 1.0);
        gl.uniform1f(__classPrivateFieldGet(this, _ShadertoyRunner_uniformLocations, "f").iTime, currentTime);
        gl.uniform1f(__classPrivateFieldGet(this, _ShadertoyRunner_uniformLocations, "f").iTimeDelta, timeDelta);
        gl.uniform1i(__classPrivateFieldGet(this, _ShadertoyRunner_uniformLocations, "f").iFrame, __classPrivateFieldGet(this, _ShadertoyRunner_frameCount, "f"));
        gl.uniform1f(__classPrivateFieldGet(this, _ShadertoyRunner_uniformLocations, "f").iBeat, beat);
        gl.uniform4fv(__classPrivateFieldGet(this, _ShadertoyRunner_uniformLocations, "f").iPeaks, peaks);
        gl.uniform3fv(__classPrivateFieldGet(this, _ShadertoyRunner_uniformLocations, "f").iChannelResolution, [512.0, 2.0, 1.0]);
        gl.uniform1i(__classPrivateFieldGet(this, _ShadertoyRunner_uniformLocations, "f").iChannel0, 0);
        gl.uniform1i(__classPrivateFieldGet(this, _ShadertoyRunner_uniformLocations, "f").iMidiCC, 1);
        gl.uniform1i(__classPrivateFieldGet(this, _ShadertoyRunner_uniformLocations, "f").iMidiNotes, 2);
        gl.bindVertexArray(__classPrivateFieldGet(this, _ShadertoyRunner_vao, "f"));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.bindVertexArray(null);
        __classPrivateFieldSet(this, _ShadertoyRunner_frameCount, (_b = __classPrivateFieldGet(this, _ShadertoyRunner_frameCount, "f"), _b++, _b), "f");
    };
    /**
     * Resets the time and frame counter.
     */
    ShadertoyRunner.prototype.resetTime = function () {
        __classPrivateFieldSet(this, _ShadertoyRunner_startTime, performance.now() / 1000.0, "f");
        __classPrivateFieldSet(this, _ShadertoyRunner_lastFrameTime, __classPrivateFieldGet(this, _ShadertoyRunner_startTime, "f"), "f");
        __classPrivateFieldSet(this, _ShadertoyRunner_frameCount, 0, "f");
    };
    /**
     * Cleans up WebGL resources.
     */
    ShadertoyRunner.prototype.terminate = function () {
        var gl = __classPrivateFieldGet(this, _ShadertoyRunner_gl, "f");
        if (__classPrivateFieldGet(this, _ShadertoyRunner_program, "f")) {
            gl.deleteProgram(__classPrivateFieldGet(this, _ShadertoyRunner_program, "f"));
            __classPrivateFieldSet(this, _ShadertoyRunner_program, null, "f");
        }
        if (__classPrivateFieldGet(this, _ShadertoyRunner_vao, "f")) {
            gl.deleteVertexArray(__classPrivateFieldGet(this, _ShadertoyRunner_vao, "f"));
            __classPrivateFieldSet(this, _ShadertoyRunner_vao, null, "f");
        }
        if (__classPrivateFieldGet(this, _ShadertoyRunner_audioTexture, "f")) {
            gl.deleteTexture(__classPrivateFieldGet(this, _ShadertoyRunner_audioTexture, "f"));
            __classPrivateFieldSet(this, _ShadertoyRunner_audioTexture, null, "f");
        }
        if (__classPrivateFieldGet(this, _ShadertoyRunner_midiCCTexture, "f")) {
            gl.deleteTexture(__classPrivateFieldGet(this, _ShadertoyRunner_midiCCTexture, "f"));
            __classPrivateFieldSet(this, _ShadertoyRunner_midiCCTexture, null, "f");
        }
        if (__classPrivateFieldGet(this, _ShadertoyRunner_midiNoteTexture, "f")) {
            gl.deleteTexture(__classPrivateFieldGet(this, _ShadertoyRunner_midiNoteTexture, "f"));
            __classPrivateFieldSet(this, _ShadertoyRunner_midiNoteTexture, null, "f");
        }
    };
    var _ShadertoyRunner_instances, _a, _ShadertoyRunner_state, _ShadertoyRunner_gl, _ShadertoyRunner_uniformLocations, _ShadertoyRunner_program, _ShadertoyRunner_vao, _ShadertoyRunner_audioTexture, _ShadertoyRunner_midiCCTexture, _ShadertoyRunner_midiNoteTexture, _ShadertoyRunner_startTime, _ShadertoyRunner_lastFrameTime, _ShadertoyRunner_frameCount, _ShadertoyRunner_VERTEX_SHADER, _ShadertoyRunner_FRAGMENT_PREFIX, _ShadertoyRunner_FRAGMENT_SUFFIX, _ShadertoyRunner_initGeometry, _ShadertoyRunner_initAudioTexture, _ShadertoyRunner_initMidiCCTexture, _ShadertoyRunner_initMidiNoteTexture, _ShadertoyRunner_compileShader;
    _a = ShadertoyRunner, _ShadertoyRunner_state = new WeakMap(), _ShadertoyRunner_gl = new WeakMap(), _ShadertoyRunner_uniformLocations = new WeakMap(), _ShadertoyRunner_program = new WeakMap(), _ShadertoyRunner_vao = new WeakMap(), _ShadertoyRunner_audioTexture = new WeakMap(), _ShadertoyRunner_midiCCTexture = new WeakMap(), _ShadertoyRunner_midiNoteTexture = new WeakMap(), _ShadertoyRunner_startTime = new WeakMap(), _ShadertoyRunner_lastFrameTime = new WeakMap(), _ShadertoyRunner_frameCount = new WeakMap(), _ShadertoyRunner_instances = new WeakSet(), _ShadertoyRunner_initGeometry = function _ShadertoyRunner_initGeometry() {
        var gl = __classPrivateFieldGet(this, _ShadertoyRunner_gl, "f");
        var vertices = new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0, 1.0,
            1.0, 1.0
        ]);
        var vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        __classPrivateFieldSet(this, _ShadertoyRunner_vao, gl.createVertexArray(), "f");
        gl.bindVertexArray(__classPrivateFieldGet(this, _ShadertoyRunner_vao, "f"));
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.bindVertexArray(null);
    }, _ShadertoyRunner_initAudioTexture = function _ShadertoyRunner_initAudioTexture() {
        var gl = __classPrivateFieldGet(this, _ShadertoyRunner_gl, "f");
        __classPrivateFieldSet(this, _ShadertoyRunner_audioTexture, gl.createTexture(), "f");
        gl.bindTexture(gl.TEXTURE_2D, __classPrivateFieldGet(this, _ShadertoyRunner_audioTexture, "f"));
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, 512, 2, 0, gl.RED, gl.UNSIGNED_BYTE, __classPrivateFieldGet(this, _ShadertoyRunner_state, "f").audioData);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }, _ShadertoyRunner_initMidiCCTexture = function _ShadertoyRunner_initMidiCCTexture() {
        var gl = __classPrivateFieldGet(this, _ShadertoyRunner_gl, "f");
        __classPrivateFieldSet(this, _ShadertoyRunner_midiCCTexture, gl.createTexture(), "f");
        gl.bindTexture(gl.TEXTURE_2D, __classPrivateFieldGet(this, _ShadertoyRunner_midiCCTexture, "f"));
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, 128, 1, 0, gl.RED, gl.UNSIGNED_BYTE, __classPrivateFieldGet(this, _ShadertoyRunner_state, "f").midiCCData);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }, _ShadertoyRunner_initMidiNoteTexture = function _ShadertoyRunner_initMidiNoteTexture() {
        var gl = __classPrivateFieldGet(this, _ShadertoyRunner_gl, "f");
        __classPrivateFieldSet(this, _ShadertoyRunner_midiNoteTexture, gl.createTexture(), "f");
        gl.bindTexture(gl.TEXTURE_2D, __classPrivateFieldGet(this, _ShadertoyRunner_midiNoteTexture, "f"));
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, 128, 1, 0, gl.RED, gl.UNSIGNED_BYTE, __classPrivateFieldGet(this, _ShadertoyRunner_state, "f").midiNoteData);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }, _ShadertoyRunner_compileShader = function _ShadertoyRunner_compileShader(type, source) {
        var gl = __classPrivateFieldGet(this, _ShadertoyRunner_gl, "f");
        var shader = gl.createShader(type);
        if (!shader) {
            throw new Error("Failed to create shader");
        }
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            var info = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error("Shader compilation failed: ".concat(info));
        }
        return shader;
    };
    _ShadertoyRunner_VERTEX_SHADER = { value: "#version 300 es\n        in vec4 aPosition;\n        void main() {\n            gl_Position = aPosition;\n        }\n    " };
    _ShadertoyRunner_FRAGMENT_PREFIX = { value: "#version 300 es\n        precision highp float;\n        uniform vec3 iResolution;\n        uniform float iBeat;\n        uniform float iTime;\n        uniform float iTimeDelta;\n        uniform int iFrame;\n        uniform vec4 iPeaks; // leftPeak, leftRMS, rightPeak, rightRMS\n        uniform vec3 iChannelResolution[1];\n        uniform sampler2D iChannel0;\n        uniform sampler2D iMidiCC;\n        uniform sampler2D iMidiNotes;\n        out vec4 fragColor;\n        float midiCC(int cc) {\n            return texture(iMidiCC, vec2((float(cc) + 0.5) / 128.0, 0.5)).r;\n        }\n        float midiNote(int pitch) {\n            return texture(iMidiNotes, vec2((float(pitch) + 0.5) / 128.0, 0.5)).r;\n        }\n    " };
    _ShadertoyRunner_FRAGMENT_SUFFIX = { value: "\n        void main() {\n            mainImage(fragColor, gl_FragCoord.xy);\n            fragColor.a = 1.0;\n        }\n    " };
    return ShadertoyRunner;
}());
exports.ShadertoyRunner = ShadertoyRunner;
