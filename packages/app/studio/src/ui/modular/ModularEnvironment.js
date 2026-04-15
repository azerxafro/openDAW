"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ConnectorViewAdapter_adapter, _ConnectorViewAdapter_element, _ConnectorViewAdapter_pinLocator, _ModularEnvironment_instances, _ModularEnvironment_service, _ModularEnvironment_modularAdapter, _ModularEnvironment_camera, _ModularEnvironment_terminator, _ModularEnvironment_selection, _ModularEnvironment_modules, _ModularEnvironment_connectors, _ModularEnvironment_wiringPreview, _ModularEnvironment_isWiring, _ModularEnvironment_connect;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModularEnvironment = exports.ConnectorViewAdapter = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_box_1 = require("@opendaw/lib-box");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var Surface_tsx_1 = require("@/ui/surface/Surface.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var ConnectorViewAdapter = /** @class */ (function () {
    function ConnectorViewAdapter(adapter, element, pinLocator) {
        _ConnectorViewAdapter_adapter.set(this, void 0);
        _ConnectorViewAdapter_element.set(this, void 0);
        _ConnectorViewAdapter_pinLocator.set(this, void 0);
        __classPrivateFieldSet(this, _ConnectorViewAdapter_adapter, adapter, "f");
        __classPrivateFieldSet(this, _ConnectorViewAdapter_element, element, "f");
        __classPrivateFieldSet(this, _ConnectorViewAdapter_pinLocator, pinLocator, "f");
    }
    Object.defineProperty(ConnectorViewAdapter.prototype, "adapter", {
        get: function () { return __classPrivateFieldGet(this, _ConnectorViewAdapter_adapter, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorViewAdapter.prototype, "element", {
        get: function () { return __classPrivateFieldGet(this, _ConnectorViewAdapter_element, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorViewAdapter.prototype, "pinPoint", {
        get: function () { return __classPrivateFieldGet(this, _ConnectorViewAdapter_pinLocator, "f").call(this); },
        enumerable: false,
        configurable: true
    });
    ConnectorViewAdapter.prototype.toString = function () { return "{ConnectorViewAdapter adapter: ".concat(__classPrivateFieldGet(this, _ConnectorViewAdapter_adapter, "f")); };
    return ConnectorViewAdapter;
}());
exports.ConnectorViewAdapter = ConnectorViewAdapter;
_ConnectorViewAdapter_adapter = new WeakMap(), _ConnectorViewAdapter_element = new WeakMap(), _ConnectorViewAdapter_pinLocator = new WeakMap();
var ModularEnvironment = /** @class */ (function () {
    function ModularEnvironment(service, modularAdapter, camera) {
        var _this = this;
        _ModularEnvironment_instances.add(this);
        _ModularEnvironment_service.set(this, void 0);
        _ModularEnvironment_modularAdapter.set(this, void 0);
        _ModularEnvironment_camera.set(this, void 0);
        _ModularEnvironment_terminator.set(this, void 0);
        _ModularEnvironment_selection.set(this, void 0);
        _ModularEnvironment_modules.set(this, void 0);
        _ModularEnvironment_connectors.set(this, void 0);
        _ModularEnvironment_wiringPreview.set(this, lib_std_1.Option.None);
        _ModularEnvironment_isWiring.set(this, false);
        __classPrivateFieldSet(this, _ModularEnvironment_service, service, "f");
        __classPrivateFieldSet(this, _ModularEnvironment_modularAdapter, modularAdapter, "f");
        __classPrivateFieldSet(this, _ModularEnvironment_camera, camera, "f");
        __classPrivateFieldSet(this, _ModularEnvironment_terminator, new lib_std_1.Terminator(), "f");
        __classPrivateFieldSet(this, _ModularEnvironment_selection, __classPrivateFieldGet(this, _ModularEnvironment_terminator, "f").own(__classPrivateFieldGet(this, _ModularEnvironment_service, "f").project.selection.createFilteredSelection(studio_adapters_1.Modules.isVertexOfModule, {
            fx: function (adapter) { return adapter.box; },
            fy: function (vertex) { return studio_adapters_1.Modules.adapterFor(__classPrivateFieldGet(_this, _ModularEnvironment_service, "f").project.boxAdapters, vertex.box); }
        })), "f");
        __classPrivateFieldSet(this, _ModularEnvironment_modules, lib_std_1.UUID.newSet(function (viewAdapter) { return viewAdapter.moduleAdapter.uuid; }), "f");
        __classPrivateFieldSet(this, _ModularEnvironment_connectors, lib_box_1.Address.newSet(function (view) { return view.adapter.address; }), "f");
        __classPrivateFieldGet(this, _ModularEnvironment_terminator, "f").own(__classPrivateFieldGet(this, _ModularEnvironment_selection, "f").catchupAndSubscribe({
            onSelected: function (adapter) {
                var _a;
                adapter.onSelected();
                (_a = __classPrivateFieldGet(_this, _ModularEnvironment_modules, "f").getOrNull(adapter.uuid)) === null || _a === void 0 ? void 0 : _a.moduleView.classList.add("selectable");
            },
            onDeselected: function (adapter) {
                var _a;
                adapter.onDeselected();
                (_a = __classPrivateFieldGet(_this, _ModularEnvironment_modules, "f").getOrNull(adapter.uuid)) === null || _a === void 0 ? void 0 : _a.moduleView.classList.remove("selectable");
            }
        }));
    }
    ModularEnvironment.prototype.setWiringPreview = function (preview) {
        __classPrivateFieldSet(this, _ModularEnvironment_wiringPreview, lib_std_1.Option.wrap(preview), "f");
    };
    ModularEnvironment.prototype.registerModule = function (viewAdapter) {
        console.debug("registerModule(".concat(viewAdapter.toString(), ")"));
        var added = __classPrivateFieldGet(this, _ModularEnvironment_modules, "f").add(viewAdapter);
        (0, lib_std_1.assert)(added, "Could not register viewAdapter ".concat(viewAdapter.toString()));
        viewAdapter.moduleAdapter.attributes;
    };
    ModularEnvironment.prototype.unregisterModule = function (uuid) {
        console.debug("unregisterModule(".concat(lib_std_1.UUID.toString(uuid), ")"));
        __classPrivateFieldGet(this, _ModularEnvironment_modules, "f").removeByKey(uuid).lifecycle.terminate();
    };
    ModularEnvironment.prototype.registerConnectorView = function (view) {
        var _this = this;
        console.debug("registerConnector(".concat(view.adapter.address.toString(), ")"));
        var added = __classPrivateFieldGet(this, _ModularEnvironment_connectors, "f").add(view);
        (0, lib_std_1.assert)(added, "Could not register connector at ".concat(view.toString()));
        return { terminate: function () { return __classPrivateFieldGet(_this, _ModularEnvironment_connectors, "f").removeByKey(view.adapter.address); } };
    };
    ModularEnvironment.prototype.findConnectorByViewAddress = function (address) { return __classPrivateFieldGet(this, _ModularEnvironment_connectors, "f").get(address); };
    ModularEnvironment.prototype.findConnectorViewByEventTarget = function (target) {
        var _a;
        if (target === null) {
            return null;
        }
        return (_a = __classPrivateFieldGet(this, _ModularEnvironment_connectors, "f").values().find(function (view) { return view.element === target; })) !== null && _a !== void 0 ? _a : null;
    };
    ModularEnvironment.prototype.findMatchingConnectorViews = function (adapter) {
        return __classPrivateFieldGet(this, _ModularEnvironment_connectors, "f")
            .values()
            .filter(function (view) { return view.adapter.matches(adapter); });
    };
    ModularEnvironment.prototype.beginWiring = function (adapter, pointer) {
        var _this = this;
        var runtime = new lib_std_1.Terminator();
        __classPrivateFieldSet(this, _ModularEnvironment_isWiring, true, "f");
        runtime.own({ terminate: function () { return __classPrivateFieldSet(_this, _ModularEnvironment_isWiring, false, "f"); } });
        var matchingConnectors = this.findMatchingConnectorViews(adapter);
        if (matchingConnectors.length === 0) {
            return;
        }
        matchingConnectors.forEach(function (connector) { return connector.element.classList.add("accepting"); });
        runtime.own({
            terminate: function () { return matchingConnectors.forEach(function (connector) { return connector.element.classList.remove("accepting"); }); }
        });
        var preview = runtime.own(__classPrivateFieldGet(this, _ModularEnvironment_wiringPreview, "f").unwrap("No preview set.")
            .begin(__classPrivateFieldGet(this, _ModularEnvironment_connectors, "f").get(adapter.address), pointer));
        var lock = lib_std_1.Option.None;
        var owner = Surface_tsx_1.Surface.get().owner; // TODO we need a reference to the owner
        runtime.own(lib_dom_1.Events.subscribe(owner, "pointerover", function (event) {
            var view = _this.findConnectorViewByEventTarget(event.target);
            if ((0, lib_std_1.isDefined)(view) && matchingConnectors.includes(view)) {
                lock = lib_std_1.Option.wrap(view);
            }
            else {
                lock = lib_std_1.Option.None;
            }
        }, { capture: true }));
        runtime.own(lib_dom_1.Events.subscribe(owner, "pointermove", function (event) { return preview.update(lock.match({
            none: function () { return lib_std_1.Point.fromClient(event); },
            some: function (_a) {
                var _b = _a.pinPoint, x = _b.x, y = _b.y;
                return __classPrivateFieldGet(_this, _ModularEnvironment_camera, "f").localToGlobal(x, y);
            }
        }), lock.nonEmpty()); }, { capture: true }));
        runtime.own(lib_dom_1.Events.subscribe(owner, "pointerup", function (event) {
            var view = _this.findConnectorViewByEventTarget(event.target);
            if ((0, lib_std_1.isDefined)(view)) {
                __classPrivateFieldGet(_this, _ModularEnvironment_instances, "m", _ModularEnvironment_connect).call(_this, adapter, view.adapter);
            }
            runtime.terminate();
        }, { capture: true }));
    };
    ModularEnvironment.prototype.beginRewiring = function (connection, connectorAdapter, pointer) {
        var vertex = connection.source.address.equals(connectorAdapter.address)
            ? connection.target
            : connection.source;
        var connector = this.findConnectorByViewAddress(vertex.address).adapter;
        __classPrivateFieldGet(this, _ModularEnvironment_service, "f").project.editing.modify(function () { return connection.box.delete(); });
        this.beginWiring(connector, pointer);
    };
    ModularEnvironment.prototype.highlightWire = function (connection) {
        return __classPrivateFieldGet(this, _ModularEnvironment_wiringPreview, "f").match({
            none: function () { return lib_std_1.Terminable.Empty; },
            some: function (preview) { return preview.highlight(connection.uuid); }
        });
    };
    Object.defineProperty(ModularEnvironment.prototype, "isWiring", {
        get: function () { return __classPrivateFieldGet(this, _ModularEnvironment_isWiring, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModularEnvironment.prototype, "service", {
        get: function () { return __classPrivateFieldGet(this, _ModularEnvironment_service, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModularEnvironment.prototype, "project", {
        get: function () { return __classPrivateFieldGet(this, _ModularEnvironment_service, "f").project; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModularEnvironment.prototype, "selection", {
        get: function () { return __classPrivateFieldGet(this, _ModularEnvironment_selection, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModularEnvironment.prototype, "modularAdapter", {
        get: function () { return __classPrivateFieldGet(this, _ModularEnvironment_modularAdapter, "f"); },
        enumerable: false,
        configurable: true
    });
    ModularEnvironment.prototype.terminate = function () {
        __classPrivateFieldSet(this, _ModularEnvironment_wiringPreview, lib_std_1.Option.None, "f");
        __classPrivateFieldGet(this, _ModularEnvironment_modules, "f").forEach(function (entry) { return entry.lifecycle.terminate(); });
        __classPrivateFieldGet(this, _ModularEnvironment_modules, "f").clear();
        __classPrivateFieldGet(this, _ModularEnvironment_terminator, "f").terminate();
    };
    return ModularEnvironment;
}());
exports.ModularEnvironment = ModularEnvironment;
_ModularEnvironment_service = new WeakMap(), _ModularEnvironment_modularAdapter = new WeakMap(), _ModularEnvironment_camera = new WeakMap(), _ModularEnvironment_terminator = new WeakMap(), _ModularEnvironment_selection = new WeakMap(), _ModularEnvironment_modules = new WeakMap(), _ModularEnvironment_connectors = new WeakMap(), _ModularEnvironment_wiringPreview = new WeakMap(), _ModularEnvironment_isWiring = new WeakMap(), _ModularEnvironment_instances = new WeakSet(), _ModularEnvironment_connect = function _ModularEnvironment_connect(adapter, other) {
    var _this = this;
    if (adapter === other) {
        console.debug("Cannot connect same connector");
        return;
    }
    if (!adapter.matches(other)) {
        console.debug("Cannot connect mismatching connectors");
        return;
    }
    var source = adapter.direction === studio_adapters_1.Direction.Output ? adapter : other;
    var target = other.direction === studio_adapters_1.Direction.Input ? other : adapter;
    if (source.connections.some(function (connection) { return connection.box.target.targetVertex.unwrap().address.equals(target.address); })) {
        // TODO showInfoDialog("Connection already exists")
        return;
    }
    var _a = __classPrivateFieldGet(this, _ModularEnvironment_service, "f").project, editing = _a.editing, boxGraph = _a.boxGraph;
    editing.modify(function () { return studio_boxes_1.ModuleConnectionBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
        box.collection.refer(__classPrivateFieldGet(_this, _ModularEnvironment_modularAdapter, "f").box.connections);
        box.source.refer(source.field);
        box.target.refer(target.field);
    }); });
};
