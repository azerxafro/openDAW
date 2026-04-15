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
exports.RegionReader = void 0;
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_std_1 = require("@opendaw/lib-std");
var lib_box_1 = require("@opendaw/lib-box");
var lib_dom_1 = require("@opendaw/lib-dom");
var RegionReader = /** @class */ (function () {
    function RegionReader(region, timelineBoxAdapter) {
        this.region = region;
        this.timelineBoxAdapter = timelineBoxAdapter;
    }
    RegionReader.forAudioRegionBoxAdapter = function (region, timelineBoxAdapter) {
        return new /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1(region) {
                return _super.call(this, region, timelineBoxAdapter) || this;
            }
            Object.defineProperty(class_1.prototype, "audioContent", {
                get: function () { return region; },
                enumerable: false,
                configurable: true
            });
            return class_1;
        }(RegionReader))(region);
    };
    RegionReader.forNoteRegionBoxAdapter = function (adapter, timelineBoxAdapter) {
        return new RegionReader(adapter, timelineBoxAdapter);
    };
    RegionReader.forValueRegionBoxAdapter = function (adapter, timelineBoxAdapter) {
        return new RegionReader(adapter, timelineBoxAdapter);
    };
    Object.defineProperty(RegionReader.prototype, "position", {
        get: function () { return this.region.position; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "duration", {
        get: function () { return this.region.duration; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "complete", {
        get: function () { return this.region.position + this.region.duration; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "loopOffset", {
        get: function () { return this.region.loopOffset; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "loopDuration", {
        get: function () { return this.region.loopDuration; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "contentDuration", {
        get: function () { return this.region.loopDuration; },
        set: function (value) { this.region.loopDuration = Math.max(lib_dsp_1.PPQN.SemiQuaver, value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "hue", {
        get: function () { return this.region.hue; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "mute", {
        get: function () { return this.region.mute; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "offset", {
        get: function () { return this.region.offset; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "canLoop", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "hasContent", {
        get: function () { return this.region.hasCollection; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "isMirrored", {
        get: function () { return this.region.isMirrowed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "content", {
        get: function () { return this.region.optCollection.unwrap(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegionReader.prototype, "trackBoxAdapter", {
        get: function () { return this.region.trackBoxAdapter; },
        enumerable: false,
        configurable: true
    });
    RegionReader.prototype.subscribeChange = function (observer) { return this.region.subscribeChange(observer); };
    RegionReader.prototype.subscribeTrackChange = function (observer) { return this.region.box.regions.subscribe(function () { return observer(); }); };
    RegionReader.prototype.keeoOverlapping = function (range) {
        var region = this.region;
        var run = (0, lib_dom_1.deferNextFrame)(function () {
            var unit = range.unitMin;
            if (region.offset + region.loopDuration > range.unitMax) {
                var paddingRight = range.unitPadding * 2;
                unit = (region.offset + region.loopDuration + paddingRight) - range.unitRange;
            }
            if (region.offset < range.unitMin) {
                unit = region.offset;
            }
            range.moveToUnit(unit);
        });
        return region.box.subscribe(lib_box_1.Propagation.Children, function (update) {
            if (update.type === "primitive") {
                switch (true) {
                    case update.matches(region.box.position):
                    case update.matches(region.box.duration):
                    case update.matches(region.box.loopOffset): {
                        run.request();
                        return;
                    }
                }
            }
        });
    };
    RegionReader.prototype.mapPlaybackCursor = function (value) {
        if (value < this.position || value >= this.complete) {
            return value;
        }
        return (0, lib_std_1.mod)(value - this.offset, this.loopDuration) + this.offset;
    };
    return RegionReader;
}());
exports.RegionReader = RegionReader;
