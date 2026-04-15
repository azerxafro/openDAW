"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadertoyEditor = void 0;
var ShadertoyEditor_sass_inline_1 = require("./ShadertoyEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var factory_1 = require("@/monaco/factory");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var ThreeDots_1 = require("@/ui/spinner/ThreeDots");
var Button_1 = require("@/ui/components/Button");
var Icon_1 = require("@/ui/components/Icon");
var example_glsl_raw_1 = require("./example.glsl?raw");
var ShadertoyRunner_1 = require("@/ui/shadertoy/ShadertoyRunner");
var Checkbox_1 = require("@/ui/components/Checkbox");
var className = lib_dom_1.Html.adoptStyleSheet(ShadertoyEditor_sass_inline_1.default, "ShadertoyEditor");
var ShadertoyEditor = function (_a) {
    var service = _a.service, lifecycle = _a.lifecycle;
    var project = service.project;
    var boxGraph = project.boxGraph, editing = project.editing, rootBox = project.rootBox;
    var hiresModel = new lib_std_1.DefaultObservableValue(true);
    var ignoreBoxUpdate = false; // prevents reloading the script into the editor
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
            var initialCode = rootBox.shadertoy.targetVertex.mapOr(function (box) {
                return (0, lib_std_1.asInstanceOf)(box, studio_boxes_1.ShadertoyBox).shaderCode.getValue();
            }, example_glsl_raw_1.default);
            var _b = factory_1.MonacoFactory.create({
                monaco: monaco,
                lifecycle: lifecycle,
                language: "glsl",
                uri: "file:///shader.glsl",
                initialCode: initialCode
            }), editor = _b.editor, model = _b.model, container = _b.container;
            var canCompile = function (code) {
                var canvas = document.createElement("canvas");
                var gl = canvas.getContext("webgl2");
                if ((0, lib_std_1.isAbsent)(gl)) {
                    return lib_std_1.Attempts.err("Could not create webgl2 context");
                }
                try {
                    var testRunner = new ShadertoyRunner_1.ShadertoyRunner(service.optShadertoyState.unwrap("No state"), gl);
                    testRunner.compile(code);
                    testRunner.terminate();
                    return lib_std_1.Attempts.Ok;
                }
                catch (error) {
                    var match = /ERROR: \d+:(\d+): (.+)/.exec(String(error));
                    if (match) {
                        var lineNumber = parseInt(match[1], 10) - 9;
                        monaco.editor.setModelMarkers(editor.getModel(), "glsl", [{
                                startLineNumber: lineNumber,
                                startColumn: 1,
                                endLineNumber: lineNumber,
                                endColumn: 1000,
                                message: match[2],
                                severity: monaco.MarkerSeverity.Error
                            }]);
                    }
                    return lib_std_1.Attempts.err(String(error));
                }
            };
            var saveShadertoyCode = function (code) {
                ignoreBoxUpdate = true;
                editing.modify(function () {
                    if (rootBox.shadertoy.isEmpty()) {
                        rootBox.shadertoy
                            .refer(studio_boxes_1.ShadertoyBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) { return box.shaderCode.setValue(code); }));
                    }
                    else {
                        (0, lib_std_1.asInstanceOf)(rootBox.shadertoy.targetVertex.unwrap(), studio_boxes_1.ShadertoyBox).shaderCode.setValue(code);
                    }
                });
                ignoreBoxUpdate = false;
            };
            var deleteShadertoyCode = function () {
                editing.modify(function () {
                    if (rootBox.shadertoy.nonEmpty()) {
                        (0, lib_std_1.asInstanceOf)(rootBox.shadertoy.targetVertex.unwrap(), studio_boxes_1.ShadertoyBox).delete();
                    }
                });
            };
            var compileAndRun = function () {
                var code = editor.getValue();
                if (!canCompile(code)) {
                    return;
                }
                monaco.editor.setModelMarkers(editor.getModel(), "glsl", []);
                saveShadertoyCode(code);
            };
            editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.Enter, compileAndRun);
            var shadertoyLifecycle = lifecycle.own(new lib_std_1.Terminator());
            lifecycle.ownAll(rootBox.shadertoy.catchupAndSubscribe(function (pointer) {
                shadertoyLifecycle.terminate();
                if (pointer.nonEmpty()) {
                    var _a = (0, lib_std_1.asInstanceOf)(rootBox.shadertoy.targetVertex.unwrap(), studio_boxes_1.ShadertoyBox), shaderCode = _a.shaderCode, highres_1 = _a.highres;
                    shadertoyLifecycle.ownAll(shaderCode.catchupAndSubscribe(function (owner) {
                        if (ignoreBoxUpdate) {
                            return;
                        }
                        var value = owner.getValue();
                        if (value === "") {
                            return;
                        }
                        model.setValue(value);
                    }), highres_1.catchupAndSubscribe(function (owner) { return hiresModel.setValue(owner.getValue()); }), hiresModel.catchupAndSubscribe(function (owner) { return editing.modify(function () { return highres_1.setValue(owner.getValue()); }); }));
                }
                else {
                    editor.setValue(example_glsl_raw_1.default);
                }
            }), lib_dom_1.Events.subscribe(window, "keydown", function (event) {
                if (lib_dom_1.Keyboard.isControlKey(event) && event.code === "KeyS") {
                    var code = editor.getValue();
                    var attempt = canCompile(code);
                    if (attempt.isFailure()) {
                        lib_std_1.RuntimeNotifier.info({ headline: "Cannot Save", message: attempt.failureReason() })
                            .then(lib_std_1.EmptyProcedure, lib_std_1.EmptyProcedure);
                    }
                    else {
                        saveShadertoyCode(code);
                        service.projectProfileService.save().then(lib_std_1.EmptyProcedure, lib_std_1.EmptyProcedure);
                    }
                    event.preventDefault();
                } /* else if (event.altKey && event.key === "Enter") {
                    compileAndRun()
                    event.preventDefault()
                    event.stopPropagation()
                }*/
            }, { capture: true }));
            return (<div>
                            <header>
                                <Button_1.Button lifecycle={lifecycle} onClick={compileAndRun} appearance={{ tooltip: "Run script" }}>
                                    <span>Run (alt+enter)</span> <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Play}/>
                                </Button_1.Button>
                                <Button_1.Button lifecycle={lifecycle} onClick={deleteShadertoyCode} appearance={{ tooltip: "Delete script" }}>
                                    <span>Delete</span> <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Delete}/>
                                </Button_1.Button>
                                <Checkbox_1.Checkbox lifecycle={lifecycle} model={hiresModel} appearance={{ tooltip: "Disable hd, if available" }}>
                                    Hires
                                </Checkbox_1.Checkbox>
                            </header>
                            {container}
                        </div>);
        }}/>
        </div>);
};
exports.ShadertoyEditor = ShadertoyEditor;
