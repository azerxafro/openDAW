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
exports.ScriptDeviceEditor = void 0;
var ScriptDeviceEditor_sass_inline_1 = require("./ScriptDeviceEditor.sass?inline");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_std_1 = require("@opendaw/lib-std");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_enums_1 = require("@opendaw/studio-enums");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var ControlBuilder_1 = require("@/ui/devices/ControlBuilder");
var Button_1 = require("@/ui/components/Button");
var Checkbox_1 = require("@/ui/components/Checkbox");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var Icon_1 = require("@/ui/components/Icon");
var Column_1 = require("@/ui/devices/Column");
var constants_1 = require("@/ui/devices/constants");
var SampleSelector_1 = require("@/ui/devices/SampleSelector");
var className = lib_dom_1.Html.adoptStyleSheet(ScriptDeviceEditor_sass_inline_1.default, "ScriptDeviceEditor");
var boolModel = function (editing, parameter) {
    return new /** @class */ (function () {
        function class_1() {
        }
        class_1.prototype.getValue = function () { return parameter.getControlledValue() >= 0.5; };
        class_1.prototype.setValue = function (value) { editing.modify(function () { return parameter.setValue(value ? 1 : 0); }); };
        class_1.prototype.subscribe = function (observer) {
            var _this = this;
            return parameter.subscribe(function () { return observer(_this); });
        };
        class_1.prototype.catchupAndSubscribe = function (observer) {
            var _this = this;
            return parameter.catchupAndSubscribe(function () { return observer(_this); });
        };
        return class_1;
    }());
};
var ScriptDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost, config = _a.config;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning;
    var compiler = studio_adapters_1.ScriptCompiler.create(config.compiler);
    var box = adapter.box;
    var storedCode = box.code.getValue();
    var userCode = storedCode.length > 0 ? compiler.stripHeader(storedCode) : config.defaultCode;
    var compiling = false;
    var compile = function (code) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    compiling = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(compiler.compile(service.audioContext, editing, box, code))];
                case 2:
                    result = _a.sent();
                    if (result.status === "resolved") {
                        errorIcon.classList.add("hidden");
                        errorIcon.title = "";
                    }
                    else {
                        errorIcon.classList.remove("hidden");
                        errorIcon.title = String(result.error);
                        throw result.error;
                    }
                    return [3 /*break*/, 4];
                case 3:
                    compiling = false;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (storedCode.length > 0) {
        compiler.load(service.audioContext, box).finally(lib_std_1.EmptyExec);
    }
    else {
        compiler.compile(service.audioContext, editing, box, userCode, true).finally(lib_std_1.EmptyExec);
    }
    var toggleEditor = function () {
        var isActive = service.activeCodeEditor
            .map(function (state) { return lib_std_1.UUID.equals(state.handler.uuid, adapter.uuid); }).unwrapOrElse(false);
        if (isActive) {
            service.closeCodeEditor();
        }
        else {
            service.openCodeEditor({
                handler: {
                    uuid: adapter.uuid,
                    name: adapter.labelField,
                    compile: compile,
                    subscribeErrors: function (observer) {
                        return service.engine.subscribeDeviceMessage(lib_std_1.UUID.toString(adapter.uuid), observer);
                    },
                    subscribeCode: function (observer) {
                        return box.code.subscribe(function (owner) { return observer(compiler.stripHeader(owner.getValue())); });
                    }
                },
                initialCode: compiler.stripHeader(box.code.getValue()) || config.defaultCode,
                previousScreen: service.layout.screen.getValue(),
                examples: config.examples,
                starterPrompt: config.starterPrompt
            });
        }
    };
    var resolveGroupColor = function (colorName) {
        var color = studio_enums_1.Colors[colorName];
        return (0, lib_std_1.isDefined)(color) ? color : studio_enums_1.Colors.dark;
    };
    var toggleEditorButton = (<Button_1.Button lifecycle={lifecycle} onClick={toggleEditor} appearance={{ framed: true, tooltip: "Toggle Code Editor" }} style={{ fontSize: "16px", marginTop: "4px" }}>
            <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Code}/>
        </Button_1.Button>);
    var lastErrorMessage = "";
    var errorIcon = (<div className="error hidden" style={{ cursor: "pointer" }} onclick={function () { return lib_dom_1.Clipboard.writeText(lastErrorMessage); }}>
            <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Bug}/>
        </div>);
    var controlsContainer = (<div className={className}/>);
    var controlsTerminator = lifecycle.own(new lib_std_1.Terminator());
    var paramBoxesByLabel = new Map();
    var sampleBoxesByLabel = new Map();
    var createParamElement = function (terminator, declaration) {
        var werkstattParam = paramBoxesByLabel.get(declaration.label);
        if (!(0, lib_std_1.isDefined)(werkstattParam)) {
            return <div />;
        }
        var parameter = adapter.parameters.parameters()
            .find(function (param) { return param.address.equals(werkstattParam.value.address); });
        if (!(0, lib_std_1.isDefined)(parameter)) {
            return <div />;
        }
        var tracks = adapter.deviceHost().audioUnitBoxAdapter().tracks;
        return declaration.mapping === "bool"
            ? (<AutomationControl_1.AutomationControl lifecycle={terminator} editing={editing} midiLearning={midiLearning} tracks={tracks} parameter={parameter}>
                <Column_1.Column ems={constants_1.LKR} color={studio_enums_1.Colors.cream}>
                    <h5>{declaration.label}</h5>
                    <Checkbox_1.Checkbox lifecycle={terminator} model={boolModel(editing, parameter)} style={{ marginTop: "0.25em" }} appearance={{
                    color: studio_enums_1.Colors.cream,
                    activeColor: studio_enums_1.Colors.blue,
                    framed: true,
                    cursor: "pointer"
                }}>
                        <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                    </Checkbox_1.Checkbox>
                </Column_1.Column>
            </AutomationControl_1.AutomationControl>)
            : ControlBuilder_1.ControlBuilder.createKnob({ lifecycle: terminator, editing: editing, midiLearning: midiLearning, adapter: adapter, parameter: parameter });
    };
    var createSampleElement = function (terminator, declaration) {
        var sample = sampleBoxesByLabel.get(declaration.label);
        if (!(0, lib_std_1.isDefined)(sample)) {
            return <div />;
        }
        var fileNameLabel = (<span className="sample-name"/>);
        var dropZone = (<div className="sample-drop">
                <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Waveform}/>
            </div>);
        var sampleSelector = new SampleSelector_1.SampleSelector(service, {
            hasSample: function () { return sample.file.nonEmpty(); },
            replace: function (replacement) { return replacement.match({
                none: function () { return sample.file.targetVertex.ifSome(function (_a) {
                    var fileBox = _a.box;
                    var mustDelete = fileBox.pointerHub.size() === 1;
                    sample.file.defer();
                    if (mustDelete) {
                        fileBox.delete();
                    }
                }); },
                some: function () { return SampleSelector_1.SampleSelectStrategy.changePointer(sample.file, replacement); }
            }); }
        });
        terminator.ownAll(sample.file.catchupAndSubscribe(function (pointer) { return pointer.targetVertex.match({
            none: function () {
                dropZone.removeAttribute("sample");
                fileNameLabel.textContent = "";
            },
            some: function (_a) {
                var fileBox = _a.box;
                var name = (0, lib_std_1.asInstanceOf)(fileBox, studio_boxes_1.AudioFileBox).fileName.getValue();
                dropZone.setAttribute("sample", name);
                fileNameLabel.textContent = name;
            }
        }); }), sampleSelector.configureBrowseClick(dropZone), sampleSelector.configureContextMenu(dropZone), sampleSelector.configureDrop(dropZone));
        return (<Column_1.Column ems={constants_1.LKR} color={studio_enums_1.Colors.cream}>
                <h5>{declaration.label}</h5>
                {dropZone}
                {fileNameLabel}
            </Column_1.Column>);
    };
    var populateSection = function (terminator, section, container) {
        var controls = (<div className="controls"/>);
        for (var _i = 0, _a = section.items; _i < _a.length; _i++) {
            var item = _a[_i];
            controls.appendChild(item.type === "param"
                ? createParamElement(terminator, item.declaration)
                : createSampleElement(terminator, item.declaration));
        }
        if ((0, lib_std_1.isDefined)(section.group)) {
            var color = resolveGroupColor(section.group.color);
            controls.style.backgroundColor = color.opacity(0.03).toString();
            var group = (<div className="group">
                    <div className="group-header" style={{ backgroundColor: color.opacity(0.33).toString() }}>
                        <span>{section.group.label}</span>
                    </div>
                    {controls}
                </div>);
            container.appendChild(group);
        }
        else {
            container.appendChild(controls);
        }
    };
    var rebuildControls = function () {
        controlsTerminator.terminate();
        controlsContainer.replaceChildren();
        var sections = studio_adapters_1.ScriptDeclaration.parseGroups(box.code.getValue());
        var terminator = new lib_std_1.Terminator();
        if (sections.length === 0) {
            controlsContainer.appendChild(<div className="controls"/>);
        }
        for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
            var section = sections_1[_i];
            populateSection(terminator, section, controlsContainer);
        }
        var codeEditorColumn = (<Column_1.Column ems={constants_1.LKR} color={studio_enums_1.Colors.cream} style={{ height: "3.5em", minWidth: "max-content" }}>
                <h5>Code Editor</h5>
                {toggleEditorButton}
                {errorIcon}
            </Column_1.Column>);
        controlsContainer.appendChild(codeEditorColumn);
        controlsTerminator.own(terminator);
    };
    var indexParamBoxes = function () {
        paramBoxesByLabel.clear();
        for (var _i = 0, _a = box.parameters.pointerHub.incoming(); _i < _a.length; _i++) {
            var pointer = _a[_i];
            var werkstattParam = (0, lib_std_1.asInstanceOf)(pointer.box, studio_boxes_1.WerkstattParameterBox);
            paramBoxesByLabel.set(werkstattParam.label.getValue(), werkstattParam);
        }
    };
    var indexSampleBoxes = function () {
        sampleBoxesByLabel.clear();
        for (var _i = 0, _a = box.samples.pointerHub.incoming(); _i < _a.length; _i++) {
            var pointer = _a[_i];
            var sample = (0, lib_std_1.asInstanceOf)(pointer.box, studio_boxes_1.WerkstattSampleBox);
            sampleBoxesByLabel.set(sample.label.getValue(), sample);
        }
    };
    var scheduleRebuild = function () {
        indexParamBoxes();
        indexSampleBoxes();
        rebuildControls();
    };
    lifecycle.ownAll(service.engine.subscribeDeviceMessage(lib_std_1.UUID.toString(adapter.uuid), function (message) {
        lastErrorMessage = message;
        errorIcon.classList.remove("hidden");
        errorIcon.title = message;
    }), {
        terminate: function () {
            var isActive = service.activeCodeEditor
                .map(function (state) { return lib_std_1.UUID.equals(state.handler.uuid, adapter.uuid); }).unwrapOrElse(false);
            if (isActive) {
                service.closeCodeEditor();
            }
        }
    }, adapter.codeChanged.subscribe(function () {
        if (!compiling) {
            compiler.load(service.audioContext, box).finally(lib_std_1.EmptyExec);
        }
    }), service.activeCodeEditor.catchupAndSubscribe(function (option) {
        var isActive = option.map(function (state) { return lib_std_1.UUID.equals(state.handler.uuid, adapter.uuid); }).unwrapOrElse(false);
        toggleEditorButton.classList.toggle("active", isActive);
    }), box.parameters.pointerHub.subscribe({ onAdded: scheduleRebuild, onRemoved: scheduleRebuild }), box.samples.pointerHub.subscribe({ onAdded: scheduleRebuild, onRemoved: scheduleRebuild }), box.code.subscribe(scheduleRebuild));
    scheduleRebuild();
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return config.populateMenu(parent, service, deviceHost, adapter); }} populateControls={function () { return controlsContainer; }} populateMeter={function () { return config.populateMeter({ lifecycle: lifecycle, service: service, adapter: adapter }); }} icon={config.icon}/>);
};
exports.ScriptDeviceEditor = ScriptDeviceEditor;
