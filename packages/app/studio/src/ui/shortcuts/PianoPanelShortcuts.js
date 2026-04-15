"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PianoPanelShortcuts = exports.PianoPanelShortcutsFactory = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
exports.PianoPanelShortcutsFactory = lib_dom_1.ShortcutValidator.validate({
    "position-increment": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.ArrowDown),
        description: "Move playback position forwards"
    },
    "position-decrement": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.ArrowUp),
        description: "Move playback position backwards"
    }
});
exports.PianoPanelShortcuts = lib_dom_1.ShortcutDefinitions.copy(exports.PianoPanelShortcutsFactory);
