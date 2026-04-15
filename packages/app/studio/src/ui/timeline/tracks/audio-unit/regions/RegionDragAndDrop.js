"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RegionDragAndDrop_snapping;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionDragAndDrop = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var TimelineDragAndDrop_1 = require("@/ui/timeline/tracks/audio-unit/TimelineDragAndDrop");
var studio_enums_1 = require("@opendaw/studio-enums");
var RegionDragAndDrop = /** @class */ (function (_super) {
    __extends(RegionDragAndDrop, _super);
    function RegionDragAndDrop(service, capturing, snapping) {
        var _this = _super.call(this, service, capturing) || this;
        _RegionDragAndDrop_snapping.set(_this, void 0);
        __classPrivateFieldSet(_this, _RegionDragAndDrop_snapping, snapping, "f");
        return _this;
    }
    RegionDragAndDrop.prototype.handleSample = function (_a) {
        var event = _a.event, trackBoxAdapter = _a.trackBoxAdapter, audioFileBox = _a.audioFileBox, sample = _a.sample, type = _a.type;
        var pointerX = event.clientX - this.capturing.element.getBoundingClientRect().left;
        var pointerPulse = Math.max(__classPrivateFieldGet(this, _RegionDragAndDrop_snapping, "f").xToUnitFloor(pointerX), 0);
        var boxGraph = this.project.boxGraph;
        // Calculate duration to determine target track and handle overlaps
        var duration = studio_core_1.AudioContentFactory.calculateDuration(sample);
        var complete = pointerPulse + duration;
        // Resolve target track (handles keep-existing by finding non-overlapping track)
        var targetTrack = this.project.overlapResolver.resolveTargetTrack(trackBoxAdapter, pointerPulse, complete);
        // Capture overlap state before creating (handles clip/push-existing)
        var solver = this.project.overlapResolver.fromRange(targetTrack, pointerPulse, complete);
        // Create region on target track
        type === "file" || sample.bpm === 0
            ? studio_core_1.AudioContentFactory.createNotStretchedRegion({
                boxGraph: boxGraph,
                targetTrack: targetTrack.box,
                audioFileBox: audioFileBox,
                sample: sample,
                position: pointerPulse
            })
            : studio_core_1.AudioContentFactory.createTimeStretchedRegion({
                boxGraph: boxGraph,
                targetTrack: targetTrack.box,
                audioFileBox: audioFileBox,
                sample: sample,
                position: pointerPulse,
                playbackRate: 1.0,
                transientPlayMode: studio_enums_1.TransientPlayMode.Pingpong
            });
        // Apply overlap resolution
        solver();
    };
    return RegionDragAndDrop;
}(TimelineDragAndDrop_1.TimelineDragAndDrop));
exports.RegionDragAndDrop = RegionDragAndDrop;
_RegionDragAndDrop_snapping = new WeakMap();
