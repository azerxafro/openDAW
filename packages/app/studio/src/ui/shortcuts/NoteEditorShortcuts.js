"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteEditorShortcuts = exports.NoteEditorShortcutsFactory = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var shift = true;
exports.NoteEditorShortcutsFactory = lib_dom_1.ShortcutValidator.validate({
    "increment-note-semitone": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.ArrowUp),
        description: "Move note up by one semitone"
    },
    "decrement-note-semitone": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.ArrowDown),
        description: "Move note down by one semitone"
    },
    "increment-note-octave": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.ArrowUp, { shift: shift }),
        description: "Move note up by one octave"
    },
    "decrement-note-octave": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.ArrowDown, { shift: shift }),
        description: "Move note down by one octave"
    },
    "increment-note-position": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.ArrowRight),
        description: "Move note forwards"
    },
    "decrement-note-position": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.ArrowLeft),
        description: "Move note backwards"
    },
    "toggle-step-recording": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyS),
        description: "Toggle step recording"
    }
});
exports.NoteEditorShortcuts = lib_dom_1.ShortcutDefinitions.copy(exports.NoteEditorShortcutsFactory);
