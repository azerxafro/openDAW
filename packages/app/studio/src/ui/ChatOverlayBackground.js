"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatOverlayBackground = exports.Padding = exports.WindowWidth = exports.TabWidth = void 0;
var ChatOverlayBackground_sass_inline_1 = require("./ChatOverlayBackground.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ChatOverlayBackground_sass_inline_1.default, "ChatOverlayBackground");
var TabWidth = 30;
exports.TabWidth = TabWidth;
var WindowWidth = 320;
exports.WindowWidth = WindowWidth;
var CornerRadius = 8;
var FilletRadius = 4;
var BumpCornerRadius = 10;
var BumpHalfHeight = 16;
var Padding = 8;
exports.Padding = Padding;
var InnerRadius = 4;
var buildOuterPath = function (height) {
    var midY = height / 2;
    var right = TabWidth + WindowWidth;
    var cr = CornerRadius;
    var fr = FilletRadius;
    var br = BumpCornerRadius;
    var bumpTop = midY - BumpHalfHeight;
    var bumpBot = midY + BumpHalfHeight;
    return [
        "M ".concat(TabWidth + cr, " 0"),
        "H ".concat(right),
        "V ".concat(height),
        "H ".concat(TabWidth + cr),
        "A ".concat(cr, " ").concat(cr, " 0 0 1 ").concat(TabWidth, " ").concat(height - cr),
        "V ".concat(bumpBot + fr),
        "A ".concat(fr, " ").concat(fr, " 0 0 0 ").concat(TabWidth - fr, " ").concat(bumpBot),
        "H ".concat(br),
        "A ".concat(br, " ").concat(br, " 0 0 1 0 ").concat(bumpBot - br),
        "V ".concat(bumpTop + br),
        "A ".concat(br, " ").concat(br, " 0 0 1 ").concat(br, " ").concat(bumpTop),
        "H ".concat(TabWidth - fr),
        "A ".concat(fr, " ").concat(fr, " 0 0 0 ").concat(TabWidth, " ").concat(bumpTop - fr),
        "V ".concat(cr),
        "A ".concat(cr, " ").concat(cr, " 0 0 1 ").concat(TabWidth + cr, " 0"),
        "Z"
    ].join(" ");
};
var buildInnerPath = function (height) {
    var left = TabWidth + Padding;
    var top = Padding;
    var right = TabWidth + WindowWidth;
    var bottom = height - Padding;
    var r = InnerRadius;
    return [
        "M ".concat(left + r, " ").concat(top),
        "H ".concat(right),
        "V ".concat(bottom),
        "H ".concat(left + r),
        "A ".concat(r, " ").concat(r, " 0 0 1 ").concat(left, " ").concat(bottom - r),
        "V ".concat(top + r),
        "A ".concat(r, " ").concat(r, " 0 0 1 ").concat(left + r, " ").concat(top),
        "Z"
    ].join(" ");
};
var ChatOverlayBackground = function (_a) {
    var lifecycle = _a.lifecycle, element = _a.element;
    var svgElement;
    var outerPath;
    var innerPath;
    var svg = (<svg classList={className} onInit={function (svg) { svgElement = svg; }}>
            <path classList="outer" onInit={function (path) { outerPath = path; }}/>
            <path classList="inner" onInit={function (path) { innerPath = path; }}/>
        </svg>);
    lifecycle.own(lib_dom_1.Html.watchResize(element, function (entry) {
        var height = entry.contentRect.height;
        svgElement.setAttribute("viewBox", "0 0 ".concat(TabWidth + WindowWidth, " ").concat(height));
        outerPath.setAttribute("d", buildOuterPath(height));
        innerPath.setAttribute("d", buildInnerPath(height));
    }));
    return svg;
};
exports.ChatOverlayBackground = ChatOverlayBackground;
