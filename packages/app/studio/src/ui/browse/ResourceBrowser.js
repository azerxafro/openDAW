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
exports.ResourceBrowser = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_core_1 = require("@opendaw/studio-core");
var ThreeDots_tsx_1 = require("@/ui/spinner/ThreeDots.tsx");
var SearchInput_1 = require("@/ui/components/SearchInput");
var RadioGroup_1 = require("@/ui/components/RadioGroup");
var Icon_1 = require("@/ui/components/Icon");
var HTMLSelection_1 = require("@/ui/HTMLSelection");
var ResourceBrowser = function (_a) {
    var _b;
    var lifecycle = _a.lifecycle, service = _a.service, config = _a.config, className = _a.className, background = _a.background, fontSize = _a.fontSize, location = _a.location;
    var entries = <div className="scrollable"/>;
    var selection = lifecycle.own(new HTMLSelection_1.HTMLSelection(entries));
    var resourceSelection = config.createSelection(service, selection);
    var entriesLifeSpan = lifecycle.own(new lib_std_1.Terminator());
    var reload = lib_jsx_1.Inject.ref();
    var filter = new lib_std_1.DefaultObservableValue("");
    var searchInput = <SearchInput_1.SearchInput lifecycle={lifecycle} model={filter} style={{ gridColumn: "1 / -1" }}/>;
    var element = (<div className={lib_dom_1.Html.buildClassList(className, background && "background")} tabIndex={-1} style={{ fontSize: fontSize }}>
            <div className="filter">
                <RadioGroup_1.RadioGroup lifecycle={lifecycle} model={location} elements={[
            {
                value: 0 /* AssetLocation.OpenDAW */,
                element: <Icon_1.Icon symbol={studio_enums_1.IconSymbol.CloudFolder}/>,
                tooltip: "Online ".concat(config.name.toLowerCase())
            },
            {
                value: 1 /* AssetLocation.Local */,
                element: <Icon_1.Icon symbol={studio_enums_1.IconSymbol.UserFolder}/>,
                tooltip: "Locally stored ".concat(config.name.toLowerCase())
            }
        ]} appearance={{ framed: true, landscape: true }}/>
                {searchInput}
            </div>
            <header>
                {config.headers.map(function (header) { return (<span className={header.align === "right" ? "right" : undefined}>
                        {header.label}
                    </span>); })}
            </header>
            <div className="content">
                <lib_jsx_1.Hotspot ref={reload} render={function () {
            var _a;
            (_a = config.onReload) === null || _a === void 0 ? void 0 : _a.call(config);
            entriesLifeSpan.terminate();
            return (<lib_jsx_1.Await factory={function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (location.getValue()) {
                            case 0 /* AssetLocation.OpenDAW */:
                                return [2 /*return*/, config.fetchOnline()];
                            case 1 /* AssetLocation.Local */:
                                return [2 /*return*/, config.fetchLocal()];
                        }
                        return [2 /*return*/];
                    });
                }); }} loading={function () { return (<div><ThreeDots_tsx_1.ThreeDots /></div>); }} failure={function (_a) {
                    var reason = _a.reason, retry = _a.retry;
                    return (<div className="error" onclick={retry}>
                                    {reason instanceof DOMException ? reason.name : String(reason)}
                                </div>);
                }} success={function (result) {
                    var update = function () {
                        entriesLifeSpan.terminate();
                        selection.clear();
                        (0, lib_jsx_1.replaceChildren)(entries, result
                            .filter(function (item) { return config.resolveEntryName(item).toLowerCase().includes(filter.getValue().toLowerCase()); })
                            .toSorted(function (a, b) { return (0, lib_std_1.StringComparator)(config.resolveEntryName(a).toLowerCase(), config.resolveEntryName(b).toLowerCase()); })
                            .map(function (item) { return config.renderEntry({
                            lifecycle: entriesLifeSpan,
                            service: service,
                            selection: resourceSelection,
                            item: item,
                            location: location.getValue(),
                            refresh: function () { return reload.get().update(); }
                        }); }));
                    };
                    var debounceSetLocation = lib_runtime_1.Runtime.debounce(function () {
                        location.setValue(1 /* AssetLocation.Local */);
                        reload.get().update();
                    }, 500);
                    lifecycle.own(filter.catchupAndSubscribe(update));
                    lifecycle.own(service.subscribeSignal(debounceSetLocation, config.importSignal));
                    searchInput.focus();
                    return entries;
                }}/>);
        }}>
                </lib_jsx_1.Hotspot>
            </div>
            {(_b = config.footer) === null || _b === void 0 ? void 0 : _b.call(config, { lifecycle: lifecycle, service: service })}
        </div>);
    lifecycle.ownAll(location.subscribe(function () { return reload.get().update(); }), lib_std_1.RuntimeSignal.subscribe(function (signal) { return signal === studio_core_1.ProjectSignals.StorageUpdated && reload.get().update(); }), { terminate: function () { var _a; return (_a = config.onTerminate) === null || _a === void 0 ? void 0 : _a.call(config); } }, lib_dom_1.Events.subscribe(element, "keydown", function (event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (lib_dom_1.Events.isTextInput(event.target)) {
                        return [2 /*return*/];
                    }
                    if (!(lib_dom_1.Keyboard.isDelete(event) && location.getValue() === 1 /* AssetLocation.Local */)) return [3 /*break*/, 2];
                    return [4 /*yield*/, resourceSelection.deleteSelected()];
                case 1:
                    _a.sent();
                    reload.get().update();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }));
    return element;
};
exports.ResourceBrowser = ResourceBrowser;
