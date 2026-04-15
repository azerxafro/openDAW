"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicePanel = void 0;
var DevicePanel_sass_inline_1 = require("./DevicePanel.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var ScrollModel_ts_1 = require("@/ui/components/ScrollModel.ts");
var Scroller_1 = require("@/ui/components/Scroller");
var DeviceMidiMeter_tsx_1 = require("@/ui/devices/panel/DeviceMidiMeter.tsx");
var ChannelStrip_1 = require("@/ui/mixer/ChannelStrip");
var AutoScroll_1 = require("@/ui/AutoScroll");
var lib_dom_1 = require("@opendaw/lib-dom");
var DevicePanelDragAndDrop_1 = require("@/ui/devices/DevicePanelDragAndDrop");
var NoAudioUnitSelectedPlaceholder_1 = require("@/ui/devices/panel/NoAudioUnitSelectedPlaceholder");
var NoEffectPlaceholder_1 = require("@/ui/devices/panel/NoEffectPlaceholder");
var DeviceMount_1 = require("@/ui/devices/panel/DeviceMount");
var ShadertoyPreview_1 = require("@/ui/devices/panel/ShadertoyPreview");
var className = lib_dom_1.Html.adoptStyleSheet(DevicePanel_sass_inline_1.default, "DevicePanel");
var DevicePanel = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var midiEffectsContainer = <div className="midi-container"/>;
    var instrumentContainer = <div className="source-container"/>;
    var audioEffectsContainer = <div className="audio-container"/>;
    var channelStripContainer = <div className="channel-strip-container"/>;
    var noAudioUnitSelectedPlaceholder = (<NoAudioUnitSelectedPlaceholder_1.NoAudioUnitSelectedPlaceholder lifecycle={lifecycle} service={service}/>);
    var noEffectPlaceholder = (<NoEffectPlaceholder_1.NoEffectPlaceholder service={service}/>);
    var containers = (<div className="containers">
            {midiEffectsContainer}
            {instrumentContainer}
            {audioEffectsContainer}
        </div>);
    var devices = (<div className="editors">
            {containers}
            {noAudioUnitSelectedPlaceholder}
            {noEffectPlaceholder}
        </div>);
    var scrollModel = new ScrollModel_ts_1.ScrollModel();
    var updateScroller = function () {
        scrollModel.visibleSize = devices.clientWidth;
        scrollModel.contentSize = containers.clientWidth;
    };
    var getContext = function (project, box) {
        var deviceHost = project.boxAdapters.adapterFor(box, studio_adapters_1.Devices.isHost);
        return (0, lib_std_1.asDefined)(box.accept({
            visitAudioUnitBox: function (_box) { return ({
                deviceHost: deviceHost,
                instrument: deviceHost.audioUnitBoxAdapter().input.adapter()
            }); },
            visitPlayfieldSampleBox: function (box) { return ({
                deviceHost: deviceHost,
                instrument: new lib_std_1.MutableObservableOption(project.boxAdapters.adapterFor(box, studio_adapters_1.PlayfieldSampleBoxAdapter))
            }); }
        }));
    };
    var chainLifecycle = lifecycle.own(new lib_std_1.Terminator());
    var mounts = lib_std_1.UUID.newSet(function (_a) {
        var uuid = _a.uuid;
        return uuid;
    });
    var updateDom = lifecycle.own((0, lib_dom_1.deferNextFrame)(function () {
        lib_dom_1.Html.empty(midiEffectsContainer);
        lib_dom_1.Html.empty(instrumentContainer);
        lib_dom_1.Html.empty(audioEffectsContainer);
        lib_dom_1.Html.empty(channelStripContainer);
        chainLifecycle.terminate();
        var profile = service.projectProfileService.getValue();
        if (profile.isEmpty()) {
            return;
        }
        var project = profile.unwrap().project;
        var optEditing = project.userEditingManager.audioUnit.get();
        noAudioUnitSelectedPlaceholder.classList.toggle("hidden", optEditing.nonEmpty());
        noEffectPlaceholder.classList.toggle("hidden", optEditing.isEmpty());
        if (optEditing.isEmpty()) {
            return;
        }
        var _a = getContext(project, optEditing.unwrap().box), deviceHost = _a.deviceHost, instrument = _a.instrument;
        if (instrument.nonEmpty()) {
            var input = instrument.unwrap();
            if (input.accepts === "midi") {
                (0, lib_jsx_1.appendChildren)(midiEffectsContainer, (<div style={{ margin: "1.125rem 0 0 0" }}>
                        <DeviceMidiMeter_tsx_1.DeviceMidiMeter lifecycle={chainLifecycle} receiver={project.liveStreamReceiver} address={deviceHost.audioUnitBoxAdapter().address}/>
                    </div>));
            }
        }
        var midiEffects = deviceHost.midiEffects;
        (0, lib_jsx_1.appendChildren)(midiEffectsContainer, midiEffects.adapters().map(function (adapter) { return mounts.get(adapter.uuid).editor(); }));
        (0, lib_jsx_1.appendChildren)(instrumentContainer, instrument.match({
            none: function () { return <div />; },
            some: function (type) { return mounts.get(type.uuid).editor(); }
        }));
        var audioEffects = deviceHost.audioEffects;
        (0, lib_jsx_1.appendChildren)(audioEffectsContainer, audioEffects.adapters().map(function (adapter) { return mounts.get(adapter.uuid).editor(); }));
        var hidden = !optEditing.nonEmpty() || !(audioEffects.isEmpty() && midiEffects.isEmpty());
        noEffectPlaceholder.classList.toggle("hidden", hidden);
        (0, lib_jsx_1.appendChildren)(channelStripContainer, (<ChannelStrip_1.ChannelStrip lifecycle={chainLifecycle} service={service} adapter={deviceHost.audioUnitBoxAdapter()} compact={true}/>));
        updateScroller();
    }));
    var subscribeChain = function (_a) {
        var midiEffects = _a.midiEffects, instrument = _a.instrument, audioEffects = _a.audioEffects, host = _a.host;
        var terminator = new lib_std_1.Terminator();
        var instrumentLifecycle = new lib_std_1.Terminator();
        terminator.ownAll(midiEffects.catchupAndSubscribe({
            onAdd: function (adapter) {
                mounts.add(DeviceMount_1.DeviceMount.forMidiEffect(service, adapter, host, updateDom.request));
                updateDom.request();
            },
            onRemove: function (adapter) {
                mounts.removeByKey(adapter.uuid).terminate();
                updateDom.request();
            },
            onReorder: function (_adapter) { return updateDom.request(); }
        }), instrument.catchupAndSubscribe(function (owner) {
            instrumentLifecycle.terminate();
            owner.ifSome(function (adapter) {
                mounts.add(DeviceMount_1.DeviceMount.forInstrument(service, adapter, host, updateDom.request));
                instrumentLifecycle.own({
                    terminate: function () {
                        mounts.removeByKey(adapter.uuid).terminate();
                        updateDom.request();
                    }
                });
            });
            updateDom.request();
        }), audioEffects.catchupAndSubscribe({
            onAdd: function (adapter) {
                mounts.add(DeviceMount_1.DeviceMount.forAudioEffect(service, adapter, host, updateDom.request));
                updateDom.request();
            },
            onRemove: function (adapter) {
                mounts.removeByKey(adapter.uuid).terminate();
                updateDom.request();
            },
            onReorder: function (_adapter) { return updateDom.request(); }
        }), {
            terminate: function () {
                mounts.forEach(function (mount) { return mount.terminate(); });
                mounts.clear();
                updateDom.request();
            }
        });
        updateDom.request();
        return terminator;
    };
    var updateFrozenState = function () {
        var profile = service.projectProfileService.getValue();
        if (profile.isEmpty()) {
            return;
        }
        var project = profile.unwrap().project;
        var optEditing = project.userEditingManager.audioUnit.get();
        if (optEditing.isEmpty()) {
            return;
        }
        var audioUnitBoxAdapter = project.boxAdapters
            .adapterFor(optEditing.unwrap().box, studio_adapters_1.Devices.isHost).audioUnitBoxAdapter();
        containers.classList.toggle("frozen", project.audioUnitFreeze.isFrozen(audioUnitBoxAdapter));
    };
    var freezeLifecycle = lifecycle.own(new lib_std_1.Terminator());
    var chainLifeTime = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(service.projectProfileService.catchupAndSubscribe(function (option) {
        chainLifeTime.terminate();
        freezeLifecycle.terminate();
        option.ifSome(function (_a) {
            var project = _a.project;
            freezeLifecycle.own(project.audioUnitFreeze.subscribe(function () { return updateFrozenState(); }));
            project.userEditingManager.audioUnit.catchupAndSubscribe(function (target) {
                chainLifeTime.terminate();
                if (target.isEmpty()) {
                    return;
                }
                var editingBox = target.unwrap().box;
                var _a = getContext(project, editingBox), deviceHost = _a.deviceHost, instrument = _a.instrument;
                chainLifeTime.own(subscribeChain({
                    midiEffects: deviceHost.midiEffects,
                    instrument: instrument,
                    audioEffects: deviceHost.audioEffects,
                    host: deviceHost
                }));
                updateFrozenState();
            });
        });
    }));
    var element = (<div className={className}>
            <div className="devices">
                {devices}
                <Scroller_1.Scroller lifecycle={lifecycle} model={scrollModel} floating={true} orientation={Scroller_1.Orientation.horizontal}/>
            </div>
            {channelStripContainer}
            <ShadertoyPreview_1.ShadertoyPreview lifecycle={lifecycle} service={service}/>
        </div>);
    updateDom.request();
    var getCurrentDeviceHost = function () {
        var profile = service.projectProfileService.getValue();
        if (profile.isEmpty()) {
            return lib_std_1.Option.None;
        }
        var project = profile.unwrap().project;
        var optEditing = project.userEditingManager.audioUnit.get();
        if (optEditing.isEmpty()) {
            return lib_std_1.Option.None;
        }
        return lib_std_1.Option.wrap(project.boxAdapters.adapterFor(optEditing.unwrap().box, studio_adapters_1.Devices.isHost));
    };
    lifecycle.ownAll(lib_dom_1.Html.watchResize(element, updateScroller), scrollModel.subscribe(function () { return devices.scrollLeft = scrollModel.position; }), lib_dom_1.Events.subscribe(element, "wheel", function (event) { return scrollModel.moveBy(event.deltaX); }, { passive: true }), (0, AutoScroll_1.installAutoScroll)(devices, function (deltaX, _deltaY) { return scrollModel.position += deltaX; }, { padding: [0, 32, 0, 0] }), DevicePanelDragAndDrop_1.DevicePanelDragAndDrop.install(service.project, devices, midiEffectsContainer, instrumentContainer, audioEffectsContainer), lib_dom_1.Events.subscribe(devices, "pointerdown", function (event) {
        var target = event.target;
        if (target instanceof Element && (0, lib_std_1.isAbsent)(target.closest("[data-drag]"))) {
            service.project.deviceSelection.deselectAll();
        }
    }), lib_dom_1.Events.subscribe(element, "keydown", function (event) {
        if (lib_dom_1.Keyboard.isDelete(event)) {
            var _a = service.project, deviceSelection = _a.deviceSelection, editing = _a.editing;
            if (deviceSelection.isEmpty()) {
                return;
            }
            var optHost = getCurrentDeviceHost();
            if (optHost.isEmpty()) {
                return;
            }
            var host = optHost.unwrap();
            var selected_1 = new Set(deviceSelection.selected().filter(function (adapter) { return adapter.type !== "instrument"; }));
            if (selected_1.size === 0) {
                return;
            }
            event.preventDefault();
            var remainingMidi_1 = host.midiEffects.adapters().filter(function (adapter) { return !selected_1.has(adapter); });
            var remainingAudio_1 = host.audioEffects.adapters().filter(function (adapter) { return !selected_1.has(adapter); });
            editing.modify(function () {
                selected_1.forEach(function (adapter) { return adapter.box.delete(); });
                remainingMidi_1.forEach(function (adapter, index) { return adapter.indexField.setValue(index); });
                remainingAudio_1.forEach(function (adapter, index) { return adapter.indexField.setValue(index); });
            });
        }
    }));
    return element;
};
exports.DevicePanel = DevicePanel;
