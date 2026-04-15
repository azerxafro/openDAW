"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionsArea = void 0;
var RegionsArea_sass_inline_1 = require("./RegionsArea.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var CutCursor_tsx_1 = require("@/ui/timeline/CutCursor.tsx");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var AutoScroll_ts_1 = require("@/ui/AutoScroll.ts");
var Config_ts_1 = require("@/ui/timeline/Config.ts");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var RegionSelectionLocator_ts_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionSelectionLocator.ts");
var RegionContextMenu_ts_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionContextMenu.ts");
var RegionCapturing_ts_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionCapturing.ts");
var SelectionRectangle_tsx_1 = require("@/ui/timeline/SelectionRectangle.tsx");
var cursor_ts_1 = require("@/ui/hooks/cursor.ts");
var RegionStartModifier_ts_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionStartModifier.ts");
var RegionDurationModifier_ts_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionDurationModifier.ts");
var RegionMoveModifier_ts_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionMoveModifier.ts");
var RegionLoopDurationModifier_ts_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionLoopDurationModifier.ts");
var RegionContentStartModifier_ts_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionContentStartModifier.ts");
var RegionDragAndDrop_ts_1 = require("@/ui/timeline/tracks/audio-unit/regions/RegionDragAndDrop.ts");
var PanelType_ts_1 = require("@/ui/workspace/PanelType.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var DragAndDrop_1 = require("@/ui/DragAndDrop");
var dialogs_1 = require("@/ui/components/dialogs");
var studio_core_1 = require("@opendaw/studio-core");
var RegionsShortcuts_1 = require("@/ui/shortcuts/RegionsShortcuts");
var className = lib_dom_1.Html.adoptStyleSheet(RegionsArea_sass_inline_1.default, "RegionsArea");
var CursorMap = Object.freeze({
    "position": "auto",
    "start": 4 /* Cursor.LoopStart */,
    "complete": 3 /* Cursor.LoopEnd */,
    "loop-duration": 2 /* Cursor.ExpandWidth */,
    "content-start": 2 /* Cursor.ExpandWidth */,
    "content-complete": 2 /* Cursor.ExpandWidth */,
    "fading-in": "ew-resize",
    "fading-out": "ew-resize"
});
var RegionsArea = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, manager = _a.manager, scrollModel = _a.scrollModel, scrollContainer = _a.scrollContainer, range = _a.range;
    var project = service.project, timeline = service.timeline;
    var snapping = timeline.snapping;
    var selection = project.selection, regionSelection = project.regionSelection, editing = project.editing, boxAdapters = project.boxAdapters, timelineBox = project.timelineBox, userEditingManager = project.userEditingManager;
    var markerPosition = lifecycle.own(new lib_std_1.DefaultObservableValue(null));
    var element = (<div className={className} tabIndex={-1} data-scope="regions">
            <CutCursor_tsx_1.CutCursor lifecycle={lifecycle} position={markerPosition} range={range}/>
        </div>);
    var capturing = RegionCapturing_ts_1.RegionCapturing.create(element, manager, range, project.audioUnitFreeze);
    var audioUnitFreeze = project.audioUnitFreeze;
    var regionLocator = (0, RegionSelectionLocator_ts_1.createRegionLocator)(manager, range, regionSelection, audioUnitFreeze);
    var dragAndDrop = new RegionDragAndDrop_ts_1.RegionDragAndDrop(service, capturing, timeline.snapping);
    var shortcuts = lib_dom_1.ShortcutManager.get().createContext(element, "Regions");
    var engine = project.engine, boxGraph = project.boxGraph, overlapResolver = project.overlapResolver, timelineFocus = project.timelineFocus;
    var clipboardHandler = studio_core_1.RegionsClipboard.createHandler({
        getEnabled: function () { return !engine.isPlaying.getValue(); },
        getPosition: function () { return engine.position.getValue(); },
        setPosition: function (position) { return engine.setPosition(position); },
        editing: editing,
        selection: regionSelection,
        boxGraph: boxGraph,
        boxAdapters: boxAdapters,
        getTracks: function () { return manager.tracks().map(function (track) { return track.trackBoxAdapter; }); },
        getFocusedTrack: function () { return timelineFocus.track; },
        overlapResolver: overlapResolver
    });
    lifecycle.ownAll(regionSelection.catchupAndSubscribe({
        onSelected: function (selectable) { return selectable.onSelected(); },
        onDeselected: function (selectable) { return selectable.onDeselected(); }
    }), shortcuts, studio_core_1.ClipboardManager.install(element, clipboardHandler), shortcuts.register(RegionsShortcuts_1.RegionsShortcuts["select-all"].shortcut, function () {
        regionSelection.select.apply(regionSelection, manager.tracks()
            .filter(function (track) { return !audioUnitFreeze.isFrozen(track.audioUnitBoxAdapter); })
            .flatMap(function (_a) {
            var regions = _a.trackBoxAdapter.regions;
            return regions.collection.asArray();
        }));
    }), shortcuts.register(RegionsShortcuts_1.RegionsShortcuts["deselect-all"].shortcut, function () { return regionSelection.deselectAll(); }), shortcuts.register(RegionsShortcuts_1.RegionsShortcuts["delete-selection"].shortcut, function () {
        var selected = regionSelection.selected();
        if (selected.length === 0) {
            return false;
        }
        editing.modify(function () { return selected.forEach(function (region) { return region.box.delete(); }); });
        return true;
    }), shortcuts.register(RegionsShortcuts_1.RegionsShortcuts["toggle-mute"].shortcut, function () {
        var selected = regionSelection.selected();
        if (selected.length === 0) {
            return false;
        }
        editing.modify(function () { return selected.forEach(function (_a) {
            var mute = _a.box.mute;
            return mute.toggle();
        }); });
        return true;
    }), (0, RegionContextMenu_ts_1.installRegionContextMenu)({ timelineBox: timelineBox, element: element, service: service, capturing: capturing, selection: regionSelection, range: range }), lib_dom_1.Events.subscribe(element, "pointerdown", function (event) {
        var target = capturing.captureEvent(event);
        timelineFocus.clear();
        if (target === null) {
            return;
        }
        if (target.type === "region") {
            timelineFocus.focusRegion(target.region);
        }
        else if (target.type === "track") {
            timelineFocus.focusTrack(target.track.trackBoxAdapter);
        }
    }), lib_dom_1.Events.subscribeDblDwn(element, function (event) {
        var _a, _b, _c, _d;
        var target = capturing.captureEvent(event);
        if (target === null) {
            return;
        }
        if ((target === null || target === void 0 ? void 0 : target.type) === "region") {
            editing.modify(function () {
                userEditingManager.timeline.edit(target.region.box);
                service.panelLayout.showIfAvailable(PanelType_ts_1.PanelType.ContentEditor);
            });
        }
        else if (target.type === "track") {
            if (audioUnitFreeze.isFrozen(target.track.audioUnitBoxAdapter)) {
                return;
            }
            var trackBoxAdapter_1 = target.track.trackBoxAdapter;
            var x = event.clientX - element.getBoundingClientRect().left;
            var _e = snapping.xToBarInterval(x), position_1 = _e.position, complete_1 = _e.complete;
            position_1 = Math.max(position_1, ((_b = (_a = trackBoxAdapter_1.regions.collection
                .lowerEqual(position_1)) === null || _a === void 0 ? void 0 : _a.complete) !== null && _b !== void 0 ? _b : Number.NEGATIVE_INFINITY));
            complete_1 = Math.min(complete_1, ((_d = (_c = trackBoxAdapter_1.regions.collection
                .greaterEqual(position_1 + 1)) === null || _c === void 0 ? void 0 : _c.position) !== null && _d !== void 0 ? _d : Number.POSITIVE_INFINITY));
            if (complete_1 <= position_1) {
                return;
            }
            editing.modify(function () { return project.api.createTrackRegion(trackBoxAdapter_1.box, position_1, complete_1 - position_1)
                .ifSome(function (region) { return selection.select(region); }); });
        }
    }), lib_dom_1.Dragging.attach(element, function (event) {
        var target = capturing.captureEvent(event);
        if (target === null) {
            if (lib_dom_1.Keyboard.isControlKey(event)) {
                var trackIndex = manager.globalToIndex(event.clientY);
                if (trackIndex === manager.numTracks()) {
                    return lib_std_1.Option.None;
                }
                return lib_std_1.Option.wrap({
                    update: lib_std_1.EmptyExec // TODO Create Region
                });
            }
            else {
                return lib_std_1.Option.None;
            }
        }
        else if (target.type === "region" && event.altKey) {
            if (!regionSelection.isSelected(target.region)) {
                regionSelection.deselectAll();
                regionSelection.select(target.region);
            }
            var clientRect = element.getBoundingClientRect();
            var pointerPulse_1 = snapping.xToUnitRound(event.clientX - clientRect.left);
            editing.modify(function () { return regionSelection.selected()
                .slice()
                .forEach(function (region) { return studio_adapters_1.RegionEditing.cut(region, pointerPulse_1, !event.shiftKey); }); });
            return lib_std_1.Option.wrap({ update: lib_std_1.EmptyExec }); // prevent selection or tools
        }
        return lib_std_1.Option.None;
    }));
    element.appendChild(<SelectionRectangle_tsx_1.SelectionRectangle target={element} lifecycle={lifecycle} selection={regionSelection} locator={regionLocator} xAxis={range.valueAxis} yAxis={{
            axisToValue: function (y) { return (0, lib_std_1.clamp)(y + scrollContainer.scrollTop, 0, scrollContainer.scrollTop + element.scrollHeight); },
            valueToAxis: function (value) { return value - scrollContainer.scrollTop; }
        }}/>);
    lifecycle.ownAll((0, AutoScroll_ts_1.installAutoScroll)(element, function (deltaX, deltaY) {
        if (deltaY !== 0) {
            scrollModel.moveBy(deltaY);
        }
        if (deltaX !== 0) {
            range.moveUnitBy(deltaX * range.unitsPerPixel * Config_ts_1.Config.AutoScrollHorizontalSpeed);
        }
    }, {
        measure: function () {
            var _a = element.getBoundingClientRect(), left = _a.left, right = _a.right;
            var _b = scrollContainer.getBoundingClientRect(), top = _b.top, bottom = _b.bottom;
            return ({ xMin: left, xMax: right, yMin: top, yMax: bottom });
        }, padding: Config_ts_1.Config.AutoScrollPadding
    }), DragAndDrop_1.DragAndDrop.installTarget(element, {
        drag: function (event, data) {
            var option = dragAndDrop.canDrop(event, data);
            if (option.isEmpty()) {
                markerPosition.setValue(null);
                return false;
            }
            if (data.type === "instrument") {
                markerPosition.setValue(null);
                return true;
            }
            var rect = element.getBoundingClientRect();
            var position = snapping.xToUnitFloor(event.clientX - rect.left);
            markerPosition.setValue(Math.max(0, position));
            return true;
        },
        drop: function (event, data) {
            var dialog = dialogs_1.Dialogs.processMonolog("Import Sample");
            dragAndDrop.drop(event, data).finally(function () { return dialog.close(); });
        },
        enter: function (_allowDrop) { },
        leave: function () { return markerPosition.setValue(null); }
    }), lib_dom_1.Events.subscribe(element, "wheel", function (event) {
        if (event.shiftKey) {
            event.preventDefault();
            event.stopPropagation();
            var scale = event.deltaY * 0.01;
            var rect = element.getBoundingClientRect();
            range.scaleBy(scale, range.xToValue(event.clientX - rect.left));
        }
        else if (event.altKey) {
            event.preventDefault();
            event.stopPropagation();
            range.moveUnitBy(Math.sign(event.deltaY) * lib_dsp_1.PPQN.SemiQuaver * 2);
        }
        else {
            var deltaX = event.deltaX;
            var threshold = 5.0;
            var clamped = Math.max(deltaX - threshold, 0.0) + Math.min(deltaX + threshold, 0.0);
            if (Math.abs(clamped) > 0) {
                event.preventDefault();
                range.moveBy(clamped * 0.0003);
            }
        }
    }, { passive: false }), (0, cursor_ts_1.installCursor)(element, capturing, {
        get: function (target, event) {
            var units = snapping.xToUnitRound(event.clientX - element.getBoundingClientRect().left);
            markerPosition.setValue(event.altKey && target !== null && target.type === "region"
                && target.region.position < units && units < target.region.complete
                ? units
                : null);
            return target === null || target.type === "track"
                ? null
                : event.altKey
                    ? 1 /* Cursor.Scissors */
                    : CursorMap[target.part];
        },
        leave: function () { return markerPosition.setValue(null); }
    }), lib_dom_1.Dragging.attach(element, function (event) {
        var target = capturing.captureEvent(event);
        if (target === null || target.type !== "region") {
            return lib_std_1.Option.None;
        }
        var clientRect = element.getBoundingClientRect();
        var pointerPulse = range.xToUnit(event.clientX - clientRect.left);
        var reference = target.region;
        switch (target.part) {
            case "start":
                return manager.startRegionModifier(RegionStartModifier_ts_1.RegionStartModifier.create(regionSelection.selected(), { project: project, element: element, snapping: snapping, pointerPulse: pointerPulse, reference: reference }));
            case "complete":
                return manager.startRegionModifier(RegionDurationModifier_ts_1.RegionDurationModifier.create(regionSelection.selected(), { project: project, element: element, snapping: snapping, pointerPulse: pointerPulse, bounds: [reference.position, reference.complete] }));
            case "position":
                var pointerIndex = manager.globalToIndex(event.clientY);
                return manager.startRegionModifier(RegionMoveModifier_ts_1.RegionMoveModifier.create(manager, regionSelection, { element: element, snapping: snapping, pointerPulse: pointerPulse, pointerIndex: pointerIndex, reference: reference }));
            case "content-start":
                return manager.startRegionModifier(RegionContentStartModifier_ts_1.RegionContentStartModifier.create(regionSelection.selected(), { project: project, element: element, snapping: snapping, pointerPulse: pointerPulse, reference: reference }));
            case "loop-duration":
            case "content-complete":
                return manager.startRegionModifier(RegionLoopDurationModifier_ts_1.RegionLoopDurationModifier.create(regionSelection.selected(), {
                    project: project,
                    element: element,
                    snapping: snapping,
                    pointerPulse: pointerPulse,
                    reference: reference,
                    resize: target.part === "content-complete"
                }));
            case "fading-in":
            case "fading-out": {
                var audioRegion = target.region;
                var isFadeIn_1 = target.part === "fading-in";
                var position_2 = audioRegion.position, duration_1 = audioRegion.duration, complete_2 = audioRegion.complete, fading_1 = audioRegion.fading;
                if (event.shiftKey) {
                    var slopeField_1 = isFadeIn_1 ? fading_1.inSlopeField : fading_1.outSlopeField;
                    var originalSlope_1 = slopeField_1.getValue();
                    var startY_1 = event.clientY;
                    return lib_std_1.Option.wrap({
                        update: function (dragEvent) {
                            var deltaY = startY_1 - dragEvent.clientY;
                            var newSlope = (0, lib_std_1.clamp)(originalSlope_1 + deltaY * 0.01, 0.001, 0.999);
                            editing.modify(function () { return slopeField_1.setValue(newSlope); }, false);
                        },
                        approve: function () { return editing.mark(); },
                        cancel: function () { return editing.modify(function () { return slopeField_1.setValue(originalSlope_1); }); }
                    });
                }
                var originalFadeIn_1 = fading_1.in;
                var originalFadeOut_1 = fading_1.out;
                return lib_std_1.Option.wrap({
                    update: function (dragEvent) {
                        var pointerPpqn = range.xToUnit(dragEvent.clientX - clientRect.left);
                        editing.modify(function () {
                            if (isFadeIn_1) {
                                var newFadeIn = (0, lib_std_1.clamp)(pointerPpqn - position_2, 0, duration_1);
                                fading_1.inField.setValue(newFadeIn);
                                if (newFadeIn + fading_1.out > duration_1) {
                                    fading_1.outField.setValue(duration_1 - newFadeIn);
                                }
                            }
                            else {
                                var newFadeOut = (0, lib_std_1.clamp)(complete_2 - pointerPpqn, 0, duration_1);
                                fading_1.outField.setValue(newFadeOut);
                                if (fading_1.in + newFadeOut > duration_1) {
                                    fading_1.inField.setValue(duration_1 - newFadeOut);
                                }
                            }
                        }, false);
                    },
                    approve: function () { return editing.mark(); },
                    cancel: function () { return editing.modify(function () {
                        fading_1.inField.setValue(originalFadeIn_1);
                        fading_1.outField.setValue(originalFadeOut_1);
                    }); }
                });
            }
            default: {
                return (0, lib_std_1.Unhandled)(target);
            }
        }
    }, { permanentUpdates: true }));
    return element;
};
exports.RegionsArea = RegionsArea;
