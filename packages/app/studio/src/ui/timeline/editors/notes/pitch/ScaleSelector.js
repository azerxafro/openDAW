"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaleSelector = void 0;
var ScaleSelector_sass_inline_1 = require("./ScaleSelector.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var MenuButton_tsx_1 = require("@/ui/components/MenuButton.tsx");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(ScaleSelector_sass_inline_1.default, "ScaleSelector");
var ScaleSelector = function (_a) {
    var lifecycle = _a.lifecycle, scale = _a.scale;
    var labels = lib_dsp_1.MidiKeys.Names.English;
    var labelName = lib_jsx_1.Inject.value(labels[scale.key]);
    lifecycle.own(scale.subscribe(function () { labelName.value = labels[scale.key]; }));
    return (<div className={className}>
            <MenuButton_tsx_1.MenuButton root={studio_core_1.MenuItem.root().setRuntimeChildrenProcedure(function (parent) {
            parent.addMenuItem.apply(parent, lib_std_1.Arrays.create(function (key) { return studio_core_1.MenuItem.default({
                label: labels[key],
                checked: key === scale.key
            }).setTriggerProcedure(function () { return scale.key = key; }); }, 12));
        })} appearance={{ framed: true, color: studio_enums_1.Colors.dark, activeColor: studio_enums_1.Colors.gray }}>
                <label style={{ padding: "0" }}><span>{labelName}</span></label>
            </MenuButton_tsx_1.MenuButton>
        </div>);
};
exports.ScaleSelector = ScaleSelector;
