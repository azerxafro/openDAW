"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelOutputSelector = void 0;
var OutputSelector_sass_inline_1 = require("./OutputSelector.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var dialogs_1 = require("@/ui/dialogs");
var MenuButton_1 = require("@/ui/components/MenuButton");
var className = lib_dom_1.Html.adoptStyleSheet(OutputSelector_sass_inline_1.default, "OutputSelector");
var ChannelOutputSelector = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, adapter = _a.adapter;
    var label = (<div className="label"/>);
    var symbol = lifecycle.own(new lib_std_1.DefaultObservableValue(studio_enums_1.IconSymbol.NoAudio));
    var iconCartridge = (<Icon_tsx_1.IconCartridge lifecycle={lifecycle} symbol={symbol} style={{ fontSize: "1.25em", color: studio_enums_1.Colors.red.toString() }}/>);
    lifecycle.own(adapter.output.catchupAndSubscribe(function (adapter) {
        adapter.match({
            none: function () {
                label.textContent = "No Output";
                iconCartridge.style.color = studio_enums_1.Colors.red.toString();
                symbol.setValue(studio_enums_1.IconSymbol.NoAudio);
            },
            some: function (adapter) {
                var color = adapter.colorField.getValue();
                label.textContent = adapter.labelField.getValue();
                label.style.color = color;
                iconCartridge.style.color = color;
                symbol.setValue(studio_enums_1.IconSymbol.fromName(adapter.iconField.getValue()));
            }
        });
    }));
    return (<div className={className}>
            <MenuButton_1.MenuButton root={studio_core_1.MenuItem.root()
            .setRuntimeChildrenProcedure(function (parent) {
            var _a, _b, _c, _d;
            var inputUUID = (_b = (_a = adapter.input.adapter().unwrapOrNull()) === null || _a === void 0 ? void 0 : _a.uuid) !== null && _b !== void 0 ? _b : lib_std_1.UUID.Lowest;
            var outputUUID = (_d = (_c = adapter.output.adapter.unwrapOrNull()) === null || _c === void 0 ? void 0 : _c.uuid) !== null && _d !== void 0 ? _d : lib_std_1.UUID.Lowest;
            parent
                .addMenuItem.apply(parent, project.rootBoxAdapter.audioBusses.adapters()
                .toSorted(function (a, b) { return (0, lib_std_1.StringComparator)(a.labelField.getValue(), b.labelField.getValue()); })
                .map(function (bus) { return studio_core_1.MenuItem.default({
                label: bus.labelField.getValue(),
                icon: bus.deviceHost().audioUnitBoxAdapter().input.icon,
                selectable: lib_std_1.UUID.Comparator(bus.uuid, inputUUID) !== 0,
                checked: lib_std_1.UUID.Comparator(bus.uuid, outputUUID) === 0
            }).setTriggerProcedure(function () {
                return project.editing.modify(function () { return adapter.box.output.refer(bus.box.input); });
            }); })).addMenuItem(studio_core_1.MenuItem.default({
                label: "New Output Bus...",
                icon: studio_enums_1.IconSymbol.New,
                separatorBefore: true
            }).setTriggerProcedure(function () {
                return (0, dialogs_1.showNewAudioBusOrAuxDialog)("Bus", function (_a) {
                    var name = _a.name, icon = _a.icon;
                    return project.editing.modify(function () {
                        (0, lib_std_1.assert)(project.primaryAudioBusBox.isAttached(), "primaryAudioBusBox not attached");
                        var audioBusBox = studio_adapters_1.AudioBusFactory.create(project.skeleton, name, icon, studio_enums_1.AudioUnitType.Bus, studio_enums_1.Colors.orange);
                        adapter.box.output.refer(audioBusBox.input);
                    });
                }, studio_enums_1.IconSymbol.AudioBus);
            }), studio_core_1.MenuItem.default({
                label: "No Output",
                selectable: adapter.box.output.nonEmpty()
            }).setTriggerProcedure(function () { return project.editing.modify(function () { return adapter.box.output.defer(); }); }));
        })} appearance={{ color: studio_enums_1.Colors.dark }} stretch={true}>
                <lib_jsx_1.Frag>
                    {label}
                    {iconCartridge}
                </lib_jsx_1.Frag>
            </MenuButton_1.MenuButton>
        </div>);
};
exports.ChannelOutputSelector = ChannelOutputSelector;
