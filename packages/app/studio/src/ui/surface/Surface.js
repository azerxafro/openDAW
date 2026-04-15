"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Surface = void 0;
var Surface_sass_inline_1 = require("./Surface.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var IconLibrary_tsx_1 = require("@/ui/IconLibrary.tsx");
var ValueTooltip_tsx_1 = require("@/ui/surface/ValueTooltip.tsx");
var TextTooltip_1 = require("./TextTooltip");
var FloatingTextInput_tsx_1 = require("@/ui/components/FloatingTextInput.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(Surface_sass_inline_1.default, "Surface");
var Surface = /** @class */ (function () {
    function Surface(owner, name, parent) {
        var _b;
        _Surface_instances.add(this);
        _Surface_owner.set(this, void 0);
        _Surface_name.set(this, void 0);
        _Surface_parent.set(this, void 0);
        _Surface_terminator.set(this, void 0);
        _Surface_ground.set(this, void 0);
        _Surface_flyout.set(this, void 0);
        _Surface_floating.set(this, void 0);
        _Surface_textTooltip.set(this, void 0);
        _Surface_valueTooltip.set(this, void 0);
        _Surface_pointer.set(this, void 0);
        __classPrivateFieldSet(this, _Surface_owner, owner, "f");
        __classPrivateFieldSet(this, _Surface_name, name, "f");
        __classPrivateFieldSet(this, _Surface_parent, parent, "f");
        __classPrivateFieldSet(this, _Surface_terminator, (_b = parent === null || parent === void 0 ? void 0 : parent.spawn()) !== null && _b !== void 0 ? _b : new lib_std_1.Terminator(), "f");
        __classPrivateFieldGet(this, _Surface_terminator, "f").own({ terminate: function () { return owner.close(); } });
        __classPrivateFieldSet(this, _Surface_ground, <div className="ground"/>, "f");
        __classPrivateFieldSet(this, _Surface_flyout, <div className="flyout"/>, "f");
        __classPrivateFieldSet(this, _Surface_floating, <div className="flyout"/>, "f");
        __classPrivateFieldSet(this, _Surface_textTooltip, new TextTooltip_1.TextTooltip(this), "f");
        __classPrivateFieldSet(this, _Surface_valueTooltip, new ValueTooltip_tsx_1.ValueTooltip(this), "f");
        __classPrivateFieldSet(this, _Surface_pointer, lib_std_1.Point.zero(), "f");
        owner.document.body.appendChild(<div className={className}>
                <IconLibrary_tsx_1.IconLibrary />
                {__classPrivateFieldGet(this, _Surface_ground, "f")}
                {__classPrivateFieldGet(this, _Surface_flyout, "f")}
                {__classPrivateFieldGet(this, _Surface_floating, "f")}
            </div>);
        __classPrivateFieldGet(this, _Surface_instances, "m", _Surface_listen).call(this);
    }
    Surface.main = function (configurator, errorHandler) {
        (0, lib_std_1.assert)(!(0, lib_std_1.isDefined)(__classPrivateFieldGet(this, _a, "f", _Surface_configurator)), "Main must only be called once");
        __classPrivateFieldSet(this, _a, configurator, "f", _Surface_configurator);
        var surface = this.create(window, "main", null);
        errorHandler.install(window, "main");
        return surface;
    };
    Surface.dispatchGlobalKey = function (type, event) {
        if (lib_dom_1.Events.isAutofillEvent(event)) {
            return;
        }
        if (lib_dom_1.Keyboard.isControlKey(event) && event.code === "KeyA") {
            if (!lib_dom_1.Events.isTextInput(event.target)) {
                event.preventDefault();
            }
        }
        else if (event.code === "Escape") {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        }
        for (var _i = 0, _b = __classPrivateFieldGet(this, _a, "f", _Surface_keyListeners).get(type); _i < _b.length; _i++) {
            var procedure = _b[_i].procedure;
            procedure(event);
            if (event.defaultPrevented) {
                return;
            }
        }
    };
    Surface.subscribeKeyboard = function (type, procedure, priority) {
        var _this = this;
        if (priority === void 0) { priority = 0; }
        var value = { priority: priority, procedure: procedure };
        __classPrivateFieldGet(this, _a, "f", _Surface_keyListeners).add(type, value);
        return { terminate: function () { return __classPrivateFieldGet(_this, _a, "f", _Surface_keyListeners).remove(type, value); } };
    };
    Surface.create = function (owner, name, parent) {
        var _this = this;
        var surface = new _a(owner, name, parent);
        (0, lib_std_1.asDefined)(__classPrivateFieldGet(this, _a, "f", _Surface_configurator), "main not been called").config(surface);
        (0, lib_std_1.assert)(!__classPrivateFieldGet(this, _a, "f", _Surface_surfacesByWindow).has(owner), "".concat(owner.name, " already has a surface"));
        __classPrivateFieldGet(this, _a, "f", _Surface_surfacesByWindow).set(owner, surface);
        surface.own({ terminate: function () { return __classPrivateFieldGet(_this, _a, "f", _Surface_surfacesByWindow).delete(owner); } });
        return surface;
    };
    Surface.forEach = function (procedure) { __classPrivateFieldGet(this, _a, "f", _Surface_surfacesByWindow).forEach(procedure); };
    Surface.get = function (proxyOrElement) {
        var key = __classPrivateFieldGet(this, _a, "m", _Surface_findWindowProxy).call(this, proxyOrElement);
        return (0, lib_std_1.asDefined)(__classPrivateFieldGet(this, _a, "f", _Surface_surfacesByWindow).get(key) || __classPrivateFieldGet(this, _a, "f", _Surface_surfacesByWindow).get(window), "No surfaces defined");
    };
    Surface.getById = function (id) { return lib_std_1.Option.wrap(__classPrivateFieldGet(this, _a, "f", _Surface_surfaceById).get(id)); };
    Surface.prototype.own = function (terminable) { return __classPrivateFieldGet(this, _Surface_terminator, "f").own(terminable); };
    Surface.prototype.ownAll = function () {
        var _b;
        var terminables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            terminables[_i] = arguments[_i];
        }
        (_b = __classPrivateFieldGet(this, _Surface_terminator, "f")).ownAll.apply(_b, terminables);
    };
    Surface.prototype.spawn = function () { return __classPrivateFieldGet(this, _Surface_terminator, "f").spawn(); };
    Object.defineProperty(Surface.prototype, "name", {
        get: function () { return __classPrivateFieldGet(this, _Surface_name, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Surface.prototype, "pointer", {
        get: function () { return __classPrivateFieldGet(this, _Surface_pointer, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Surface.prototype, "ground", {
        get: function () { return __classPrivateFieldGet(this, _Surface_ground, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Surface.prototype, "flyout", {
        get: function () {
            var toRemove = Array.from(__classPrivateFieldGet(this, _Surface_flyout, "f").children);
            /**
             * We need to postpone this due to an unexpected browser behavior.
             * For some unknown reason <code>Html.empty(this.#flyout)</code> will lead to:
             *
             * NotFoundError: Failed to execute 'remove' on 'Element':
             * The node to be removed is no longer a child of this node. Perhaps it was moved in a 'blur' event handler?
             *
             * If anybody can explain why this code thrown an error, I owe you a beer.
             * The intention of this code is to allow only one flyout.
             */
            lib_dom_1.AnimationFrame.once(function () { return toRemove.forEach(function (element) {
                var _b = (0, lib_std_1.tryCatch)(function () { if (element.isConnected) {
                    element.remove();
                } }), status = _b.status, error = _b.error;
                if (status === "failure") {
                    console.warn(error);
                }
            }); });
            return __classPrivateFieldGet(this, _Surface_flyout, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Surface.prototype, "floating", {
        get: function () { return __classPrivateFieldGet(this, _Surface_floating, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Surface.prototype, "hasFlyout", {
        get: function () { return __classPrivateFieldGet(this, _Surface_flyout, "f").firstChild !== null; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Surface.prototype, "owner", {
        get: function () { return __classPrivateFieldGet(this, _Surface_owner, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Surface.prototype, "width", {
        get: function () { return __classPrivateFieldGet(this, _Surface_owner, "f").innerWidth; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Surface.prototype, "height", {
        get: function () { return __classPrivateFieldGet(this, _Surface_owner, "f").innerHeight; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Surface.prototype, "textTooltip", {
        get: function () { return __classPrivateFieldGet(this, _Surface_textTooltip, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Surface.prototype, "valueTooltip", {
        get: function () { return __classPrivateFieldGet(this, _Surface_valueTooltip, "f"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Surface.prototype, "body", {
        get: function () { return __classPrivateFieldGet(this, _Surface_owner, "f").document.body; },
        enumerable: false,
        configurable: true
    });
    Surface.prototype.close = function () {
        if (this.root() === this) {
            return (0, lib_std_1.panic)("You cannot close the main window.");
        }
        else {
            __classPrivateFieldGet(this, _Surface_owner, "f").close();
        }
    };
    Surface.prototype.new = function (width, height, id, name) {
        if (name === void 0) { name = "untitled"; }
        var existing = __classPrivateFieldGet(_a, _a, "f", _Surface_surfaceById).get(id);
        if ((0, lib_std_1.isDefined)(existing)) {
            return (0, lib_std_1.panic)("".concat(id, " is already open"));
        }
        width = Math.min(__classPrivateFieldGet(this, _Surface_owner, "f").innerWidth, width);
        height = Math.min(__classPrivateFieldGet(this, _Surface_owner, "f").innerHeight, height);
        var x = (__classPrivateFieldGet(this, _Surface_owner, "f").innerWidth - width) >> 1;
        var y = (__classPrivateFieldGet(this, _Surface_owner, "f").innerHeight - height) >> 1;
        var features = {
            left: x, top: y,
            width: width,
            height: height,
            toolbar: 0, location: 0, directories: 0, status: 0,
            menubar: 0, titlebar: 0, scrollbars: 0, resizable: 1
        };
        var owner = __classPrivateFieldGet(this, _Surface_owner, "f").open(undefined, id, stringifyFeatures(features));
        if (owner === null) {
            return lib_std_1.Option.None;
        }
        owner.name = name;
        owner.document.title = name;
        __classPrivateFieldGet(this, _Surface_instances, "m", _Surface_copyHeadElements).call(this, owner);
        var surface = _a.create(owner, name, this);
        __classPrivateFieldGet(_a, _a, "f", _Surface_surfaceById).set(id, surface);
        return lib_std_1.Option.wrap(surface);
    };
    Surface.prototype.root = function () {
        var surface = this;
        do {
            if (__classPrivateFieldGet(surface, _Surface_parent, "f") === null) {
                return surface;
            }
            surface = __classPrivateFieldGet(surface, _Surface_parent, "f");
        } while (true);
    };
    Surface.prototype.requestFloatingTextInput = function (client, value) {
        return __awaiter(this, void 0, void 0, function () {
            var resolvers;
            return __generator(this, function (_b) {
                resolvers = Promise.withResolvers();
                this.flyout.appendChild((0, FloatingTextInput_tsx_1.FloatingTextInput)({
                    position: { x: client.clientX, y: client.clientY },
                    value: value !== null && value !== void 0 ? value : "Type new value...",
                    resolvers: resolvers
                }));
                return [2 /*return*/, resolvers.promise.catch(function () { return value !== null && value !== void 0 ? value : ""; })];
            });
        });
    };
    Surface.prototype.toString = function () {
        return "Surface name: ".concat(__classPrivateFieldGet(this, _Surface_name, "f"));
    };
    var _Surface_instances, _a, _Surface_keyListeners, _Surface_findWindowProxy, _Surface_configurator, _Surface_surfaceById, _Surface_surfacesByWindow, _Surface_owner, _Surface_name, _Surface_parent, _Surface_terminator, _Surface_ground, _Surface_flyout, _Surface_floating, _Surface_textTooltip, _Surface_valueTooltip, _Surface_pointer, _Surface_copyHeadElements, _Surface_listen, _Surface_adoptAnimationFrame;
    _a = Surface, _Surface_owner = new WeakMap(), _Surface_name = new WeakMap(), _Surface_parent = new WeakMap(), _Surface_terminator = new WeakMap(), _Surface_ground = new WeakMap(), _Surface_flyout = new WeakMap(), _Surface_floating = new WeakMap(), _Surface_textTooltip = new WeakMap(), _Surface_valueTooltip = new WeakMap(), _Surface_pointer = new WeakMap(), _Surface_instances = new WeakSet(), _Surface_findWindowProxy = function _Surface_findWindowProxy(element) {
        if (element instanceof Element) {
            var defaultView = element.ownerDocument.defaultView;
            if (defaultView !== null) {
                return defaultView;
            }
        }
        if (element !== undefined && "self" in element && element.self === element) {
            return element;
        }
        return window;
    }, _Surface_copyHeadElements = function _Surface_copyHeadElements(proxy) {
        var source = __classPrivateFieldGet(this.root(), _Surface_owner, "f").document;
        var target = proxy.document;
        var elements = Array.from(source.head.children).filter(function (child) { return child.tagName.toLowerCase() !== "script"; });
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            target.head.append(element.cloneNode(true));
        }
        for (var _b = 0, _c = source.adoptedStyleSheets; _b < _c.length; _b++) {
            var sheet = _c[_b];
            var styleElement = target.createElement("style");
            styleElement.textContent = Array.from(sheet.cssRules).map(function (rule) { return rule.cssText; }).join("\n");
            target.head.appendChild(styleElement);
        }
        (0, studio_enums_1.initializeColors)(target.documentElement);
    }, _Surface_listen = function _Surface_listen() {
        var _this = this;
        // Workaround for not receiving outside pointer-up events
        // If you click inside the browser window, move outside, add another (mouse) button
        // and release both, no pointerup is fired.
        // TODO I see that way too often on Windows machines in error reports.
        //  There is still something off.
        var pointerDown = lib_std_1.Option.None;
        var document = __classPrivateFieldGet(this, _Surface_owner, "f").document;
        __classPrivateFieldGet(this, _Surface_terminator, "f").ownAll(lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Surface_owner, "f"), "pointerdown", function (event) {
            if (pointerDown.nonEmpty()) {
                // TODO There is a strange behavior on some machines, where it appears
                //  that the pointerdown event is sent twice immediately (related to to-do above)
                console.debug("simulate pointerup onpointerdown", Date.now());
                pointerDown.unwrap().dispatchEvent(new PointerEvent("pointerup", event));
                pointerDown = lib_std_1.Option.None;
            }
            __classPrivateFieldGet(_this, _Surface_pointer, "f").x = event.clientX;
            __classPrivateFieldGet(_this, _Surface_pointer, "f").y = event.clientY;
            pointerDown = lib_std_1.Option.wrap(event.target);
        }, { capture: true }), lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Surface_owner, "f"), "pointermove", function (event) {
            if (pointerDown.nonEmpty() && event.buttons === 0) {
                console.debug("simulate pointerup pointermove");
                pointerDown.unwrap().dispatchEvent(new PointerEvent("pointerup", event));
                pointerDown = lib_std_1.Option.None;
            }
            __classPrivateFieldGet(_this, _Surface_pointer, "f").x = event.clientX;
            __classPrivateFieldGet(_this, _Surface_pointer, "f").y = event.clientY;
        }, { capture: true }), lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Surface_owner, "f"), "pointerup", function (_event) {
            pointerDown = lib_std_1.Option.None;
        }, { capture: true }), lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Surface_owner, "f"), "dragover", function (event) {
            __classPrivateFieldGet(_this, _Surface_pointer, "f").x = event.clientX;
            __classPrivateFieldGet(_this, _Surface_pointer, "f").y = event.clientY;
        }, { capture: true }), lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Surface_owner, "f"), "dragend", function (_event) {
            pointerDown = lib_std_1.Option.None;
        }, { capture: true }), lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Surface_owner, "f"), "beforeunload", function () {
            if (__classPrivateFieldGet(_this, _Surface_owner, "f") === self) {
                return;
            } // We are leaving the main window. Nothing to do.
            console.debug("Before-unload surface: '".concat(__classPrivateFieldGet(_this, _Surface_owner, "f").name, "'"));
            for (var _i = 0, _b = __classPrivateFieldGet(_a, _a, "f", _Surface_surfaceById).entries(); _i < _b.length; _i++) {
                var _c = _b[_i], id = _c[0], surface = _c[1];
                if (surface === _this) {
                    __classPrivateFieldGet(_a, _a, "f", _Surface_surfaceById).delete(id);
                    break;
                }
            }
            __classPrivateFieldGet(_a, _a, "f", _Surface_surfacesByWindow).delete(__classPrivateFieldGet(_this, _Surface_owner, "f"));
            __classPrivateFieldGet(_this, _Surface_terminator, "f").terminate();
            __classPrivateFieldGet(_this, _Surface_instances, "m", _Surface_adoptAnimationFrame).call(_this);
        }, { capture: true, once: true }), lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Surface_owner, "f"), "keydown", function (event) {
            return _a.dispatchGlobalKey("keydown", event);
        }), lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Surface_owner, "f"), "keypress", function (event) {
            return _a.dispatchGlobalKey("keypress", event);
        }), lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Surface_owner, "f"), "keyup", function (event) {
            return _a.dispatchGlobalKey("keyup", event);
        }), 
        // Seems to reset the custom cursor faithfully when leaving and re-entering the studio (blur did not)
        lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Surface_owner, "f"), "focus", function () { return lib_dom_1.AnimationFrame.once(function () { return lib_dom_1.CssUtils.setCursor("auto"); }); }), 
        // Ctrl + scroll on Linux can affect web UI elements because it typically triggers zoom in most browsers.
        lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Surface_owner, "f"), "wheel", function (event) {
            if (event.ctrlKey) {
                event.preventDefault();
            }
        }, { passive: false }), lib_dom_1.Events.subscribe(__classPrivateFieldGet(this, _Surface_owner, "f"), "contextmenu", function (event) {
            event.preventDefault();
            event.stopPropagation();
            lib_dom_1.AnimationFrame.once(function () { return lib_dom_1.CssUtils.setCursor("auto"); });
        }, { capture: true }), lib_dom_1.Events.subscribe(document.body, "touchmove", lib_dom_1.Events.PreventDefault, { capture: true }), lib_dom_1.Events.subscribeAny(document, "visibilitychange", function () { return __classPrivateFieldGet(_this, _Surface_instances, "m", _Surface_adoptAnimationFrame).call(_this); }, { capture: true }));
    }, _Surface_adoptAnimationFrame = function _Surface_adoptAnimationFrame() {
        for (var _i = 0, _b = __classPrivateFieldGet(_a, _a, "f", _Surface_surfacesByWindow).keys(); _i < _b.length; _i++) {
            var owner = _b[_i];
            if (!owner.document.hidden) {
                lib_dom_1.AnimationFrame.start(owner);
                return;
            }
        }
    };
    _Surface_keyListeners = { value: new lib_std_1.ArrayMultimap(undefined, function (_b, _c) {
            var a = _b.priority;
            var b = _c.priority;
            return b - a;
        }) };
    Surface.isAvailable = function () { return (0, lib_std_1.isDefined)(__classPrivateFieldGet(_a, _a, "f", _Surface_configurator)); };
    _Surface_configurator = { value: null };
    _Surface_surfaceById = { value: new Map() };
    _Surface_surfacesByWindow = { value: new Map() };
    return Surface;
}());
exports.Surface = Surface;
var stringifyFeatures = function (features) {
    return Object.entries(features).map(function (_b) {
        var key = _b[0], value = _b[1];
        return "".concat(key, "=").concat(value);
    }).join(",");
};
