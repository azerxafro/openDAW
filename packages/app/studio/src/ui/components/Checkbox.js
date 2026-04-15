"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
var ButtonCheckboxRadio_tsx_1 = require("@/ui/components/ButtonCheckboxRadio.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var Checkbox = function (_a, children) {
    var _b;
    var lifecycle = _a.lifecycle, model = _a.model, style = _a.style, className = _a.className, appearance = _a.appearance, onInit = _a.onInit;
    var id = lib_dom_1.Html.nextID();
    var input = (<input type="checkbox" id={id} oninput={function () {
            model.setValue(input.checked);
            input.checked = model.getValue();
        }} checked={model.getValue()}/>);
    lifecycle.own(model.subscribe(function (model) { return input.checked = model.getValue(); }));
    return (<ButtonCheckboxRadio_tsx_1.ButtonCheckboxRadio lifecycle={lifecycle} style={style} className={className} appearance={appearance} dataClass="checkbox" onInit={onInit}>
            {input}
            <label htmlFor={id} style={{ cursor: (_b = appearance === null || appearance === void 0 ? void 0 : appearance.cursor) !== null && _b !== void 0 ? _b : "auto" }}>{children}</label>
        </ButtonCheckboxRadio_tsx_1.ButtonCheckboxRadio>);
};
exports.Checkbox = Checkbox;
