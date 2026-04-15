"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
var Column_sass_inline_1 = require("./Column.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(Column_sass_inline_1.default, "Column");
var Column = function (_a, children) {
    var _b;
    var ems = _a.ems, space = _a.space, color = _a.color, style = _a.style;
    return (<div className={className} style={__assign({ display: "grid", gridTemplateRows: ems.map(function (em) { return em === 0 ? "auto" : "".concat(em, "em"); }).join(" "), rowGap: "".concat(space !== null && space !== void 0 ? space : 0, "em"), height: "100%", margin: "0 1px", alignContent: "center", justifyItems: "center", color: (_b = color === null || color === void 0 ? void 0 : color.toString()) !== null && _b !== void 0 ? _b : "inherit" }, style)}>
        {children}
    </div>);
};
exports.Column = Column;
