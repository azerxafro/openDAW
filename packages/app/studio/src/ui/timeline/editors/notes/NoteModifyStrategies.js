"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModifyStrategy = exports.NoteModifyStrategies = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var NoteModifyStrategies;
(function (NoteModifyStrategies) {
    NoteModifyStrategies.Identity = Object.freeze({
        showOrigin: function () { return false; },
        showPropertyLine: function () { return lib_std_1.Option.None; },
        showCreation: function () { return lib_std_1.Option.None; },
        readContentDuration: function (region) { return region.contentDuration; },
        selectedModifyStrategy: function () { return NoteModifyStrategy.Identity; },
        unselectedModifyStrategy: function () { return NoteModifyStrategy.Identity; }
    });
})(NoteModifyStrategies || (exports.NoteModifyStrategies = NoteModifyStrategies = {}));
var NoteModifyStrategy;
(function (NoteModifyStrategy) {
    NoteModifyStrategy.Identity = Object.freeze({
        readPosition: function (note) { return note.position; },
        readComplete: function (note) { return note.position + note.duration; },
        readPitch: function (note) { return note.pitch; },
        readVelocity: function (note) { return note.velocity; },
        readCent: function (note) { return note.cent; },
        readChance: function (note) { return note.chance; },
        iterateRange: function (events, from, to) { return events.iterateRange(from, to); }
    });
})(NoteModifyStrategy || (exports.NoteModifyStrategy = NoteModifyStrategy = {}));
