"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterLabel = void 0;
var ParameterLabel_sass_inline_1 = require("./ParameterLabel.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ParameterLabel_sass_inline_1.default, "ParameterLabel");
var ParameterLabel = function (_a) {
    var lifecycle = _a.lifecycle, parameter = _a.parameter, classList = _a.classList, framed = _a.framed;
    return (<label className={lib_dom_1.Html.buildClassList.apply(lib_dom_1.Html, __spreadArray([className, framed && "framed"], classList !== null && classList !== void 0 ? classList : [], false))} onInit={function (element) {
            var onValueChange = function (adapter) {
                var printValue = adapter.stringMapping.x(adapter.valueMapping.y(adapter.getControlledUnitValue()));
                element.textContent = printValue.value;
                element.setAttribute("unit", printValue.unit);
            };
            lifecycle.own(parameter.subscribe(onValueChange));
            onValueChange(parameter);
        }}/>);
};
exports.ParameterLabel = ParameterLabel;
