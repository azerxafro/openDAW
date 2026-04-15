"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuxSendGroup = void 0;
var AuxSendGroup_sass_inline_1 = require("./AuxSendGroup.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_enums_1 = require("@opendaw/studio-enums");
var AuxSend_tsx_1 = require("@/ui/mixer/AuxSend.tsx");
var studio_core_1 = require("@opendaw/studio-core");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var MenuButton_tsx_1 = require("@/ui/components/MenuButton.tsx");
var Icon_1 = require("../components/Icon");
var dialogs_tsx_1 = require("@/ui/dialogs.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(AuxSendGroup_sass_inline_1.default, "AuxSendGroup");
var AuxSendGroup = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, audioUnitAdapter = _a.audioUnitAdapter;
    var canHaveAuxSends = !audioUnitAdapter.isOutput;
    var groupElement = <div className={className}/>;
    if (!canHaveAuxSends) {
        return groupElement;
    }
    groupElement.classList.add("enabled");
    groupElement.appendChild(<MenuButton_tsx_1.MenuButton root={studio_core_1.MenuItem.root().setRuntimeChildrenProcedure(function (parent) {
            var currentAuxSends = audioUnitAdapter.auxSends.adapters();
            var availableSends = project.rootBoxAdapter.audioBusses.adapters()
                .toSorted(function (a, b) { return (0, lib_std_1.StringComparator)(a.labelField.getValue(), b.labelField.getValue()); })
                .filter(function (auxSendAdapter) { return !auxSendAdapter.deviceHost().audioUnitBoxAdapter().isOutput; })
                .map(function (auxSendAdapter) { return studio_core_1.MenuItem.default({
                label: auxSendAdapter.labelField.getValue(),
                icon: auxSendAdapter.deviceHost().audioUnitBoxAdapter().input.icon,
                selectable: !currentAuxSends.some(function (send) { return send.targetBus.box.address.equals(auxSendAdapter.address); })
            }).setTriggerProcedure(function () { return project.editing.modify(function () {
                studio_boxes_1.AuxSendBox.create(project.boxGraph, lib_std_1.UUID.generate(), function (box) {
                    box.audioUnit.refer(audioUnitAdapter.box.auxSends);
                    box.routing.setValue(0);
                    box.sendGain.setValue(-6.0);
                    box.targetBus.refer(auxSendAdapter.box.input);
                    box.index.setValue(currentAuxSends.length);
                });
            }, true); }); });
            parent
                .addMenuItem.apply(parent, availableSends).addMenuItem(studio_core_1.MenuItem.default({
                label: "New FX Bus...",
                icon: studio_enums_1.IconSymbol.New,
                separatorBefore: availableSends.length > 0
            })
                .setTriggerProcedure(function () { return (0, dialogs_tsx_1.showNewAudioBusOrAuxDialog)("FX", function (_a) {
                var name = _a.name, icon = _a.icon;
                var currentAuxSends = audioUnitAdapter.auxSends.adapters();
                project.editing.modify(function () {
                    var audioBusBox = studio_adapters_1.AudioBusFactory.create(project.skeleton, name, icon, studio_enums_1.AudioUnitType.Aux, studio_enums_1.Colors.green);
                    studio_boxes_1.AuxSendBox.create(project.boxGraph, lib_std_1.UUID.generate(), function (box) {
                        box.audioUnit.refer(audioUnitAdapter.box.auxSends);
                        box.targetBus.refer(audioBusBox.input);
                        box.routing.setValue(0);
                        box.sendGain.setValue(-6.0);
                        box.index.setValue(currentAuxSends.length);
                    });
                });
            }, studio_enums_1.IconSymbol.Effects); }));
        })} style={{
            position: "absolute",
            bottom: "0.25em",
            left: "50%",
            transform: "translate(-50%, 0)",
            fontSize: "0.66em"
        }} appearance={{ color: studio_enums_1.Colors.shadow }} pointer>
            <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Add}/>
        </MenuButton_tsx_1.MenuButton>);
    var entries = lib_std_1.UUID.newSet(function (entry) { return entry.uuid; });
    lifecycle.own(audioUnitAdapter.auxSends.catchupAndSubscribe({
        onAdd: function (adapter) {
            var terminator = lifecycle.spawn();
            var element = <AuxSend_tsx_1.AuxSend lifecycle={terminator} editing={project.editing} adapter={adapter}/>;
            groupElement.appendChild(element);
            entries.add({ element: element, terminator: terminator, uuid: adapter.uuid });
        },
        onRemove: function (adapter) {
            var _a = entries.removeByKey(adapter.uuid), element = _a.element, terminator = _a.terminator;
            element.remove();
            terminator.terminate();
        },
        onReorder: function (_adapter) { }
    }));
    return groupElement;
};
exports.AuxSendGroup = AuxSendGroup;
