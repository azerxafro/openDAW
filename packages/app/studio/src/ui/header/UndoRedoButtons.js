"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndoRedoButtons = void 0;
var UndoRedoButtons_sass_inline_1 = require("./UndoRedoButtons.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var TextTooltip_1 = require("@/ui/surface/TextTooltip");
var ShortcutTooltip_1 = require("@/ui/shortcuts/ShortcutTooltip");
var GlobalShortcuts_1 = require("@/ui/shortcuts/GlobalShortcuts");
var className = lib_dom_1.Html.adoptStyleSheet(UndoRedoButtons_sass_inline_1.default, "UndoRedoButtons");
var UndoRedoButtons = function (_a) {
    var lifecycle = _a.lifecycle, projectProfileService = _a.service.projectProfileService;
    var undoButton = (<Icon_1.Icon symbol={studio_enums_1.IconSymbol.Undo}/>);
    var redoButton = (<Icon_1.Icon symbol={studio_enums_1.IconSymbol.Redo}/>);
    var runtime = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.ownAll(projectProfileService.catchupAndSubscribe(function (optProfile) {
        runtime.terminate();
        if (optProfile.isEmpty()) {
            return;
        }
        var editing = optProfile.unwrap().project.editing;
        var updateState = function () {
            undoButton.classList.toggle("enabled", editing.canUndo());
            redoButton.classList.toggle("enabled", editing.canRedo());
        };
        updateState();
        runtime.ownAll(editing.subscribe(updateState), lib_dom_1.Events.subscribe(undoButton, "click", function () { return editing.undo(); }), lib_dom_1.Events.subscribe(redoButton, "click", function () { return editing.redo(); }), TextTooltip_1.TextTooltip.default(undoButton, function () { return (0, lib_std_1.getOrProvide)(ShortcutTooltip_1.ShortcutTooltip.create("Undo", GlobalShortcuts_1.GlobalShortcuts["project-undo"].shortcut)); }), TextTooltip_1.TextTooltip.default(redoButton, function () { return (0, lib_std_1.getOrProvide)(ShortcutTooltip_1.ShortcutTooltip.create("Redo", GlobalShortcuts_1.GlobalShortcuts["project-redo"].shortcut)); }));
    }));
    return (<div className={className}>
            {undoButton}
            {redoButton}
        </div>);
};
exports.UndoRedoButtons = UndoRedoButtons;
