"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var TextInput_sass_inline_1 = require("./TextInput.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var defaultClassName = lib_dom_1.Html.adoptStyleSheet(TextInput_sass_inline_1.default, "TextInput");
var TextInput = function (_a) {
    var lifecycle = _a.lifecycle, model = _a.model, className = _a.className, maxChars = _a.maxChars;
    maxChars !== null && maxChars !== void 0 ? maxChars : (maxChars = 127);
    var input = (<div contentEditable="true" style={{ width: "100%" }}/>);
    var element = (<div className={lib_dom_1.Html.buildClassList(defaultClassName, className)}>
            {input}
        </div>);
    var update = function () { return input.textContent = model.getValue(); };
    lifecycle.ownAll(lib_dom_1.Events.subscribe(element, "focusin", function (event) {
        if (!(0, lib_std_1.isInstanceOf)(event.target, HTMLElement)) {
            return;
        }
        lib_dom_1.Html.selectContent(event.target);
    }), lib_dom_1.Events.subscribe(element, "focusout", function (event) {
        if (!(0, lib_std_1.isInstanceOf)(event.target, HTMLElement)) {
            return;
        }
        update();
        lib_dom_1.Html.unselectContent(event.target);
    }), lib_dom_1.Events.subscribe(element, "copy", function (event) {
        var _a;
        event.preventDefault();
        (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.setData("application/json", JSON.stringify({
            app: "openDAW",
            content: "text",
            value: model.getValue()
        }));
    }), lib_dom_1.Events.subscribe(element, "paste", function (event) {
        var _a;
        var data = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.getData("application/json");
        if ((0, lib_std_1.isDefined)(data)) {
            var json = JSON.parse(data);
            if (json.app === "openDAW" && json.content === "text") {
                event.preventDefault();
                model.setValue(json.value);
            }
        }
    }), lib_dom_1.Events.subscribe(element, "input", function (event) {
        var _a, _b;
        var target = event.target;
        if (!(0, lib_std_1.isInstanceOf)(target, HTMLElement)) {
            return;
        }
        var newValue = (_b = (_a = target.textContent) === null || _a === void 0 ? void 0 : _a.slice(0, maxChars)) !== null && _b !== void 0 ? _b : "";
        model.setValue(newValue);
    }));
    update();
    return element;
};
exports.TextInput = TextInput;
