"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioEditorHeader = void 0;
var AudioEditorHeader_sass_inline_1 = require("./AudioEditorHeader.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var StretchSelector_1 = require("@/ui/timeline/editors/audio/StretchSelector");
var NumberInput_1 = require("@/ui/components/NumberInput");
var EditWrapper_1 = require("@/ui/wrapper/EditWrapper");
var className = lib_dom_1.Html.adoptStyleSheet(AudioEditorHeader_sass_inline_1.default, "AudioEditorHeader");
var AudioEditorHeader = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, reader = _a.reader;
    var editing = project.editing;
    return (<div className={className}>
            <span className="label">Stretch Mode:</span>
            <StretchSelector_1.StretchSelector lifecycle={lifecycle} project={project} reader={reader}/>
            <span className="label">Waveform Offset:</span>
            <div className="waveform-offset">
                <NumberInput_1.NumberInput lifecycle={lifecycle} mapper={lib_std_1.StringMapping.numeric({ fractionDigits: 3, unit: "sec" })} className="input" maxChars={5} step={0.001} model={EditWrapper_1.EditWrapper.forValue(editing, reader.audioContent.waveformOffset)}/>
                <span>sec</span>
            </div>
        </div>);
};
exports.AudioEditorHeader = AudioEditorHeader;
