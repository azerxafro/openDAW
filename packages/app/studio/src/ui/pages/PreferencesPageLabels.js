"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesPageLabels = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var PreferencesPageLabels;
(function (PreferencesPageLabels) {
    PreferencesPageLabels.StudioSettingsLabels = {
        "visibility": {
            label: "Visibility",
            fields: {
                "visible-help-hints": "Visible Help & Hints",
                "enable-history-buttons": "Show Undo/Redo buttons",
                "auto-open-clips": "Always open clip view",
                "scrollbar-padding": "Add scrollbar padding",
                "base-frequency": "Show base frequency"
            }
        },
        "time-display": {
            label: "Time Display",
            fields: {
                musical: "Show musical time",
                absolute: "Show absolute time",
                details: "Show details",
                fps: "Frame rate"
            }
        },
        "engine": {
            label: "Engine",
            fields: {
                "note-audition-while-editing": "Note audition while editing",
                "auto-create-output-maximizer": "Automatically add maximizer to main output",
                "stop-playback-when-overloading": "Stop playback when overloading"
            }
        },
        "pointer": {
            label: "Pointer (Mouse/Touch)",
            fields: {
                "dragging-use-pointer-lock": "Use Pointer Lock at window edges [Chrome only]",
                "modifying-controls-wheel": "Modify controls with mouse wheel",
                "normalize-mouse-wheel": "Normalize mouse wheel speed"
            }
        },
        "editing": {
            label: "Editing",
            fields: {
                "overlapping-regions-behaviour": "Overlapping regions behaviour",
                "show-clipboard-menu": "Show clipboard menu (Cut, Copy, Paste)"
            }
        },
        "debug": {
            label: "Debug",
            fields: {
                "footer-show-fps-meter": "Show FPS meter",
                "show-cpu-stats": "Show CPU stats",
                "footer-show-samples-memory": "Show samples in memory",
                "footer-show-build-infos": "Show Build Information",
                "enable-beta-features": "Enable Experimental Features",
                "enable-debug-menu": "Enable Debug Menu"
            }
        },
        "storage": {
            label: "Storage",
            fields: {
                "auto-delete-orphaned-samples": "Auto-delete orphaned samples"
            }
        }
    };
    PreferencesPageLabels.StudioSettingsOptions = {
        "time-display": {
            fps: studio_core_1.FpsOptions.map(function (value) { return ({ value: value, label: "".concat(value) }); })
        },
        "editing": {
            "overlapping-regions-behaviour": studio_core_1.OverlappingRegionsBehaviourOptions.map(function (value) { return ({
                value: value,
                label: value === "clip"
                    ? "Clip existing"
                    : value === "push-existing"
                        ? "Push existing"
                        : "Keep existing"
            }); })
        }
    };
    PreferencesPageLabels.EngineSettingsLabels = {
        metronome: {
            label: "Metronome",
            fields: {
                enabled: "Enabled",
                beatSubDivision: "Beat subdivision",
                gain: "Volume (dB)",
                monophonic: "Monophonic"
            }
        },
        playback: {
            label: "Playback",
            fields: {
                timestampEnabled: "Start playback from last start position",
                pauseOnLoopDisabled: "Pause on loop end if loop is disabled",
                truncateNotesAtRegionEnd: "Stop notes at region end"
            }
        },
        debug: {
            label: "Debug",
            fields: {
                dspLoadMeasurement: "DSP load measurement"
            }
        },
        recording: {
            label: "Recording",
            fields: {
                countInBars: "Count-in bars",
                allowTakes: "Allow takes",
                automationEnabled: "Record automation",
                olderTakeAction: "Older take action",
                olderTakeScope: "Older take scope"
            }
        }
    };
    PreferencesPageLabels.EngineSettingsOptions = {
        metronome: {
            beatSubDivision: studio_adapters_1.EngineSettings.BeatSubDivisionOptions.map(function (value) { return ({ value: value, label: "1/".concat(value) }); })
        },
        recording: {
            countInBars: studio_adapters_1.EngineSettings.RecordingCountInBars.map(function (value) { return ({ value: value, label: "".concat(value) }); }),
            olderTakeAction: studio_adapters_1.EngineSettings.OlderTakeActionOptions.map(function (value) { return ({
                value: value,
                label: value === "disable-track" ? "Disable track" : "Mute region"
            }); }),
            olderTakeScope: studio_adapters_1.EngineSettings.OlderTakeScopeOptions.map(function (value) { return ({
                value: value,
                label: value === "all" ? "All takes" : "Previous only"
            }); })
        }
    };
})(PreferencesPageLabels || (exports.PreferencesPageLabels = PreferencesPageLabels = {}));
