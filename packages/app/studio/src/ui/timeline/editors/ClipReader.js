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
exports.ClipReader = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_box_1 = require("@opendaw/lib-box");
var ClipReader = /** @class */ (function () {
    function ClipReader(clip, timelineBoxAdapter) {
        this.clip = clip;
        this.timelineBoxAdapter = timelineBoxAdapter;
    }
    ClipReader.forAudioClipBoxAdapter = function (clip, timelineBoxAdapter) {
        return new /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1(clip) {
                return _super.call(this, clip, timelineBoxAdapter) || this;
            }
            Object.defineProperty(class_1.prototype, "audioContent", {
                get: function () { return clip; },
                enumerable: false,
                configurable: true
            });
            return class_1;
        }(ClipReader))(clip);
    };
    ClipReader.forNoteClipBoxAdapter = function (adapter, timelineBoxAdapter) {
        return new ClipReader(adapter, timelineBoxAdapter);
    };
    ClipReader.forValueClipBoxAdapter = function (adapter, timelineBoxAdapter) {
        return new ClipReader(adapter, timelineBoxAdapter);
    };
    Object.defineProperty(ClipReader.prototype, "position", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "duration", {
        get: function () { return this.clip.duration; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "complete", {
        get: function () { return this.clip.duration; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "loopOffset", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "loopDuration", {
        get: function () { return this.clip.duration; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "contentDuration", {
        get: function () { return this.clip.duration; },
        set: function (value) { this.clip.box.duration.setValue(value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "hue", {
        get: function () { return this.clip.hue; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "mute", {
        get: function () { return this.clip.mute; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "offset", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "canLoop", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "hasContent", {
        get: function () { return this.clip.hasCollection; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "isMirrored", {
        get: function () { return this.clip.isMirrowed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "content", {
        get: function () { return this.clip.optCollection.unwrap(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClipReader.prototype, "trackBoxAdapter", {
        get: function () { return this.clip.trackBoxAdapter; },
        enumerable: false,
        configurable: true
    });
    ClipReader.prototype.subscribeChange = function (observer) { return this.clip.subscribeChange(observer); };
    ClipReader.prototype.subscribeTrackChange = function (observer) { return this.clip.box.clips.subscribe(function () { return observer(); }); };
    ClipReader.prototype.keeoOverlapping = function (range) {
        var clip = this.clip;
        return clip.box.subscribe(lib_box_1.Propagation.Children, function (update) {
            if (update.type === "primitive") {
                switch (true) {
                    case update.matches(clip.box.duration):
                        var unit = range.unitMin;
                        if (clip.duration > range.unitMax) {
                            var paddingRight = range.unitPadding * 2;
                            unit = (clip.duration + paddingRight) - range.unitRange;
                        }
                        if (range.unitMin > 0) {
                            unit = 0;
                        }
                        range.moveToUnit(unit);
                        return;
                }
            }
        });
    };
    ClipReader.prototype.mapPlaybackCursor = function (value) { return (0, lib_std_1.mod)(value, this.loopDuration); };
    return ClipReader;
}());
exports.ClipReader = ClipReader;
