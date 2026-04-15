"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueEventEditing = void 0;
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_std_1 = require("@opendaw/lib-std");
var ValueEventEditing;
(function (ValueEventEditing) {
    ValueEventEditing.deleteEvent = function (collection, event) {
        if (event.index > 1) {
            return (0, lib_std_1.panic)("Invalid index > 1 (".concat(event.index, ")"));
        }
        // Find successor BEFORE deleting, but promote AFTER to avoid temporary duplicate index
        var successorToPromote = event.index === 0
            ? (function () {
                var successor = lib_dsp_1.ValueEvent.nextEvent(collection.events, event);
                return successor !== null && successor.position === event.position ? successor : null;
            })()
            : null;
        // Remove from EventCollection synchronously before box.delete() because pointerHub
        // notifications are deferred until after modify() completes. This prevents duplicate
        // events at the same (position, index) when the successor is promoted.
        collection.events.remove(event);
        event.box.delete();
        if (successorToPromote !== null) {
            (0, lib_std_1.assert)(successorToPromote.index === 1, "Invalid index !== 1 (".concat(successorToPromote.index, ")"));
            successorToPromote.box.index.setValue(0);
        }
    };
    ValueEventEditing.createOrMoveEvent = function (collection, position, value, interpolation) {
        if (interpolation === void 0) { interpolation = lib_dsp_1.Interpolation.Linear; }
        var le = collection.events.lowerEqual(position);
        var ge = collection.events.greaterEqual(position);
        if (null === le || null === ge) {
            return collection.createEvent({ position: position, index: 0, value: value, interpolation: interpolation });
        }
        else if (le === ge) {
            if (le.index === 0) {
                return collection.createEvent({ position: position, index: 1, value: value, interpolation: interpolation });
            }
            else {
                le.box.value.setValue(value);
                return le;
            }
        }
        else if (le.position === ge.position) {
            le.box.value.setValue(value);
            return le;
        }
        else {
            return collection.createEvent({ position: position, index: 0, value: value, interpolation: interpolation });
        }
    };
})(ValueEventEditing || (exports.ValueEventEditing = ValueEventEditing = {}));
