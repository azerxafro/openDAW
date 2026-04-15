"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipsArea = void 0;
var ClipsArea_sass_inline_1 = require("./ClipsArea.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var ClipCapturing_ts_1 = require("@/ui/timeline/tracks/audio-unit/clips/ClipCapturing.ts");
var ClipSelectableLocator_ts_1 = require("@/ui/timeline/tracks/audio-unit/clips/ClipSelectableLocator.ts");
var SelectionRectangle_tsx_1 = require("@/ui/timeline/SelectionRectangle.tsx");
var ClipMoveModifier_ts_1 = require("@/ui/timeline/tracks/audio-unit/clips/ClipMoveModifier.ts");
var constants_ts_1 = require("@/ui/timeline/tracks/audio-unit/clips/constants.ts");
var AutoScroll_ts_1 = require("@/ui/AutoScroll.ts");
var ClipContextMenu_ts_1 = require("@/ui/timeline/tracks/audio-unit/clips/ClipContextMenu.ts");
var PanelType_1 = require("@/ui/workspace/PanelType");
var ClipDragAndDrop_ts_1 = require("./ClipDragAndDrop.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var DragAndDrop_ts_1 = require("@/ui/DragAndDrop.ts");
var dialogs_1 = require("@/ui/components/dialogs");
var className = lib_dom_1.Html.adoptStyleSheet(ClipsArea_sass_inline_1.default, "ClipsArea");
var ClipsArea = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, manager = _a.manager, scrollModel = _a.scrollModel, scrollContainer = _a.scrollContainer;
    var project = service.project;
    var selection = project.selection, boxAdapters = project.boxAdapters, editing = project.editing, userEditingManager = project.userEditingManager;
    var dropPreview = (<div className="drop-target" tabIndex={-1}/>);
    var element = (<div className={className} tabIndex={-1}>{dropPreview}</div>);
    var clipSelection = lifecycle.own(selection
        .createFilteredSelection((0, studio_adapters_1.isVertexOfBox)(studio_adapters_1.UnionBoxTypes.isClipBox), {
        fx: function (adapter) { return adapter.box; },
        fy: function (vertex) { return studio_adapters_1.ClipAdapters.for(boxAdapters, vertex.box); }
    }));
    var capturing = ClipCapturing_ts_1.ClipCapturing.create(element, manager);
    var locator = (0, ClipSelectableLocator_ts_1.createClipSelectableLocator)(capturing, manager);
    var dragAndDrop = new ClipDragAndDrop_ts_1.ClipDragAndDrop(service, capturing);
    element.appendChild(<SelectionRectangle_tsx_1.SelectionRectangle lifecycle={lifecycle} locator={locator} selection={clipSelection} target={element} xAxis={{
            axisToValue: function (axis) { return (0, lib_std_1.clamp)(axis, 0, element.clientWidth); },
            valueToAxis: function (value) { return value; }
        }} yAxis={{
            axisToValue: function (axis) { return (0, lib_std_1.clamp)(axis + scrollContainer.scrollTop, 0, scrollContainer.scrollTop + element.scrollHeight); },
            valueToAxis: function (value) { return value - scrollContainer.scrollTop; }
        }}/>);
    var xAxis = {
        valueToAxis: function (index) { return index * constants_ts_1.ClipWidth + element.getBoundingClientRect().left; },
        axisToValue: function (axis) { return Math.floor(Math.max(0, axis - element.getBoundingClientRect().left) / constants_ts_1.ClipWidth); }
    };
    var yAxis = {
        valueToAxis: function (index) { return manager.indexToGlobal(index); },
        axisToValue: function (axis) { return manager.globalToIndex(axis); }
    };
    var style = dropPreview.style;
    lifecycle.ownAll(DragAndDrop_ts_1.DragAndDrop.installTarget(element, {
        drag: function (event, data) {
            var option = dragAndDrop.canDrop(event, data);
            if (option.isEmpty()) {
                style.display = "none";
                return false;
            }
            var type = option.unwrap();
            if (type === "instrument") {
                style.display = "none";
                return true;
            }
            var x;
            var y;
            var target = capturing.captureEvent(event);
            if ((0, lib_std_1.isNotNull)(target)) {
                var trackBoxAdapter = target.track.trackBoxAdapter;
                if (target.type === "track") {
                    var clipIndex = target.clipIndex;
                    x = clipIndex * constants_ts_1.ClipWidth;
                }
                else if (target.type === "clip") {
                    var clipIndex = target.clip.indexField.getValue();
                    x = clipIndex * constants_ts_1.ClipWidth;
                }
                else {
                    return (0, lib_std_1.Unhandled)(target);
                }
                y = trackBoxAdapter.listIndex * constants_ts_1.ClipWidth - scrollContainer.scrollTop;
            }
            else {
                var rect = element.getBoundingClientRect();
                x = (0, lib_std_1.quantizeFloor)(event.clientX - rect.left, constants_ts_1.ClipWidth);
                y = manager.tracksLocalBottom() - scrollContainer.scrollTop;
            }
            style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
            style.display = "block";
            return true;
        },
        drop: function (event, data) {
            style.display = "none";
            var dialog = dialogs_1.Dialogs.processMonolog("Import Sample");
            dragAndDrop.drop(event, data).finally(function () { return dialog.close(); });
        },
        enter: function (_allowDrop) { },
        leave: function () { return style.display = "none"; }
    }), (0, AutoScroll_ts_1.installAutoScroll)(element, function (_deltaX, deltaY) { if (deltaY !== 0) {
        scrollModel.moveBy(deltaY);
    } }), clipSelection.catchupAndSubscribe({
        onSelected: function (selectable) { return selectable.onSelected(); },
        onDeselected: function (selectable) { return selectable.onDeselected(); }
    }), lib_dom_1.Events.subscribeDblDwn(element, function (event) {
        var target = capturing.captureEvent(event);
        if (target === null) {
            return;
        }
        if (target.type === "clip") {
            editing.modify(function () { return userEditingManager.timeline.edit(target.clip.box); }, false);
            service.panelLayout.showIfAvailable(PanelType_1.PanelType.ContentEditor);
        }
        else if (target.type === "track") {
            editing.modify(function () {
                var trackBoxAdapter = target.track.trackBoxAdapter;
                var clipIndex = target.clipIndex;
                switch (trackBoxAdapter.type) {
                    case studio_adapters_1.TrackType.Audio:
                        lib_std_1.RuntimeNotifier.info({
                            headline: "Cannot Create Audio Clip",
                            message: "Drag a sample from the sample-library or your hard-drive instead."
                        }).finally();
                        return;
                    case studio_adapters_1.TrackType.Notes:
                        return project.api.createNoteClip(trackBoxAdapter.box, clipIndex);
                    case studio_adapters_1.TrackType.Value:
                        return project.api.createValueClip(trackBoxAdapter.box, clipIndex);
                    default:
                        return;
                }
            });
        }
    }), lib_dom_1.Events.subscribe(element, "keydown", function (event) {
        if (lib_dom_1.Keyboard.isDeselectAll(event)) {
            clipSelection.deselectAll();
        }
        else if (lib_dom_1.Keyboard.isSelectAll(event)) {
            clipSelection.select.apply(clipSelection, manager.tracks()
                .flatMap(function (_a) {
                var clips = _a.trackBoxAdapter.clips;
                return clips.collection.adapters();
            }));
        }
        else if (lib_dom_1.Keyboard.isDelete(event)) {
            editing.modify(function () { return clipSelection.selected()
                .forEach(function (clip) { return clip.box.delete(); }); });
        }
    }), (0, ClipContextMenu_ts_1.installClipContextMenu)({ element: element, project: project, capturing: capturing, selection: clipSelection }), lib_dom_1.Dragging.attach(element, function (event) {
        var target = capturing.captureEvent(event);
        if (target === null) {
            return lib_std_1.Option.None;
        }
        return manager.startClipModifier(ClipMoveModifier_ts_1.ClipMoveModifier.start({
            project: project,
            manager: manager,
            selection: clipSelection,
            xAxis: xAxis,
            yAxis: yAxis,
            pointerClipIndex: xAxis.axisToValue(event.clientX),
            pointerTrackIndex: yAxis.axisToValue(event.clientY)
        }));
    }));
    return element;
};
exports.ClipsArea = ClipsArea;
