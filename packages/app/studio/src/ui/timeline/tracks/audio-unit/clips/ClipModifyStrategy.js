"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipModifyStrategy = exports.ClipModifyStrategies = void 0;
var ClipModifyStrategies;
(function (ClipModifyStrategies) {
    ClipModifyStrategies.Identity = Object.freeze({
        showOrigin: function () { return false; },
        selectedModifyStrategy: function () { return ClipModifyStrategy.Identity; },
        unselectedModifyStrategy: function () { return ClipModifyStrategy.Identity; }
    });
})(ClipModifyStrategies || (exports.ClipModifyStrategies = ClipModifyStrategies = {}));
var ClipModifyStrategy;
(function (ClipModifyStrategy) {
    ClipModifyStrategy.Identity = Object.freeze({
        readClipIndex: function (clip) { return clip.indexField.getValue(); },
        readMirror: function (clip) { return clip.canMirror && clip.isMirrowed; },
        translateTrackIndex: function (index) { return index; }
    });
})(ClipModifyStrategy || (exports.ClipModifyStrategy = ClipModifyStrategy = {}));
