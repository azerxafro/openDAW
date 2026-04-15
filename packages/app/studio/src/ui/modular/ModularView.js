"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModularView = void 0;
var ModularView_sass_inline_1 = require("./ModularView.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var GenericModuleView_tsx_1 = require("@/ui/modular/GenericModuleView.tsx");
var Camera_ts_1 = require("@/ui/modular/Camera.ts");
var ModularEnvironment_ts_1 = require("@/ui/modular/ModularEnvironment.ts");
var ModularWires_tsx_1 = require("@/ui/modular/ModularWires.tsx");
var studio_core_1 = require("@opendaw/studio-core");
var ModuleShelf_ts_1 = require("@/ui/modular/ModuleShelf.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ModularView_sass_inline_1.default, "ModularView");
var ModularView = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, modularSystemAdapter = _a.modularSystemAdapter;
    var element = <div className={className}/>;
    var camera = lifecycle.own(new Camera_ts_1.Camera(element));
    var environment = lifecycle.own(new ModularEnvironment_ts_1.ModularEnvironment(service, modularSystemAdapter, camera));
    var selection = environment.selection;
    var gridLayer = <div className="grid layer"/>;
    var modulesLayer = <div className="modules layer"/>;
    (0, lib_jsx_1.appendChildren)(element, <div className="surface layer">
            {gridLayer}
            {modulesLayer}
            <ModularWires_tsx_1.ModularWires lifecycle={lifecycle} environment={environment} camera={camera}/>
        </div>, <div className="vignette layer"/>);
    lifecycle.own(studio_core_1.ContextMenu.subscribe(element, function (_a) {
        var addItems = _a.addItems, _b = _a.client, clientX = _b.clientX, clientY = _b.clientY;
        addItems.apply(void 0, ModuleShelf_ts_1.ModuleShelf.getMenuItems(service, modularSystemAdapter, camera, clientX, clientY));
    }));
    lifecycle.own(modularSystemAdapter.catchupAndSubscribe({
        onModuleAdded: function (moduleAdapter) {
            var moduleLifecycle = new lib_std_1.Terminator();
            var moduleView = <GenericModuleView_tsx_1.GenericModuleView lifecycle={moduleLifecycle} environment={environment} adapter={moduleAdapter}/>;
            modulesLayer.appendChild(moduleView);
            moduleLifecycle.own({ terminate: function () { return moduleView.remove(); } });
            environment.registerModule({
                moduleView: moduleView,
                moduleAdapter: moduleAdapter,
                lifecycle: moduleLifecycle
            });
        },
        onModuleRemoved: function (moduleAdapter) {
            environment.unregisterModule(moduleAdapter.box.address.uuid);
        }
    }));
    lifecycle.own(lib_dom_1.Dragging.attach(element, function (event) {
        var clickedSurface = event.target === event.currentTarget;
        if (clickedSurface) {
            selection.deselectAll();
            return lib_std_1.Option.None;
        }
        event.stopImmediatePropagation(); // prevent camera movement
        if (selection.isEmpty()) {
            return lib_std_1.Option.None;
        }
        var startPointerX = event.clientX;
        var startPointerY = event.clientY;
        var moving = selection.selected().map(function (_a) {
            var attributes = _a.attributes;
            return ({ attributes: attributes, x: attributes.x.getValue(), y: attributes.y.getValue() });
        });
        var editing = service.project.editing;
        return lib_std_1.Option.wrap({
            update: function (event) {
                var deltaX = (0, lib_std_1.quantizeRound)(event.clientX - startPointerX, 16);
                var deltaY = (0, lib_std_1.quantizeRound)(event.clientY - startPointerY, 16);
                editing.modify(function () {
                    moving.forEach(function (_a) {
                        var attributes = _a.attributes, x = _a.x, y = _a.y;
                        attributes.x.setValue(x + deltaX);
                        attributes.y.setValue(y + deltaY);
                    });
                }, false);
            },
            cancel: function () {
                editing.modify(function () { return moving.forEach(function (_a) {
                    var attributes = _a.attributes, x = _a.x, y = _a.y;
                    attributes.x.setValue(x);
                    attributes.y.setValue(y);
                }); }, false);
            },
            approve: function () { return editing.mark(); }
        });
    }, { permanentUpdates: true }));
    // Needs to be called last to receive events as last one in bubbling phase.
    // Dragging module must be able to prevent camera movement.
    camera.listen();
    return element;
};
exports.ModularView = ModularView;
