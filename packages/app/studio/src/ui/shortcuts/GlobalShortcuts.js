"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalShortcuts = exports.GlobalShortcutsFactory = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var CommonShortcuts_1 = require("@/ui/shortcuts/CommonShortcuts");
var shift = true;
var ctrl = true;
exports.GlobalShortcutsFactory = lib_dom_1.ShortcutValidator.validate(__assign(__assign({ "project-undo": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyZ, { ctrl: ctrl }),
        description: "Undo last action"
    }, "project-redo": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyZ, { ctrl: ctrl, shift: shift }),
        description: "Redo last action"
    }, "project-open": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyO, { ctrl: ctrl }),
        description: "Open project from local storage"
    }, "project-save": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyS, { ctrl: ctrl }),
        description: "Save project to local storage"
    }, "project-save-as": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyS, { ctrl: ctrl, shift: shift }),
        description: "Save project as new file"
    } }, CommonShortcuts_1.CommonShortcuts.Position), { "toggle-playback": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Space),
        description: "Start or pause playback"
    }, "stop-playback": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Period),
        description: "Stop playback"
    }, "start-recording": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyR),
        description: "Start recording"
    }, "restart-recording": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyR, { ctrl: ctrl }),
        description: "Restart recording (deletes recordings and starts over)"
    }, "start-recording-direct": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyR, { shift: shift }),
        description: "Start reocrding without count-in"
    }, "toggle-software-keyboard": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyK, { ctrl: ctrl }),
        description: "Show or hide software keyboard"
    }, "toggle-device-panel": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyD, { shift: shift }),
        description: "Show or hide device panel"
    }, "toggle-content-editor-panel": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyE, { shift: shift }),
        description: "Show or hide content editor"
    }, "toggle-browser-panel": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyB, { shift: shift }),
        description: "Show or hide browser panel"
    }, "toggle-tempo-track": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyT, { shift: shift }),
        description: "Show or hide tempo track"
    }, "toggle-markers-track": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyM, { shift: shift }),
        description: "Show or hide markers track"
    }, "toggle-signature-track": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyS, { shift: shift }),
        description: "Show or hide signature track"
    }, "toggle-clips": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyC, { shift: shift }),
        description: "Show or hide clips"
    }, "toggle-follow-cursor": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyF, { shift: shift }),
        description: "Toggle follow playhead"
    }, "toggle-metronome": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyM, { ctrl: ctrl }),
        description: "Toggle metronome"
    }, "toggle-loop": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyL, { shift: shift }),
        description: "Toggle loop mode"
    }, "copy-device": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyD, { ctrl: ctrl }),
        description: "Duplicate selected device"
    }, "workspace-next-screen": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Tab),
        description: "Switch to next screen"
    }, "workspace-prev-screen": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Tab, { shift: shift }),
        description: "Switch to previous screen"
    }, "workspace-screen-dashboard": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Digit0, { shift: shift }),
        description: "Go to dashboard"
    }, "workspace-screen-default": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Digit1, { shift: shift }),
        description: "Go to arrangement view"
    }, "workspace-screen-mixer": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Digit2, { shift: shift }),
        description: "Go to mixer view"
    }, "workspace-screen-piano": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Digit3, { shift: shift }),
        description: "Go to piano roll"
    }, "workspace-screen-project": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Digit4, { shift: shift }),
        description: "Go to project settings"
    }, "workspace-screen-shadertoy": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Digit5, { shift: shift }),
        description: "Go to shader visualizer"
    }, "workspace-screen-meter": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Digit6, { shift: shift }),
        description: "Go to meter view"
    }, "show-preferences": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Comma, { ctrl: ctrl }),
        description: "Open preferences"
    } }));
exports.GlobalShortcuts = lib_dom_1.ShortcutDefinitions.copy(exports.GlobalShortcutsFactory);
