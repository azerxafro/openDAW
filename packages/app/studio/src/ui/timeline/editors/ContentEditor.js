"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentEditor = void 0;
var ContentEditor_sass_inline_1 = require("./ContentEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var NoteEditor_tsx_1 = require("@/ui/timeline/editors/notes/NoteEditor.tsx");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var SnapSelector_tsx_1 = require("@/ui/timeline/SnapSelector.tsx");
var Snapping_ts_1 = require("@/ui/timeline/Snapping.ts");
var studio_core_1 = require("@opendaw/studio-core");
var TimeAxis_tsx_1 = require("@/ui/timeline/TimeAxis.tsx");
var TimelineRangeSlider_tsx_1 = require("@/ui/timeline/TimelineRangeSlider.tsx");
var ValueEventsEditor_tsx_1 = require("./value/ValueEventsEditor.tsx");
var FlexSpacer_tsx_1 = require("@/ui/components/FlexSpacer.tsx");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var AudioEditor_tsx_1 = require("@/ui/timeline/editors/audio/AudioEditor.tsx");
var MenuButton_1 = require("@/ui/components/MenuButton");
var ClipReader_ts_1 = require("@/ui/timeline/editors/ClipReader.ts");
var RegionBound_1 = require("./RegionBound");
var RegionReader_ts_1 = require("@/ui/timeline/editors/RegionReader.ts");
var studio_enums_1 = require("@opendaw/studio-enums");
var ParameterValueEditing_ts_1 = require("@/ui/timeline/editors/value/ParameterValueEditing.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var ContentEditorShortcuts_1 = require("@/ui/shortcuts/ContentEditorShortcuts");
var className = lib_dom_1.Html.adoptStyleSheet(ContentEditor_sass_inline_1.default, "ContentEditor");
var ContentEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var range = new studio_core_1.TimelineRange({ padding: 12 });
    range.minimum = lib_dsp_1.PPQN.SemiQuaver * 2;
    var snapping = new Snapping_ts_1.Snapping(range);
    var runtime = lifecycle.own(new lib_std_1.Terminator());
    var editingSubject = service.project.userEditingManager.timeline;
    var contentEditor = <div className="editor"/>;
    var menu = {
        viewMenu: studio_core_1.MenuItem.root(),
        editMenu: studio_core_1.MenuItem.root()
    };
    var owner = lib_std_1.Option.None;
    var zoomToLoopDuration = function () { return owner.ifSome(function (reader) {
        return range.zoomRange(reader.offset, reader.offset + reader.loopDuration + lib_dsp_1.PPQN.Bar, 16);
    }); };
    var attachGenericViewMenu = function () { return runtime.own(menu.viewMenu.attach(function (collector) {
        return collector.addItems(studio_core_1.MenuItem.default({
            label: "Zoom to loop duration",
            selectable: editingSubject.get().nonEmpty(),
            shortcut: ContentEditorShortcuts_1.ContentEditorShortcuts["zoom-to-loop-duration"].shortcut.format()
        }).setTriggerProcedure(zoomToLoopDuration), studio_core_1.MenuItem.default({
            label: "Exit",
            hidden: !lib_dom_1.Browser.isLocalHost(),
            selectable: editingSubject.get().nonEmpty()
        }).setTriggerProcedure(function () { return editingSubject.clear(); }));
    })); };
    lifecycle.ownAll({ terminate: function () { owner = lib_std_1.Option.None; } }, snapping.registerSignatureTrackAdapter(service.project.timelineBoxAdapter.signatureTrack));
    var element = (<div className={className} tabIndex={-1}>
            <div className="generic">
                <div className="tool">
                    <SnapSelector_tsx_1.SnapSelector lifecycle={lifecycle} snapping={snapping}/>
                    <FlexSpacer_tsx_1.FlexSpacer />
                    <div className="menu">
                        <MenuButton_1.MenuButton root={menu.viewMenu} appearance={{ color: studio_enums_1.Colors.gray, activeColor: studio_enums_1.Colors.bright }} groupId="content-editor">
                            <span style={{ padding: "0 0.5em" }}>View</span>
                        </MenuButton_1.MenuButton>
                        <MenuButton_1.MenuButton root={menu.editMenu} appearance={{ color: studio_enums_1.Colors.gray, activeColor: studio_enums_1.Colors.bright }} groupId="content-editor">
                            <span style={{ padding: "0 0.5em" }}>Edit</span>
                        </MenuButton_1.MenuButton>
                    </div>
                </div>
                <div className="time-axis">
                    <RegionBound_1.RegionBound lifecycle={lifecycle} service={service} range={range}/>
                    <TimeAxis_tsx_1.TimeAxis lifecycle={lifecycle} service={service} snapping={snapping} range={range} mapper={{
            mapPlaybackCursor: function (position) { return owner.match({
                none: function () { return position; },
                some: function (reader) { return reader.mapPlaybackCursor(position); }
            }); }
        }}/>
                </div>
                {contentEditor}
                <div className="space"/>
                <TimelineRangeSlider_tsx_1.TimelineRangeSlider lifecycle={lifecycle} range={range}/>
            </div>
        </div>);
    var fallback = function (box) { return (<lib_jsx_1.Frag>
            <div className="empty-header"/>
            <div className="label">
                {"No Region Editor for ".concat(box.name, " yet.")}&nbsp;<span style={{ textDecoration: "underline", cursor: "pointer" }} onclick={function () { return editingSubject.clear(); }}>Close</span>
            </div>
        </lib_jsx_1.Frag>); };
    var createNoteEditor = function (owner) { return (<NoteEditor_tsx_1.NoteEditor lifecycle={runtime} service={service} menu={menu} range={range} snapping={snapping} reader={owner}/>); };
    var createAudioEditor = function (reader) { return (<AudioEditor_tsx_1.AudioEditor lifecycle={runtime} service={service} menu={menu} range={range} snapping={snapping} reader={reader}/>); };
    var createValueEditor = function (reader, collection) {
        var context = runtime.own(new ParameterValueEditing_ts_1.ParameterValueEditing(service.project, collection));
        return (<ValueEventsEditor_tsx_1.ValueEventsEditor lifecycle={runtime} service={service} context={context} menu={menu} range={range} snapping={snapping} eventMapping={lib_std_1.ValueMapping.unipolar()} reader={reader}/>);
    };
    var updateEditor = (0, lib_dom_1.deferNextFrame)(function () { return editingSubject.get().match({
        some: function (vertex) {
            var _a;
            var _b = service.project, boxAdapters = _b.boxAdapters, timelineBoxAdapter = _b.timelineBoxAdapter;
            (0, lib_jsx_1.replaceChildren)(contentEditor, (_a = vertex.box.accept({
                visitNoteClipBox: function (box) {
                    var reader = ClipReader_ts_1.ClipReader
                        .forNoteClipBoxAdapter(boxAdapters.adapterFor(box, studio_adapters_1.NoteClipBoxAdapter), timelineBoxAdapter);
                    owner = lib_std_1.Option.wrap(reader);
                    return createNoteEditor(reader);
                },
                visitNoteRegionBox: function (box) {
                    var adapter = boxAdapters.adapterFor(box, studio_adapters_1.NoteRegionBoxAdapter);
                    var reader = RegionReader_ts_1.RegionReader.forNoteRegionBoxAdapter(adapter, timelineBoxAdapter);
                    owner = lib_std_1.Option.wrap(reader);
                    return createNoteEditor(reader);
                },
                visitValueClipBox: function (box) {
                    var adapter = boxAdapters.adapterFor(box, studio_adapters_1.ValueClipBoxAdapter);
                    var reader = ClipReader_ts_1.ClipReader.forValueClipBoxAdapter(adapter, timelineBoxAdapter);
                    owner = lib_std_1.Option.wrap(reader);
                    return createValueEditor(reader, box.clips);
                },
                visitValueRegionBox: function (box) {
                    var adapter = boxAdapters.adapterFor(box, studio_adapters_1.ValueRegionBoxAdapter);
                    var reader = RegionReader_ts_1.RegionReader.forValueRegionBoxAdapter(adapter, timelineBoxAdapter);
                    owner = lib_std_1.Option.wrap(reader);
                    return createValueEditor(reader, box.regions);
                },
                visitAudioClipBox: function (box) {
                    var adapter = boxAdapters.adapterFor(box, studio_adapters_1.AudioClipBoxAdapter);
                    var reader = ClipReader_ts_1.ClipReader.forAudioClipBoxAdapter(adapter, timelineBoxAdapter);
                    owner = lib_std_1.Option.wrap(reader);
                    return createAudioEditor(reader);
                },
                visitAudioRegionBox: function (box) {
                    var adapter = boxAdapters.adapterFor(box, studio_adapters_1.AudioRegionBoxAdapter);
                    var reader = RegionReader_ts_1.RegionReader.forAudioRegionBoxAdapter(adapter, timelineBoxAdapter);
                    owner = lib_std_1.Option.wrap(reader);
                    return createAudioEditor(reader);
                }
            })) !== null && _a !== void 0 ? _a : (function () { return fallback(vertex.box); })());
            attachGenericViewMenu();
            range.width = contentEditor.clientWidth;
            owner.ifSome(function (reader) {
                return range.zoomRange(reader.offset, reader.offset + reader.loopDuration + lib_dsp_1.PPQN.Bar, 16);
            });
        },
        none: function () {
            owner = lib_std_1.Option.None;
            element.classList.add("disabled");
            (0, lib_jsx_1.replaceChildren)(contentEditor, (<lib_jsx_1.Frag>
                    <div className="empty-header"/>
                    <div className="label">
                        <p className="help-section">Double-click a region or clip to edit</p>
                    </div>
                </lib_jsx_1.Frag>));
        }
    }); });
    var engine = service.project.engine;
    var shortcuts = lib_dom_1.ShortcutManager.get().createContext(element, "ContentEditor");
    lifecycle.ownAll(updateEditor, editingSubject.catchupAndSubscribe(function () {
        element.classList.remove("disabled");
        runtime.terminate();
        updateEditor.request();
    }), lib_dom_1.Html.watchResize(element, function () {
        return element.style.setProperty("--cursor-height", "".concat((contentEditor.clientHeight + 1), "px"));
    }), lib_dom_1.Html.watchResize(contentEditor, function () { return range.width = contentEditor.clientWidth; }), range.subscribe((function () {
        // FIXME Tried it with a timeout, but it did not behave correctly
        var mainTimelineRange = service.timeline.range;
        range.maxUnits = mainTimelineRange.maxUnits;
        return function () {
            if (range.maxUnits !== mainTimelineRange.maxUnits) {
                range.maxUnits = mainTimelineRange.maxUnits;
            }
        };
    })()), shortcuts, shortcuts.register(ContentEditorShortcuts_1.ContentEditorShortcuts["position-increment"].shortcut, function () {
        if (!engine.isPlaying.getValue()) {
            var pos = engine.position.getValue();
            engine.setPosition(snapping.floor(pos) + snapping.value(pos));
        }
    }, { allowRepeat: true }), shortcuts.register(ContentEditorShortcuts_1.ContentEditorShortcuts["position-decrement"].shortcut, function () {
        if (!engine.isPlaying.getValue()) {
            var pos = engine.position.getValue();
            engine.setPosition(Math.max(0, snapping.ceil(pos) - snapping.value(pos)));
        }
    }, { allowRepeat: true }), shortcuts.register(ContentEditorShortcuts_1.ContentEditorShortcuts["zoom-to-loop-duration"].shortcut, zoomToLoopDuration));
    return element;
};
exports.ContentEditor = ContentEditor;
