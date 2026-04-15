"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopAreaEditor = void 0;
var LoopAreaEditor_sass_inline_1 = require("./LoopAreaEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_box_1 = require("@opendaw/lib-box");
var cursor_ts_1 = require("@/ui/hooks/cursor.ts");
var studio_core_1 = require("@opendaw/studio-core");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(LoopAreaEditor_sass_inline_1.default, "loop-area-editor");
var CursorMap = {
    "loop-start": "w-resize",
    "loop-end": "e-resize",
    "loop-body": "ew-resize"
};
var LoopAreaEditor = function (_a) {
    var lifecycle = _a.lifecycle, editing = _a.editing, range = _a.range, snapping = _a.snapping, loopArea = _a.loopArea;
    var loopFrom = loopArea.from, loopTo = loopArea.to;
    var canvas = <canvas />;
    var capturing = new studio_core_1.ElementCapturing(canvas, {
        capture: function (x, _y) {
            var height = canvas.clientHeight;
            var handleSize = height;
            var x0 = range.unitToX(loopFrom.getValue());
            var x1 = range.unitToX(loopTo.getValue());
            if (x0 < x && x < x1) {
                return "loop-body";
            }
            if (Math.abs(x0 - x) < handleSize) {
                return "loop-start";
            }
            if (Math.abs(x1 - x) < handleSize) {
                return "loop-end";
            }
            return null;
        }
    });
    var context = (0, lib_std_1.asDefined)(canvas.getContext("2d"), "Could not create 2d context");
    var radiiLeft = [999, 0, 0, 999];
    var radiiRight = [0, 999, 999, 0];
    var _b = (0, lib_dom_1.deferNextFrame)(function () {
        var width = canvas.width, height = canvas.height;
        context.clearRect(0, 0, width, height);
        context.globalAlpha = loopArea.enabled.getValue() ? 1.0 : 0.25;
        var x0 = Math.floor(range.unitToX(loopFrom.getValue()) * devicePixelRatio);
        var x1 = Math.floor(range.unitToX(loopTo.getValue()) * devicePixelRatio);
        var handleSize = height;
        var handleY = 0;
        context.fillStyle = "rgba(255, 255, 255, 0.1)";
        context.fillRect(x0, handleY, x1 - x0, handleSize);
        context.fillStyle = studio_enums_1.Colors.yellow.toString();
        context.beginPath();
        context.roundRect(x0 - handleSize, handleY, handleSize, handleSize, radiiLeft);
        context.roundRect(x1, handleY, handleSize, handleSize, radiiRight);
        context.fill();
        context.globalAlpha = 1.0;
    }), requestRender = _b.request, immediateRender = _b.immediate;
    lifecycle.ownAll(lib_dom_1.Events.subscribeDblDwn(canvas, function (event) {
        var target = capturing.captureEvent(event);
        if (target === null) {
            return;
        }
        editing.modify(function () { return loopArea.enabled.setValue(!loopArea.enabled.getValue()); });
    }), lib_dom_1.Dragging.attach(canvas, function (event) {
        var target = capturing.captureEvent(event);
        if (target === null) {
            return lib_std_1.Option.None;
        }
        var pointerPulse = range.xToUnit(event.clientX);
        var wasLoopFrom = loopFrom.getValue();
        var wasLoopTo = loopTo.getValue();
        var referencePulse = target === "loop-end" ? wasLoopTo : wasLoopFrom;
        var length = loopTo.getValue() - loopFrom.getValue();
        return lib_std_1.Option.wrap({
            update: function (event) {
                editing.modify(function () {
                    var delta = snapping.computeDelta(pointerPulse, event.clientX, referencePulse);
                    var position = Math.max(0, referencePulse + delta);
                    if (target === "loop-start") {
                        loopFrom.setValue(position);
                    }
                    else if (target === "loop-end") {
                        loopTo.setValue(position);
                    }
                    else if (target === "loop-body") {
                        loopFrom.setValue(position);
                        loopTo.setValue(position + length);
                    }
                }, false);
            },
            approve: function () { return editing.mark(); },
            cancel: function () { return editing.modify(function () {
                loopFrom.setValue(wasLoopFrom);
                loopTo.setValue(wasLoopTo);
            }); },
            finally: function () { }
        });
    }));
    var onResize = function () {
        if (!canvas.isConnected) {
            return;
        }
        var clientWidth = canvas.clientWidth, clientHeight = canvas.clientHeight;
        range.width = clientWidth;
        canvas.width = clientWidth * devicePixelRatio;
        canvas.height = clientHeight * devicePixelRatio;
        immediateRender();
    };
    lifecycle.own(lib_dom_1.Html.watchResize(canvas, onResize));
    lifecycle.own(range.subscribe(requestRender));
    lifecycle.own(loopArea.box.subscribe(lib_box_1.Propagation.Children, requestRender));
    lifecycle.own((0, cursor_ts_1.installCursor)(canvas, capturing, { get: function (target) { return target === null ? null : CursorMap[target]; } }));
    return <div className={className}>{canvas}</div>;
};
exports.LoopAreaEditor = LoopAreaEditor;
