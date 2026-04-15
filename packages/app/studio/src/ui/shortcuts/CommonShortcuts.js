"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonShortcuts = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var CommonShortcuts;
(function (CommonShortcuts) {
    var shift = true;
    var ctrl = true;
    CommonShortcuts.Position = {
        "position-increment": {
            shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.ArrowRight),
            description: "Move playback position forwards"
        },
        "position-decrement": {
            shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.ArrowLeft),
            description: "Move playback position backwards"
        }
    };
    CommonShortcuts.Selection = {
        "select-all": {
            shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyA, { ctrl: ctrl }),
            description: "Select all"
        },
        "deselect-all": {
            shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.KeyA, { ctrl: ctrl, shift: shift }),
            description: "Deselect all"
        },
        "delete-selection": {
            shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.DeleteAction),
            description: "Delete selection"
        }
    };
})(CommonShortcuts || (exports.CommonShortcuts = CommonShortcuts = {}));
