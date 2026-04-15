"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tape = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var tapeVelocity = 13.0 / lib_dsp_1.PPQN.Bar; // TapeDeviceEditor speed 4.76 cm/s converted into svg coordinates
var rEmpty = 15;
var rFull = 40;
var stroke = studio_enums_1.Colors.dark;
var mapping = lib_std_1.ValueMapping.linear(rEmpty, rFull);
var reels = [{ x: 56, y: 44, r: 0 }, { x: 152, y: 44, r: 0 }];
var pins = [{ x: 8, y: 104, r: 6 }, { x: 200, y: 104, r: 6 }];
var tapePath = [reels[0], pins[0], pins[1], reels[1]];
var tapeReelHub = function () { return (<g>
        <line x1={+mapping.y(0.4)} x2={+mapping.y(0.6)} stroke="rgba(255, 255, 255, 0.125)" stroke-width={4} stroke-linecap="round"/>
        <line x1={-mapping.y(0.4)} x2={-mapping.y(0.6)} stroke="rgba(255, 255, 255, 0.125)" stroke-width={4} stroke-linecap="round"/>
        <path fill="none" stroke={studio_enums_1.Colors.green} transform="translate(-10.4 -11.979)" d="M4.75,17.657C2.414,18.046 0.202,18.32 0.017,18C-0.167,17.68 1.168,15.91 2.669,14.086C2.486,13.415 2.388,12.708 2.388,11.979C2.388,8.263 4.922,5.135 8.355,4.23C9.182,2.028 10.042,0 10.409,0C10.778,0 11.64,2.031 12.467,4.236C15.889,5.148 18.413,8.271 18.413,11.979C18.413,12.702 18.317,13.404 18.136,14.07C19.642,15.9 20.986,17.68 20.802,18C20.616,18.321 18.395,18.046 16.053,17.655C14.604,19.098 12.605,19.991 10.4,19.991C8.196,19.991 6.199,19.099 4.75,17.657Z"/>
    </g>); };
var Tape = function (_a) {
    var lifecycle = _a.lifecycle, position = _a.position, durationInPulses = _a.durationInPulses, tracks = _a.tracks;
    var reelHubs = [tapeReelHub(), tapeReelHub()];
    var reelElements = reels.map(function (reel) {
        return (<circle cx={reel.x} cy={reel.y} r={0} fill="rgba(0,0,0,0.08)" stroke={stroke}/>);
    });
    var head = (<rect x={100} y={106} width={8} height={2} stroke="none"/>);
    var tape = lib_std_1.Arrays.create(function () { return <line stroke={stroke}/>; }, 3);
    var headerUpdater = (0, lib_dom_1.deferNextFrame)(function () {
        var ppqn = position.getValue();
        var playingRegion = tracks.collection.adapters().some(function (track) {
            var region = track.regions.collection.lowerEqual(ppqn);
            return (0, lib_std_1.isDefined)(region) && region.hasCollection && region.complete > ppqn;
        });
        head.setAttribute("fill", playingRegion ? studio_enums_1.Colors.bright.toString() : studio_enums_1.Colors.dark.toString());
    });
    var angles = [0.0, 0.0];
    var lastTime = 0.0;
    var delta = 0.0;
    var observer = function (owner) {
        var position = owner.getValue();
        var total = durationInPulses.getValue();
        var elapsed = position - lastTime;
        delta += elapsed;
        var ratio = (0, lib_std_1.clamp)(delta / total, 0.0, 1.0);
        var ratios = [1.0 - ratio, ratio];
        for (var i = 0; i < 2; i++) {
            var reel = reels[i];
            var radius = mapping.y(ratios[i]);
            angles[i] += (elapsed * 360) * (tapeVelocity / radius);
            reelHubs[i].setAttribute("transform", "translate(".concat(reel.x, ", ").concat(reel.y, ") rotate(").concat(-angles[i] + i * 60.0, ")"));
            reelElements[i].r.baseVal.value = reel.r = radius;
        }
        for (var i = 0; i < tapePath.length - 1; i++) {
            var _a = lib_std_1.Geom.outerTangentPoints(tapePath[i], tapePath[i + 1]), a = _a[0], b = _a[1];
            var _b = tape[i], x1 = _b.x1, y1 = _b.y1, x2 = _b.x2, y2 = _b.y2;
            x1.baseVal.value = a.x;
            y1.baseVal.value = a.y;
            x2.baseVal.value = b.x;
            y2.baseVal.value = b.y;
        }
        headerUpdater.immediate();
        lastTime = position;
    };
    lifecycle.own(position.catchupAndSubscribe(observer));
    lifecycle.own(tracks.subscribeAnyChange(headerUpdater.request));
    return (<svg classList="tape" viewBox="0 0 208 112" width={208} height={112}>
            {reels.map(function (reel) { return (<lib_jsx_1.Frag>
                    <circle cx={reel.x} cy={reel.y} r={(rEmpty + rFull) >> 1} fill="none" stroke="hsl(200, 9%, 20%)" stroke-width={rFull - rEmpty}/>
                    <circle cx={reel.x} cy={reel.y} r={rEmpty - 1} fill="none" stroke={studio_enums_1.Colors.blue}/>
                </lib_jsx_1.Frag>); })}
            {reelElements}
            {reelHubs}
            {pins.map(function (_a) {
        var x = _a.x, y = _a.y, r = _a.r;
        return (<circle cx={x} cy={y} r={r} fill="none" stroke={stroke}/>);
    })}
            {head}
            {tape}
        </svg>);
};
exports.Tape = Tape;
