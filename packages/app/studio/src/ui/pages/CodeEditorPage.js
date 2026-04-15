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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeEditorPage = void 0;
var CodeEditorPage_sass_inline_1 = require("./CodeEditorPage.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var factory_1 = require("@/monaco/factory");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var ThreeDots_1 = require("@/ui/spinner/ThreeDots");
var Button_1 = require("@/ui/components/Button");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_std_1 = require("@opendaw/lib-std");
var studio_scripting_1 = require("@opendaw/studio-scripting");
var MenuButton_1 = require("@/ui/components/MenuButton");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var ScriptWorker_js_worker_url_1 = require("@opendaw/studio-scripting/ScriptWorker.js?worker&url");
var simple_ts_raw_1 = require("./code-editor/examples/simple.ts?raw");
var retro_ts_raw_1 = require("./code-editor/examples/retro.ts?raw");
var create_sample_ts_raw_1 = require("./code-editor/examples/create-sample.ts?raw");
var nano_wavetable_ts_raw_1 = require("./code-editor/examples/nano-wavetable.ts?raw");
var stress_test_ts_raw_1 = require("./code-editor/examples/stress-test.ts?raw");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_box_1 = require("@opendaw/lib-box");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var truncateImports = function (script) { return script.substring(script.indexOf("//")); };
var Examples = {
    Simple: truncateImports(simple_ts_raw_1.default),
    Retro: truncateImports(retro_ts_raw_1.default),
    AudioRegion: truncateImports(create_sample_ts_raw_1.default),
    NanoWavetable: truncateImports(nano_wavetable_ts_raw_1.default),
    StressTest: truncateImports(stress_test_ts_raw_1.default)
};
var className = lib_dom_1.Html.adoptStyleSheet(CodeEditorPage_sass_inline_1.default, "CodeEditorPage");
var CodeEditorPage = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var pendingSamples = lib_std_1.UUID.newSet(function (uuid) { return uuid; });
    var host = new studio_scripting_1.ScriptHost({
        openProject: function (buffer, name) {
            var boxGraph = new lib_box_1.BoxGraph(lib_std_1.Option.wrap(studio_boxes_1.BoxIO.create));
            boxGraph.fromArrayBuffer(buffer, false);
            var mandatoryBoxes = studio_adapters_1.ProjectSkeleton.findMandatoryBoxes(boxGraph);
            var project = studio_core_1.Project.fromSkeleton(service, { boxGraph: boxGraph, mandatoryBoxes: mandatoryBoxes });
            pendingSamples.forEach(function (uuid) { return project.trackUserCreatedSample(uuid); });
            pendingSamples.clear();
            service.projectProfileService.setProject(project, name !== null && name !== void 0 ? name : "Scripted Project");
            service.switchScreen("default");
        },
        fetchProject: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, service.projectProfileService.getValue().match({
                        none: function () { return (0, lib_std_1.panic)("No project available"); },
                        some: function (_a) {
                            var project = _a.project, meta = _a.meta;
                            return ({
                                buffer: studio_adapters_1.ProjectSkeleton.encode(project.boxGraph),
                                name: meta.name
                            });
                        }
                    })];
            });
        }); },
        addSample: function (data, name) { return __awaiter(void 0, void 0, void 0, function () {
            var sample, uuid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.sampleService.importFile({
                            name: name,
                            arrayBuffer: lib_dsp_1.WavFile.encodeFloats(data)
                        })];
                    case 1:
                        sample = _a.sent();
                        uuid = lib_std_1.UUID.parse(sample.uuid);
                        service.optProject.match({
                            none: function () { pendingSamples.add(uuid); },
                            some: function (project) { project.trackUserCreatedSample(uuid); }
                        });
                        return [2 /*return*/, sample];
                }
            });
        }); }
    }, ScriptWorker_js_worker_url_1.default);
    return (<div className={className}>
            <lib_jsx_1.Await factory={function () { return Promise.all([
            lib_runtime_1.Promises.guardedRetry(function () { return Promise.resolve().then(function () { return require("./code-editor/monaco-setup"); }); }, function (_error, count) { return count < 10; })
                .then(function (_a) {
                var monaco = _a.monaco;
                return monaco;
            })
        ]); }} failure={function (_a) {
        var retry = _a.retry, reason = _a.reason;
        return (<p onclick={retry}>{reason}</p>);
    }} loading={function () { return (0, ThreeDots_1.ThreeDots)(); }} success={function (_a) {
            var monaco = _a[0];
            var _b = factory_1.MonacoFactory.create({
                monaco: monaco,
                lifecycle: lifecycle,
                language: "typescript",
                uri: "file:///main.ts", initialCode: Examples.Simple
            }), model = _b.model, container = _b.container;
            var compileAndRun = function () { return __awaiter(void 0, void 0, void 0, function () {
                var worker, client, semanticDiagnostics, syntacticDiagnostics, allDiagnostics, errors, emitOutput, jsCode, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 12, , 14]);
                            return [4 /*yield*/, monaco.languages.typescript.getTypeScriptWorker()];
                        case 1:
                            worker = _a.sent();
                            return [4 /*yield*/, worker(model.uri)];
                        case 2:
                            client = _a.sent();
                            return [4 /*yield*/, client.getSemanticDiagnostics(model.uri.toString())];
                        case 3:
                            semanticDiagnostics = _a.sent();
                            return [4 /*yield*/, client.getSyntacticDiagnostics(model.uri.toString())];
                        case 4:
                            syntacticDiagnostics = _a.sent();
                            allDiagnostics = __spreadArray(__spreadArray([], semanticDiagnostics, true), syntacticDiagnostics, true);
                            if (!(allDiagnostics.length > 0)) return [3 /*break*/, 6];
                            errors = allDiagnostics.map(function (d) { return d.messageText; }).join("\n");
                            return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                                    headline: "Compilation Error",
                                    message: errors
                                })];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                        case 6: return [4 /*yield*/, client.getEmitOutput(model.uri.toString())];
                        case 7:
                            emitOutput = _a.sent();
                            if (!(emitOutput.outputFiles.length > 0)) return [3 /*break*/, 9];
                            jsCode = emitOutput.outputFiles[0].text
                                .replace(/^["']use strict["'];?/, "");
                            return [4 /*yield*/, host.executeScript(jsCode, {
                                    sampleRate: service.audioContext.sampleRate,
                                    baseFrequency: service.optProject
                                        .map(function (project) { return project.rootBox.baseFrequency.getValue(); })
                                        .unwrapOrElse(440.0)
                                })];
                        case 8:
                            _a.sent();
                            return [3 /*break*/, 11];
                        case 9: return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                                headline: "Compiler Error",
                                message: "No output files generated"
                            })];
                        case 10:
                            _a.sent();
                            _a.label = 11;
                        case 11: return [3 /*break*/, 14];
                        case 12:
                            error_1 = _a.sent();
                            return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                                    headline: "Compilation Error",
                                    message: String(error_1)
                                })];
                        case 13:
                            _a.sent();
                            return [3 /*break*/, 14];
                        case 14: return [2 /*return*/];
                    }
                });
            }); };
            return (<div>
                            <header>
                                <Button_1.Button lifecycle={lifecycle} onClick={function () { return lib_jsx_1.RouteLocation.get().navigateTo("/"); }} appearance={{ tooltip: "Exit editor" }}>
                                    <span>Exit</span> <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Exit}/>
                                </Button_1.Button>
                                <Button_1.Button lifecycle={lifecycle} onClick={compileAndRun} appearance={{ tooltip: "Run script" }}>
                                    <span>Run</span> <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Play}/>
                                </Button_1.Button>
                                <MenuButton_1.MenuButton root={studio_core_1.MenuItem.root()
                    .setRuntimeChildrenProcedure(function (parent) { return parent
                    .addMenuItem.apply(parent, Object.entries(Examples)
                    .map(function (_a) {
                    var name = _a[0], example = _a[1];
                    return studio_core_1.MenuItem.default({ label: name })
                        .setTriggerProcedure(function () { return model.setValue(example); });
                })); })} appearance={{ tinyTriangle: true, color: studio_enums_1.Colors.dark }}>
                                    <span>Examples</span>
                                </MenuButton_1.MenuButton>
                            </header>
                            {container}
                        </div>);
        }}/>
        </div>);
};
exports.CodeEditorPage = CodeEditorPage;
