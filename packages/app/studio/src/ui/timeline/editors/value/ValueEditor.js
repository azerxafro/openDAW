"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueEditor = void 0;
var ValueEditor_sass_inline_1 = require("./ValueEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var Constants_ts_1 = require("@/ui/timeline/editors/value/Constants.ts");
var ObservableModifyContext_ts_1 = require("@/ui/timeline/ObservableModifyContext.ts");
var ValuePainter_ts_1 = require("@/ui/timeline/editors/value/ValuePainter.ts");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var ValueEventCapturing_ts_1 = require("@/ui/timeline/editors/value/ValueEventCapturing.ts");
var ValueSelectionLocator_ts_1 = require("@/ui/timeline/editors/value/ValueSelectionLocator.ts");
var ValuePaintModifier_ts_1 = require("@/ui/timeline/editors/value/ValuePaintModifier.ts");
var SelectionRectangle_tsx_1 = require("@/ui/timeline/SelectionRectangle.tsx");
var ValueMoveModifier_ts_1 = require("@/ui/timeline/editors/value/ValueMoveModifier.ts");
var ValueSlopeModifier_ts_1 = require("@/ui/timeline/editors/value/ValueSlopeModifier.ts");
var cursor_ts_1 = require("@/ui/hooks/cursor.ts");
var ValueContextMenu_ts_1 = require("@/ui/timeline/editors/value/ValueContextMenu.ts");
var ValueInput_ts_1 = require("@/ui/timeline/editors/ValueInput.ts");
var EditorBody_1 = require("../EditorBody");
var ValueContentDurationModifier_1 = require("./ValueContentDurationModifier");
var lib_dom_1 = require("@opendaw/lib-dom");
var ValueTooltip_1 = require("./ValueTooltip");
var ValueEventEditing_1 = require("./ValueEventEditing");
var ValueMenu_1 = require("./ValueMenu");
var studio_core_1 = require("@opendaw/studio-core");
var ContentEditorShortcuts_1 = require("@/ui/shortcuts/ContentEditorShortcuts");
var className = lib_dom_1.Html.adoptStyleSheet(ValueEditor_sass_inline_1.default, "ValueEditor");
var ValueEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, range = _a.range, snapping = _a.snapping, eventMapping = _a.eventMapping, reader = _a.reader, context = _a.context, editMenu = _a.editMenu;
    var project = service.project;
    var editing = project.editing, engine = project.engine, boxGraph = project.boxGraph, boxAdapters = project.boxAdapters;
    var eventsField = reader.content.box.events;
    var selection = lifecycle.own(project.selection
        .createFilteredSelection(function (box) { return box instanceof studio_boxes_1.ValueEventBox
        && box.events.targetVertex.contains(eventsField); }, {
        fx: function (adapter) { return adapter.box; },
        fy: function (vertex) { return project.boxAdapters.adapterFor(vertex.box, studio_adapters_1.ValueEventBoxAdapter); }
    }));
    lifecycle.own(selection.catchupAndSubscribe({
        onSelected: function (adapter) { return adapter.onSelected(); },
        onDeselected: function (adapter) { return adapter.onDeselected(); }
    }));
    if ((0, lib_std_1.isDefined)(editMenu)) {
        lifecycle.own(editMenu.attach((0, ValueMenu_1.createValueMenu)({ editing: editing, selection: selection, events: reader.content.events })));
    }
    var canvas = <canvas tabIndex={-1}/>;
    var valueAxis = {
        axisToValue: function (pixel) {
            return eventMapping.y(1.0 - (pixel - Constants_ts_1.RangePadding - 0.5) / (canvas.clientHeight - Constants_ts_1.RangePadding * 2.0 - 1.0));
        },
        valueToAxis: function (value) {
            return (1.0 - eventMapping.x(value)) * (canvas.clientHeight - 2.0 * Constants_ts_1.RangePadding - 1.0) + Constants_ts_1.RangePadding + 0.5;
        }
    };
    var valueToPixel = function (value) { return valueAxis.valueToAxis(value) * devicePixelRatio; };
    var modifyContext = new ObservableModifyContext_ts_1.ObservableModifyContext();
    var paintValues = (0, ValuePainter_ts_1.createValuePainter)({
        range: range,
        valueToPixel: valueToPixel,
        eventMapping: eventMapping,
        modifyContext: modifyContext,
        snapping: snapping,
        valueEditing: context,
        reader: reader
    });
    var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, paintValues));
    var capturing = (0, ValueEventCapturing_ts_1.createValueEventCapturing)(canvas, range, valueAxis.valueToAxis, reader);
    var selectableLocator = (0, ValueSelectionLocator_ts_1.createValueSelectionLocator)(reader, range, valueAxis, capturing);
    //
    // Register events that must run before any select actions
    //
    lifecycle.ownAll((0, EditorBody_1.installEditorBody)({ element: canvas, range: range, reader: reader }), ValueTooltip_1.ValueTooltip.install({
        element: canvas,
        capturing: capturing,
        range: range,
        valueAxis: valueAxis,
        reader: reader,
        eventMapping: eventMapping,
        context: context,
        modifyContext: modifyContext
    }), lib_dom_1.Dragging.attach(canvas, (function () {
        var lastDownTime = 0;
        return function (event) {
            var target = capturing.captureEvent(event);
            var altKey = event.altKey;
            var now = Date.now();
            var dblclck = now - lastDownTime < lib_dom_1.Events.DOUBLE_DOWN_THRESHOLD;
            lastDownTime = now;
            if (dblclck && !event.shiftKey) {
                if (target === null || target.type === "loop-duration") {
                    var rect = canvas.getBoundingClientRect();
                    var position_1 = Math.round(range.xToUnit(event.clientX - rect.left) - reader.offset);
                    var clickValue = valueAxis.axisToValue(event.clientY - rect.top);
                    var formatValue = context.currentValue;
                    var value_1 = Math.abs(valueToPixel(clickValue) - valueToPixel(formatValue))
                        < ValueMoveModifier_ts_1.SnapValueThresholdInPixels
                        ? formatValue
                        : context.quantize(clickValue);
                    return editing.modify(function () {
                        return ValueEventEditing_1.ValueEventEditing.createOrMoveEvent(reader.content, position_1, value_1, context.floating ? lib_dsp_1.Interpolation.Linear : lib_dsp_1.Interpolation.None);
                    }, false)
                        .match({
                        none: function () { return lib_std_1.Option.None; },
                        some: function (adapter) {
                            selection.deselectAll();
                            selection.select(adapter);
                            var clientRect = canvas.getBoundingClientRect();
                            return modifyContext.startModifier(ValueMoveModifier_ts_1.ValueMoveModifier.create({
                                editing: editing,
                                element: canvas,
                                context: context,
                                selection: selection,
                                snapping: snapping,
                                pointerValue: valueAxis.axisToValue(event.clientY - clientRect.top),
                                pointerPulse: range.xToUnit(event.clientX - clientRect.left),
                                valueAxis: valueAxis,
                                eventMapping: eventMapping,
                                reference: adapter,
                                collection: reader.content
                            }));
                        }
                    });
                }
                else if ((target === null || target === void 0 ? void 0 : target.type) === "event") {
                    editing.modify(function () { return ValueEventEditing_1.ValueEventEditing.deleteEvent(reader.content, target.event); });
                    return lib_std_1.Option.wrap({ update: lib_std_1.EmptyExec }); // Avoid selection
                }
            }
            if (target === null) {
                if (altKey) {
                    return modifyContext.startModifier(ValuePaintModifier_ts_1.ValuePaintModifier.create({
                        editing: editing,
                        element: canvas,
                        reader: reader,
                        selection: selection,
                        snapping: snapping,
                        valueAxis: valueAxis
                    }));
                }
            }
            else if (target.type === "midpoint" || target.type === "curve") {
                if (event.shiftKey) {
                    var clientRect = canvas.getBoundingClientRect();
                    var position_2 = range.xToUnit(event.clientX - clientRect.left) - reader.offset;
                    var optCutEvent = editing.modify(function () {
                        selection.deselectAll();
                        return reader.content.cut(position_2, eventMapping).match({
                            none: function () { return null; },
                            some: function (event) {
                                selection.select(event);
                                return event;
                            }
                        });
                    }, false).unwrapOrNull();
                    if (optCutEvent === null) {
                        return lib_std_1.Option.None;
                    }
                    return modifyContext.startModifier(ValueMoveModifier_ts_1.ValueMoveModifier.create({
                        editing: editing,
                        element: canvas,
                        context: context,
                        selection: selection,
                        snapping: snapping,
                        pointerValue: optCutEvent.value,
                        pointerPulse: position_2 + reader.offset,
                        valueAxis: valueAxis,
                        eventMapping: eventMapping,
                        reference: optCutEvent,
                        collection: reader.content
                    }));
                }
            }
            return lib_std_1.Option.None;
        };
    })(), { permanentUpdates: false, immediate: true }), lib_dom_1.Dragging.attach(canvas, function (event) {
        var target = capturing.captureEvent(event);
        if ((target === null || target === void 0 ? void 0 : target.type) !== "loop-duration") {
            return lib_std_1.Option.None;
        }
        var clientRect = canvas.getBoundingClientRect();
        return modifyContext.startModifier(ValueContentDurationModifier_1.ValueContentDurationModifier.create({
            editing: editing,
            element: canvas,
            pointerPulse: range.xToUnit(event.clientX - clientRect.left),
            snapping: snapping,
            reference: target.reader
        }));
    }, { permanentUpdates: true }));
    var selectionRectangle = (<SelectionRectangle_tsx_1.SelectionRectangle lifecycle={lifecycle} target={canvas} selection={selection} locator={selectableLocator} xAxis={range.valueAxis} yAxis={valueAxis}/>);
    var element = (<div className={className} tabIndex={-1} onConnect={function (self) { return self.focus(); }}>
            {canvas}
            {selectionRectangle}
        </div>);
    var shortcuts = lib_dom_1.ShortcutManager.get().createContext(element, "ValueEditor");
    lifecycle.ownAll(shortcuts, shortcuts.register(ContentEditorShortcuts_1.ContentEditorShortcuts["select-all"].shortcut, function () {
        return selection.select.apply(selection, selectableLocator.selectable());
    }), shortcuts.register(ContentEditorShortcuts_1.ContentEditorShortcuts["deselect-all"].shortcut, function () {
        return selection.deselectAll();
    }), shortcuts.register(ContentEditorShortcuts_1.ContentEditorShortcuts["delete-selection"].shortcut, function () {
        var selected = selection.selected();
        if (selected.length === 0) {
            return false;
        }
        editing.modify(function () { return selected.forEach(function (adapter) { return ValueEventEditing_1.ValueEventEditing.deleteEvent(reader.content, adapter); }); });
        return true;
    }), lib_dom_1.Dragging.attach(canvas, function (event) {
        var target = capturing.captureEvent(event);
        if (target === null || selection.isEmpty()) {
            return lib_std_1.Option.None;
        }
        var clientRect = canvas.getBoundingClientRect();
        if (target.type === "event") {
            return modifyContext.startModifier(ValueMoveModifier_ts_1.ValueMoveModifier.create({
                editing: editing,
                element: canvas,
                context: context,
                selection: selection,
                snapping: snapping,
                pointerValue: valueAxis.axisToValue(event.clientY - clientRect.top),
                pointerPulse: range.xToUnit(event.clientX - clientRect.left),
                valueAxis: valueAxis,
                eventMapping: eventMapping,
                reference: target.event,
                collection: reader.content
            }));
        }
        else if (target.type === "midpoint") {
            return modifyContext.startModifier(ValueSlopeModifier_ts_1.ValueSlopeModifier.create({
                editing: editing,
                element: canvas,
                valueAxis: valueAxis,
                reference: target.event,
                collection: reader.content
            }));
        }
        else {
            return lib_std_1.Option.None;
        }
    }, { permanentUpdates: true }), lib_dom_1.Html.watchResize(canvas, painter.requestUpdate), range.subscribe(painter.requestUpdate), snapping.subscribe(painter.requestUpdate), reader.subscribeChange(painter.requestUpdate), context.anchorModel.subscribe(painter.requestUpdate), modifyContext.subscribeUpdate(painter.requestUpdate), (0, cursor_ts_1.installCursor)(canvas, capturing, {
        get: function (target, event) {
            var onCurve = (target === null || target === void 0 ? void 0 : target.type) === "curve" || (target === null || target === void 0 ? void 0 : target.type) === "midpoint";
            var controlKey = event.altKey && event.buttons === 0;
            if (target === null) {
                if (controlKey) {
                    return 0 /* Cursor.Pencil */;
                }
            }
            else if (target.type === "event") {
                return "move";
            }
            else {
                if (event.shiftKey && onCurve) {
                    return "pointer";
                }
                else if (target.type === "midpoint") {
                    return "ns-resize";
                }
                else if (target.type === "loop-duration") {
                    return "ew-resize";
                }
            }
            return null;
        },
        leave: lib_std_1.EmptyExec
    }), (0, ValueInput_ts_1.installValueInput)({
        element: canvas,
        selection: selection,
        getter: function (adapter) { return context.stringMapping.x(context.valueMapping.y(eventMapping.x(adapter.value))).value; },
        setter: function (text) {
            var result = context.stringMapping.y(text);
            var value;
            if (result.type === "explicit") {
                value = eventMapping.y(context.valueMapping.x(result.value));
            }
            else {
                return;
            }
            editing.modify(function () { return selection.selected().forEach(function (adapter) { return adapter.box.value.setValue(value); }); });
        }
    }), (0, ValueContextMenu_ts_1.installValueContextMenu)({ element: canvas, capturing: capturing, editing: editing, selection: selection }), studio_core_1.ClipboardManager.install(element, studio_core_1.ValuesClipboard.createHandler({
        getEnabled: function () { return !engine.isPlaying.getValue(); },
        getPosition: function () { return engine.position.getValue() - reader.offset; },
        setPosition: function (position) { return engine.setPosition(position + reader.offset); },
        editing: editing,
        selection: selection,
        collection: reader.content,
        targetAddress: reader.content.box.events.address,
        boxGraph: boxGraph,
        boxAdapters: boxAdapters
    })));
    return element;
};
exports.ValueEditor = ValueEditor;
