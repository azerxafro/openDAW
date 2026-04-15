"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingTextInput = void 0;
var FloatingTextInput_sass_inline_1 = require("./FloatingTextInput.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(FloatingTextInput_sass_inline_1.default, "TextInput");
var FloatingTextInput = function (_a) {
    var resolvers = _a.resolvers, position = _a.position, value = _a.value, unit = _a.unit, numeric = _a.numeric;
    var focusElement = document.activeElement;
    var inputField = (<input type="text" value={(0, lib_std_1.isDefined)(value) ? String(value) : ""}/>);
    requestAnimationFrame(function () {
        inputField.select();
        inputField.focus();
    });
    if ((0, lib_std_1.isDefined)(resolvers)) {
        var reject_1 = resolvers.reject, resolve_1 = resolvers.resolve;
        var remove_1 = function () {
            inputField.onblur = null;
            inputField.onkeydown = null;
            element.remove();
            focusElement === null || focusElement === void 0 ? void 0 : focusElement.focus();
        };
        inputField.onblur = function () {
            remove_1();
            reject_1("cancel");
        };
        inputField.onkeydown = function (event) {
            if (event.key.toLowerCase() === "enter") {
                var value_1 = numeric ? inputField.value.replace(",", ".") : inputField.value;
                remove_1();
                resolve_1(value_1);
            }
        };
    }
    var element = (<div className={className} unit={unit} style={(0, lib_std_1.isDefined)(position) ? {
            position: "absolute",
            transform: "translate(".concat(position.x, "px, ").concat(position.y, "px)")
        } : {}}>
            {inputField}
        </div>);
    return element;
};
exports.FloatingTextInput = FloatingTextInput;
