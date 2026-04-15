"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markers = void 0;
var Markers;
(function (Markers) {
    Markers.DefaultNames = ["Intro", "Verse", "Chorus", "Bridge", "Outro"];
    Markers.nextName = function (name) {
        var _a;
        var index = Markers.DefaultNames.findIndex(function (defaultName) { return defaultName === name; });
        return index === -1 ? "New" : (_a = Markers.DefaultNames.at(index + 1)) !== null && _a !== void 0 ? _a : "New";
    };
})(Markers || (exports.Markers = Markers = {}));
