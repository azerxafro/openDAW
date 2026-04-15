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
exports.CodeEditorPanel = void 0;
var CodeEditorPanel_sass_inline_1 = require("./CodeEditorPanel.sass?inline");
var werkstatt_default_js_raw_1 = require("../devices/audio-effects/werkstatt-default.js?raw");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var factory_1 = require("@/monaco/factory");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_core_1 = require("@opendaw/studio-core");
var ThreeDots_1 = require("@/ui/spinner/ThreeDots");
var Button_1 = require("@/ui/components/Button");
var Icon_1 = require("@/ui/components/Icon");
var MenuButton_1 = require("@/ui/components/MenuButton");
var dialogs_1 = require("@/ui/components/dialogs");
var className = lib_dom_1.Html.adoptStyleSheet(CodeEditorPanel_sass_inline_1.default, "CodeEditorPanel");
var CodeEditorPanel = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var statusLabel = (<div className="status idle">Idle</div>);
    var state = service.activeCodeEditor.unwrapOrNull();
    var handler = (0, lib_std_1.isDefined)(state) ? state.handler : null;
    var initialCode = (0, lib_std_1.isDefined)(state) ? state.initialCode : werkstatt_default_js_raw_1.default;
    var examples = (0, lib_std_1.isDefined)(state) ? state.examples : [];
    var starterPrompt = (0, lib_std_1.isDefined)(state) ? state.starterPrompt : "";
    var setStatus = function (text, type) {
        statusLabel.textContent = text;
        statusLabel.className = "status ".concat(type);
    };
    var nameSpan = (<span className="name">Code Editor</span>);
    if ((0, lib_std_1.isDefined)(handler)) {
        lifecycle.own(handler.name.catchupAndSubscribe(function (owner) { return nameSpan.textContent = owner.getValue(); }));
    }
    return (<div className={className}>
            <lib_jsx_1.Await factory={function () { return Promise.all([
            lib_runtime_1.Promises.guardedRetry(function () { return Promise.resolve().then(function () { return require("./monaco-setup"); }); }, function (_error, count) { return count < 10; })
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
                language: "javascript",
                uri: "file:///werkstatt.js",
                initialCode: initialCode
            }), editor = _b.editor, model = _b.model, container = _b.container;
            var compileCode = function () { return __awaiter(void 0, void 0, void 0, function () {
                var reason_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(0, lib_std_1.isDefined)(handler)) {
                                setStatus("No handler connected", "error");
                                return [2 /*return*/];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, handler.compile(editor.getValue())];
                        case 2:
                            _a.sent();
                            setStatus("Successfully compiled", "success");
                            return [3 /*break*/, 4];
                        case 3:
                            reason_1 = _a.sent();
                            setStatus(String(reason_1), "error");
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            if ((0, lib_std_1.isDefined)(handler)) {
                lifecycle.own(handler.subscribeErrors(function (message) { return setStatus(message, "error"); }));
                lifecycle.own(handler.subscribeCode(function (code) {
                    if (editor.getValue() !== code) {
                        editor.setValue(code);
                    }
                }));
            }
            editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.Enter, function () { return compileCode().finally(); });
            lifecycle.own(lib_dom_1.Events.subscribe(container, "keydown", function (event) {
                if (lib_dom_1.Keyboard.isControlKey(event) && event.code === "KeyS") {
                    compileCode()
                        .then(function () { return service.projectProfileService.save().finally(); })
                        .finally();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }, { capture: true }));
            var close = function () { return service.closeCodeEditor(); };
            return (<div className="content">
                            <header>
                                <Button_1.Button lifecycle={lifecycle} onClick={close} appearance={{
                    tooltip: "Close editor",
                    color: studio_enums_1.Colors.red,
                    framed: true,
                    cursor: "pointer"
                }}>
                                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Close}/>
                                </Button_1.Button>
                                {nameSpan}
                                <Button_1.Button lifecycle={lifecycle} onClick={compileCode} appearance={{
                    tooltip: "Run (".concat(lib_dom_1.Shortcut.of("Enter", { alt: true }).format(), ")"),
                    color: studio_enums_1.Colors.green,
                    cursor: "pointer"
                }}>
                                    <span>Run</span> <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Play}/>
                                </Button_1.Button>
                                <Button_1.Button lifecycle={lifecycle} onClick={function () { return __awaiter(void 0, void 0, void 0, function () {
                    var approved, text;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, dialogs_1.Dialogs.approve({
                                    headline: "Run Clipboard",
                                    message: "This will replace all code in the editor with the clipboard content and run it.",
                                    approveText: "Replace & Run",
                                    reverse: true
                                })];
                            case 1:
                                approved = _a.sent();
                                if (!approved) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, lib_dom_1.Clipboard.readText()];
                            case 2:
                                text = _a.sent();
                                editor.executeEdits("clipboard", [{
                                        range: model.getFullModelRange(),
                                        text: text
                                    }]);
                                return [4 /*yield*/, compileCode()];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }} appearance={{ tooltip: "Paste from clipboard and run", cursor: "pointer" }}>
                                    <span>Run Clipboard</span> <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Paste}/>
                                </Button_1.Button>
                                {starterPrompt.length > 0 && (<Button_1.Button lifecycle={lifecycle} onClick={function () { return lib_dom_1.Clipboard.writeText(starterPrompt)
                        .then(function () { return dialogs_1.Dialogs.info({
                        headline: "AI Prompt Copied",
                        message: "The starter prompt has been copied to your clipboard.\n\nPaste it into an AI assistant (e.g. ChatGPT, Claude) to get help writing code for this device.\n\nThen copy the generated code and use 'From Clipboard' to load it."
                    }); })
                        .catch(function (reason) { return setStatus(String(reason), "error"); }); }} appearance={{
                        tooltip: "Copy AI starter prompt to clipboard",
                        cursor: "pointer"
                    }}>
                                        <span>Get Prompt</span> <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Copy}/>
                                    </Button_1.Button>)}
                                {examples.length > 0 && (<MenuButton_1.MenuButton root={studio_core_1.MenuItem.root()
                        .setRuntimeChildrenProcedure(function (parent) { return parent
                        .addMenuItem.apply(parent, examples
                        .map(function (example) { return studio_core_1.MenuItem.default({ label: example.name })
                        .setTriggerProcedure(function () {
                        editor.setValue(example.code);
                        compileCode().finally();
                    }); })); })} appearance={{ tinyTriangle: true, color: studio_enums_1.Colors.dark }}>
                                        <span>Examples</span>
                                    </MenuButton_1.MenuButton>)}
                            </header>
                            {container}
                            {statusLabel}
                        </div>);
        }}/>
        </div>);
};
exports.CodeEditorPanel = CodeEditorPanel;
