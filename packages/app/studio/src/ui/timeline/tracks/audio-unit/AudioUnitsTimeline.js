"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioUnitsTimeline = void 0;
var AudioUnitsTimeline_sass_inline_1 = require("./AudioUnitsTimeline.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var Scroller_tsx_1 = require("@/ui/components/Scroller.tsx");
var ScrollModel_ts_1 = require("@/ui/components/ScrollModel.ts");
var TracksManager_ts_1 = require("@/ui/timeline/tracks/audio-unit/TracksManager.ts");
var Track_1 = require("./Track");
var RegionsArea_tsx_1 = require("./regions/RegionsArea.tsx");
var ClipsArea_tsx_1 = require("./clips/ClipsArea.tsx");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_dom_1 = require("@opendaw/lib-dom");
var Constants_ts_1 = require("./Constants.ts");
var HeadersArea_1 = require("@/ui/timeline/tracks/audio-unit/headers/HeadersArea");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var MenuButton_1 = require("@/ui/components/MenuButton");
var studio_core_1 = require("@opendaw/studio-core");
var DefaultInstrumentFactory_1 = require("@/ui/defaults/DefaultInstrumentFactory");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var className = lib_dom_1.Html.adoptStyleSheet(AudioUnitsTimeline_sass_inline_1.default, "AudioUnitsTimeline");
var AudioUnitsTimeline = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var range = service.timeline.range;
    var _b = service.project, editing = _b.editing, boxGraph = _b.boxGraph, rootBoxAdapter = _b.rootBoxAdapter, userEditingManager = _b.userEditingManager, boxAdapters = _b.boxAdapters;
    var scrollModel = new ScrollModel_ts_1.ScrollModel();
    var scrollContainer = (<div className="scrollable">
            <div className="fill"/>
            <div className="extra">
                <div className="create-instrument">
                    <MenuButton_1.MenuButton root={studio_core_1.MenuItem.root()
            .setRuntimeChildrenProcedure(function (parent) { return parent
            .addMenuItem.apply(parent, Object.entries(studio_adapters_1.InstrumentFactories.Named).map(function (_a) {
            var _key = _a[0], factory = _a[1];
            return studio_core_1.MenuItem.default({
                label: factory.defaultName,
                icon: factory.defaultIcon
            }).setTriggerProcedure(function () {
                var _a = service.project, api = _a.api, editing = _a.editing;
                editing.modify(function () { return DefaultInstrumentFactory_1.DefaultInstrumentFactory.create(api, factory); });
            });
        })); })} appearance={{ color: studio_enums_1.Colors.shadow }}>
                        <span>Add instrument</span> <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Add}/>
                    </MenuButton_1.MenuButton>
                </div>
                <div className="region-area help-section">Drop instruments or samples here</div>
            </div>
        </div>);
    var factory = {
        create: function (manager, lifecycle, audioUnitBoxAdapter, trackBoxAdapter) { return (<Track_1.Track lifecycle={lifecycle} service={service} trackManager={manager} audioUnitBoxAdapter={audioUnitBoxAdapter} trackBoxAdapter={trackBoxAdapter}/>); }
    };
    var manager = lifecycle.own(new TracksManager_ts_1.TracksManager(service, scrollContainer, factory));
    var element = (<div className={className}>
            <HeadersArea_1.HeadersArea lifecycle={lifecycle} service={service} manager={manager} scrollModel={scrollModel}/>
            <ClipsArea_tsx_1.ClipsArea lifecycle={lifecycle} service={service} manager={manager} scrollModel={scrollModel} scrollContainer={scrollContainer}/>
            <RegionsArea_tsx_1.RegionsArea lifecycle={lifecycle} service={service} manager={manager} scrollModel={scrollModel} scrollContainer={scrollContainer} range={range}/>
            {scrollContainer}
            <Scroller_tsx_1.Scroller lifecycle={lifecycle} model={scrollModel} floating/>
        </div>);
    lifecycle.ownAll(studio_core_1.ClipboardManager.install(element, studio_core_1.AudioUnitsClipboard.createHandler({
        getEnabled: function () { return true; },
        editing: editing,
        boxGraph: boxGraph,
        rootBoxAdapter: rootBoxAdapter,
        audioUnitEditing: userEditingManager.audioUnit,
        getEditedAudioUnit: function () { return userEditingManager.audioUnit.get().flatMap(function (vertex) {
            if (vertex.box.name === studio_boxes_1.AudioUnitBox.ClassName) {
                return lib_std_1.Option.wrap(boxAdapters.adapterFor(vertex.box, studio_adapters_1.AudioUnitBoxAdapter));
            }
            return lib_std_1.Option.None;
        }); }
    })), lib_dom_1.AnimationFrame.add(function () {
        // The ResizeObserver only tracks the visible size changes, not off-screen content,
        // so we take a simple approach to catch all changes.
        scrollModel.visibleSize = scrollContainer.clientHeight;
        scrollModel.contentSize = scrollContainer.scrollHeight;
    }), scrollModel.subscribe(function (_a) {
        var contentSize = _a.contentSize;
        element.style.setProperty("--rest-top", "".concat(contentSize === 0 ? 0 : contentSize, "px"));
        element.style.setProperty("--rest-height", "".concat(element.clientHeight - contentSize, "px"));
    }), lib_dom_1.Events.subscribe(element, "wheel", function (event) { return scrollModel.position += event.deltaY; }, { passive: false }), scrollModel.subscribe(function () { return scrollContainer.scrollTop = scrollModel.position; }), lib_dom_1.Events.subscribe(scrollContainer, "scroll", function () { return scrollModel.position = scrollContainer.scrollTop; }));
    element.style.setProperty("--extra-space", "".concat(Constants_ts_1.ExtraSpace, "px"));
    return element;
};
exports.AudioUnitsTimeline = AudioUnitsTimeline;
