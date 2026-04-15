"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var ButtonCheckboxRadio_1 = require("@/ui/components/ButtonCheckboxRadio");
var lib_dom_1 = require("@opendaw/lib-dom");
var Button = function (_a, children) {
    var _b;
    var lifecycle = _a.lifecycle, onClick = _a.onClick, onInit = _a.onInit, style = _a.style, className = _a.className, appearance = _a.appearance;
    var id = lib_dom_1.Html.nextID();
    var input = <input type="button" id={id} onclick={onClick} onInit={onInit}/>;
    return (<ButtonCheckboxRadio_1.ButtonCheckboxRadio lifecycle={lifecycle} style={style} className={className} appearance={appearance} dataClass="button">
            {input}
            <label htmlFor={id} style={{ cursor: (_b = appearance === null || appearance === void 0 ? void 0 : appearance.cursor) !== null && _b !== void 0 ? _b : "auto" }}>{children}</label>
        </ButtonCheckboxRadio_1.ButtonCheckboxRadio>);
};
exports.Button = Button;
