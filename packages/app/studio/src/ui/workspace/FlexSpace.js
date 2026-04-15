"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexSpace = void 0;
var FlexSpace_sass_inline_1 = require("./FlexSpace.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(FlexSpace_sass_inline_1.default, "FlexSpace");
var FlexSpace = function () { return (<div className={className}/>); };
exports.FlexSpace = FlexSpace;
