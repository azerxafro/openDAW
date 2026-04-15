"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextButton = void 0;
var TextButton_sass_inline_1 = require("./TextButton.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(TextButton_sass_inline_1.default, "TextButton");
var TextButton = function (_a) {
    var onClick = _a.onClick;
    return (<div className={className} onclick={onClick}/>);
};
exports.TextButton = TextButton;
