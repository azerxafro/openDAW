"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PianoModePanel = void 0;
var PianoModePanel_sass_inline_1 = require("./PianoModePanel.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var PianoRoll_tsx_1 = require("@/ui/piano-panel/PianoRoll.tsx");
var NoteFall_tsx_1 = require("@/ui/piano-panel/NoteFall.tsx");
var lib_std_1 = require("@opendaw/lib-std");
var NumberInput_tsx_1 = require("@/ui/components/NumberInput.tsx");
var Checkbox_tsx_1 = require("@/ui/components/Checkbox.tsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var RadioGroup_tsx_1 = require("@/ui/components/RadioGroup.tsx");
var EditWrapper_ts_1 = require("@/ui/wrapper/EditWrapper.ts");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var PianoPanelShortcuts_1 = require("@/ui/shortcuts/PianoPanelShortcuts");
var className = lib_dom_1.Html.adoptStyleSheet(PianoModePanel_sass_inline_1.default, "PianoModePanel");
var PianoModePanel = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    if (!service.hasProfile) {
        return "No project profile.";
    }
    var project = service.project;
    var rootBoxAdapter = project.rootBoxAdapter, position = project.engine.position, editing = project.editing;
    var pianoMode = rootBoxAdapter.pianoMode;
    var keyboard = pianoMode.keyboard, timeRangeInQuarters = pianoMode.timeRangeInQuarters, noteScale = pianoMode.noteScale, noteLabels = pianoMode.noteLabels, transpose = pianoMode.transpose;
    var updateNotifier = lifecycle.own(new lib_std_1.Notifier());
    var notify = (0, lib_dom_1.deferNextFrame)(function () { return updateNotifier.notify(); });
    var tracksHeader = (<lib_jsx_1.Group>
            <span style={{ color: studio_enums_1.Colors.blue.toString() }}>Tracks:</span>
            <div style={{ height: "1.5em" }}/>
        </lib_jsx_1.Group>);
    var noMidiTrackMessage = (<div className="no-midi-track-label">No midi track available</div>);
    // Quick and dirty solution. We just listen to all tracks and unsubscribe and relisten to a new situation
    var subscribeExcludePianoModeAll = function (rootBoxAdapter, anyUpdate) {
        var terminator = new lib_std_1.Terminator();
        var anyEnabled = false;
        var anyAvailable = false;
        terminator.own(rootBoxAdapter.audioUnits.catchupAndSubscribe({
            onAdd: function (audioUnitBoxAdapter) {
                return terminator.own(audioUnitBoxAdapter.tracks.catchupAndSubscribe({
                    onAdd: function (adapter) {
                        if (adapter.type === studio_adapters_1.TrackType.Notes) {
                            var excludePianoMode = adapter.box.excludePianoMode;
                            terminator.own(excludePianoMode.subscribe(anyUpdate));
                            if (!excludePianoMode.getValue()) {
                                anyEnabled = true;
                            }
                            anyAvailable = true;
                        }
                    },
                    onRemove: anyUpdate,
                    onReorder: anyUpdate
                }));
            },
            onRemove: function () { return anyUpdate; },
            onReorder: function () { return anyUpdate; }
        }));
        tracksHeader.classList.toggle("hidden", !anyAvailable);
        noMidiTrackMessage.classList.toggle("hidden", anyEnabled);
        return terminator;
    };
    var excludePianoModeSubscription = lib_std_1.Terminable.Empty;
    var subscribeExcludePianoMode = function () {
        excludePianoModeSubscription = subscribeExcludePianoModeAll(rootBoxAdapter, function () {
            excludePianoModeSubscription.terminate();
            subscribeExcludePianoMode();
            notify.request();
        });
    };
    subscribeExcludePianoMode();
    var shortcuts = lib_dom_1.ShortcutManager.get().createContext(lib_std_1.Predicates.alwaysTrue, "PianoPanel");
    var engine = project.engine;
    lifecycle.ownAll(position.subscribe(notify.request), pianoMode.subscribe(notify.request), excludePianoModeSubscription, shortcuts, shortcuts.register(PianoPanelShortcuts_1.PianoPanelShortcuts["position-increment"].shortcut, function () {
        if (!engine.isPlaying.getValue()) {
            var ppqn = position.getValue() + lib_dsp_1.PPQN.Quarter;
            engine.setPosition(Math.max(0, ppqn));
        }
    }, { allowRepeat: true }), shortcuts.register(PianoPanelShortcuts_1.PianoPanelShortcuts["position-decrement"].shortcut, function () {
        if (!engine.isPlaying.getValue()) {
            var ppqn = position.getValue() - lib_dsp_1.PPQN.Quarter;
            engine.setPosition(Math.max(0, ppqn));
        }
    }, { allowRepeat: true }));
    return (<div className={className}>
            <NoteFall_tsx_1.NoteFall lifecycle={lifecycle} service={service} updateNotifier={updateNotifier}/>
            <PianoRoll_tsx_1.PianoRoll lifecycle={lifecycle} service={service} updateNotifier={updateNotifier}/>
            <div className="controls">
                <lib_jsx_1.Group>
                    <span>Keyboard</span>
                    <RadioGroup_tsx_1.RadioGroup lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forValue(editing, keyboard)} elements={[
            { element: <span>88</span>, value: 0 },
            { element: <span>76</span>, value: 1 },
            { element: <span>61</span>, value: 2 },
            { element: <span>49</span>, value: 3 }
        ]}/>
                    <span>Time Scale</span>
                    <NumberInput_tsx_1.NumberInput lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forValue(editing, timeRangeInQuarters)}/>
                    <span>Note Width</span>
                    <NumberInput_tsx_1.NumberInput lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forValue(editing, noteScale)} step={0.1} mapper={noteScale.stringMapping}/>
                    <span>Transpose</span>
                    <NumberInput_tsx_1.NumberInput lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forValue(editing, transpose)} step={1} mapper={transpose.stringMapping}/>
                    <span>Note Labels</span>
                    <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forValue(editing, noteLabels)}>
                        <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                    </Checkbox_tsx_1.Checkbox>
                    {tracksHeader}
                    {rootBoxAdapter.audioUnits.adapters()
            .flatMap(function (audioUnitBoxAdapter) { return audioUnitBoxAdapter.tracks.values()
            .filter(function (track) { return track.type === studio_adapters_1.TrackType.Notes; })
            .map(function (track, index, array) { return (<lib_jsx_1.Group>
                                        <span>{
            // TODO This list will not scale (scroll) and isn't very well designed
            array.length === 1
                ? audioUnitBoxAdapter.label
                : "".concat((audioUnitBoxAdapter.label), " (").concat(index + 1, ")")}</span>
                                        <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={EditWrapper_ts_1.EditWrapper.forValue(editing, lib_std_1.MutableObservableValue.inverseBoolean(track.box.excludePianoMode))}>
                                            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                                        </Checkbox_tsx_1.Checkbox>
                                    </lib_jsx_1.Group>); }); })}
                </lib_jsx_1.Group>
            </div>
            {noMidiTrackMessage}
        </div>);
};
exports.PianoModePanel = PianoModePanel;
