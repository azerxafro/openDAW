"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modular = void 0;
var Modular_sass_inline_1 = require("./Modular.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var ModularTabButton_tsx_1 = require("@/ui/modular/ModularTabButton.tsx");
var ModularView_tsx_1 = require("./ModularView.tsx");
var EmptyModular_tsx_1 = require("@/ui/modular/EmptyModular.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(Modular_sass_inline_1.default, "Modular");
var Modular = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var project = service.project;
    var boxAdapters = project.boxAdapters;
    var navigation = <nav />;
    var container = <div className="container"/>;
    var availableSystems = lib_std_1.UUID.newSet(function (entry) { return entry.uuid; });
    var addModularSystem = function (adapter) {
        var terminator = new lib_std_1.Terminator();
        var button = <ModularTabButton_tsx_1.ModularTabButton lifecycle={terminator} userFocus={project.userEditingManager.modularSystem} adapter={adapter}/>;
        navigation.appendChild(button);
        var added = availableSystems.add({
            uuid: adapter.uuid,
            button: button,
            terminable: terminator
        });
        (0, lib_std_1.assert)(added, "Could not add tab button for ".concat(adapter));
    };
    var removeModularSystem = function (uuid) {
        var tab = availableSystems.removeByKey(uuid);
        tab.button.remove();
        tab.terminable.terminate();
    };
    var pointerHub = project.rootBox.modularSetups.pointerHub;
    for (var _i = 0, _b = pointerHub.incoming(); _i < _b.length; _i++) {
        var incomingElement = _b[_i];
        var modularSystemAdapter = boxAdapters.adapterFor(incomingElement.box, studio_adapters_1.ModularAdapter);
        addModularSystem(modularSystemAdapter);
    }
    lifecycle.own(pointerHub.subscribe({
        onAdded: function (pointer) {
            return addModularSystem(boxAdapters.adapterFor(pointer.box, studio_adapters_1.ModularAdapter));
        },
        onRemoved: function (pointer) { return removeModularSystem(pointer.address.uuid); }
    }));
    var modularViewLifecycle = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(project.userEditingManager.modularSystem.catchupAndSubscribe(function (subject) { return subject.match({
        none: function () {
            modularViewLifecycle.terminate();
            lib_dom_1.Html.empty(container);
            container.appendChild(<EmptyModular_tsx_1.EmptyModular lifecycle={lifecycle}/>);
        },
        some: function (vertex) {
            modularViewLifecycle.terminate();
            lib_dom_1.Html.empty(container);
            var adapter = boxAdapters.adapterFor(vertex.box, studio_adapters_1.ModularAdapter);
            container.appendChild(<ModularView_tsx_1.ModularView lifecycle={modularViewLifecycle} service={service} modularSystemAdapter={adapter}/>);
        }
    }); }));
    return (<div className={className}>
            {navigation}
            {container}
        </div>);
};
exports.Modular = Modular;
