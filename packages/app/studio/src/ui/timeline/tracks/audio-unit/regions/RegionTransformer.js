"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionTransformer = void 0;
var studio_boxes_1 = require("@opendaw/studio-boxes");
var lib_std_1 = require("@opendaw/lib-std");
var RegionTransformer;
(function (RegionTransformer) {
    RegionTransformer.toClip = function (region, copyEvents) {
        if (copyEvents === void 0) { copyEvents = true; }
        var trackBoxAdapter = region.trackBoxAdapter.unwrap();
        var index = trackBoxAdapter.clips.collection.getMinFreeIndex();
        var target = trackBoxAdapter.box.clips;
        return (0, lib_std_1.asDefined)(region.accept({
            visitNoteRegionBoxAdapter: function (source) {
                var events = copyEvents ? source.optCollection.unwrap().copy().box.owners : source.box.events.targetVertex.unwrap();
                return studio_boxes_1.NoteClipBox.create(trackBoxAdapter.box.graph, lib_std_1.UUID.generate(), function (box) {
                    box.index.setValue(index);
                    box.label.setValue(source.label);
                    box.hue.setValue(source.hue);
                    box.mute.setValue(source.mute);
                    box.duration.setValue(source.loopDuration);
                    box.events.refer(events);
                    box.clips.refer(target);
                });
            },
            visitAudioRegionBoxAdapter: function (source) {
                var events = copyEvents
                    ? source.optCollection.unwrap().copy().box.owners
                    : source.box.events.targetVertex.unwrap();
                return studio_boxes_1.AudioClipBox.create(trackBoxAdapter.box.graph, lib_std_1.UUID.generate(), function (box) {
                    box.index.setValue(index);
                    box.label.setValue(source.label);
                    box.timeBase.setValue(source.box.timeBase.getValue());
                    box.label.setValue(source.label);
                    box.hue.setValue(source.hue);
                    box.mute.setValue(source.mute);
                    box.gain.setValue(source.gain.getValue());
                    box.duration.setValue(source.loopDuration);
                    box.file.refer(source.box.file.targetVertex.unwrap());
                    source.box.playMode.ifVertex(function (vertex) { return box.playMode.refer(vertex); });
                    box.events.refer(events);
                    box.clips.refer(target);
                });
            },
            visitValueRegionBoxAdapter: function (source) {
                var events = copyEvents ? source.optCollection.unwrap().copy().box.owners : source.box.events.targetVertex.unwrap();
                return studio_boxes_1.ValueClipBox.create(trackBoxAdapter.box.graph, lib_std_1.UUID.generate(), function (box) {
                    box.index.setValue(index);
                    box.label.setValue(source.label);
                    box.hue.setValue(source.hue);
                    box.mute.setValue(source.mute);
                    box.duration.setValue(source.loopDuration);
                    box.events.refer(events);
                    box.clips.refer(target);
                });
            }
        }), "Could not convert ".concat(region, " to clip"));
    };
})(RegionTransformer || (exports.RegionTransformer = RegionTransformer = {}));
