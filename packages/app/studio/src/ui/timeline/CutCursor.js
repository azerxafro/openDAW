"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CutCursor = void 0;
var CutCursor_sass_inline_1 = require("./CutCursor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(CutCursor_sass_inline_1.default, "CutCursor");
var CutCursor = function (_a) {
    var lifecycle = _a.lifecycle, range = _a.range, position = _a.position;
    var svg = (<svg classList={className}>
            <line x1="0" y1="0" x2="0" y2="100%" stroke="rgba(255,255,255,0.5)" stroke-width="1" stroke-dasharray="1,2"/>
        </svg>);
    var updater = function () {
        var value = position.getValue();
        if ((0, lib_std_1.isDefined)(value)) {
            svg.style.left = "".concat(Math.floor(range.unitToX(Math.max(value, 0))) + 1, "px");
            svg.style.display = "block";
        }
        else {
            svg.style.display = "none";
        }
    };
    lifecycle.ownAll(position.subscribe(updater), lib_dom_1.Html.watchResize(svg, updater));
    updater();
    return svg;
};
exports.CutCursor = CutCursor;
