"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuxSend = void 0;
var AuxSend_sass_inline_1 = require("./AuxSend.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var Knob_tsx_1 = require("@/ui/components/Knob.tsx");
var RelativeUnitValueDragging_tsx_1 = require("@/ui/wrapper/RelativeUnitValueDragging.tsx");
var studio_core_1 = require("@opendaw/studio-core");
var MenuButton_tsx_1 = require("@/ui/components/MenuButton.tsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var configs_ts_1 = require("@/ui/configs.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(AuxSend_sass_inline_1.default, "AuxSend");
var AuxSend = function (_a) {
    var lifecycle = _a.lifecycle, editing = _a.editing, adapter = _a.adapter;
    var tooltip = lib_jsx_1.Inject.attribute(adapter.targetBus.labelField.getValue());
    lifecycle.own(adapter.targetBus.labelField.subscribe(function (owner) { return tooltip.value = owner.getValue(); }));
    var symbol = lifecycle.own(new lib_std_1.DefaultObservableValue(studio_enums_1.IconSymbol.Rectangle));
    var iconCartridge = (<Icon_tsx_1.IconCartridge lifecycle={lifecycle} symbol={symbol} style={{ fontSize: "1.25em" }}/>);
    lifecycle.own(adapter.catchupAndSubscribeBusChanges(function (adapter) {
        adapter.match({
            none: function () {
                tooltip.value = "No Target";
                iconCartridge.style.color = studio_enums_1.Colors.red.toString();
                symbol.setValue(studio_enums_1.IconSymbol.NoAudio);
            },
            some: function (adapter) {
                tooltip.value = adapter.labelField.getValue();
                iconCartridge.style.color = adapter.colorField.getValue();
                symbol.setValue(adapter.iconSymbol);
            }
        });
    }));
    return (<div className={className}>
            <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={adapter.sendPan} options={configs_ts_1.SnapCenter}>
                <Knob_tsx_1.Knob lifecycle={lifecycle} value={adapter.sendPan} anchor={0.5} color={studio_enums_1.Colors.green} design={Knob_tsx_1.TinyDesign}/>
            </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
            <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={adapter.sendGain}>
                <Knob_tsx_1.Knob lifecycle={lifecycle} value={adapter.sendGain} anchor={0.0} color={studio_enums_1.Colors.yellow} design={Knob_tsx_1.TinyDesign}/>
            </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
            <MenuButton_tsx_1.MenuButton root={studio_core_1.MenuItem.root().setRuntimeChildrenProcedure(function (parent) { return parent
            .addMenuItem(studio_core_1.MenuItem.default({ label: "Routing" })
            .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Post Pan" }), studio_core_1.MenuItem.default({ label: "Post Fader" }), studio_core_1.MenuItem.default({ label: "Pre Fader", checked: true })); }))
            .addMenuItem(studio_core_1.MenuItem.default({ label: "Remove Send '".concat(adapter.targetBus.labelField.getValue(), "'") })
            .setTriggerProcedure(function () { return editing.modify(function () { return adapter.delete(); }); })); })} style={{ flex: "0 1 auto" }} pointer>
                {iconCartridge}
            </MenuButton_tsx_1.MenuButton>
        </div>);
};
exports.AuxSend = AuxSend;
