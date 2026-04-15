"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPanelFactory = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var ContentEditor_tsx_1 = require("@/ui/timeline/editors/ContentEditor.tsx");
var Timeline_tsx_1 = require("@/ui/timeline/Timeline.tsx");
var Mixer_tsx_1 = require("@/ui/mixer/Mixer.tsx");
var Modular_tsx_1 = require("@/ui/modular/Modular.tsx");
var DevicePanel_tsx_1 = require("@/ui/devices/panel/DevicePanel.tsx");
var PanelType_ts_1 = require("@/ui/workspace/PanelType.ts");
var Dashboard_tsx_1 = require("@/ui/dashboard/Dashboard.tsx");
var ProjectProfileInfo_tsx_1 = require("@/ui/info-panel/ProjectProfileInfo.tsx");
var BrowserPanel_tsx_1 = require("@/ui/browse/BrowserPanel.tsx");
var NotePadPanel_1 = require("@/ui/NotePadPanel");
var FlexSpace_1 = require("./FlexSpace");
var VUMeterPanel_1 = require("@/ui/meter/VUMeterPanel");
var PianoModePanel_tsx_1 = require("@/ui/piano-panel/PianoModePanel.tsx");
var ShadertoyPreview_1 = require("@/ui/shadertoy/ShadertoyPreview");
var ShadertoyEditor_1 = require("@/ui/shadertoy/ShadertoyEditor");
var CodeEditorPanel_1 = require("@/ui/code-editor/CodeEditorPanel");
var createPanelFactory = function (service) { return ({
    create: function (lifecycle, type) {
        switch (type) {
            case PanelType_ts_1.PanelType.Dashboard:
                return (<Dashboard_tsx_1.Dashboard lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.Timeline:
                return (<Timeline_tsx_1.Timeline lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.ContentEditor:
                return (<ContentEditor_tsx_1.ContentEditor lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.BrowserPanel:
                return (<BrowserPanel_tsx_1.BrowserPanel lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.Notepad:
                return (<NotePadPanel_1.NotePadPanel lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.DevicePanel:
                return (<DevicePanel_tsx_1.DevicePanel lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.Mixer:
                return (<Mixer_tsx_1.Mixer lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.ModularSystem:
                return (<Modular_tsx_1.Modular lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.VUMeter:
                return (<VUMeterPanel_1.VUMeterPanel lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.ProjectInfo:
                return (<ProjectProfileInfo_tsx_1.ProjectProfileInfo lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.MidiFall:
                return (<PianoModePanel_tsx_1.PianoModePanel lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.ShadertoyPreview:
                return (<ShadertoyPreview_1.ShadertoyPreview lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.ShadertoyEditor:
                return (<ShadertoyEditor_1.ShadertoyEditor lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.CodeEditor:
                return (<CodeEditorPanel_1.CodeEditorPanel lifecycle={lifecycle} service={service}/>);
            case PanelType_ts_1.PanelType.EmptyFlexSpace:
                return (<FlexSpace_1.FlexSpace />);
            default:
                return (0, lib_std_1.panic)("Unknown type (".concat(type, ")"));
        }
    }
}); };
exports.createPanelFactory = createPanelFactory;
