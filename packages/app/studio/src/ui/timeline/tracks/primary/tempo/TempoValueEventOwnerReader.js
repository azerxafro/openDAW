"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TempoValueEventOwnerReader_adapter;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempoValueEventOwnerReader = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var TempoValueEventOwnerReader = /** @class */ (function () {
    function TempoValueEventOwnerReader(adapter) {
        _TempoValueEventOwnerReader_adapter.set(this, void 0);
        __classPrivateFieldSet(this, _TempoValueEventOwnerReader_adapter, adapter, "f");
    }
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "content", {
        get: function () { return __classPrivateFieldGet(this, _TempoValueEventOwnerReader_adapter, "f").tempoTrackEvents.unwrap(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "contentDuration", {
        get: function () { return Number.POSITIVE_INFINITY; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "hasContent", {
        get: function () { return __classPrivateFieldGet(this, _TempoValueEventOwnerReader_adapter, "f").tempoTrackEvents.nonEmpty(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "hue", {
        get: function () { return 30; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "isMirrored", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "offset", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "position", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "duration", {
        get: function () { return Number.POSITIVE_INFINITY; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "complete", {
        get: function () { return Number.POSITIVE_INFINITY; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "loopDuration", {
        get: function () { return Number.POSITIVE_INFINITY; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "loopOffset", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "mute", {
        get: function () { return !__classPrivateFieldGet(this, _TempoValueEventOwnerReader_adapter, "f").box.tempoTrack.enabled.getValue(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "canLoop", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "trackBoxAdapter", {
        get: function () { return lib_std_1.Option.None; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempoValueEventOwnerReader.prototype, "timelineBoxAdapter", {
        get: function () { return __classPrivateFieldGet(this, _TempoValueEventOwnerReader_adapter, "f"); },
        enumerable: false,
        configurable: true
    });
    TempoValueEventOwnerReader.prototype.keeoOverlapping = function (_range) {
        return lib_std_1.Terminable.Empty;
    };
    TempoValueEventOwnerReader.prototype.mapPlaybackCursor = function (position) { return position; };
    TempoValueEventOwnerReader.prototype.subscribeTrackChange = function (_observer) { return lib_std_1.Terminable.Empty; };
    TempoValueEventOwnerReader.prototype.subscribeChange = function (observer) {
        var inner = lib_std_1.Terminable.Empty;
        return lib_std_1.Terminable.many(__classPrivateFieldGet(this, _TempoValueEventOwnerReader_adapter, "f").tempoTrackEvents.catchupAndSubscribe(function (option) {
            inner.terminate();
            observer();
            inner = option.mapOr(function (collection) { return collection.subscribeChange(function () { return observer(); }); }, lib_std_1.Terminable.Empty);
        }), __classPrivateFieldGet(this, _TempoValueEventOwnerReader_adapter, "f").box.tempoTrack.minBpm.subscribe(function () { return observer(); }), __classPrivateFieldGet(this, _TempoValueEventOwnerReader_adapter, "f").box.tempoTrack.maxBpm.subscribe(function () { return observer(); }), __classPrivateFieldGet(this, _TempoValueEventOwnerReader_adapter, "f").box.tempoTrack.enabled.subscribe(function () { return observer(); }), __classPrivateFieldGet(this, _TempoValueEventOwnerReader_adapter, "f").box.bpm.subscribe(function () { return observer(); }), { terminate: function () { return inner.terminate(); } });
    };
    return TempoValueEventOwnerReader;
}());
exports.TempoValueEventOwnerReader = TempoValueEventOwnerReader;
_TempoValueEventOwnerReader_adapter = new WeakMap();
