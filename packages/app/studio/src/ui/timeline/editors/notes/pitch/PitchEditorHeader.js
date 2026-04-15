"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PitchEditorHeader = void 0;
var PitchEditorHeader_sass_inline_1 = require("./PitchEditorHeader.sass?inline");
var ScaleSelector_tsx_1 = require("@/ui/timeline/editors/notes/pitch/ScaleSelector.tsx");
var ScaleConfigurator_tsx_1 = require("@/ui/timeline/editors/notes/pitch/ScaleConfigurator.tsx");
var MenuButton_tsx_1 = require("@/ui/components/MenuButton.tsx");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var PropertyTable_tsx_1 = require("@/ui/timeline/editors/notes/property/PropertyTable.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(PitchEditorHeader_sass_inline_1.default, "PitchEditorHeader");
var PitchEditorHeader = function (_a) {
    var lifecycle = _a.lifecycle, editing = _a.editing, modifyContext = _a.modifyContext, selection = _a.selection, scale = _a.scale;
    return (<div className={className}>
            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Note} className="label"/>
            <div className="row">
                <ScaleSelector_tsx_1.ScaleSelector lifecycle={lifecycle} scale={scale}/>
                <ScaleConfigurator_tsx_1.ScaleConfigurator lifecycle={lifecycle} scale={scale}/>
                <MenuButton_tsx_1.MenuButton root={studio_core_1.MenuItem.root()
            .setRuntimeChildrenProcedure(function (parent) {
            var _a;
            return (_a = parent
                .addMenuItem(studio_core_1.MenuItem.default({ label: "No Scale", checked: scale.isEmpty() })
                .setTriggerProcedure(function () { return scale.reset(); }))
                .addMenuItem(studio_core_1.MenuItem.default({ label: "From Selection", selectable: !selection.isEmpty() })
                .setTriggerProcedure(function () {
                return scale.setBits(selection.selected().reduce(function (bits, event) { return bits | 1 << (event.pitch % 12); }, 0));
            })))
                .addMenuItem.apply(_a, lib_dsp_1.MidiKeys.StockScales.map(function (predefinedScale, index) {
                return studio_core_1.MenuItem.default({
                    label: predefinedScale.name,
                    checked: predefinedScale.equals(scale),
                    separatorBefore: index === 0
                }).setTriggerProcedure(function () { return scale.setScale(predefinedScale); });
            }));
        })} style={{ minWidth: "0" }} appearance={{ color: studio_enums_1.Colors.dark }} horizontal="right">
                    <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.FileList}/>
                </MenuButton_tsx_1.MenuButton>
            </div>
            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Table} className="label"/>
            <PropertyTable_tsx_1.PropertyTable lifecycle={lifecycle} selection={selection} editing={editing} modifyContext={modifyContext}/>
        </div>);
};
exports.PitchEditorHeader = PitchEditorHeader;
