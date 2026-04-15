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
exports.StretchSelector = void 0;
var StretchSelector_sass_inline_1 = require("./StretchSelector.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_enums_1 = require("@opendaw/studio-enums");
var RadioGroup_1 = require("@/ui/components/RadioGroup");
var Icon_1 = require("@/ui/components/Icon");
var studio_core_1 = require("@opendaw/studio-core");
var TimeStretchEditor_1 = require("@/ui/timeline/editors/audio/TimeStretchEditor");
var className = lib_dom_1.Html.adoptStyleSheet(StretchSelector_sass_inline_1.default, "StretchSelector");
var StretchSelector = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, reader = _a.reader;
    var editing = project.editing;
    var audioContent = reader.audioContent;
    var toPlayModeEnum = function () {
        if (audioContent.isPlayModeNoStretch) {
            return 0 /* PlayModeEnum.NoWarp */;
        }
        if (audioContent.asPlayModePitchStretch.nonEmpty()) {
            return 1 /* PlayModeEnum.Pitch */;
        }
        if (audioContent.asPlayModeTimeStretch.nonEmpty()) {
            return 2 /* PlayModeEnum.TimeStretch */;
        }
        return (0, lib_std_1.panic)("Unknown PlayMode");
    };
    var playModeEnumValue = new lib_std_1.DefaultObservableValue(toPlayModeEnum());
    lifecycle.ownAll(playModeEnumValue.subscribe(function (owner) { return __awaiter(void 0, void 0, void 0, function () {
        var playModeEnum, exec, exec, exec;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    playModeEnum = owner.getValue();
                    if (!(playModeEnum === 0 /* PlayModeEnum.NoWarp */)) return [3 /*break*/, 2];
                    return [4 /*yield*/, studio_core_1.AudioContentModifier.toNotStretched([audioContent])];
                case 1:
                    exec = _a.sent();
                    editing.modify(exec);
                    return [3 /*break*/, 6];
                case 2:
                    if (!(playModeEnum === 1 /* PlayModeEnum.Pitch */)) return [3 /*break*/, 4];
                    return [4 /*yield*/, studio_core_1.AudioContentModifier.toPitchStretch([audioContent])];
                case 3:
                    exec = _a.sent();
                    editing.modify(exec);
                    return [3 /*break*/, 6];
                case 4:
                    if (!(playModeEnum === 2 /* PlayModeEnum.TimeStretch */)) return [3 /*break*/, 6];
                    return [4 /*yield*/, studio_core_1.AudioContentModifier.toTimeStretch([audioContent])];
                case 5:
                    exec = _a.sent();
                    editing.modify(exec);
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); }), audioContent.box.playMode.subscribe(function () { return playModeEnumValue.setValue(toPlayModeEnum()); }));
    return (<div className={className}>
            <RadioGroup_1.RadioGroup lifecycle={lifecycle} model={playModeEnumValue} elements={[
            {
                value: 0 /* PlayModeEnum.NoWarp */,
                element: (<span>No</span>),
                tooltip: "No Warp"
            },
            {
                value: 1 /* PlayModeEnum.Pitch */,
                element: (<Icon_1.Icon symbol={studio_enums_1.IconSymbol.TapeReel}/>),
                tooltip: "Pitch Stretch"
            },
            {
                value: 2 /* PlayModeEnum.TimeStretch */,
                element: (<Icon_1.Icon symbol={studio_enums_1.IconSymbol.Time}/>),
                tooltip: "Time Stretch"
            }
        ]}/>
            <hr />
            <TimeStretchEditor_1.TimeStretchEditor lifecycle={lifecycle} project={project} reader={reader}/>
        </div>);
};
exports.StretchSelector = StretchSelector;
