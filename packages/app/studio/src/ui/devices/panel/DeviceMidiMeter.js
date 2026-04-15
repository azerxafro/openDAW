"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceMidiMeter = void 0;
var DeviceMidiMeter_sass_inline_1 = require("./DeviceMidiMeter.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(DeviceMidiMeter_sass_inline_1.default, "DeviceMidiMeter");
var DeviceMidiMeter = function (_a) {
    var lifecycle = _a.lifecycle, receiver = _a.receiver, address = _a.address;
    var size = 8;
    var indicator = (<circle cx={size / 2} cy={size / 2} r={size / 4} fill={studio_enums_1.Colors.shadow} visibility="hidden"/>);
    var streamReceiver = lifecycle.own(new studio_adapters_1.NoteStreamReceiver(receiver, address));
    lifecycle.own(streamReceiver.subscribe(function (state) {
        return indicator.style.visibility = state.isAnyNoteOn() ? "visible" : "hidden";
    }));
    return (<svg classList={className} viewBox={"0 0 ".concat(size, " ").concat(size)} width={size} height={size}>{indicator}</svg>);
};
exports.DeviceMidiMeter = DeviceMidiMeter;
