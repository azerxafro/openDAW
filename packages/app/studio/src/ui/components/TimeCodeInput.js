"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeCodeInput = void 0;
var TimeCodeInput_sass_inline_1 = require("./TimeCodeInput.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_dom_1 = require("@opendaw/lib-dom");
var defaultClassName = lib_dom_1.Html.adoptStyleSheet(TimeCodeInput_sass_inline_1.default, "TimeCodeInput");
var TimeCodeInput = function (_a) {
    var _b, _c;
    var lifecycle = _a.lifecycle, model = _a.model, className = _a.className, negativeWarning = _a.negativeWarning, signature = _a.signature, oneBased = _a.oneBased;
    var upper = (_b = signature === null || signature === void 0 ? void 0 : signature.at(0)) !== null && _b !== void 0 ? _b : 4;
    var lower = (_c = signature === null || signature === void 0 ? void 0 : signature.at(1)) !== null && _c !== void 0 ? _c : 4;
    var units = [
        { amount: lib_dsp_1.PPQN.Bar, maxChars: 3 },
        { amount: lib_dsp_1.PPQN.Quarter, maxChars: 1 },
        { amount: lib_dsp_1.PPQN.SemiQuaver, maxChars: 1 },
        { amount: 1, maxChars: 3 }
    ];
    var unitOffset = oneBased === true ? 1 : 0;
    var inputs = units.map(function (_a) {
        var maxChars = _a.maxChars;
        return (<div contentEditable="true" style={{ width: "calc(0.5em + ".concat(maxChars * 6 + 1, "px)") }}/>);
    });
    var element = (<div className={lib_dom_1.Html.buildClassList(defaultClassName, className)}>
            {inputs}
        </div>);
    var updateDigits = function () {
        var value = model.getValue();
        var negative = value < 0;
        element.classList.toggle("negative", negativeWarning === true && negative);
        var _a = lib_dsp_1.PPQN.toParts(value, upper, lower), bars = _a.bars, beats = _a.beats, semiquavers = _a.semiquavers, ticks = _a.ticks;
        inputs[0].textContent = negative ? String(bars) : String(bars + unitOffset).padStart(3, "0");
        inputs[1].textContent = String(beats + unitOffset);
        inputs[2].textContent = String(semiquavers + unitOffset);
        inputs[3].textContent = String(ticks).padStart(3, "0");
    };
    lifecycle.ownAll(model.subscribe(updateDigits), lib_dom_1.Events.subscribe(element, "focusin", function (event) {
        if (!(0, lib_std_1.isInstanceOf)(event.target, HTMLElement)) {
            return;
        }
        lib_dom_1.Html.selectContent(event.target);
    }), lib_dom_1.Events.subscribe(element, "focusout", function (event) {
        if (!(0, lib_std_1.isInstanceOf)(event.target, HTMLElement)) {
            return;
        }
        lib_dom_1.Html.unselectContent(event.target);
    }), lib_dom_1.Events.subscribe(element, "copy", function (event) {
        var _a;
        event.preventDefault();
        (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.setData("application/json", JSON.stringify({
            app: "openDAW",
            content: "timecode",
            value: model.getValue()
        }));
    }), lib_dom_1.Events.subscribe(element, "paste", function (event) {
        var _a, _b;
        var data = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.getData("application/json");
        if ((0, lib_std_1.isDefined)(data)) {
            var _c = (0, lib_std_1.tryCatch)(function () { return JSON.parse(data); }), status_1 = _c.status, json = _c.value;
            if (status_1 === "failure") {
                return;
            }
            if ((0, lib_std_1.safeRead)(json, "app") === "openDAW" && (0, lib_std_1.safeRead)(json, "content") === "timecode") {
                event.preventDefault();
                model.setValue((_b = json.value) !== null && _b !== void 0 ? _b : 0);
            }
        }
    }), lib_dom_1.Events.subscribe(element, "keydown", function (event) {
        var _a;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }
        var target = event.target;
        if (!(0, lib_std_1.isInstanceOf)(target, HTMLElement)) {
            return;
        }
        var index = (0, lib_std_1.checkIndex)(inputs.indexOf(target), inputs);
        switch (event.code) {
            case "ArrowUp": {
                event.preventDefault();
                model.setValue(model.getValue() + units[index].amount);
                lib_dom_1.Html.selectContent(target);
                break;
            }
            case "ArrowDown": {
                event.preventDefault();
                model.setValue(model.getValue() - units[index].amount);
                lib_dom_1.Html.selectContent(target);
                break;
            }
            case "Enter": {
                event.preventDefault();
                var unit = parseInt((_a = target.textContent) !== null && _a !== void 0 ? _a : "") | 0;
                var prevValue = model.getValue();
                var _b = lib_dsp_1.PPQN.toParts(prevValue, upper, lower), bars = _b.bars, beats = _b.beats, semiquavers = _b.semiquavers, ticks = _b.ticks;
                var nextValue = units[0].amount * (index === 0 ? prevValue >= 0 ? unit - unitOffset : unit : bars)
                    + units[1].amount * (index === 1 ? unit - unitOffset : beats)
                    + units[2].amount * (index === 2 ? unit - unitOffset : semiquavers)
                    + units[3].amount * (index === 3 ? unit : ticks);
                if (prevValue === nextValue) {
                    updateDigits();
                }
                else {
                    model.setValue(nextValue);
                }
                lib_dom_1.Html.selectContent(target);
                break;
            }
            case "Digit1":
            case "Digit2":
            case "Digit3":
            case "Digit4":
            case "Digit5":
            case "Digit6":
            case "Digit7":
            case "Digit8":
            case "Digit9":
            case "Digit0":
            case "Tab":
            case "ArrowLeft":
            case "ArrowRight":
            case "Minus":
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
exports.TimeCodeInput = TimeCodeInput;
