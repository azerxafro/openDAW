"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportGroup = void 0;
var TransportGroup_sass_inline_1 = require("./TransportGroup.sass?inline");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var Button_tsx_1 = require("@/ui/components/Button.tsx");
var lib_std_1 = require("@opendaw/lib-std");
var studio_enums_1 = require("@opendaw/studio-enums");
var Checkbox_1 = require("@/ui/components/Checkbox");
var Surface_1 = require("@/ui/surface/Surface");
var CountIn_1 = require("@/ui/header/CountIn");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var GlobalShortcuts_1 = require("@/ui/shortcuts/GlobalShortcuts");
var ShortcutTooltip_1 = require("@/ui/shortcuts/ShortcutTooltip");
var className = lib_dom_1.Html.adoptStyleSheet(TransportGroup_sass_inline_1.default, "TransportGroup");
var TransportGroup = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var engine = service.engine, projectProfileService = service.projectProfileService;
    var playback = engine.preferences.settings.playback;
    var loop = new lib_std_1.DefaultObservableValue(false);
    var recordButton = (<Button_tsx_1.Button lifecycle={lifecycle} appearance={{
            color: studio_enums_1.Colors.red.fade(0.2), activeColor: studio_enums_1.Colors.red,
            tooltip: ShortcutTooltip_1.ShortcutTooltip.create("Start Recording", GlobalShortcuts_1.GlobalShortcuts["start-recording"].shortcut)
        }} onClick={function (event) {
            service.runIfProject(function (project) {
                var _a;
                if (project.isRecording()) {
                    project.stopRecording();
                }
                else {
                    project.startRecording(!event.shiftKey);
                    (_a = document.querySelector("[data-scope=\"regions\"]")) === null || _a === void 0 ? void 0 : _a.focus();
                }
            });
        }}><Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Record}/></Button_tsx_1.Button>);
    var playButton = (<Button_tsx_1.Button lifecycle={lifecycle} appearance={{
            color: studio_enums_1.Colors.green.saturate(0.0),
            activeColor: studio_enums_1.Colors.green,
            tooltip: ShortcutTooltip_1.ShortcutTooltip.create("Play", GlobalShortcuts_1.GlobalShortcuts["toggle-playback"].shortcut)
        }} onClick={function () {
            if (engine.isPlaying.getValue()) {
                engine.stop();
            }
            else {
                engine.play();
            }
        }}><Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Play}/></Button_tsx_1.Button>);
    var loopLifecycle = lifecycle.own(new lib_std_1.Terminator());
    var countInLifecycle = lifecycle.own(new lib_std_1.Terminator());
    var recordingObserver = function () { return recordButton.classList.toggle("active", engine.isCountingIn.getValue() || engine.isRecording.getValue()); };
    lifecycle.ownAll(engine.isPlaying.subscribe(function (owner) { return playButton.classList.toggle("active", owner.getValue()); }), engine.isCountingIn.subscribe(recordingObserver), engine.isRecording.subscribe(recordingObserver), engine.isCountingIn.subscribe(function (owner) {
        if (owner.getValue()) {
            Surface_1.Surface.get(recordButton).body.appendChild((0, CountIn_1.CountIn)({ lifecycle: countInLifecycle, engine: engine }));
        }
        else {
            countInLifecycle.terminate();
        }
    }), studio_core_1.ContextMenu.subscribe(playButton, function (collector) { return collector
        .addItems(studio_core_1.MenuItem.default({
        label: "Resume from last playback starting position",
        checked: playback.timestampEnabled
    }).setTriggerProcedure(function () { return playback.timestampEnabled = !playback.timestampEnabled; }), studio_core_1.MenuItem.default({
        label: "Pause playback on loop end if loop is disabled",
        checked: playback.pauseOnLoopDisabled
    }).setTriggerProcedure(function () { return playback.pauseOnLoopDisabled = !playback.pauseOnLoopDisabled; })); }), projectProfileService.catchupAndSubscribe(function (optProfile) {
        loopLifecycle.terminate();
        optProfile.match({
            none: function () { return loop.setValue(false); },
            some: function (_a) {
                var _b = _a.project, editing = _b.editing, enabled = _b.timelineBox.loopArea.enabled;
                loop.setValue(enabled.getValue());
                loopLifecycle.ownAll(loop.subscribe(function (owner) {
                    editing.modify(function () { return enabled.setValue(owner.getValue()); });
                }), enabled.subscribe(function (owner) { return loop.setValue(owner.getValue()); }));
            }
        });
    }));
    return (<div className={className}>
            {recordButton}
            {playButton}
            <Button_tsx_1.Button lifecycle={lifecycle} onClick={function () { engine.stop(true); }} appearance={{
            activeColor: studio_enums_1.Colors.bright,
            tooltip: ShortcutTooltip_1.ShortcutTooltip.create("Stop", GlobalShortcuts_1.GlobalShortcuts["stop-playback"].shortcut)
        }}>
                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Stop}/>
            </Button_tsx_1.Button>
            <Checkbox_1.Checkbox lifecycle={lifecycle} model={loop} appearance={{
            activeColor: studio_enums_1.Colors.gray,
            tooltip: ShortcutTooltip_1.ShortcutTooltip.create("Loop", GlobalShortcuts_1.GlobalShortcuts["toggle-loop"].shortcut)
        }}>
                <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Loop}/>
            </Checkbox_1.Checkbox>
        </div>);
};
exports.TransportGroup = TransportGroup;
