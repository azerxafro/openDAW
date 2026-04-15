"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var _CurveRenderer_subscriptions, _CurveRenderer_notifier, _CurveRenderer_needsUpdate, _CurveRenderer_gradient;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bell = exports.HighShelf = exports.LowShelf = exports.HighPass = exports.LowPass = exports.CurveRenderer = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var constants_ts_1 = require("@/ui/devices/audio-effects/Revamp/constants.ts");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var CurveRenderer = /** @class */ (function () {
    function CurveRenderer(parameters, colorSet, sampleRate) {
        var _this = this;
        this.parameters = parameters;
        this.colorSet = colorSet;
        this.sampleRate = sampleRate;
        _CurveRenderer_subscriptions.set(this, void 0);
        _CurveRenderer_notifier.set(this, void 0);
        _CurveRenderer_needsUpdate.set(this, true);
        _CurveRenderer_gradient.set(this, null);
        this.curve = null;
        __classPrivateFieldSet(this, _CurveRenderer_notifier, new lib_std_1.Notifier(), "f");
        __classPrivateFieldSet(this, _CurveRenderer_subscriptions, this.listenParameters(function () {
            __classPrivateFieldSet(_this, _CurveRenderer_needsUpdate, true, "f");
            __classPrivateFieldGet(_this, _CurveRenderer_notifier, "f").notify();
        }), "f");
    }
    CurveRenderer.prototype.onResize = function () {
        this.curve = null;
        __classPrivateFieldSet(this, _CurveRenderer_gradient, null, "f");
        __classPrivateFieldSet(this, _CurveRenderer_needsUpdate, true, "f");
    };
    CurveRenderer.prototype.subscribe = function (observer) { return __classPrivateFieldGet(this, _CurveRenderer_notifier, "f").subscribe(observer); };
    CurveRenderer.prototype.update = function (painter, frequencies, phaseResponse, totalResponse) {
        if (this.parameters.enabled.getValue()) {
            var curve = this.curve === null || __classPrivateFieldGet(this, _CurveRenderer_needsUpdate, "f")
                ? this.getOrCreateCurve(painter, frequencies, phaseResponse)
                : this.curve;
            __classPrivateFieldSet(this, _CurveRenderer_needsUpdate, false, "f");
            // include curve in total response
            curve.magResponse.forEach(function (value, index) { totalResponse[index] += value; });
            // select brushes
            var _a = this.colorSet, line = _a.line, max = _a.max, min = _a.min;
            var context = painter.context;
            context.strokeStyle = line.toString();
            if (__classPrivateFieldGet(this, _CurveRenderer_gradient, "f") === null) {
                var gradient = context.createLinearGradient(0, 0, 0, painter.actualHeight);
                gradient.addColorStop(0.0, max.toString());
                gradient.addColorStop(0.5, min.toString());
                gradient.addColorStop(1.0, max.toString());
                __classPrivateFieldSet(this, _CurveRenderer_gradient, gradient, "f");
            }
            context.fillStyle = __classPrivateFieldGet(this, _CurveRenderer_gradient, "f");
            // paint curve
            var strokePath = curve.strokePath, fillPath = curve.fillPath;
            context.stroke(strokePath);
            context.fill(fillPath);
            this.curve = curve;
        }
        else {
            this.curve = null;
        }
    };
    CurveRenderer.prototype.terminate = function () {
        __classPrivateFieldGet(this, _CurveRenderer_notifier, "f").terminate();
        __classPrivateFieldGet(this, _CurveRenderer_subscriptions, "f").terminate();
    };
    CurveRenderer.prototype.getOrCreateResponseArray = function (frequencies) {
        return this.curve === null || this.curve.magResponse.length !== frequencies.length
            ? new Float32Array(frequencies.length)
            : this.curve.magResponse;
    };
    CurveRenderer.prototype.createPath = function (painter, response) {
        var strokePath = new Path2D();
        for (var x = 0; x < response.length; x++) {
            var y = painter.unitToY(response[x]);
            if (x === 0) {
                strokePath.moveTo(x, y);
            }
            else {
                strokePath.lineTo(x, y);
            }
        }
        var fillPath = new Path2D();
        fillPath.addPath(strokePath);
        return [strokePath, fillPath];
    };
    return CurveRenderer;
}());
exports.CurveRenderer = CurveRenderer;
_CurveRenderer_subscriptions = new WeakMap(), _CurveRenderer_notifier = new WeakMap(), _CurveRenderer_needsUpdate = new WeakMap(), _CurveRenderer_gradient = new WeakMap();
var LowPass = /** @class */ (function (_super) {
    __extends(LowPass, _super);
    function LowPass(parameters, colorSet, sampleRate) {
        return _super.call(this, parameters, colorSet, sampleRate) || this;
    }
    LowPass.prototype.getOrCreateCurve = function (painter, frequencies, phaseResponse) {
        var magResponse = this.getOrCreateResponseArray(frequencies);
        var _a = this.parameters, order = _a.order, frequency = _a.frequency, q = _a.q;
        constants_ts_1.biquad.setLowpassParams(frequency.getControlledValue() / this.sampleRate, q.getControlledValue());
        constants_ts_1.biquad.getFrequencyResponse(frequencies, magResponse, phaseResponse);
        var orderExp = order.getControlledValue() + 1;
        magResponse.forEach(function (value, index, array) { array[index] = (0, lib_dsp_1.gainToDb)(value) * orderExp; });
        var _b = this.createPath(painter, magResponse), strokePath = _b[0], fillPath = _b[1];
        fillPath.lineTo(painter.actualWidth, painter.unitToY(0.0));
        fillPath.lineTo(0, painter.unitToY(0.0));
        fillPath.closePath();
        return new Curve(magResponse, strokePath, fillPath);
    };
    LowPass.prototype.listenParameters = function (observer) {
        var _a = this.parameters, enabled = _a.enabled, frequency = _a.frequency, order = _a.order, q = _a.q;
        return lib_std_1.Notifier.subscribeMany(observer, enabled, frequency, order, q);
    };
    return LowPass;
}(CurveRenderer));
exports.LowPass = LowPass;
var HighPass = /** @class */ (function (_super) {
    __extends(HighPass, _super);
    function HighPass(parameters, colorSet, sampleRate) {
        return _super.call(this, parameters, colorSet, sampleRate) || this;
    }
    HighPass.prototype.getOrCreateCurve = function (painter, frequencies, phaseResponse) {
        var magResponse = this.getOrCreateResponseArray(frequencies);
        var _a = this.parameters, order = _a.order, frequency = _a.frequency, q = _a.q;
        constants_ts_1.biquad.setHighpassParams(frequency.getControlledValue() / this.sampleRate, q.getControlledValue());
        constants_ts_1.biquad.getFrequencyResponse(frequencies, magResponse, phaseResponse);
        var orderExp = order.getControlledValue() + 1;
        magResponse.forEach(function (value, index, array) { array[index] = (0, lib_dsp_1.gainToDb)(value) * orderExp; });
        var _b = this.createPath(painter, magResponse), strokePath = _b[0], fillPath = _b[1];
        fillPath.lineTo(painter.actualWidth, painter.unitToY(0.0));
        fillPath.lineTo(0, painter.unitToY(0.0));
        fillPath.closePath();
        return new Curve(magResponse, strokePath, fillPath);
    };
    HighPass.prototype.listenParameters = function (observer) {
        var _a = this.parameters, enabled = _a.enabled, frequency = _a.frequency, order = _a.order, q = _a.q;
        return lib_std_1.Notifier.subscribeMany(observer, enabled, frequency, order, q);
    };
    return HighPass;
}(CurveRenderer));
exports.HighPass = HighPass;
var LowShelf = /** @class */ (function (_super) {
    __extends(LowShelf, _super);
    function LowShelf(parameters, colorSet, sampleRate) {
        return _super.call(this, parameters, colorSet, sampleRate) || this;
    }
    LowShelf.prototype.getOrCreateCurve = function (painter, frequencies, phaseResponse) {
        var magResponse = this.getOrCreateResponseArray(frequencies);
        var _a = this.parameters, frequency = _a.frequency, gain = _a.gain;
        constants_ts_1.biquad.setLowShelfParams(frequency.getControlledValue() / this.sampleRate, gain.getControlledValue());
        constants_ts_1.biquad.getFrequencyResponse(frequencies, magResponse, phaseResponse);
        magResponse.forEach(function (value, index, array) { array[index] = (0, lib_dsp_1.gainToDb)(value); });
        var _b = this.createPath(painter, magResponse), strokePath = _b[0], fillPath = _b[1];
        fillPath.lineTo(0, painter.unitToY(0.0));
        fillPath.closePath();
        return new Curve(magResponse, strokePath, fillPath);
    };
    LowShelf.prototype.listenParameters = function (observer) {
        var _a = this.parameters, enabled = _a.enabled, frequency = _a.frequency, gain = _a.gain;
        return lib_std_1.Notifier.subscribeMany(observer, enabled, frequency, gain);
    };
    return LowShelf;
}(CurveRenderer));
exports.LowShelf = LowShelf;
var HighShelf = /** @class */ (function (_super) {
    __extends(HighShelf, _super);
    function HighShelf(parameters, colorSet, sampleRate) {
        return _super.call(this, parameters, colorSet, sampleRate) || this;
    }
    HighShelf.prototype.getOrCreateCurve = function (painter, frequencies, phaseResponse) {
        var magResponse = this.getOrCreateResponseArray(frequencies);
        var _a = this.parameters, frequency = _a.frequency, gain = _a.gain;
        constants_ts_1.biquad.setHighShelfParams(frequency.getControlledValue() / this.sampleRate, gain.getControlledValue());
        constants_ts_1.biquad.getFrequencyResponse(frequencies, magResponse, phaseResponse);
        magResponse.forEach(function (value, index, array) { array[index] = (0, lib_dsp_1.gainToDb)(value); });
        var _b = this.createPath(painter, magResponse), strokePath = _b[0], fillPath = _b[1];
        fillPath.lineTo(painter.actualWidth, painter.unitToY(0.0));
        fillPath.closePath();
        return new Curve(magResponse, strokePath, fillPath);
    };
    HighShelf.prototype.listenParameters = function (observer) {
        var _a = this.parameters, enabled = _a.enabled, frequency = _a.frequency, gain = _a.gain;
        return lib_std_1.Notifier.subscribeMany(observer, enabled, frequency, gain);
    };
    return HighShelf;
}(CurveRenderer));
exports.HighShelf = HighShelf;
var Bell = /** @class */ (function (_super) {
    __extends(Bell, _super);
    function Bell(parameters, colorSet, sampleRate) {
        return _super.call(this, parameters, colorSet, sampleRate) || this;
    }
    Bell.prototype.getOrCreateCurve = function (painter, frequencies, phaseResponse) {
        var magResponse = this.getOrCreateResponseArray(frequencies);
        var _a = this.parameters, frequency = _a.frequency, q = _a.q, gain = _a.gain;
        constants_ts_1.biquad.setPeakingParams(frequency.getControlledValue() / this.sampleRate, q.getControlledValue(), gain.getControlledValue());
        constants_ts_1.biquad.getFrequencyResponse(frequencies, magResponse, phaseResponse);
        magResponse.forEach(function (value, index, array) { array[index] = (0, lib_dsp_1.gainToDb)(value); });
        var _b = this.createPath(painter, magResponse), strokePath = _b[0], fillPath = _b[1];
        fillPath.lineTo(painter.actualWidth, painter.unitToY(0));
        fillPath.lineTo(0, painter.unitToY(0));
        fillPath.lineTo(0, painter.unitToY(magResponse[0]));
        fillPath.closePath();
        return new Curve(magResponse, strokePath, fillPath);
    };
    Bell.prototype.listenParameters = function (observer) {
        var _a = this.parameters, enabled = _a.enabled, frequency = _a.frequency, q = _a.q, gain = _a.gain;
        return lib_std_1.Notifier.subscribeMany(observer, enabled, frequency, q, gain);
    };
    return Bell;
}(CurveRenderer));
exports.Bell = Bell;
var Curve = /** @class */ (function () {
    function Curve(magResponse, strokePath, fillPath) {
        this.magResponse = magResponse;
        this.strokePath = strokePath;
        this.fillPath = fillPath;
    }
    return Curve;
}());
