"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksFooterHeader = void 0;
var TracksFooterHeader_sass_inline_1 = require("./TracksFooterHeader.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(TracksFooterHeader_sass_inline_1.default, "TracksFooterHeader");
var TracksFooterHeader = function () {
    return (<div className={className}/>);
};
exports.TracksFooterHeader = TracksFooterHeader;
