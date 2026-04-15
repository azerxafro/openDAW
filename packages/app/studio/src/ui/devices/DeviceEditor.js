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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceEditor = void 0;
var DeviceEditor_sass_inline_1 = require("./DeviceEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var MenuButton_tsx_1 = require("@/ui/components/MenuButton.tsx");
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var debug_ts_1 = require("@/ui/menu/debug.ts");
var DragAndDrop_1 = require("@/ui/DragAndDrop");
var lib_dom_1 = require("@opendaw/lib-dom");
var TextScroller_1 = require("@/ui/TextScroller");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var Surface_1 = require("@/ui/surface/Surface");
var className = lib_dom_1.Html.adoptStyleSheet(DeviceEditor_sass_inline_1.default, "DeviceEditor");
var getColorFor = function (type) {
    switch (type) {
        case "midi-effect":
            return studio_enums_1.Colors.orange;
        case "bus":
        case "instrument":
            return studio_enums_1.Colors.green;
        case "audio-effect":
            return studio_enums_1.Colors.blue;
    }
};
var defaultLabelFactory = function (lifecycle, editing, labelField) {
    return function () { return (<h1 onInit={function (element) {
            lifecycle.ownAll(TextScroller_1.TextScroller.install(element), labelField.catchupAndSubscribe(function (owner) { return element.textContent = owner.getValue(); }), lib_dom_1.Events.subscribeDblDwn(element, function (event) { return __awaiter(void 0, void 0, void 0, function () {
                var _a, status, error, value;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(Surface_1.Surface.get(element)
                                .requestFloatingTextInput(event, labelField.getValue()))];
                        case 1:
                            _a = _b.sent(), status = _a.status, error = _a.error, value = _a.value;
                            if (status === "rejected") {
                                if (!lib_std_1.Errors.isAbort(error)) {
                                    return [2 /*return*/, (0, lib_std_1.panic)(error)];
                                }
                            }
                            else {
                                editing.modify(function () { return labelField.setValue(value); });
                            }
                            return [2 /*return*/];
                    }
                });
            }); }));
        }}/>); };
};
var DeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, adapter = _a.adapter, populateMenu = _a.populateMenu, populateControls = _a.populateControls, populateMeter = _a.populateMeter, createLabel = _a.createLabel, icon = _a.icon, customClassName = _a.className;
    var editing = project.editing;
    var box = adapter.box, type = adapter.type, enabledField = adapter.enabledField, minimizedField = adapter.minimizedField, labelField = adapter.labelField;
    var color = getColorFor(type);
    return (<div className={lib_dom_1.Html.buildClassList(className, customClassName)} onInit={function (element) {
            lifecycle.ownAll(enabledField.catchupAndSubscribe(function (owner) {
                return element.classList.toggle("enabled", owner.getValue());
            }), minimizedField.catchupAndSubscribe(function (owner) {
                return element.classList.toggle("minimized", owner.getValue());
            }));
        }} data-drag>
                <header tabIndex={0} onpointerdown={function (event) {
            var deviceSelection = project.deviceSelection;
            if (event.shiftKey) {
                if (deviceSelection.isSelected(adapter)) {
                    deviceSelection.deselect(adapter);
                }
                else {
                    deviceSelection.select(adapter);
                }
            }
            else {
                deviceSelection.deselectAll();
                deviceSelection.select(adapter);
            }
        }} onInit={function (element) {
            var updateSelected = function () {
                return element.classList.toggle("selected", project.deviceSelection.isSelected(adapter));
            };
            lifecycle.ownAll(project.deviceSelection.catchupAndSubscribe({
                onSelected: updateSelected,
                onDeselected: updateSelected
            }), studio_core_1.ClipboardManager.install(element, studio_core_1.DevicesClipboard.createHandler({
                getEnabled: function () { return true; },
                editing: project.editing,
                selection: project.deviceSelection,
                boxGraph: project.boxGraph,
                boxAdapters: project.boxAdapters,
                getHost: function () {
                    if (studio_adapters_1.Devices.isHost(adapter)) {
                        return lib_std_1.Option.wrap(adapter);
                    }
                    return lib_std_1.Option.wrap(adapter.deviceHost());
                }
            })));
            if (type === "midi-effect" || type === "audio-effect") {
                var effect_1 = adapter;
                lifecycle.own(DragAndDrop_1.DragAndDrop.installSource(element, function () { return ({
                    type: effect_1.type,
                    start_index: effect_1.indexField.getValue()
                }); }, element));
            }
        }} style={{ color: color.toString() }}>
                    <Icon_tsx_1.Icon symbol={icon} onInit={function (element) {
            return lifecycle.ownAll(lib_dom_1.Events.subscribe(element, "pointerdown", function (event) { return event.stopPropagation(); }), lib_dom_1.Events.subscribe(element, "click", function () { return editing.modify(function () { return minimizedField.toggle(); }); }));
        }}/>
                    <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Shutdown} onInit={function (element) {
            return lifecycle.ownAll(lib_dom_1.Events.subscribe(element, "pointerdown", function (event) { return event.stopPropagation(); }), lib_dom_1.Events.subscribe(element, "click", function () { return editing.modify(function () { return enabledField.toggle(); }); }));
        }}/>
                    {(createLabel !== null && createLabel !== void 0 ? createLabel : defaultLabelFactory(lifecycle, editing, labelField))()}
                </header>
                <MenuButton_tsx_1.MenuButton root={studio_core_1.MenuItem.root()
            .setRuntimeChildrenProcedure(function (parent) {
            populateMenu(parent);
            parent.addMenuItem(debug_ts_1.DebugMenus.debugBox(box));
        })} style={{ minWidth: "0", fontSize: "0.75em" }} appearance={{ color: color, activeColor: studio_enums_1.Colors.bright }}>
                    <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Menu}/>
                </MenuButton_tsx_1.MenuButton>
                <lib_jsx_1.Group>{minimizedField.getValue() ? null : populateControls()}</lib_jsx_1.Group>
                <lib_jsx_1.Group>{populateMeter()}</lib_jsx_1.Group>
                <div />
            </div>);
};
exports.DeviceEditor = DeviceEditor;
