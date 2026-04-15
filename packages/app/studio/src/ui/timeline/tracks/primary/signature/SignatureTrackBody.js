"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureTrackBody = void 0;
var SignatureTrackBody_sass_inline_1 = require("./SignatureTrackBody.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var SignatureRenderer_1 = require("@/ui/timeline/tracks/primary/signature/SignatureRenderer");
var SignatureContextMenu_1 = require("@/ui/timeline/tracks/primary/signature/SignatureContextMenu");
var Surface_1 = require("@/ui/surface/Surface");
var FloatingTextInput_1 = require("@/ui/components/FloatingTextInput");
var className = lib_dom_1.Html.adoptStyleSheet(SignatureTrackBody_sass_inline_1.default, "signature-track-body");
var SignatureTrackBody = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var project = service.project, timeline = service.timeline;
    var editing = project.editing;
    var range = timeline.range, snapping = timeline.snapping;
    var canvas = <canvas style={{ fontSize: "1.25em" }}/>;
    var timelineAdapter = project.boxAdapters.adapterFor(project.timelineBox, studio_adapters_1.TimelineBoxAdapter);
    var signatureTrackAdapter = timelineAdapter.signatureTrack;
    var dragPreview = null;
    var _b = lifecycle.own(SignatureRenderer_1.SignatureRenderer.forTrack(canvas, range, signatureTrackAdapter, function () { return dragPreview; })), context = _b.context, requestUpdate = _b.requestUpdate;
    var findSignatureAtPosition = function (ppqn) {
        var result = null;
        for (var _i = 0, _a = signatureTrackAdapter.iterateAll(); _i < _a.length; _i++) {
            var signature = _a[_i];
            if (signature.accumulatedPpqn > ppqn) {
                break;
            }
            result = signature;
        }
        return result;
    };
    var capturing = new studio_core_1.ElementCapturing(canvas, {
        capture: function (localX, _localY) {
            var pointer = range.xToUnit(localX);
            var signature = findSignatureAtPosition(pointer);
            if (signature === null) {
                return null;
            }
            var signatureWidth = SignatureRenderer_1.SignatureRenderer.computeWidth(context, signature);
            return localX - range.unitToX(signature.accumulatedPpqn) < signatureWidth ? signature : null;
        }
    });
    lifecycle.ownAll(lib_dom_1.Dragging.attach(canvas, function (pointerEvent) {
        var clientRect = canvas.getBoundingClientRect();
        var localX = pointerEvent.clientX - clientRect.left;
        var event = capturing.captureLocalPoint(localX, 0);
        if (event === null || event.index === -1) {
            return lib_std_1.Option.None;
        }
        var adapter = signatureTrackAdapter.adapterAt(event.index);
        if (adapter.isEmpty()) {
            return lib_std_1.Option.None;
        }
        var signatureAdapter = adapter.unwrap();
        var pointerPpqn = range.xToUnit(localX);
        var offsetPpqn = pointerPpqn - event.accumulatedPpqn;
        return lib_std_1.Option.wrap({
            update: function (dragEvent) {
                var currentX = dragEvent.clientX - clientRect.left;
                var rawPpqn = range.xToUnit(currentX) - offsetPpqn;
                var targetPpqn = snapping.floor(Math.max(0, rawPpqn));
                if (dragPreview === null || dragPreview.targetPpqn !== targetPpqn) {
                    dragPreview = { event: event, targetPpqn: targetPpqn };
                    requestUpdate();
                }
            },
            approve: function () {
                if (dragPreview !== null && dragPreview.targetPpqn !== event.accumulatedPpqn) {
                    editing.modify(function () {
                        var targetPpqn = dragPreview.targetPpqn;
                        for (var _i = 0, _a = signatureTrackAdapter.iterateAll(); _i < _a.length; _i++) {
                            var sig = _a[_i];
                            if (sig.index !== -1 && sig.index !== event.index && sig.accumulatedPpqn === targetPpqn) {
                                var targetAdapter = signatureTrackAdapter.adapterAt(sig.index);
                                if (targetAdapter.nonEmpty()) {
                                    signatureTrackAdapter.deleteAdapter(targetAdapter.unwrap());
                                }
                                break;
                            }
                        }
                        signatureTrackAdapter.moveEvent(signatureAdapter, targetPpqn);
                    });
                }
                dragPreview = null;
                requestUpdate();
            },
            cancel: function () {
                dragPreview = null;
                requestUpdate();
            }
        });
    }), lib_dom_1.Events.subscribeDblDwn(canvas, function (event) {
        var clientRect = canvas.getBoundingClientRect();
        var localX = event.clientX - clientRect.left;
        var capturedEvent = capturing.captureLocalPoint(localX, 0);
        if (capturedEvent !== null) {
            if (capturedEvent.index === -1) {
                return;
            }
            var adapter_1 = signatureTrackAdapter.adapterAt(capturedEvent.index);
            if (adapter_1.nonEmpty()) {
                editing.modify(function () { return signatureTrackAdapter.deleteAdapter(adapter_1.unwrap()); });
            }
            return;
        }
        var position = range.xToUnit(localX);
        var signature = findSignatureAtPosition(position);
        if (signature === null) {
            return;
        }
        var resolvers = Promise.withResolvers();
        Surface_1.Surface.get(canvas).flyout.appendChild((0, FloatingTextInput_1.FloatingTextInput)({
            position: { x: event.clientX, y: clientRect.top + clientRect.height / 2 },
            value: "".concat(signature.nominator, "/").concat(signature.denominator),
            resolvers: resolvers
        }));
        resolvers.promise.then(function (value) {
            var attempt = studio_adapters_1.Parsing.parseTimeSignature(value);
            if (attempt.isSuccess()) {
                var _a = attempt.result(), nominator_1 = _a[0], denominator_1 = _a[1];
                editing.modify(function () { return signatureTrackAdapter.createEvent(position, nominator_1, denominator_1); });
            }
        }, lib_std_1.EmptyExec);
    }), range.subscribe(requestUpdate), signatureTrackAdapter.subscribe(requestUpdate), SignatureContextMenu_1.SignatureContextMenu.install(canvas, range, capturing, editing, signatureTrackAdapter));
    return (<div className={className}>{canvas}</div>);
};
exports.SignatureTrackBody = SignatureTrackBody;
