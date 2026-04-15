"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconCartridge = exports.Icon = void 0;
var Icon_sass_inline_1 = require("./Icon.sass?inline");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
var defaultClassName = lib_dom_1.Html.adoptStyleSheet(Icon_sass_inline_1.default, "Icon");
var Icon = function (_a) {
    var symbol = _a.symbol, className = _a.className, style = _a.style, onInit = _a.onInit;
    return (<svg classList={lib_dom_1.Html.buildClassList(defaultClassName, className)} style={style} onInit={onInit}>
        <use href={"#".concat(studio_enums_1.IconSymbol.toName(symbol))}/>
    </svg>);
};
exports.Icon = Icon;
var IconCartridge = function (_a) {
    var lifecycle = _a.lifecycle, symbol = _a.symbol, className = _a.className, style = _a.style, onInit = _a.onInit;
    var use = <use href=""/>;
    var updater = function () { return use.href.baseVal = "#".concat(studio_enums_1.IconSymbol.toName(symbol.getValue())); };
    updater();
    lifecycle.own(symbol.subscribe(updater));
    return (<svg classList={lib_dom_1.Html.buildClassList(defaultClassName, className)} style={style} onInit={onInit}>{use}</svg>);
};
exports.IconCartridge = IconCartridge;
