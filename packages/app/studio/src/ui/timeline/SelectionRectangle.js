"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionRectangle = void 0;
var SelectionRectangle_sass_inline_1 = require("./SelectionRectangle.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(SelectionRectangle_sass_inline_1.default, "SelectionRectangle");
var SelectionRectangle = function (_a) {
    var lifecycle = _a.lifecycle, target = _a.target, selection = _a.selection, locator = _a.locator, xAxis = _a.xAxis, yAxis = _a.yAxis;
    var svgRect = (<rect x="0" y="0" width="0" height="0" stroke={studio_enums_1.Colors.cream} fill={studio_enums_1.Colors.cream} fill-opacity={0.125} stroke-width={1}/>);
    var updateSvgRect = function (x0, y0, x1, y1) {
        svgRect.x.baseVal.value = Math.min(x0, x1);
        svgRect.y.baseVal.value = Math.min(y0, y1);
        var empty = x1 - x0 === 0 && y1 - y0 === 0;
        svgRect.width.baseVal.value = empty ? 0 : Math.max(Math.abs(x1 - x0), 1);
        svgRect.height.baseVal.value = empty ? 0 : Math.max(Math.abs(y1 - y0), 1);
    };
    var svg = <svg classList={className}>{svgRect}</svg>;
    lifecycle.ownAll(lib_dom_1.Dragging.attach(target, function (event) {
        if (event.defaultPrevented) {
            return lib_std_1.Option.None;
        }
        var clientRect = svg.getBoundingClientRect();
        var u0 = xAxis.axisToValue(event.clientX - clientRect.left);
        var v0 = yAxis.axisToValue(event.clientY - clientRect.top);
        var before = Array.from(selection.selected());
        var captured = Array.from(locator.selectableAt({ u: u0, v: v0 }));
        var numSelected = selection.count();
        var someSelected = captured.some(function (item) { return selection.isSelected(item); });
        if (!event.shiftKey) {
            if (numSelected === 1 && captured.length === 1 && someSelected) {
                // we clicked an already selected selectable
                return lib_std_1.Option.None;
            }
            else if (!someSelected || numSelected === 1) {
                selection.deselectAll();
            }
        }
        for (var _i = 0, captured_1 = captured; _i < captured_1.length; _i++) {
            var selectable = captured_1[_i];
            if (selection.isSelected(selectable)) {
                if (event.shiftKey) {
                    selection.deselect(selectable);
                }
            }
            else {
                selection.select(selectable);
            }
        }
        if (captured.length > 0) {
            return lib_std_1.Option.None;
        }
        selection.deselectAll();
        var enclosed = [];
        var selectedAdapters = lib_std_1.UUID.newSet(function (adapter) { return adapter.uuid; });
        return lib_std_1.Option.wrap({
            update: function (event) {
                var clientRect = svg.getBoundingClientRect();
                var u1 = xAxis.axisToValue(event.clientX - clientRect.left);
                var v1 = yAxis.axisToValue(event.clientY - clientRect.top);
                var uMin = Math.min(u0, u1);
                var uMax = Math.max(u0, u1);
                var vMin = Math.min(v0, v1);
                var vMax = Math.max(v0, v1);
                updateSvgRect(xAxis.valueToAxis(uMin), yAxis.valueToAxis(vMax), xAxis.valueToAxis(uMax), yAxis.valueToAxis(vMin));
                enclosed.splice.apply(enclosed, __spreadArray([0, enclosed.length], locator.selectablesBetween({ u: uMin, v: vMin }, { u: uMax, v: vMax }), false));
                selectedAdapters.clear();
                if (event.shiftKey) {
                    var invertedSelection = new Set(before);
                    for (var _i = 0, enclosed_1 = enclosed; _i < enclosed_1.length; _i++) {
                        var selectable = enclosed_1[_i];
                        if (!invertedSelection.delete(selectable)) {
                            invertedSelection.add(selectable);
                        }
                    }
                    selectedAdapters.addMany(invertedSelection);
                }
                else {
                    selectedAdapters.addMany(enclosed);
                }
                for (var _a = 0, _b = selection.selected(); _a < _b.length; _a++) {
                    var adapter = _b[_a];
                    if (!selectedAdapters.hasValue(adapter)) {
                        selection.deselect(adapter);
                    }
                }
                for (var _c = 0, _d = selectedAdapters.values(); _c < _d.length; _c++) {
                    var adapter = _d[_c];
                    if (!selection.isSelected(adapter)) {
                        selection.select(adapter);
                    }
                }
            },
            cancel: function () {
                selection.deselectAll();
                selection.select.apply(selection, before);
            },
            approve: lib_std_1.EmptyExec,
            finally: function () { return updateSvgRect(0, 0, 0, 0); }
        });
    }, { permanentUpdates: true }), { terminate: function () { return svg.remove(); } });
    return svg;
};
exports.SelectionRectangle = SelectionRectangle;
