"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installCursors = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
var iconSymbolToCursor = function (symbol, hotspotX, hotspotY, fallback) {
    if (fallback === void 0) { fallback = "auto"; }
    var cursor = (0, lib_std_1.asDefined)(document.getElementById(studio_enums_1.IconSymbol.toName(symbol)), "Could not find ".concat(studio_enums_1.IconSymbol.toName(symbol)))
        .cloneNode(true);
    cursor.removeAttribute("id");
    cursor.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    cursor.setAttribute("width", "20");
    cursor.setAttribute("height", "20");
    cursor.setAttribute("stroke", "black");
    return "url('data:image/svg+xml,".concat(encodeURI(cursor.outerHTML
        .replace("<symbol ", "<svg ")
        .replace("</symbol>", "</svg>")
        .replace("currentColor", "white")), "') ").concat(hotspotX, " ").concat(hotspotY, ", ").concat(fallback);
};
var installCursors = function () {
    lib_dom_1.CssUtils.registerCustomCursor(0 /* Cursor.Pencil */, iconSymbolToCursor(studio_enums_1.IconSymbol.Pencil, 3, 16, "pointer"));
    lib_dom_1.CssUtils.registerCustomCursor(2 /* Cursor.ExpandWidth */, iconSymbolToCursor(studio_enums_1.IconSymbol.ExpandWidth, 10, 10, "col-resize"));
    lib_dom_1.CssUtils.registerCustomCursor(1 /* Cursor.Scissors */, iconSymbolToCursor(studio_enums_1.IconSymbol.Scissors, 10, 10, "auto"));
    lib_dom_1.CssUtils.registerCustomCursor(3 /* Cursor.LoopEnd */, iconSymbolToCursor(studio_enums_1.IconSymbol.LoopEnd, 8, 8, "auto"));
    lib_dom_1.CssUtils.registerCustomCursor(4 /* Cursor.LoopStart */, iconSymbolToCursor(studio_enums_1.IconSymbol.LoopStart, 12, 8, "auto"));
};
exports.installCursors = installCursors;
