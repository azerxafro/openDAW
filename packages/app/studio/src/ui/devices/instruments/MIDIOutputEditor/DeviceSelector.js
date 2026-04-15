"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSelector = void 0;
var DeviceSelector_sass_inline_1 = require("./DeviceSelector.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var MenuButton_1 = require("@/ui/components/MenuButton");
var studio_core_1 = require("@opendaw/studio-core");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var lib_dom_1 = require("@opendaw/lib-dom");
var NumberInput_1 = require("@/ui/components/NumberInput");
var Checkbox_1 = require("@/ui/components/Checkbox");
var Icon_1 = require("@/ui/components/Icon");
var className = lib_dom_1.Html.adoptStyleSheet(DeviceSelector_sass_inline_1.default, "DeviceSelector");
var getOrCreateMIDIOutput = function (rootBox, output) {
    var _a;
    return (_a = rootBox.outputMidiDevices.pointerHub
        .incoming()
        .map(function (_a) {
        var box = _a.box;
        return (0, lib_std_1.asInstanceOf)(box, studio_boxes_1.MIDIOutputBox);
    })
        .find(function (box) { return box.id.getValue() === output.id; })) !== null && _a !== void 0 ? _a : studio_boxes_1.MIDIOutputBox.create(rootBox.graph, lib_std_1.UUID.generate(), function (box) {
        var _a;
        box.id.setValue(output.id);
        box.label.setValue((_a = output.name) !== null && _a !== void 0 ? _a : "Unnamed");
        box.root.refer(rootBox.outputMidiDevices);
    });
};
var DeviceSelector = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, adapter = _a.adapter;
    var editing = project.editing, rootBox = project.rootBox;
    var device = adapter.box.device, midiDevice = adapter.midiDevice;
    var deviceLabelClass = lib_jsx_1.Inject.classList("device-label");
    var deviceIdObserver = function (requestedId) {
        var device = studio_core_1.MidiDevices.outputDevices().find(function (device) { return device.id === requestedId; });
        deviceLabelClass.toggle("not-available", (0, lib_std_1.isAbsent)(device) && requestedId !== "");
    };
    var delayInMs = lifecycle.own(new lib_std_1.DefaultObservableValue(0));
    var sendTransportMessages = lifecycle.own(new lib_std_1.DefaultObservableValue(true));
    var deviceSubscription = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.ownAll(midiDevice.catchupAndSubscribe(function (opt) {
        deviceSubscription.terminate();
        opt.match({
            none: function () {
                delayInMs.setValue(0);
                sendTransportMessages.setValue(true);
            },
            some: function (device) {
                deviceSubscription.ownAll(device.delayInMs.catchupAndSubscribe(function (owner) { return delayInMs.setValue(owner.getValue()); }), device.sendTransportMessages.catchupAndSubscribe(function (owner) { return sendTransportMessages.setValue(owner.getValue()); }));
            }
        });
    }), delayInMs.catchupAndSubscribe(function (owner) { return midiDevice
        .ifSome(function (device) { return editing.modify(function () { return device.delayInMs.setValue(owner.getValue()); }); }); }), sendTransportMessages.catchupAndSubscribe(function (owner) { return midiDevice
        .ifSome(function (device) { return editing.modify(function () { return device.sendTransportMessages.setValue(owner.getValue()); }); }); }));
    return (<div className={className}>
            <MenuButton_1.MenuButton root={studio_core_1.MenuItem.root().setRuntimeChildrenProcedure(function (parent) {
            var outputs = studio_core_1.MidiDevices.outputDevices();
            parent.addMenuItem.apply(parent, (outputs.length === 0
                ? [studio_core_1.MenuItem.default({ label: "No device found.", selectable: false })]
                : outputs.map(function (output) {
                    var _a;
                    return studio_core_1.MenuItem.default({
                        label: (_a = output.name) !== null && _a !== void 0 ? _a : "Unnamed device",
                        checked: output.id === device.targetVertex
                            .mapOr(function (_a) {
                            var box = _a.box;
                            return (0, lib_std_1.asInstanceOf)(box, studio_boxes_1.MIDIOutputBox).id.getValue();
                        }, "")
                    }).setTriggerProcedure(function () { return editing.modify(function () {
                        var disconnectedDevice = midiDevice.unwrapOrNull();
                        device.refer(getOrCreateMIDIOutput(rootBox, output).device);
                        if ((0, lib_std_1.isNotNull)(disconnectedDevice) && disconnectedDevice.device.pointerHub.size() === 0) {
                            disconnectedDevice.delete();
                        }
                    }); });
                }).concat(studio_core_1.MenuItem.default({
                    label: "Remove ".concat(midiDevice.match({
                        none: function () { return "MIDI device"; },
                        some: function (device) { return device.label.getValue(); }
                    }))
                }).setTriggerProcedure(function () { return editing.modify(function () {
                    var disconnectedDevice = midiDevice.unwrapOrNull();
                    device.defer();
                    if ((0, lib_std_1.isNotNull)(disconnectedDevice) && disconnectedDevice.device.pointerHub.size() === 0) {
                        disconnectedDevice.delete();
                    }
                }); }))));
            if (studio_core_1.MidiDevices.get().isEmpty()) {
                parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Request MIDI...", separatorBefore: true })
                    .setTriggerProcedure(function () { return studio_core_1.MidiDevices.requestPermission(); }));
            }
        })} style={{ width: "100%" }} appearance={{ color: studio_enums_1.Colors.dark, activeColor: studio_enums_1.Colors.gray }}>
                <div className={deviceLabelClass} onInit={function (element) {
            var subscriber = lifecycle.own(new lib_std_1.Terminator());
            lifecycle.ownAll(adapter.midiDevice.catchupAndSubscribe(function (opt) {
                subscriber.terminate();
                opt.match({
                    none: function () {
                        element.textContent = "No device selected";
                        deviceIdObserver("");
                    },
                    some: function (output) { return subscriber.ownAll(output.id.catchupAndSubscribe(function (owner) { return deviceIdObserver(owner.getValue()); }), output.label.catchupAndSubscribe(function (owner) {
                        return element.textContent = lib_std_1.Strings.fallback(owner.getValue(), "No device selected");
                    })); }
                });
            }));
        }}/>
            </MenuButton_1.MenuButton>
            <div className="controls">
                <span>Delay (ms):</span>
                <NumberInput_1.NumberInput lifecycle={lifecycle} model={delayInMs} guard={{ guard: function (value) { return (0, lib_std_1.clamp)(value, 0, 500); } }}/>
                <div />
                <span>Send Transport:</span>
                <Checkbox_1.Checkbox lifecycle={lifecycle} model={sendTransportMessages}>
                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                </Checkbox_1.Checkbox>
            </div>
        </div>);
};
exports.DeviceSelector = DeviceSelector;
