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
var _DeviceMount_terminator, _DeviceMount_service, _DeviceMount_adapter, _DeviceMount_deviceHost, _DeviceMount_factory, _DeviceMount_invalidateSignal, _DeviceMount_subscription, _DeviceMount_optEditor;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceMount = void 0;
var DeviceEditorFactory_1 = require("@/ui/devices/DeviceEditorFactory");
var lib_std_1 = require("@opendaw/lib-std");
var DeviceMount = /** @class */ (function () {
    function DeviceMount(service, adapter, deviceHost, factory, invalidateSignal) {
        var _this = this;
        _DeviceMount_terminator.set(this, new lib_std_1.Terminator());
        _DeviceMount_service.set(this, void 0);
        _DeviceMount_adapter.set(this, void 0);
        _DeviceMount_deviceHost.set(this, void 0);
        _DeviceMount_factory.set(this, void 0);
        _DeviceMount_invalidateSignal.set(this, void 0);
        _DeviceMount_subscription.set(this, void 0);
        _DeviceMount_optEditor.set(this, lib_std_1.Option.None);
        __classPrivateFieldSet(this, _DeviceMount_service, service, "f");
        __classPrivateFieldSet(this, _DeviceMount_adapter, adapter, "f");
        __classPrivateFieldSet(this, _DeviceMount_deviceHost, deviceHost, "f");
        __classPrivateFieldSet(this, _DeviceMount_factory, factory, "f");
        __classPrivateFieldSet(this, _DeviceMount_invalidateSignal, invalidateSignal, "f");
        __classPrivateFieldSet(this, _DeviceMount_subscription, adapter.minimizedField.subscribe(function () {
            __classPrivateFieldGet(_this, _DeviceMount_terminator, "f").terminate();
            __classPrivateFieldSet(_this, _DeviceMount_optEditor, lib_std_1.Option.None, "f");
            __classPrivateFieldGet(_this, _DeviceMount_invalidateSignal, "f").call(_this);
        }), "f");
    }
    DeviceMount.forMidiEffect = function (service, adapter, deviceHost, invalidateSignal) {
        return new DeviceMount(service, adapter, deviceHost, DeviceEditorFactory_1.DeviceEditorFactory.toMidiEffectDeviceEditor, invalidateSignal);
    };
    DeviceMount.forInstrument = function (service, adapter, deviceHost, invalidateSignal) {
        return new DeviceMount(service, adapter, deviceHost, function (service, lifecycle, box) { return DeviceEditorFactory_1.DeviceEditorFactory.toInstrumentDeviceEditor(service, lifecycle, box, deviceHost); }, invalidateSignal);
    };
    DeviceMount.forAudioEffect = function (service, adapter, deviceHost, invalidateSignal) {
        return new DeviceMount(service, adapter, deviceHost, DeviceEditorFactory_1.DeviceEditorFactory.toAudioEffectDeviceEditor, invalidateSignal);
    };
    DeviceMount.prototype.editor = function () {
        var _this = this;
        return __classPrivateFieldGet(this, _DeviceMount_optEditor, "f").match({
            none: function () {
                var editor = __classPrivateFieldGet(_this, _DeviceMount_factory, "f").call(_this, __classPrivateFieldGet(_this, _DeviceMount_service, "f"), __classPrivateFieldGet(_this, _DeviceMount_terminator, "f"), __classPrivateFieldGet(_this, _DeviceMount_adapter, "f").box, __classPrivateFieldGet(_this, _DeviceMount_deviceHost, "f"));
                __classPrivateFieldSet(_this, _DeviceMount_optEditor, lib_std_1.Option.wrap(editor), "f");
                return editor;
            },
            some: function (editor) { return editor; }
        });
    };
    Object.defineProperty(DeviceMount.prototype, "uuid", {
        get: function () { return __classPrivateFieldGet(this, _DeviceMount_adapter, "f").uuid; },
        enumerable: false,
        configurable: true
    });
    DeviceMount.prototype.terminate = function () {
        __classPrivateFieldSet(this, _DeviceMount_optEditor, lib_std_1.Option.None, "f");
        __classPrivateFieldGet(this, _DeviceMount_subscription, "f").terminate();
        __classPrivateFieldGet(this, _DeviceMount_terminator, "f").terminate();
        __classPrivateFieldGet(this, _DeviceMount_invalidateSignal, "f").call(this);
    };
    return DeviceMount;
}());
exports.DeviceMount = DeviceMount;
_DeviceMount_terminator = new WeakMap(), _DeviceMount_service = new WeakMap(), _DeviceMount_adapter = new WeakMap(), _DeviceMount_deviceHost = new WeakMap(), _DeviceMount_factory = new WeakMap(), _DeviceMount_invalidateSignal = new WeakMap(), _DeviceMount_subscription = new WeakMap(), _DeviceMount_optEditor = new WeakMap();
