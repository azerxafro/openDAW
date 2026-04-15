"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OctaveSelector = void 0;
var OctaveSelector_sass_inline_1 = require("./OctaveSelector.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var SlotState_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/SlotState");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var SlotUtils_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/SlotUtils");
var className = lib_dom_1.Html.adoptStyleSheet(OctaveSelector_sass_inline_1.default, "OctaveSelector");
var OctaveSelector = function (_a) {
    var lifecycle = _a.lifecycle, states = _a.states, octave = _a.octave, octaveIndex = _a.octaveIndex;
    var gap = 1;
    var size = 3;
    var rows = octaveIndex < 10 ? 3 : 2;
    var width = 4 * size + 3 * gap;
    var height = rows * size + (rows - 1) * gap;
    var indicator = [];
    var slotIndex = 0;
    for (var y = rows - 1; y >= 0; y--) {
        var _loop_1 = function (x) {
            var rect = (<rect x={"".concat(x * (gap + size), "px")} y={"".concat(y * (gap + size), "px")} width={"".concat(size, "px")} height={"".concat(size, "px")}/>);
            rect.style.setProperty("--color", SlotUtils_1.SlotUtils.color(slotIndex % 12));
            indicator.push(rect);
            var state = states[slotIndex++];
            rect.classList.add(state.getValue());
            lifecycle.own(state.subscribe(function () {
                rect.classList.remove(SlotState_1.SlotState.Busy, SlotState_1.SlotState.Playing);
                rect.classList.add(state.getValue());
            }));
        };
        for (var x = 0; x < 4; x++) {
            _loop_1(x);
        }
    }
    var svg = (<svg fill="var(--color-black)" stroke="none" viewBox={"0 0 ".concat(width, " ").concat(height)} width={width} height={height}>
            {indicator}
        </svg>);
    var element = (<div className={className}>
            {svg}
        </div>);
    var updateActiveState = function () { return element.classList.toggle("active", octave.getValue() === octaveIndex); };
    var dragSwitch = lib_std_1.Terminable.Empty;
    lifecycle.ownAll(lib_dom_1.Events.subscribe(element, "click", function () { return octave.setValue(octaveIndex); }), lib_dom_1.Events.subscribe(element, "dragenter", function () {
        element.classList.add("drag-over");
        dragSwitch = lib_runtime_1.Runtime.scheduleTimeout(function () {
            element.classList.remove("drag-over");
            octave.setValue(octaveIndex);
        }, 1000);
    }), lib_dom_1.Events.subscribe(element, "dragleave", function () {
        element.classList.remove("drag-over");
        dragSwitch.terminate();
    }), octave.catchupAndSubscribe(updateActiveState));
    return element;
};
exports.OctaveSelector = OctaveSelector;
