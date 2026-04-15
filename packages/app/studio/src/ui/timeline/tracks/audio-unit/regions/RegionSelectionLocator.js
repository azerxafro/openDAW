"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegionLocator = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var constants_1 = require("@/ui/timeline/constants");
var createRegionLocator = function (manager, range, regionSelection, audioUnitFreeze) { return ({
    selectableAt: function (_a) {
        var u = _a.u, v = _a.v;
        var tracks = manager.tracks();
        var index = manager.localToIndex(v);
        if (index < 0 || index >= tracks.length) {
            return lib_std_1.Iterables.empty();
        }
        var component = tracks[index];
        if (audioUnitFreeze.isFrozen(component.audioUnitBoxAdapter)) {
            return lib_std_1.Iterables.empty();
        }
        var threshold = range.unitsPerPixel * constants_1.PointerRadiusDistance;
        var collection = component.trackBoxAdapter.regions.collection;
        var before = collection.lowerEqual(u);
        if ((0, lib_std_1.isDefined)(before) && u < before.complete + threshold) {
            return lib_std_1.Iterables.one(before);
        }
        var after = collection.greaterEqual(u);
        if ((0, lib_std_1.isDefined)(after) && after.position <= u + threshold) {
            return lib_std_1.Iterables.one(after);
        }
        return lib_std_1.Iterables.empty();
    },
    selectablesBetween: function (_a, _b) {
        var u0 = _a.u, v0 = _a.v;
        var u1 = _b.u, v1 = _b.v;
        var tracks = manager.tracks();
        var startIndex = manager.localToIndex(v0);
        if (startIndex < 0 || startIndex >= tracks.length) {
            return lib_std_1.Iterables.empty();
        }
        var regions = [];
        for (var index = startIndex; index < tracks.length; index++) {
            var component = tracks[index];
            if (component.position >= v1) {
                break;
            }
            if (audioUnitFreeze.isFrozen(component.audioUnitBoxAdapter)) {
                continue;
            }
            regions.push.apply(regions, component.trackBoxAdapter.regions.collection.iterateRange(u0, u1));
        }
        return regions;
    },
    selectable: function () { return regionSelection.selected(); }
}); };
exports.createRegionLocator = createRegionLocator;
