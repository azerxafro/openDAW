"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteShortcuts = exports.SoftwareMIDIShortcuts = exports.SoftwareMIDIShortcutsFactory = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
exports.SoftwareMIDIShortcutsFactory = lib_dom_1.ShortcutValidator.validate({
    "increment-octave": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.ArrowUp),
        description: "Increase octave"
    },
    "decrement-octave": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.ArrowDown),
        description: "Decrease octave"
    },
    "play-note-0": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyA),
        description: "Play C"
    },
    "play-note-1": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyW),
        description: "Play C#"
    },
    "play-note-2": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyS),
        description: "Play D"
    },
    "play-note-3": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyE),
        description: "Play D#"
    },
    "play-note-4": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyD),
        description: "Play E"
    },
    "play-note-5": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyF),
        description: "Play F"
    },
    "play-note-6": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyT),
        description: "Play F#"
    },
    "play-note-7": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyG),
        description: "Play G"
    },
    "play-note-8": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyY),
        description: "Play G#"
    },
    "play-note-9": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyH),
        description: "Play A"
    },
    "play-note-10": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyU),
        description: "Play A#"
    },
    "play-note-11": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyJ),
        description: "Play B"
    },
    "play-note-12": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyK),
        description: "Play C (next octave)"
    },
    "play-note-13": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyO),
        description: "Play C# (next octave)"
    },
    "play-note-14": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyL),
        description: "Play D (next octave)"
    },
    "play-note-15": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyP),
        description: "Play D# (next octave)"
    },
    "play-note-16": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Semicolon),
        description: "Play E (next octave)"
    },
    "play-note-17": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Quote),
        description: "Play F (next octave)"
    }
});
exports.SoftwareMIDIShortcuts = lib_dom_1.ShortcutDefinitions.copy(exports.SoftwareMIDIShortcutsFactory);
exports.NoteShortcuts = [
    exports.SoftwareMIDIShortcuts["play-note-0"],
    exports.SoftwareMIDIShortcuts["play-note-1"],
    exports.SoftwareMIDIShortcuts["play-note-2"],
    exports.SoftwareMIDIShortcuts["play-note-3"],
    exports.SoftwareMIDIShortcuts["play-note-4"],
    exports.SoftwareMIDIShortcuts["play-note-5"],
    exports.SoftwareMIDIShortcuts["play-note-6"],
    exports.SoftwareMIDIShortcuts["play-note-7"],
    exports.SoftwareMIDIShortcuts["play-note-8"],
    exports.SoftwareMIDIShortcuts["play-note-9"],
    exports.SoftwareMIDIShortcuts["play-note-10"],
    exports.SoftwareMIDIShortcuts["play-note-11"],
    exports.SoftwareMIDIShortcuts["play-note-12"],
    exports.SoftwareMIDIShortcuts["play-note-13"],
    exports.SoftwareMIDIShortcuts["play-note-14"],
    exports.SoftwareMIDIShortcuts["play-note-15"],
    exports.SoftwareMIDIShortcuts["play-note-16"],
    exports.SoftwareMIDIShortcuts["play-note-17"]
];
