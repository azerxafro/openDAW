"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuCapture = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var lib_std_1 = require("@opendaw/lib-std");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var studio_enums_1 = require("@opendaw/studio-enums");
var MenuCapture;
(function (MenuCapture) {
    MenuCapture.createItem = function (service, audioUnitBoxAdapter, trackBoxAdapter, editing, captureOption) { return studio_core_1.MenuItem.default({
        label: audioUnitBoxAdapter.captureBox
            .mapOr(function (box) { return (0, lib_std_1.isInstanceOf)(box, studio_boxes_1.CaptureAudioBox) ? "Capture Audio" : "Capture MIDI"; }, ""),
        hidden: trackBoxAdapter.indexField.getValue() !== 0 || captureOption.isEmpty(),
        separatorBefore: true
    }).setRuntimeChildrenProcedure(function (parent) {
        if (captureOption.isEmpty()) {
            return;
        }
        var capture = captureOption.unwrap();
        if ((0, lib_std_1.isInstanceOf)(capture, studio_core_1.CaptureAudio)) {
            parent.addMenuItem(studio_core_1.MenuItem.header({
                label: "Audio Inputs",
                icon: studio_enums_1.IconSymbol.AudioDevice,
                selectable: !studio_core_1.Recording.isRecording
            }));
            var devices = studio_core_1.AudioDevices.inputs;
            if (devices.length === 0) {
                parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Click to access external devices..." })
                    .setTriggerProcedure(function () { return studio_core_1.AudioDevices.requestPermission(); }));
            }
            else {
                parent.addMenuItem.apply(parent, devices
                    .map(function (device) { return studio_core_1.MenuItem.default({
                    label: device.label,
                    checked: capture.streamDeviceId.contains(device.deviceId),
                    selectable: !studio_core_1.Recording.isRecording
                }).setTriggerProcedure(function () {
                    editing.modify(function () {
                        return capture.deviceId.setValue(lib_std_1.Option.wrap(device.deviceId));
                    }, false);
                    capture.armed.setValue(true);
                }); }));
            }
        }
        else if ((0, lib_std_1.isInstanceOf)(capture, studio_core_1.CaptureMidi)) {
            var currentDeviceId_1 = capture.deviceId;
            var channelField_1 = capture.captureBox.channel;
            var createFilteredItem_1 = function (deviceId, channel, label, checked, openSoftwareKeyboard) {
                if (openSoftwareKeyboard === void 0) { openSoftwareKeyboard = false; }
                return studio_core_1.MenuItem.default({ label: label, checked: checked })
                    .setTriggerProcedure(function () {
                    editing.modify(function () {
                        currentDeviceId_1.setValue(deviceId);
                        channelField_1.setValue(channel.unwrapOrElse(-1));
                    }, false);
                    capture.armed.setValue(true);
                    if (openSoftwareKeyboard) {
                        if (!service.isSoftwareKeyboardVisible()) {
                            service.toggleSoftwareKeyboard();
                        }
                    }
                });
            };
            var createMIDIInputMenuItem_1 = function (device, index, openSoftwareKeyboard) {
                var _a;
                if (openSoftwareKeyboard === void 0) { openSoftwareKeyboard = false; }
                var optDeviceId = lib_std_1.Option.wrap(device.id);
                var sameDevice = currentDeviceId_1.getValue().equals(optDeviceId);
                return studio_core_1.MenuItem.default({
                    label: (_a = device.name) !== null && _a !== void 0 ? _a : "Unknown", checked: sameDevice, separatorBefore: index === 0
                }).setRuntimeChildrenProcedure(function (parent) {
                    parent.addMenuItem.apply(parent, __spreadArray([createFilteredItem_1(optDeviceId, lib_std_1.Option.None, "All channels", channelField_1.getValue() === -1 && sameDevice, openSoftwareKeyboard)], lib_std_1.Arrays.create(function (channel) {
                        return createFilteredItem_1(optDeviceId, lib_std_1.Option.wrap(channel), "Channel ".concat(channel + 1), channelField_1.getValue() === channel && sameDevice, openSoftwareKeyboard);
                    }, 16), false));
                });
            };
            parent.addMenuItem(studio_core_1.MenuItem.header({ label: "Devices", icon: studio_enums_1.IconSymbol.Midi }));
            studio_core_1.MidiDevices.externalInputDevices().match({
                none: function () {
                    parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Click to access external devices..." })
                        .setTriggerProcedure(function () { return studio_core_1.MidiDevices.requestPermission(); }), createMIDIInputMenuItem_1(studio_core_1.MidiDevices.softwareMIDIInput, 0, true));
                },
                some: function (inputs) {
                    if (inputs.length === 0) {
                        parent.addMenuItem(studio_core_1.MenuItem.default({ label: "No external devices found", selectable: false }), createMIDIInputMenuItem_1(studio_core_1.MidiDevices.softwareMIDIInput, 0, true));
                    }
                    else {
                        parent.addMenuItem.apply(parent, __spreadArray([studio_core_1.MenuItem.default({
                                label: "All devices",
                                checked: currentDeviceId_1.getValue().isEmpty() && channelField_1.getValue() === -1
                            }).setRuntimeChildrenProcedure(function (parent) {
                                var hasNoDevice = currentDeviceId_1.getValue().isEmpty();
                                parent.addMenuItem.apply(parent, __spreadArray([createFilteredItem_1(lib_std_1.Option.None, lib_std_1.Option.None, "All channels", channelField_1.getValue() === -1 && hasNoDevice)], lib_std_1.Arrays.create(function (channel) {
                                    return createFilteredItem_1(lib_std_1.Option.None, lib_std_1.Option.wrap(channel), "Channel ".concat(channel + 1), channelField_1.getValue() === channel && hasNoDevice);
                                }, 16), false));
                            })], inputs.map(function (input, index) { return createMIDIInputMenuItem_1(input, index, false); }), false));
                    }
                }
            });
        }
    }); };
})(MenuCapture || (exports.MenuCapture = MenuCapture = {}));
