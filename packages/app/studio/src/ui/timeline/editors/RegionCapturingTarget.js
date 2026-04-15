"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegionCapturing = void 0;
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_std_1 = require("@opendaw/lib-std");
var constants_ts_1 = require("@/ui/timeline/constants.ts");
var studio_core_1 = require("@opendaw/studio-core");
var createRegionCapturing = function (canvas, regionProvider, range) { return new studio_core_1.ElementCapturing(canvas, {
    capture: function (x, _y) {
        var _a, _b;
        var trackAdapter = (_b = (_a = regionProvider().unwrapOrNull()) === null || _a === void 0 ? void 0 : _a.trackBoxAdapter) === null || _b === void 0 ? void 0 : _b.unwrapOrNull();
        if (!(0, lib_std_1.isDefined)(trackAdapter)) {
            return null;
        }
        var position = Math.floor(range.xToUnit(x));
        var region = trackAdapter.regions.collection.lowerEqual(position);
        if (region === null || position >= region.complete) {
            return null;
        }
        var x0 = range.unitToX(region.position);
        var x1 = range.unitToX(region.complete);
        if (x1 - x0 <= constants_ts_1.PointerRadiusDistance * 4) {
            // too small to have other sensitive areas
            return { type: "region-position", region: region };
        }
        if (studio_adapters_1.UnionAdapterTypes.isLoopableRegion(region)) {
            if (x - x0 < constants_ts_1.PointerRadiusDistance * 2) {
                return { type: "region-start", region: region };
            }
            else if (Math.abs(x - range.unitToX(region.offset + region.loopDuration)) <= constants_ts_1.PointerRadiusDistance) {
                return { type: "loop-duration", region: region };
            }
            else if (x1 - x < constants_ts_1.PointerRadiusDistance * 2) {
                return { type: "region-complete", region: region };
            }
        }
        return { type: "region-position", region: region };
    }
}); };
exports.createRegionCapturing = createRegionCapturing;
