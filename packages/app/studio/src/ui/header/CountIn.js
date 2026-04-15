"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountIn = void 0;
var CountIn_sass_inline_1 = require("./CountIn.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var className = lib_dom_1.Html.adoptStyleSheet(CountIn_sass_inline_1.default, "CountIn");
var CountIn = function (_a) {
    var lifecycle = _a.lifecycle, engine = _a.engine;
    var textElement = (<text x="50%" y="50%" dy="0.08em" font-size="64" font-family="Rubik" text-anchor="middle" dominant-baseline="middle" text-rendering="geometricPrecision" fill="black"/>);
    var outlineWidth = 3;
    var r = 50.0 - outlineWidth / 2.0;
    var C = lib_std_1.TAU * r;
    var maskId = lib_dom_1.Html.nextID();
    var processCircle = (<circle cx="50" cy="50" r={r} fill="none" stroke="white" stroke-width={outlineWidth} stroke-linecap="butt" stroke-dasharray={C} stroke-dashoffset="0" stroke-opacity={0.33} transform="rotate(-90 50 50)"/>);
    var showProgress = function (progress) {
        return processCircle.setAttribute("stroke-dashoffset", String((1.0 - progress) * C));
    };
    var element = (<svg classList={className} viewBox="0 0 100 100" width={100} height={100}>
            <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse">
                    <circle cx="50" cy="50" r="50" fill="white"/>
                    {textElement}
                </mask>
            </defs>
            <circle cx="50" cy="50" r="50" fill="white" fill-opacity={0.25} mask={"url(#".concat(maskId, ")")}/>
            {processCircle}
        </svg>);
    lifecycle.ownAll(engine.countInBeatsRemaining
        .catchupAndSubscribe(function (owner) {
        var remaining = owner.getValue();
        showProgress(remaining / engine.preferences.settings.recording.countInBars);
        textElement.textContent = Math.floor(remaining + 1).toString();
    }), lib_std_1.Terminable.create(function () { return element.remove(); }));
    showProgress(1.0);
    return element;
};
exports.CountIn = CountIn;
