"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultWorkspace = void 0;
var PanelState_ts_1 = require("@/ui/workspace/PanelState.ts");
var PanelType_ts_1 = require("@/ui/workspace/PanelType.ts");
var studio_enums_1 = require("@opendaw/studio-enums");
var BrowserPanel = PanelState_ts_1.PanelState.create({
    type: "panel",
    name: "Browser",
    icon: studio_enums_1.IconSymbol.Panel,
    panelType: PanelType_ts_1.PanelType.BrowserPanel,
    constrains: { type: "flex", minSize: 256, maxSize: 480, flex: 0 }
});
var DevicesPanel = PanelState_ts_1.PanelState.create({
    type: "panel",
    name: "Devices",
    icon: studio_enums_1.IconSymbol.Flask,
    panelType: PanelType_ts_1.PanelType.DevicePanel,
    notPopoutable: true,
    constrains: { type: "fixed", fixedSize: 240 }
});
var NotepadPanel = PanelState_ts_1.PanelState.create({
    type: "panel",
    name: "Notepad",
    icon: studio_enums_1.IconSymbol.NotePad,
    panelType: PanelType_ts_1.PanelType.Notepad,
    notMinimizable: true,
    constrains: { type: "fixed", fixedSize: 480 }
});
var ProjectInfoPanel = PanelState_ts_1.PanelState.create({
    type: "panel",
    name: "Project Info",
    icon: studio_enums_1.IconSymbol.Box,
    panelType: PanelType_ts_1.PanelType.ProjectInfo,
    notMinimizable: true,
    constrains: { type: "flex", minSize: 384, flex: 1 }
});
/*const ModularSystem = PanelState.create({
    type: "panel",
    name: "Modular System",
    icon: IconSymbol.Box,
    panelType: PanelType.ModularSystem,
    notMinimizable: true,
    constrains: {type: "flex", minSize: 20, flex: 1}
})*/
exports.DefaultWorkspace = Object.freeze({
    "dashboard": {
        name: "Dashboard",
        icon: studio_enums_1.IconSymbol.OpenDAW,
        hidden: true,
        content: PanelState_ts_1.PanelState.create({
            type: "panel",
            name: "Dashboard",
            icon: studio_enums_1.IconSymbol.OpenDAW,
            panelType: PanelType_ts_1.PanelType.Dashboard,
            notPopoutable: true,
            notMinimizable: true,
            constrains: { type: "flex", minSize: 0, flex: 1 }
        })
    },
    "default": {
        name: "Default",
        icon: studio_enums_1.IconSymbol.Timeline,
        content: {
            type: "layout",
            orientation: "horizontal",
            contents: [
                BrowserPanel,
                {
                    type: "layout",
                    orientation: "vertical",
                    contents: [
                        PanelState_ts_1.PanelState.create({
                            type: "panel",
                            name: "Timeline",
                            icon: studio_enums_1.IconSymbol.Timeline,
                            panelType: PanelType_ts_1.PanelType.Timeline,
                            constrains: { type: "flex", minSize: 94, flex: 2 }
                        }),
                        PanelState_ts_1.PanelState.create({
                            type: "panel",
                            name: "Editor",
                            icon: studio_enums_1.IconSymbol.Pencil,
                            panelType: PanelType_ts_1.PanelType.ContentEditor,
                            constrains: { type: "flex", minSize: 248, flex: 1 },
                            minimized: true
                        }),
                        DevicesPanel
                    ],
                    constrains: { type: "flex", minSize: 0, flex: 1 }
                },
                PanelState_ts_1.PanelState.create({
                    type: "panel",
                    name: "Mixer",
                    icon: studio_enums_1.IconSymbol.Mixing,
                    panelType: PanelType_ts_1.PanelType.Mixer,
                    constrains: { type: "flex", minSize: 20, maxSize: 480, flex: 0.25 },
                    minimized: true
                })
            ],
            constrains: { type: "flex", minSize: 0, flex: 1 }
        }
    },
    "mixer": {
        name: "Mixer",
        icon: studio_enums_1.IconSymbol.Mixing,
        content: {
            type: "layout",
            orientation: "horizontal",
            contents: [
                BrowserPanel,
                {
                    type: "layout",
                    orientation: "vertical",
                    contents: [
                        PanelState_ts_1.PanelState.create({
                            type: "panel",
                            name: "Mixer",
                            icon: studio_enums_1.IconSymbol.Mixing,
                            panelType: PanelType_ts_1.PanelType.Mixer,
                            notMinimizable: true,
                            constrains: { type: "flex", minSize: 0, flex: 1 }
                        }),
                        DevicesPanel
                    ],
                    constrains: { type: "flex", minSize: 0, flex: 1 }
                }
            ],
            constrains: { type: "flex", minSize: 20, flex: 1 }
        }
    },
    /*"modular": {
        name: "Modular",
        icon: IconSymbol.Box,
        hidden: true,
        content: {
            type: "layout",
            orientation: "horizontal",
            contents: [
                BrowserPanel,
                {
                    type: "layout",
                    orientation: "vertical",
                    contents: [
                        ModularSystem,
                        DevicesPanel
                    ],
                    constrains: {type: "flex", minSize: 0, flex: 1}
                }
            ],
            constrains: {type: "flex", minSize: 20, flex: 1}
        }
    },*/
    "piano": {
        name: "Piano Tutorial Mode",
        icon: studio_enums_1.IconSymbol.Piano,
        content: PanelState_ts_1.PanelState.create({
            type: "panel",
            name: "Piano Tutorial Mode",
            icon: studio_enums_1.IconSymbol.Piano,
            panelType: PanelType_ts_1.PanelType.MidiFall,
            constrains: { type: "flex", minSize: 0, flex: 1 }
        })
    },
    "project": {
        name: "Project Info",
        icon: studio_enums_1.IconSymbol.NotePad,
        content: {
            type: "layout",
            orientation: "horizontal",
            contents: [
                ProjectInfoPanel,
                NotepadPanel,
                PanelState_ts_1.PanelState.create({
                    type: "panel",
                    name: "Empty",
                    icon: studio_enums_1.IconSymbol.OpenDAW,
                    panelType: PanelType_ts_1.PanelType.EmptyFlexSpace,
                    constrains: { type: "flex", minSize: 0, flex: 1 }
                })
            ],
            constrains: { type: "flex", minSize: 0, flex: 1 }
        }
    },
    "shadertoy": {
        name: "Shadertoy",
        icon: studio_enums_1.IconSymbol.Shadertoy,
        content: {
            type: "layout",
            orientation: "horizontal",
            contents: [
                PanelState_ts_1.PanelState.create({
                    type: "panel",
                    name: "Preview",
                    icon: studio_enums_1.IconSymbol.Shadertoy,
                    panelType: PanelType_ts_1.PanelType.ShadertoyPreview,
                    constrains: { type: "flex", minSize: 320, flex: 1 }
                }),
                PanelState_ts_1.PanelState.create({
                    type: "panel",
                    name: "Editor",
                    icon: studio_enums_1.IconSymbol.Generator,
                    panelType: PanelType_ts_1.PanelType.ShadertoyEditor,
                    constrains: { type: "flex", minSize: 0, flex: 1 },
                    notPopoutable: true
                })
            ],
            constrains: { type: "flex", minSize: 0, flex: 1 }
        }
    },
    "meter": {
        name: "VU-Meter",
        icon: studio_enums_1.IconSymbol.VUMeter,
        content: PanelState_ts_1.PanelState.create({
            type: "panel",
            name: "VU-Meter",
            icon: studio_enums_1.IconSymbol.VUMeter,
            panelType: PanelType_ts_1.PanelType.VUMeter,
            notMinimizable: true,
            constrains: { type: "flex", minSize: 0, flex: 1 }
        })
    },
    "code": {
        name: "Code",
        icon: studio_enums_1.IconSymbol.Code,
        hidden: true,
        content: {
            type: "layout",
            orientation: "horizontal",
            contents: [
                BrowserPanel,
                {
                    type: "layout",
                    orientation: "vertical",
                    contents: [
                        PanelState_ts_1.PanelState.create({
                            type: "panel",
                            name: "Code Editor",
                            icon: studio_enums_1.IconSymbol.Code,
                            panelType: PanelType_ts_1.PanelType.CodeEditor,
                            notMinimizable: true,
                            constrains: { type: "flex", minSize: 0, flex: 1 }
                        }),
                        DevicesPanel
                    ],
                    constrains: { type: "flex", minSize: 0, flex: 1 }
                }
            ],
            constrains: { type: "flex", minSize: 20, flex: 1 }
        }
    }
});
