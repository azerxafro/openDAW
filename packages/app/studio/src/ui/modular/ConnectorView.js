"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorView = void 0;
var ConnectorView_sass_inline_1 = require("./ConnectorView.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var ModularEnvironment_ts_1 = require("@/ui/modular/ModularEnvironment.ts");
var WiringFlyout_tsx_1 = require("@/ui/modular/WiringFlyout.tsx");
var studio_core_1 = require("@opendaw/studio-core");
var Surface_tsx_1 = require("../surface/Surface.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ConnectorView_sass_inline_1.default, "Connector");
var ConnectorView = function (_a) {
    var lifecycle = _a.lifecycle, environment = _a.environment, moduleAdapter = _a.moduleAdapter, connectorAdapter = _a.connectorAdapter, parent = _a.parent, headerPin = _a.headerPin;
    var _b = moduleAdapter.attributes, moduleX = _b.x, moduleY = _b.y;
    var pin = <div className="pin"/>;
    var pinLocator = function () {
        var moduleRect = parent.getBoundingClientRect();
        var reference = pin.checkVisibility() ? pin : headerPin;
        var pinCenter = lib_std_1.Rect.center(reference.getBoundingClientRect());
        return {
            x: (pinCenter.x - moduleRect.x) + moduleX.getValue() + 0.5,
            y: (pinCenter.y - moduleRect.y) + moduleY.getValue() + 0.5
        };
    };
    var element = (<div className={lib_dom_1.Html.buildClassList(className, connectorAdapter.direction)}>
                <label>{connectorAdapter.name}</label>
                {pin}
            </div>);
    lifecycle.own(studio_core_1.ContextMenu.subscribe(element, function (collector) {
        collector.addItems(studio_core_1.MenuItem.default({
            label: "Connect... (todo)",
            selectable: false
        }));
    }));
    lifecycle.own(environment.registerConnectorView(new ModularEnvironment_ts_1.ConnectorViewAdapter(connectorAdapter, pin, pinLocator)));
    var showWiringWidget = function () {
        var pinCenter = lib_std_1.Rect.center(pin.getBoundingClientRect());
        var terminator = lifecycle.own(new lib_std_1.Terminator());
        Surface_tsx_1.Surface.get(element).flyout.appendChild(<WiringFlyout_tsx_1.WiringFlyout autoTerminator={terminator} environment={environment} connectorAdapter={connectorAdapter} position={pinCenter}/>);
    };
    var preventClick = false;
    lifecycle.own(lib_dom_1.Events.subscribe(pin, "pointerdown", function (event) {
        event.stopPropagation();
        if (event.shiftKey) {
            preventClick = true;
            environment.beginWiring(connectorAdapter, lib_std_1.Point.fromClient(event));
        }
        else {
            preventClick = false;
        }
    }));
    lifecycle.own(lib_dom_1.Events.subscribe(pin, "click", function (event) {
        if (preventClick || event.ctrlKey) {
            return;
        }
        event.stopPropagation();
        showWiringWidget();
    }));
    lifecycle.own(lib_dom_1.Events.subscribe(pin, "pointerleave", function (event) {
        if (event.buttons === 1 && !environment.isWiring) {
            var connections = connectorAdapter.connections;
            if (connections.length === 0) {
                environment.beginWiring(connectorAdapter, lib_std_1.Point.fromClient(event));
                preventClick = true;
            }
            else if (connections.length === 1) {
                environment.beginRewiring(connections[0], connectorAdapter, lib_std_1.Point.fromClient(event));
                preventClick = true;
            }
            else {
                showWiringWidget();
            }
        }
    }));
    return element;
};
exports.ConnectorView = ConnectorView;
