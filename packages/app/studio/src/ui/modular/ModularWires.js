"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModularWires = void 0;
var ModularWires_sass_inline_1 = require("./ModularWires.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(ModularWires_sass_inline_1.default, "ModularWires");
var ModularWires = function (_a) {
    var lifecycle = _a.lifecycle, environment = _a.environment, camera = _a.camera;
    var vitalSigns = lifecycle.own(new lib_std_1.VitalSigns());
    var wires = <g classList="wires"/>;
    var svg = <svg classList={className} viewBox="0 0 1 1">{wires}</svg>;
    var connections = lib_std_1.UUID.newSet(function (view) { return view.adapter.uuid; });
    var updateWirePath = function (path, _a, _b) {
        var x1 = _a.x, y1 = _a.y;
        var x2 = _b.x, y2 = _b.y;
        var dx = x2 - x1;
        var dy = y2 - y1;
        var dd = Math.sqrt(dx * dx + dy * dy);
        var minOutreach = Math.min(64, dd);
        var c1 = x1 + Math.max(minOutreach, dx * 0.5);
        var c2 = x2 - Math.max(minOutreach, dx * 0.5);
        path.setAttribute("d", "M".concat(x1, ",").concat(y1, "C").concat(c1, ",").concat(y1, " ").concat(c2, ",").concat(y2, " ").concat(x2, ",").concat(y2));
    };
    var updateWriteLine = function (line, _a, _b, locked) {
        var x1 = _a.x, y1 = _a.y;
        var x2 = _b.x, y2 = _b.y;
        line.x1.baseVal.value = x1;
        line.y1.baseVal.value = y1;
        if (locked) {
            var dx = x2 - x1;
            var dy = y2 - y1;
            var dd = 1.0 / Math.sqrt(dx * dx + dy * dy) * 3; // radius of pin
            line.x2.baseVal.value = x2 - dx * dd;
            line.y2.baseVal.value = y2 - dy * dd;
        }
        else {
            line.x2.baseVal.value = x2;
            line.y2.baseVal.value = y2;
        }
    };
    var updateConnection = function (_a) {
        var _b = _a.box, source = _b.source, target = _b.target, uuid = _a.uuid;
        if (vitalSigns.isTerminated) {
            return;
        }
        var v1 = source.targetVertex.unwrap("No source vertex");
        var v2 = target.targetVertex.unwrap("No target vertex");
        var p1 = environment.findConnectorByViewAddress(v1.address).pinPoint;
        var p2 = environment.findConnectorByViewAddress(v2.address).pinPoint;
        updateWirePath(connections.get(uuid).wire, p1, p2);
    };
    var updateQueue = new Set();
    var updateDefer = (0, lib_dom_1.deferNextFrame)(function () {
        var connections = new Set();
        updateQueue.forEach(function (moduleAdapter) {
            var collector = function (connector) {
                return connector.connections.forEach(function (connection) { return connections.add(connection); });
            };
            moduleAdapter.inputs.forEach(collector);
            moduleAdapter.outputs.forEach(collector);
        });
        updateQueue.clear();
        connections.forEach(function (connection) { return updateConnection(connection); });
    });
    var modules = lib_std_1.UUID.newSet(function (entry) { return entry.uuid; });
    lifecycle.own(environment.modularAdapter.catchupAndSubscribe({
        onModuleAdded: function (adapter) {
            var enqueue = function () {
                updateQueue.add(adapter);
                updateDefer.request();
            };
            var subscriptions = new lib_std_1.Terminator();
            subscriptions.own(adapter.attributes.x.subscribe(enqueue));
            subscriptions.own(adapter.attributes.y.subscribe(enqueue));
            subscriptions.own(adapter.attributes.collapsed.subscribe(enqueue));
            modules.add({ uuid: adapter.uuid, subscriptions: subscriptions });
            enqueue();
        },
        onModuleRemoved: function (adapter) {
            modules.removeByKey(adapter.uuid).subscriptions.terminate();
            updateQueue.delete(adapter);
        },
        onConnectionAdded: function (adapter) {
            var wire = <path stroke={studio_enums_1.Colors.blue}/>;
            wires.appendChild(wire);
            var added = connections.add({ adapter: adapter, wire: wire });
            (0, lib_std_1.assert)(added, "Could not add connection");
            lib_dom_1.AnimationFrame.once(function () { return updateConnection(adapter); });
        },
        onConnectionRemoved: function (adapter) {
            return connections.removeByKey(adapter.uuid).wire.remove();
        }
    }));
    lifecycle.own(lib_dom_1.Html.watchResize(svg, function (_a) {
        var contentRect = _a.contentRect;
        return svg.setAttribute("viewBox", "0 0 ".concat(contentRect.width, " ").concat(contentRect.height));
    }));
    environment.setWiringPreview({
        begin: function (connector, pointer) {
            var path = <line stroke={studio_enums_1.Colors.blue}/>;
            wires.appendChild(path);
            updateWriteLine(path, connector.pinPoint, camera.globalToLocal(pointer.x, pointer.y), false);
            return ({
                update: function (pointer, locked) {
                    return updateWriteLine(path, connector.pinPoint, camera.globalToLocal(pointer.x, pointer.y), locked);
                },
                terminate: function () { return path.remove(); }
            });
        },
        highlight: function (connection) {
            connections.get(connection).wire.classList.add("highlight");
            return { terminate: function () { return connections.get(connection).wire.classList.remove("highlight"); } };
        }
    });
    (0, lib_jsx_1.appendChildren)(wires, (<g stroke="rgba(255, 255, 255, 0.1)">
            <line x1={-3} x2={3} y1={0} y2={0}/>
            <line x1={0} x2={0} y1={-3} y2={3}/>
        </g>));
    return svg;
};
exports.ModularWires = ModularWires;
