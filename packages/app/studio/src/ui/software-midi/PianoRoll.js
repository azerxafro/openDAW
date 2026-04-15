"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PianoRoll = void 0;
var PianoRoll_sass_inline_1 = require("./PianoRoll.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var SoftwareMIDIShortcuts_1 = require("@/ui/shortcuts/SoftwareMIDIShortcuts");
var className = lib_dom_1.Html.adoptStyleSheet(PianoRoll_sass_inline_1.default, "PianoRoll");
var PianoRoll = function (_a) {
    var lifecycle = _a.lifecycle, pianoLayout = _a.pianoLayout;
    var _b = pianoLayout.sizes, whiteKeys = _b.whiteKeys, blackKeys = _b.blackKeys;
    var fontSize = "8px";
    return (<svg classList={className} viewBox={"0.5 0 ".concat(pianoLayout.whiteKeys.length * whiteKeys.width - 1, " ").concat((whiteKeys.height))} width="320px">
            {pianoLayout.whiteKeys.map(function (_a) {
            var key = _a.key, x = _a.x;
            var noteShortcut = SoftwareMIDIShortcuts_1.NoteShortcuts[key];
            return (<lib_jsx_1.Frag>
                        <rect classList="white" data-key={key} x={x + 0.5} y={0} rx={1} ry={1} width={whiteKeys.width - 1} height={whiteKeys.height}/>
                        <text x={(x + whiteKeys.width / 2).toString()} y={(whiteKeys.height - 6).toString()} fill="black" font-size={fontSize} text-anchor="middle" dominant-baseline="alphabetic" onInit={function (element) { return lifecycle.own(noteShortcut.shortcut.subscribe(function () {
                    return element.textContent = noteShortcut.shortcut.format().join("");
                })); }}>
                            {noteShortcut.shortcut.format()}
                        </text>
                    </lib_jsx_1.Frag>);
        })}
            {pianoLayout.blackKeys.map(function (_a) {
            var key = _a.key, x = _a.x;
            var noteShortcut = SoftwareMIDIShortcuts_1.NoteShortcuts[key];
            return (<lib_jsx_1.Frag>
                        <rect classList="black" data-key={key} x={x} y={-2} rx={1} ry={1} width={blackKeys.width} height={blackKeys.height}/>
                        <text x={(x + blackKeys.width / 2).toString()} y={(blackKeys.height - 6).toString()} fill="white" font-size={fontSize} text-anchor="middle" dominant-baseline="alphabetic" onInit={function (element) { return lifecycle.own(noteShortcut.shortcut.subscribe(function () {
                    return element.textContent = noteShortcut.shortcut.format().join("");
                })); }}>
                            {noteShortcut.shortcut.format()}
                        </text>
                    </lib_jsx_1.Frag>);
        })}
        </svg>);
};
exports.PianoRoll = PianoRoll;
