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
exports.ErrorsPage = void 0;
var ErrorsPage_sass_inline_1 = require("./ErrorsPage.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var ErrorEntry_1 = require("@/ui/pages/errors/ErrorEntry");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(ErrorsPage_sass_inline_1.default, "ErrorsPage");
var loadLimit = 100;
var ErrorsPage = function (_a) {
    var lifecycle = _a.lifecycle;
    var offset = 0;
    var loadMore = function () { return fetch("https://logs.opendaw.studio/list.php?offset=".concat(offset, "&limit=").concat(loadLimit))
        .then(function (response) {
        offset += loadLimit;
        return response.json();
    })
        .then(function (entries) { return entries; }, function () { return []; }); };
    return (<div className={className}>
            <h1>Errors</h1>
            <p>This page shows all errors reported from users running openDAW in production, helping us identify and fix
                issues.</p>
            <h5>Report any issues <a href="https://github.com/andremichelle/opendaw/issues/" target="github" style={{ color: studio_enums_1.Colors.blue }}>here</a>.</h5>
            <code onInit={function (element) { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        element.textContent = "loading status...";
                        _a = element;
                        return [4 /*yield*/, fetch("https://logs.opendaw.studio/status.php").then(function (x) { return x.json(); })
                                .then(function (x) { return Object.entries(x).map(function (_a) {
                                var key = _a[0], value = _a[1];
                                return "".concat(key, ": ").concat(value);
                            }).join(", "); })];
                    case 1:
                        _a.textContent = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }} style={{ fontSize: "10px", marginBottom: "1em", color: studio_enums_1.Colors.blue.toString() }}/>
            <lib_jsx_1.Await factory={function () { return loadMore(); }} failure={function (error) { return "Unknown request (".concat(error.reason, ")"); }} loading={function () { return <p>loading...</p>; }} success={function (entries) {
            var list = (<div className="list">
                            <lib_jsx_1.Group>
                                <h4>#</h4>
                                <h4>Time</h4>
                                <h4>Build</h4>
                                <h4>Type</h4>
                                <h4>Message</h4>
                                <h4>JS</h4>
                                <h4>Browser</h4>
                                <h4>Stack</h4>
                                <h4>Logs</h4>
                                <h4>Fixed</h4>
                            </lib_jsx_1.Group>
                        </div>);
            var wrapper = (<div className="list-wrapper">{list}</div>);
            var createRows = function (entries) {
                return list.append.apply(list, entries.map(function (entry) { return (<ErrorEntry_1.ErrorEntry entry={entry}/>); }));
            };
            createRows(entries);
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var entries_1, subscription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, lib_runtime_1.Wait.frame()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!(list.scrollHeight < wrapper.clientHeight)) return [3 /*break*/, 5];
                            return [4 /*yield*/, loadMore()];
                        case 3:
                            entries_1 = _a.sent();
                            if (entries_1.length === 0)
                                return [2 /*return*/];
                            createRows(entries_1);
                            return [4 /*yield*/, lib_runtime_1.Wait.frame()];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 2];
                        case 5:
                            subscription = lib_dom_1.Events.subscribe(wrapper, "scroll", lib_runtime_1.Promises.sequentialize(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var threshold, entries_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            threshold = 64;
                                            if (!(wrapper.scrollTop + wrapper.clientHeight >= list.scrollHeight - threshold)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, loadMore()];
                                        case 1:
                                            entries_2 = _a.sent();
                                            if (entries_2.length > 0) {
                                                createRows(entries_2);
                                            }
                                            else {
                                                subscription.terminate();
                                            }
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); }));
                            lifecycle.own(subscription);
                            return [2 /*return*/];
                    }
                });
            }); })();
            return wrapper;
        }}/>
        </div>);
};
exports.ErrorsPage = ErrorsPage;
