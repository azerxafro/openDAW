"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installEditorAuxBody = exports.installEditorBody = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var WheelScroll_ts_1 = require("@/ui/timeline/editors/WheelScroll.ts");
var AutoScroll_ts_1 = require("@/ui/AutoScroll.ts");
var Config_ts_1 = require("@/ui/timeline/Config.ts");
var installEditorBody = function (_a) {
    var element = _a.element, range = _a.range, reader = _a.reader;
    return lib_std_1.Terminable.many((0, exports.installEditorAuxBody)(element, range), reader.keeoOverlapping(range));
};
exports.installEditorBody = installEditorBody;
// This is for the extra editor that also needs wheel and auto-scroll support
// Currently: PropertyEditor within NoteEditor
var installEditorAuxBody = function (element, range) {
    return lib_std_1.Terminable.many((0, WheelScroll_ts_1.attachWheelScroll)(element, range), (0, AutoScroll_ts_1.installAutoScroll)(element, function (deltaX, _deltaY) {
        if (deltaX !== 0) {
            range.moveUnitBy(deltaX * range.unitsPerPixel * Config_ts_1.Config.AutoScrollHorizontalSpeed);
        }
    }, { padding: Config_ts_1.Config.AutoScrollPadding }));
};
exports.installEditorAuxBody = installEditorAuxBody;
