"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomatableControl = void 0;
var AutomatableControl_sass_inline_1 = require("./AutomatableControl.sass?inline");
var automation_ts_1 = require("@/ui/menu/automation.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(AutomatableControl_sass_inline_1.default, "AutomatableControl");
var AutomatableControl = function (_a) {
    var lifecycle = _a.lifecycle, editing = _a.editing, midiLearning = _a.midiLearning, adapter = _a.adapter, parameter = _a.parameter;
    return (<div className={className} onInit={function (element) {
            lifecycle.ownAll((0, automation_ts_1.attachParameterContextMenu)(editing, midiLearning, adapter.deviceHost().audioUnitBoxAdapter().tracks, parameter, element), parameter.catchupAndSubscribeControlSources({
                onControlSourceAdd: function (source) { return element.classList.add(source); },
                onControlSourceRemove: function (source) { return element.classList.remove(source); }
            }));
        }}/>);
};
exports.AutomatableControl = AutomatableControl;
