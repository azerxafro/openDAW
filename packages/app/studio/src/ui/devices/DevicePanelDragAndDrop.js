"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicePanelDragAndDrop = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var DragAndDrop_1 = require("@/ui/DragAndDrop");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var InsertMarker_1 = require("@/ui/components/InsertMarker");
var studio_core_1 = require("@opendaw/studio-core");
var lib_box_1 = require("@opendaw/lib-box");
var DevicePanelDragAndDrop;
(function (DevicePanelDragAndDrop) {
    DevicePanelDragAndDrop.install = function (project, editors, midiEffectsContainer, instrumentContainer, audioEffectsContainer) {
        var insertMarker = (0, InsertMarker_1.InsertMarker)();
        var editing = project.editing, boxAdapters = project.boxAdapters, userEditingManager = project.userEditingManager;
        return DragAndDrop_1.DragAndDrop.installTarget(editors, {
            drag: function (event, dragData) {
                instrumentContainer.style.opacity = "1.0";
                var editingDeviceChain = userEditingManager.audioUnit.get();
                if (editingDeviceChain.isEmpty()) {
                    return false;
                }
                var deviceHost = boxAdapters.adapterFor(editingDeviceChain.unwrap().box, studio_adapters_1.Devices.isHost);
                var type = dragData.type;
                var container;
                if (type === "audio-effect") {
                    container = audioEffectsContainer;
                }
                else if (type === "midi-effect") {
                    if (deviceHost.inputAdapter.mapOr(function (input) { return input.accepts !== "midi"; }, true)) {
                        return false;
                    }
                    container = midiEffectsContainer;
                }
                else if (type === "instrument" && deviceHost.isAudioUnit) {
                    if (deviceHost.inputAdapter.mapOr(function (input) { return input instanceof studio_adapters_1.AudioBusBoxAdapter; }, false)) {
                        return false;
                    }
                    instrumentContainer.style.opacity = "0.5";
                    return true;
                }
                else {
                    return false;
                }
                var _a = DragAndDrop_1.DragAndDrop.findInsertLocation(event, container), index = _a[0], successor = _a[1];
                if (dragData.start_index === null) {
                    container.insertBefore(insertMarker, successor);
                }
                else {
                    var delta = index - dragData.start_index;
                    if (delta < 0 || delta > 1) {
                        container.insertBefore(insertMarker, successor);
                    }
                    else if (insertMarker.isConnected) {
                        insertMarker.remove();
                    }
                }
                return true;
            },
            drop: function (event, dragData) {
                var _a;
                instrumentContainer.style.opacity = "1.0";
                if (insertMarker.isConnected) {
                    insertMarker.remove();
                }
                var type = dragData.type;
                if (type !== "midi-effect" && type !== "audio-effect" && type !== "instrument") {
                    return;
                }
                var editingDeviceChain = userEditingManager.audioUnit.get();
                if (editingDeviceChain.isEmpty()) {
                    return;
                }
                var deviceHost = boxAdapters.adapterFor(editingDeviceChain.unwrap("editingDeviceChain isEmpty").box, studio_adapters_1.Devices.isHost);
                if (type === "instrument" && deviceHost instanceof studio_adapters_1.AudioUnitBoxAdapter) {
                    var inputBox_1 = (_a = deviceHost.inputField.pointerHub.incoming().at(0)) === null || _a === void 0 ? void 0 : _a.box;
                    if (inputBox_1 === undefined) {
                        console.warn("No instrument to replace");
                        return;
                    }
                    var namedElement = studio_adapters_1.InstrumentFactories.Named[dragData.device];
                    var factory_1 = (0, lib_std_1.asDefined)(namedElement, "Unknown: '".concat(dragData.device, "'"));
                    editing.modify(function () {
                        var attempt = project.api.replaceMIDIInstrument(inputBox_1, factory_1);
                        if (attempt.isFailure()) {
                            console.debug(attempt.failureReason());
                        }
                    });
                    return;
                }
                var container;
                var field;
                if (type === "audio-effect") {
                    container = audioEffectsContainer;
                    field = deviceHost.audioEffects.field();
                }
                else if (type === "midi-effect") {
                    container = midiEffectsContainer;
                    field = deviceHost.midiEffects.field();
                }
                else {
                    return (0, lib_std_1.panic)("Unknown type: ".concat(type));
                }
                var index = DragAndDrop_1.DragAndDrop.findInsertLocation(event, container)[0];
                if (dragData.start_index === null) {
                    editing.modify(function () {
                        var factory = studio_core_1.EffectFactories.MergedNamed[dragData.device];
                        project.api.insertEffect(field, factory, index);
                    });
                }
                else {
                    var delta_1 = index - dragData.start_index;
                    if (delta_1 < 0 || delta_1 > 1) { // if delta is zero or one, it has no effect on the order
                        editing.modify(function () { return lib_box_1.IndexedBox.moveIndex(field, dragData.start_index, delta_1); });
                    }
                }
            },
            enter: function () { },
            leave: function () {
                instrumentContainer.style.opacity = "1.0";
                if (insertMarker.isConnected) {
                    insertMarker.remove();
                }
            }
        });
    };
})(DevicePanelDragAndDrop || (exports.DevicePanelDragAndDrop = DevicePanelDragAndDrop = {}));
