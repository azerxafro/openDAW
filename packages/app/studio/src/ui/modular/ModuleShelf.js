"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleShelf = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var lib_std_1 = require("@opendaw/lib-std");
var ModuleShelf = /** @class */ (function () {
    function ModuleShelf() {
    }
    ModuleShelf.getMenuItems = function (service, adapter, camera, clientX, clientY) {
        var project = service.project;
        return [
            studio_core_1.MenuItem.default({ label: "Create Delay" })
                .setTriggerProcedure(function () {
                var _a = camera.globalToLocal(clientX, clientY), x = _a.x, y = _a.y;
                project.editing.modify(function () {
                    return studio_boxes_1.ModuleDelayBox.create(project.boxGraph, lib_std_1.UUID.generate(), function (_a) {
                        var attributes = _a.attributes;
                        attributes.collection.refer(adapter.box.modules);
                        attributes.label.setValue("Delay");
                        attributes.x.setValue((0, lib_std_1.quantizeRound)(x, 16));
                        attributes.y.setValue((0, lib_std_1.quantizeRound)(y, 16));
                    });
                });
            }),
            studio_core_1.MenuItem.default({ label: "Create Multiplier" })
                .setTriggerProcedure(function () {
                var _a = camera.globalToLocal(clientX, clientY), x = _a.x, y = _a.y;
                project.editing.modify(function () {
                    return studio_boxes_1.ModuleMultiplierBox.create(project.boxGraph, lib_std_1.UUID.generate(), function (_a) {
                        var attributes = _a.attributes;
                        attributes.collection.refer(adapter.box.modules);
                        attributes.label.setValue("Multiplier");
                        attributes.x.setValue((0, lib_std_1.quantizeRound)(x, 16));
                        attributes.y.setValue((0, lib_std_1.quantizeRound)(y, 16));
                    });
                });
            }),
            studio_core_1.MenuItem.default({ label: "Create Gain" })
                .setTriggerProcedure(function () {
                var _a = camera.globalToLocal(clientX, clientY), x = _a.x, y = _a.y;
                project.editing.modify(function () {
                    return studio_boxes_1.ModuleGainBox.create(project.boxGraph, lib_std_1.UUID.generate(), function (_a) {
                        var attributes = _a.attributes;
                        attributes.collection.refer(adapter.box.modules);
                        attributes.label.setValue("Gain");
                        attributes.x.setValue((0, lib_std_1.quantizeRound)(x, 16));
                        attributes.y.setValue((0, lib_std_1.quantizeRound)(y, 16));
                    });
                });
            })
        ];
    };
    return ModuleShelf;
}());
exports.ModuleShelf = ModuleShelf;
