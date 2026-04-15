"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterToggleButton = void 0;
var ParameterToggleButton_sass_inline_1 = require("./ParameterToggleButton.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ParameterToggleButton_sass_inline_1.default, "ParameterToggleButton");
// TODO Create/Remove automation and midi learning
var ParameterToggleButton = function (_a) {
    var lifecycle = _a.lifecycle, editing = _a.editing, parameter = _a.parameter;
    return (<div className={className} onInit={function (element) {
            lifecycle.ownAll(parameter.catchupAndSubscribe(function (owner) {
                return element.classList.toggle("active", owner.getValue());
            }), lib_dom_1.Events.subscribe(element, "click", function () {
                return editing.modify(function () { return parameter.setValue(!parameter.getValue()); });
            }));
        }}>{parameter.name}</div>);
};
exports.ParameterToggleButton = ParameterToggleButton;
