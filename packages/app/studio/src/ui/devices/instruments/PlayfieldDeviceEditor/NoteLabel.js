"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteLabel = void 0;
var NoteLabel_sass_inline_1 = require("./NoteLabel.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var className = lib_dom_1.Html.adoptStyleSheet(NoteLabel_sass_inline_1.default, "NoteLabel");
var NoteLabel = function (_a) {
    var lifecycle = _a.lifecycle, octave = _a.octave, semitone = _a.semitone;
    var label = (<div className={className}/>);
    lifecycle.own(octave.catchupAndSubscribe(function (owner) {
        return label.textContent = lib_dsp_1.MidiKeys.toFullString(owner.getValue() * 12 + semitone);
    }));
    return label;
};
exports.NoteLabel = NoteLabel;
