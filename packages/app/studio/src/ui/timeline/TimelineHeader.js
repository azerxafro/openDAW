"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineHeader = void 0;
var TimelineHeader_sass_inline_1 = require("./TimelineHeader.sass?inline");
var SnapSelector_tsx_1 = require("@/ui/timeline/SnapSelector.tsx");
var FlexSpacer_tsx_1 = require("@/ui/components/FlexSpacer.tsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var Checkbox_tsx_1 = require("@/ui/components/Checkbox.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
var MenuButton_1 = require("@/ui/components/MenuButton");
var studio_core_1 = require("@opendaw/studio-core");
var GlobalShortcuts_1 = require("@/ui/shortcuts/GlobalShortcuts");
var ShortcutTooltip_1 = require("@/ui/shortcuts/ShortcutTooltip");
var className = lib_dom_1.Html.adoptStyleSheet(TimelineHeader_sass_inline_1.default, "TimelineHeader");
var TimelineHeader = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var _b = service.timeline, snapping = _b.snapping, followCursor = _b.followCursor, _c = _b.primaryVisibility, markers = _c.markers, tempo = _c.tempo, signature = _c.signature, clips = _b.clips;
    return (<div className={className}>
            <SnapSelector_tsx_1.SnapSelector lifecycle={lifecycle} snapping={snapping}/>
            <FlexSpacer_tsx_1.FlexSpacer />
            <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={followCursor} appearance={{
            color: studio_enums_1.Colors.shadow,
            activeColor: studio_enums_1.Colors.orange,
            tooltip: ShortcutTooltip_1.ShortcutTooltip.create("Follow Cursor", GlobalShortcuts_1.GlobalShortcuts["toggle-follow-cursor"].shortcut)
        }}>
                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Run}/>
            </Checkbox_tsx_1.Checkbox>
            <MenuButton_1.MenuButton style={{ paddingLeft: "3px" }} appearance={{ color: studio_enums_1.Colors.orange, tinyTriangle: true, tooltip: "Primary Tracks" }} root={studio_core_1.MenuItem.root().setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.header({
            label: "Primarily Tracks",
            icon: studio_enums_1.IconSymbol.Primary,
            color: studio_enums_1.Colors.orange
        }), studio_core_1.MenuItem.default({
            label: "Markers",
            checked: markers.getValue(),
            shortcut: GlobalShortcuts_1.GlobalShortcuts["toggle-markers-track"].shortcut.format()
        }).setTriggerProcedure(function () { return markers.setValue(!markers.getValue()); }), studio_core_1.MenuItem.default({
            label: "Tempo",
            checked: tempo.getValue(),
            shortcut: GlobalShortcuts_1.GlobalShortcuts["toggle-tempo-track"].shortcut.format()
        }).setTriggerProcedure(function () { return tempo.setValue(!tempo.getValue()); }), studio_core_1.MenuItem.default({
            label: "Signature",
            checked: signature.getValue(),
            shortcut: GlobalShortcuts_1.GlobalShortcuts["toggle-signature-track"].shortcut.format()
        }).setTriggerProcedure(function () { return signature.setValue(!signature.getValue()); })); })}>
                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Primary}/>
            </MenuButton_1.MenuButton>
            <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={clips.visible} appearance={{
            activeColor: studio_enums_1.Colors.yellow,
            tooltip: ShortcutTooltip_1.ShortcutTooltip.create("Clips", GlobalShortcuts_1.GlobalShortcuts["toggle-clips"].shortcut)
        }}>
                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Clips}/>
            </Checkbox_tsx_1.Checkbox>
        </div>);
};
exports.TimelineHeader = TimelineHeader;
