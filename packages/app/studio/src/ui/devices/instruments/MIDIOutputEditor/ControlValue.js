"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlValue = void 0;
var ControlValue_sass_inline_1 = require("./ControlValue.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_enums_1 = require("@opendaw/studio-enums");
var ParameterLabel_1 = require("@/ui/components/ParameterLabel");
var RelativeUnitValueDragging_1 = require("@/ui/wrapper/RelativeUnitValueDragging");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var Button_1 = require("@/ui/components/Button");
var Icon_1 = require("@/ui/components/Icon");
var DblClckTextInput_1 = require("@/ui/wrapper/DblClckTextInput");
var NumberInput_1 = require("@/ui/components/NumberInput");
var EditWrapper_1 = require("@/ui/wrapper/EditWrapper");
var className = lib_dom_1.Html.adoptStyleSheet(ControlValue_sass_inline_1.default, "ControlValue");
var ControlValue = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, tracks = _a.tracks, box = _a.box, parameter = _a.parameter;
    var editing = project.editing, midiLearning = project.midiLearning;
    return (<div className={className}>
            <DblClckTextInput_1.DblClckTextInput resolversFactory={function () {
            var resolvers = Promise.withResolvers();
            resolvers.promise.then(function (value) {
                return editing.modify(function () { return box.label.setValue(value); });
            }, lib_std_1.EmptyExec);
            return resolvers;
        }} provider={function () { return ({ unit: "", value: box.label.getValue() }); }}>
                <span onInit={function (element) { return lifecycle.own(box.label
            .catchupAndSubscribe(function (owner) {
            return element.textContent = lib_std_1.Strings.fallback(owner.getValue(), "Unnamed");
        })); }}/>
            </DblClckTextInput_1.DblClckTextInput>
            <span>#</span>
            <NumberInput_1.NumberInput lifecycle={lifecycle} model={EditWrapper_1.EditWrapper.forValue(editing, box.controller)} guard={{ guard: function (value) { return (0, lib_std_1.clamp)(value, 0, 127); } }}/>
            <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={tracks} parameter={parameter}>
                <RelativeUnitValueDragging_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={parameter}>
                    <ParameterLabel_1.ParameterLabel lifecycle={lifecycle} parameter={parameter} framed/>
                </RelativeUnitValueDragging_1.RelativeUnitValueDragging>
            </AutomationControl_1.AutomationControl>
            <div />
            <Button_1.Button lifecycle={lifecycle} onClick={function () { return editing.modify(function () { return parameter.field.box.delete(); }); }}>
                <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Delete}/>
            </Button_1.Button>
        </div>);
};
exports.ControlValue = ControlValue;
