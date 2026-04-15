"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeDots = void 0;
var ThreeDots_sass_inline_1 = require("./ThreeDots.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ThreeDots_sass_inline_1.default, "ThreeDots");
var ThreeDots = function () {
    return (<svg classList={className} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle class="spinner_I8Q1" cx="4" cy="12" r="1.5"/>
            <circle class="spinner_I8Q1 spinner_vrS7" cx="12" cy="12" r="3"/>
            <circle class="spinner_I8Q1" cx="20" cy="12" r="1.5"/>
        </svg>);
};
exports.ThreeDots = ThreeDots;
