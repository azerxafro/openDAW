"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterLabelKnob = void 0;
var ParameterLabelKnob_sass_inline_1 = require("./ParameterLabelKnob.sass?inline");
var RelativeUnitValueDragging_tsx_1 = require("@/ui/wrapper/RelativeUnitValueDragging.tsx");
var LabelKnob_tsx_1 = require("@/ui/composite/LabelKnob.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ParameterLabelKnob_sass_inline_1.default, "ParameterLabelKnob");
var ParameterLabelKnob = function (_a) {
    var lifecycle = _a.lifecycle, editing = _a.editing, parameter = _a.parameter, options = _a.options, anchor = _a.anchor;
    return (<div className={className}>
        <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={parameter} supressValueFlyout={true} options={options}>
            <LabelKnob_tsx_1.LabelKnob lifecycle={lifecycle} parameter={parameter} anchor={anchor !== null && anchor !== void 0 ? anchor : 0.0}/>
        </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
    </div>);
};
exports.ParameterLabelKnob = ParameterLabelKnob;
