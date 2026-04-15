"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotDragAndDrop = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var DragAndDrop_1 = require("@/ui/DragAndDrop");
var SlotDragAndDrop;
(function (SlotDragAndDrop) {
    var findSampleByIndex = function (project, index) {
        for (var _i = 0, _a = project.boxGraph.boxes(); _i < _a.length; _i++) {
            var box = _a[_i];
            if (box instanceof studio_boxes_1.PlayfieldSampleBox && box.index.getValue() === index) {
                return lib_std_1.Option.wrap(box);
            }
        }
        return lib_std_1.Option.None;
    };
    var executeCopy = function (project, sourceIndex, targetIndex) {
        if (sourceIndex === targetIndex) {
            return;
        }
        var editing = project.editing, boxGraph = project.boxGraph;
        var source = findSampleByIndex(project, sourceIndex);
        var target = findSampleByIndex(project, targetIndex);
        source.ifSome(function (sourceBox) {
            editing.modify(function () {
                // If target has a sample, delete it first
                target.ifSome(function (targetBox) { return targetBox.delete(); });
                // Get the source file (AudioFileBox)
                var sourceFile = sourceBox.file.targetVertex
                    .map(function (vertex) { return vertex.box instanceof studio_boxes_1.AudioFileBox ? vertex.box : null; });
                // Get the device box and its samples hub
                var deviceBox = sourceBox.device.targetVertex
                    .map(function (vertex) { return vertex.box instanceof studio_boxes_1.PlayfieldDeviceBox ? vertex.box : null; });
                if (sourceFile.nonEmpty() && deviceBox.nonEmpty()) {
                    studio_boxes_1.PlayfieldSampleBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                        box.file.refer(sourceFile.unwrap());
                        box.device.refer(deviceBox.unwrap().samples);
                        box.index.setValue(targetIndex);
                    });
                }
            });
        });
    };
    var executeSwap = function (project, sourceIndex, targetIndex) {
        if (sourceIndex === targetIndex) {
            return;
        }
        var editing = project.editing;
        var source = findSampleByIndex(project, sourceIndex);
        var target = findSampleByIndex(project, targetIndex);
        editing.modify(function () {
            if (source.nonEmpty() && target.isEmpty()) {
                source.unwrap().index.setValue(targetIndex);
            }
            else if (source.isEmpty() && target.nonEmpty()) {
                target.unwrap().index.setValue(sourceIndex);
            }
            else if (source.nonEmpty() && target.nonEmpty()) {
                source.unwrap().index.setValue(targetIndex);
                target.unwrap().index.setValue(sourceIndex);
            }
        });
    };
    SlotDragAndDrop.installSource = function (_a) {
        var element = _a.element, sample = _a.sample, getSlotIndex = _a.getSlotIndex;
        return DragAndDrop_1.DragAndDrop.installSource(element, function () { return ({
            type: "playfield-slot",
            index: getSlotIndex(),
            uuid: sample.address.uuid.toString()
        }); });
    };
    SlotDragAndDrop.installTarget = function (_a) {
        var element = _a.element, project = _a.project, getSlotIndex = _a.getSlotIndex;
        return DragAndDrop_1.DragAndDrop.installTarget(element, {
            drag: function (_event, data) {
                return data.type === "playfield-slot" && data.index !== getSlotIndex();
            },
            drop: function (event, data) {
                if (data.type !== "playfield-slot") {
                    return;
                }
                var targetIndex = getSlotIndex();
                if (event.altKey) {
                    executeCopy(project, data.index, targetIndex);
                }
                else {
                    executeSwap(project, data.index, targetIndex);
                }
            },
            enter: function (allowDrop) { return element.classList.toggle("drop-target", allowDrop); },
            leave: function () { return element.classList.remove("drop-target"); }
        });
    };
})(SlotDragAndDrop || (exports.SlotDragAndDrop = SlotDragAndDrop = {}));
