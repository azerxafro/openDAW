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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipDragAndDrop = void 0;
var TimelineDragAndDrop_1 = require("@/ui/timeline/tracks/audio-unit/TimelineDragAndDrop");
var constants_1 = require("@/ui/timeline/tracks/audio-unit/clips/constants");
var studio_core_1 = require("@opendaw/studio-core");
var ClipDragAndDrop = /** @class */ (function (_super) {
    __extends(ClipDragAndDrop, _super);
    function ClipDragAndDrop(service, capturing) {
        return _super.call(this, service, capturing) || this;
    }
    ClipDragAndDrop.prototype.handleSample = function (_a) {
        var event = _a.event, trackBoxAdapter = _a.trackBoxAdapter, audioFileBox = _a.audioFileBox, sample = _a.sample, type = _a.type;
        var x = event.clientX - this.capturing.element.getBoundingClientRect().left;
        var index = Math.floor(x / constants_1.ClipWidth);
        trackBoxAdapter.clips.collection.getAdapterByIndex(index)
            .ifSome(function (adapter) { return adapter.box.delete(); });
        var boxGraph = this.project.boxGraph;
        if (type === "file" || sample.bpm === 0) {
            studio_core_1.AudioContentFactory.createNotStretchedClip({
                boxGraph: boxGraph,
                targetTrack: trackBoxAdapter.box,
                sample: sample,
                audioFileBox: audioFileBox,
                index: index
            });
        }
        else {
            studio_core_1.AudioContentFactory.createTimeStretchedClip({
                boxGraph: boxGraph,
                targetTrack: trackBoxAdapter.box,
                sample: sample,
                audioFileBox: audioFileBox,
                index: index
            });
        }
    };
    return ClipDragAndDrop;
}(TimelineDragAndDrop_1.TimelineDragAndDrop));
exports.ClipDragAndDrop = ClipDragAndDrop;
