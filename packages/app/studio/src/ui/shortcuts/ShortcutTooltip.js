"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortcutTooltip = void 0;
var ShortcutTooltip;
(function (ShortcutTooltip) {
    ShortcutTooltip.create = function (label, shortcut) {
        return "".concat(label, " (").concat(shortcut.format().join(""), ")");
    };
})(ShortcutTooltip || (exports.ShortcutTooltip = ShortcutTooltip = {}));
