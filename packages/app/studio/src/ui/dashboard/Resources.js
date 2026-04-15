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
exports.Resources = void 0;
var Resources_sass_inline_1 = require("./Resources.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var ProjectBrowser_1 = require("@/project/ProjectBrowser");
var dialogs_1 = require("@/ui/components/dialogs");
var SampleBrowser_1 = require("@/ui/browse/SampleBrowser");
var SoundfontBrowser_1 = require("@/ui/browse/SoundfontBrowser");
var RadioGroup_1 = require("@/ui/components/RadioGroup");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(Resources_sass_inline_1.default, "Resources");
var Resources = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var scope = new lib_std_1.DefaultObservableValue(0);
    return (<div className={className}>
            <RadioGroup_1.RadioGroup lifecycle={lifecycle} style={{ columnGap: "1em" }} appearance={{ activeColor: studio_enums_1.Colors.orange }} model={scope} elements={[
            { value: 0, element: (<h3>Projects</h3>) },
            { value: 1, element: (<h3>Samples</h3>) },
            { value: 2, element: (<h3>Soundfonts</h3>) }
        ]}/>
            <div style={{ display: "contents" }} onInit={function (element) {
            var scopeLifeCycle = lifecycle.own(new lib_std_1.Terminator());
            lifecycle.own(scope.catchupAndSubscribe(function (owner) {
                (0, lib_jsx_1.replaceChildren)(element);
                scopeLifeCycle.terminate();
                switch (owner.getValue()) {
                    case 0:
                        (0, lib_jsx_1.replaceChildren)(element, (<ProjectBrowser_1.ProjectBrowser service={service} lifecycle={scopeLifeCycle} select={function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
                                var handler;
                                var uuid = _b[0], meta = _b[1];
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            handler = dialogs_1.Dialogs.processMonolog("Loading...");
                                            return [4 /*yield*/, service.projectProfileService.load(uuid, meta)];
                                        case 1:
                                            _c.sent();
                                            handler.close();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }}/>));
                        break;
                    case 1:
                        (0, lib_jsx_1.replaceChildren)(element, (<SampleBrowser_1.SampleBrowser lifecycle={scopeLifeCycle} service={service}/>));
                        break;
                    case 2:
                        (0, lib_jsx_1.replaceChildren)(element, (<SoundfontBrowser_1.SoundfontBrowser lifecycle={scopeLifeCycle} service={service}/>));
                        break;
                }
            }));
        }}>
            </div>
        </div>);
};
exports.Resources = Resources;
