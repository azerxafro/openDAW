"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModularDeviceEditor = void 0;
var ModularDeviceEditor_sass_inline_1 = require("./ModularDeviceEditor.sass?inline");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var lib_std_1 = require("@opendaw/lib-std");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var ControlBuilder_tsx_1 = require("@/ui/devices/ControlBuilder.tsx");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(ModularDeviceEditor_sass_inline_1.default, "ModularDeviceEditor");
var ModularDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var userInterface = <div className={className}/>;
    var elements = lib_std_1.UUID.newSet(function (entry) { return entry.uuid; });
    var addElement = function (box) {
        var success = box.accept({
            visitDeviceInterfaceKnobBox: function (box) {
                var runtime = new lib_std_1.Terminator();
                var parameterAdapter = project.boxAdapters.adapterFor(box, studio_adapters_1.DeviceInterfaceKnobAdapter).parameterAdapter;
                var element = ControlBuilder_tsx_1.ControlBuilder.createKnob({
                    lifecycle: lifecycle,
                    editing: project.editing,
                    midiLearning: project.midiLearning,
                    adapter: adapter,
                    parameter: parameterAdapter,
                    anchor: box.anchor.getValue()
                });
                runtime.own(studio_core_1.ContextMenu.subscribe(element, function (collector) {
                    return collector.addItems(studio_core_1.MenuItem.default({ label: "Remove" })
                        .setTriggerProcedure(function () { return project.editing.modify(function () { return box.delete(); }); }));
                }));
                userInterface.appendChild(element);
                runtime.own({ terminate: function () { return element.remove(); } });
                elements.add({
                    uuid: box.address.uuid,
                    element: element,
                    terminable: runtime
                });
                return true;
            }
        });
        (0, lib_std_1.assert)(success === true, "Could not resolve ".concat(box));
    };
    var removeElement = function (box) {
        var sucess = box.accept({
            visitDeviceInterfaceKnobBox: function (box) {
                elements.removeByKey(box.address.uuid).terminable.terminate();
                return true;
            }
        });
        (0, lib_std_1.assert)(sucess === true, "Could not resolve ".concat(box));
    };
    adapter.box.userInterface.elements.pointerHub.incoming().forEach(function (pointer) { return addElement(pointer.box); });
    lifecycle.own(adapter.box.userInterface.elements.pointerHub.subscribe({
        onAdded: function (pointer) { return addElement(pointer.box); },
        onRemoved: function (pointer) { return removeElement(pointer.box); }
    }));
    lifecycle.own({ terminate: function () { return elements.forEach(function (entry) { return entry.terminable.terminate(); }); } });
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return userInterface; }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_enums_1.IconSymbol.OpenDAW}>
        </DeviceEditor_tsx_1.DeviceEditor>);
};
exports.ModularDeviceEditor = ModularDeviceEditor;
