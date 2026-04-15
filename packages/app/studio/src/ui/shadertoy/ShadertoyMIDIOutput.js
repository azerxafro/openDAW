"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadertoyMIDIOutput = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var lib_std_1 = require("@opendaw/lib-std");
var ShadertoyMIDIOutput = /** @class */ (function () {
    function ShadertoyMIDIOutput() {
    }
    ShadertoyMIDIOutput.subscribe = function (observer) {
        return __classPrivateFieldGet(this, _a, "f", _ShadertoyMIDIOutput_notifier).subscribe(observer);
    };
    var _a, _ShadertoyMIDIOutput_notifier;
    _a = ShadertoyMIDIOutput;
    _ShadertoyMIDIOutput_notifier = { value: new lib_std_1.Notifier() };
    ShadertoyMIDIOutput.Default = studio_core_1.MidiDevices.createSoftwareMIDIOutput(function (message) { return __classPrivateFieldGet(_a, _a, "f", _ShadertoyMIDIOutput_notifier).notify(message); }, "Shadertoy", "openDAW-shadertoy");
    return ShadertoyMIDIOutput;
}());
exports.ShadertoyMIDIOutput = ShadertoyMIDIOutput;
