"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInput = void 0;
var NumberInput_sass_inline_1 = require("./NumberInput.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var defaultClassName = lib_dom_1.Html.adoptStyleSheet(NumberInput_sass_inline_1.default, "NumberInput");
var NumberInput = function (_a) {
    var lifecycle = _a.lifecycle, model = _a.model, negativeWarning = _a.negativeWarning, className = _a.className, maxChars = _a.maxChars, mapper = _a.mapper, step = _a.step, guard = _a.guard;
    step !== null && step !== void 0 ? step : (step = 1.0);
    maxChars !== null && maxChars !== void 0 ? maxChars : (maxChars = 3);
    mapper !== null && mapper !== void 0 ? mapper : (mapper = lib_std_1.StringMapping.numeric({}));
    var input = (<div contentEditable="true" style={{ width: "calc(0.5em + ".concat(maxChars * 6 + 1, "px)") }}/>);
    var element = (<div className={lib_dom_1.Html.buildClassList(defaultClassName, className)}>
            {input}
        </div>);
    var updateDigits = function () {
        var value = model.getValue();
        element.classList.toggle("negative", negativeWarning === true && value < 0);
        input.textContent = mapper.x(value).value;
    };
    lifecycle.ownAll(model.subscribe(updateDigits), lib_dom_1.Events.subscribe(element, "focusin", function (event) {
        if (!(0, lib_std_1.isInstanceOf)(event.target, HTMLElement)) {
            return;
        }
        lib_dom_1.Html.selectContent(event.target);
    }), lib_dom_1.Events.subscribe(element, "focusout", function (event) {
        var _a;
        if (!(0, lib_std_1.isInstanceOf)(event.target, HTMLElement)) {
            return;
        }
        var result = mapper.y((_a = event.target.textContent) !== null && _a !== void 0 ? _a : "");
        if (result.type === "explicit" && !isNaN(result.value)) {
            model.setValue((0, lib_std_1.isDefined)(guard) ? guard.guard(result.value) : result.value);
        }
        updateDigits();
        lib_dom_1.Html.unselectContent(event.target);
    }), lib_dom_1.Events.subscribe(element, "copy", function (event) {
        var _a;
        event.preventDefault();
        (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.setData("application/json", JSON.stringify({
            app: "openDAW",
            content: "number",
            value: model.getValue()
        }));
    }), lib_dom_1.Events.subscribe(element, "paste", function (event) {
        var _a;
        var data = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.getData("application/json");
        if ((0, lib_std_1.isDefined)(data)) {
            var _b = (0, lib_std_1.tryCatch)(function () { return JSON.parse(data); }), status_1 = _b.status, json = _b.value;
            if (status_1 === "success" && json.app === "openDAW" && json.content === "number") {
                event.preventDefault();
                model.setValue((0, lib_std_1.isDefined)(guard) ? guard.guard(json.value) : json.value);
            }
        }
    }), lib_dom_1.Events.subscribe(element, "keydown", function (event) {
        var _a, _b, _c;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }
        var target = event.target;
        if (!(0, lib_std_1.isInstanceOf)(target, HTMLElement)) {
            return;
        }
        switch (event.code) {
            case "ArrowUp": {
                event.preventDefault();
                var result = mapper.y((_a = target.textContent) !== null && _a !== void 0 ? _a : "");
                if (result.type !== "explicit" || isNaN(result.value)) {
                    return;
                }
                var nextValue = result.value + step;
                model.setValue((0, lib_std_1.isDefined)(guard) ? guard.guard(nextValue) : nextValue);
                lib_dom_1.Html.selectContent(target);
                break;
            }
            case "ArrowDown": {
                event.preventDefault();
                var result = mapper.y((_b = target.textContent) !== null && _b !== void 0 ? _b : "");
                if (result.type !== "explicit" || isNaN(result.value)) {
                    return;
                }
                var nextValue = result.value - step;
                model.setValue((0, lib_std_1.isDefined)(guard) ? guard.guard(nextValue) : nextValue);
                lib_dom_1.Html.selectContent(target);
                break;
            }
            case "Enter": {
                event.preventDefault();
                var result = mapper.y((_c = target.textContent) !== null && _c !== void 0 ? _c : "");
                if (result.type === "explicit" && !isNaN(result.value)) {
                    model.setValue((0, lib_std_1.isDefined)(guard) ? guard.guard(result.value) : result.value);
                }
                target.blur();
                break;
            }
            case "Digit0":
            case "Digit1":
            case "Digit2":
            case "Digit3":
            case "Digit4":
            case "Digit5":
            case "Digit6":
            case "Digit7":
            case "Digit8":
            case "Digit9":
            case "Numpad0":
            case "Numpad1":
            case "Numpad2":
            case "Numpad3":
            case "Numpad4":
            case "Numpad5":
            case "Numpad6":
            case "Numpad7":
            case "Numpad8":
            case "Numpad9":
            case "Tab":
            case "ArrowLeft":
            case "ArrowRight":
            case "Minus":
            case "NumpadSubtract":
            case "Backspace": {
                break; // Allow
            }
            default: {
                console.debug("ignore", event.code);
                event.preventDefault();
            }
        }
    }));
    updateDigits();
    return element;
};
exports.NumberInput = NumberInput;
