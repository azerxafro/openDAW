"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyHeader = void 0;
var PropertyHeader_sass_inline_1 = require("./PropertyHeader.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var DropDown_tsx_1 = require("@/ui/composite/DropDown.tsx");
var PropertyAccessor_ts_1 = require("@/ui/timeline/editors/notes/property/PropertyAccessor.ts");
var FlexSpacer_tsx_1 = require("@/ui/components/FlexSpacer.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(PropertyHeader_sass_inline_1.default, "PropertyHeader");
var PropertyHeader = function (_a) {
    var lifecycle = _a.lifecycle, propertyOwner = _a.propertyOwner;
    var minValue = lib_jsx_1.Inject.value("");
    var maxValue = lib_jsx_1.Inject.value("");
    var updateMinmaxLabels = function () {
        var _a = propertyOwner.getValue().minmaxLabels, min = _a[0], max = _a[1];
        minValue.value = min;
        maxValue.value = max;
    };
    lifecycle.own(propertyOwner.subscribe(updateMinmaxLabels));
    updateMinmaxLabels();
    return (<div className={className}>
            <FlexSpacer_tsx_1.FlexSpacer />
            <DropDown_tsx_1.DropDown lifecycle={lifecycle} mapping={function (property) { return (property.label); }} owner={propertyOwner} provider={function () { return PropertyAccessor_ts_1.NotePropertyAccessors; }} width="48px"/>
            <div className="range-labels">
                <span>{maxValue}</span>
                <hr />
                <span>{minValue}</span>
            </div>
        </div>);
};
exports.PropertyHeader = PropertyHeader;
