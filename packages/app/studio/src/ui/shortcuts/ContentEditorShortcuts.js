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
exports.ContentEditorShortcuts = exports.ContentEditorShortcutsFactory = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var CommonShortcuts_1 = require("@/ui/shortcuts/CommonShortcuts");
exports.ContentEditorShortcutsFactory = lib_dom_1.ShortcutValidator.validate(__assign(__assign(__assign({}, CommonShortcuts_1.CommonShortcuts.Position), CommonShortcuts_1.CommonShortcuts.Selection), { "zoom-to-loop-duration": {
        shortcut: lib_dom_1.Shortcut.of(lib_dom_1.Key.Backslash),
        description: "Zoom to loop duration"
    } }));
exports.ContentEditorShortcuts = lib_dom_1.ShortcutDefinitions.copy(exports.ContentEditorShortcutsFactory);
