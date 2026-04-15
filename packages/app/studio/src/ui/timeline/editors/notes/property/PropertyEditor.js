"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyEditor = void 0;
var PropertyEditor_sass_inline_1 = require("./PropertyEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var SelectionRectangle_tsx_1 = require("@/ui/timeline/SelectionRectangle.tsx");
var PropertySelectionLocator_ts_1 = require("@/ui/timeline/editors/notes/property/PropertySelectionLocator.ts");
var PropertyEventCapturing_ts_1 = require("@/ui/timeline/editors/notes/property/PropertyEventCapturing.ts");
var PropertyPainter_ts_1 = require("@/ui/timeline/editors/notes/property/PropertyPainter.ts");
var Constants_ts_1 = require("@/ui/timeline/editors/notes/Constants.ts");
var PropertyNodeModifier_ts_1 = require("@/ui/timeline/editors/notes/property/PropertyNodeModifier.ts");
var cursor_ts_1 = require("@/ui/hooks/cursor.ts");
var WheelScroll_ts_1 = require("@/ui/timeline/editors/WheelScroll.ts");
var EditorBody_ts_1 = require("@/ui/timeline/editors/EditorBody.ts");
var PropertyLineModifier_1 = require("./PropertyLineModifier");
var PropertyDrawModifier_ts_1 = require("@/ui/timeline/editors/notes/property/PropertyDrawModifier.ts");
var ValueInput_ts_1 = require("@/ui/timeline/editors/ValueInput.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var ContentEditorShortcuts_1 = require("@/ui/shortcuts/ContentEditorShortcuts");
var className = lib_dom_1.Html.adoptStyleSheet(PropertyEditor_sass_inline_1.default, "PropertyEditor");
var PropertyEditor = function (_a) {
    var lifecycle = _a.lifecycle, range = _a.range, editing = _a.editing, snapping = _a.snapping, selection = _a.selection, propertyOwner = _a.propertyOwner, modifyContext = _a.modifyContext, reader = _a.reader;
    var canvas = <canvas tabIndex={-1}/>;
    var padding = Constants_ts_1.PropertyNodeSize;
    var valueAxis = {
        axisToValue: function (pixel) {
            return 1.0 - (pixel - padding) / (canvas.clientHeight - padding * 2.0);
        },
        valueToAxis: function (value) {
            return (1.0 - value) * (canvas.clientHeight - 2.0 * padding) + padding;
        }
    };
    var capturing = new studio_core_1.ElementCapturing(canvas, (0, PropertyEventCapturing_ts_1.createPropertyCapturing)(valueAxis, range, propertyOwner, reader));
    var locator = (0, PropertySelectionLocator_ts_1.createPropertySelectionLocator)(reader, range, valueAxis, propertyOwner, capturing);
    var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, (0, PropertyPainter_ts_1.createPropertyPainter)({ canvas: canvas, range: range, snapping: snapping, valueAxis: valueAxis, propertyOwner: propertyOwner, modifyContext: modifyContext, reader: reader })));
    lifecycle.ownAll(lib_dom_1.Dragging.attach(canvas, function (event) {
        if (lib_dom_1.Keyboard.isControlKey(event)) {
            return modifyContext.startModifier(PropertyDrawModifier_ts_1.PropertyDrawModifier.create({
                editing: editing,
                element: canvas,
                property: propertyOwner.getValue(),
                selection: selection,
                snapping: snapping,
                valueAxis: valueAxis,
                reader: reader
            }));
        }
        else if (event.altKey) {
            var clientRect = canvas.getBoundingClientRect();
            return modifyContext.startModifier(PropertyLineModifier_1.PropertyLineModifier.create({
                editing: editing,
                element: canvas,
                property: propertyOwner.getValue(),
                selection: selection,
                range: range,
                valueAxis: valueAxis,
                lineOrigin: {
                    u: range.xToUnit(event.clientX - clientRect.left),
                    v: valueAxis.axisToValue(event.clientY - clientRect.top)
                },
                reader: reader
            }));
        }
        return lib_std_1.Option.None;
    }, { permanentUpdates: true }));
    var selectionRectangle = (<SelectionRectangle_tsx_1.SelectionRectangle lifecycle={lifecycle} target={canvas} selection={selection} locator={locator} xAxis={range.valueAxis} yAxis={lib_std_1.ValueAxis.toClamped(valueAxis, 0.0, 1.0)}/>);
    var element = (<div className={className}>
                {canvas}
                {selectionRectangle}
            </div>);
    var shortcuts = lib_dom_1.ShortcutManager.get().createContext(canvas, "PropertyEditor");
    lifecycle.ownAll(shortcuts, shortcuts.register(ContentEditorShortcuts_1.ContentEditorShortcuts["select-all"].shortcut, function () { return selection.select.apply(selection, locator.selectable()); }), shortcuts.register(ContentEditorShortcuts_1.ContentEditorShortcuts["deselect-all"].shortcut, function () { return selection.deselectAll(); }), (0, EditorBody_ts_1.installEditorAuxBody)(canvas, range), lib_dom_1.Html.watchResize(element, function () { return range.width = element.clientWidth; }), range.subscribe(painter.requestUpdate), snapping.subscribe(painter.requestUpdate), reader.subscribeChange(painter.requestUpdate), propertyOwner.subscribe(painter.requestUpdate), modifyContext.subscribeUpdate(painter.requestUpdate), (0, WheelScroll_ts_1.attachWheelScroll)(element, range), (0, cursor_ts_1.installCursor)(canvas, capturing, {
        get: function (_target, event) {
            if (event.buttons !== 0) {
                return null;
            }
            if (lib_dom_1.Keyboard.isControlKey(event)) {
                return 0 /* Cursor.Pencil */;
            }
            if (event.altKey) {
                return "crosshair";
            }
            return null;
        }
    }), lib_dom_1.Dragging.attach(canvas, function (event) {
        var target = capturing.captureEvent(event);
        if (target === null || selection.isEmpty()) {
            return lib_std_1.Option.None;
        }
        var clientRect = canvas.getBoundingClientRect();
        return modifyContext.startModifier(PropertyNodeModifier_ts_1.PropertyNodeModifier.create({
            editing: editing,
            element: canvas,
            selection: selection,
            property: propertyOwner.getValue(),
            valueAxis: valueAxis,
            pointerValue: valueAxis.axisToValue(event.clientY - clientRect.top)
        }));
    }, { permanentUpdates: true }), (0, ValueInput_ts_1.installValueInput)({
        element: canvas,
        selection: selection,
        getter: function (adapter) {
            var accessor = propertyOwner.getValue();
            return accessor.stringMapping.x(accessor.readRawValue(adapter)).value;
        },
        setter: function (text) {
            var accessor = propertyOwner.getValue();
            var result = accessor.stringMapping.y(text);
            if (result.type === "explicit") {
                editing.modify(function () { return selection.selected()
                    .forEach(function (_a) {
                    var box = _a.box;
                    return accessor.writeValue(box, result.value);
                }); });
            }
            else if (result.type === "unitValue") {
                editing.modify(function () {
                    var value = accessor.valueMapping.y(result.value);
                    selection.selected().forEach(function (_a) {
                        var box = _a.box;
                        return accessor.writeValue(box, value);
                    });
                });
            }
        }
    }));
    return element;
};
exports.PropertyEditor = PropertyEditor;
