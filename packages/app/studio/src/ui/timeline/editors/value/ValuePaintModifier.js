"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var _ValuePaintModifier_instances, _ValuePaintModifier_editing, _ValuePaintModifier_element, _ValuePaintModifier_reader, _ValuePaintModifier_selection, _ValuePaintModifier_snapping, _ValuePaintModifier_valueAxis, _ValuePaintModifier_notifier, _ValuePaintModifier_strokes, _ValuePaintModifier_lastPosition, _ValuePaintModifier_lastValue, _ValuePaintModifier_lastIndex, _ValuePaintModifier_dispatchChange, _ValuePaintModifier_verifyStrokes;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValuePaintModifier = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var ValuePaintModifier = /** @class */ (function () {
    function ValuePaintModifier(_a) {
        var editing = _a.editing, element = _a.element, reader = _a.reader, selection = _a.selection, snapping = _a.snapping, valueAxis = _a.valueAxis;
        _ValuePaintModifier_instances.add(this);
        _ValuePaintModifier_editing.set(this, void 0);
        _ValuePaintModifier_element.set(this, void 0);
        _ValuePaintModifier_reader.set(this, void 0);
        _ValuePaintModifier_selection.set(this, void 0);
        _ValuePaintModifier_snapping.set(this, void 0);
        _ValuePaintModifier_valueAxis.set(this, void 0);
        _ValuePaintModifier_notifier.set(this, void 0);
        _ValuePaintModifier_strokes.set(this, void 0);
        _ValuePaintModifier_lastPosition.set(this, NaN);
        _ValuePaintModifier_lastValue.set(this, NaN);
        _ValuePaintModifier_lastIndex.set(this, 0);
        __classPrivateFieldSet(this, _ValuePaintModifier_editing, editing, "f");
        __classPrivateFieldSet(this, _ValuePaintModifier_element, element, "f");
        __classPrivateFieldSet(this, _ValuePaintModifier_reader, reader, "f");
        __classPrivateFieldSet(this, _ValuePaintModifier_selection, selection, "f");
        __classPrivateFieldGet(this, _ValuePaintModifier_selection, "f").deselectAll();
        __classPrivateFieldSet(this, _ValuePaintModifier_snapping, snapping, "f");
        __classPrivateFieldSet(this, _ValuePaintModifier_valueAxis, valueAxis, "f");
        __classPrivateFieldSet(this, _ValuePaintModifier_notifier, new lib_std_1.Notifier(), "f");
        __classPrivateFieldSet(this, _ValuePaintModifier_strokes, [], "f");
    }
    ValuePaintModifier.create = function (construct) { return new ValuePaintModifier(construct); };
    ValuePaintModifier.prototype.subscribeUpdate = function (observer) { return __classPrivateFieldGet(this, _ValuePaintModifier_notifier, "f").subscribe(observer); };
    ValuePaintModifier.prototype.showOrigin = function () { return false; };
    ValuePaintModifier.prototype.snapValue = function () { return lib_std_1.Option.None; };
    ValuePaintModifier.prototype.translateSearch = function (value) { return value; };
    ValuePaintModifier.prototype.isVisible = function (_event) { return true; };
    ValuePaintModifier.prototype.readPosition = function (event) { return event.position; };
    ValuePaintModifier.prototype.readValue = function (event) { return event.value; };
    ValuePaintModifier.prototype.readInterpolation = function (event) { return event.interpolation; };
    ValuePaintModifier.prototype.iterator = function (searchMin, searchMax) {
        var offset, min, max, _i, _a, event_1, _b, _c, event_2, _d, _e, event_3;
        var _this = this;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    offset = __classPrivateFieldGet(this, _ValuePaintModifier_reader, "f").offset;
                    min = lib_std_1.Arrays.getFirst(__classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f"), "Internal Error").position - offset;
                    max = lib_std_1.Arrays.getLast(__classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f"), "Internal Error").position - offset;
                    _i = 0, _a = lib_dsp_1.ValueEvent.iterateWindow(__classPrivateFieldGet(this, _ValuePaintModifier_reader, "f").content.events, searchMin, min);
                    _f.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    event_1 = _a[_i];
                    if (!(event_1.position < min)) return [3 /*break*/, 3];
                    return [4 /*yield*/, {
                            type: "value-event",
                            position: event_1.position,
                            value: event_1.value,
                            interpolation: event_1.interpolation,
                            index: event_1.index,
                            isSelected: event_1.isSelected,
                            direction: 0
                        }];
                case 2:
                    _f.sent();
                    _f.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    _b = 0, _c = __classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f").map(function (stroke) { return ({
                        type: "value-event",
                        position: stroke.position - __classPrivateFieldGet(_this, _ValuePaintModifier_reader, "f").offset,
                        value: stroke.value,
                        interpolation: lib_dsp_1.Interpolation.Linear,
                        index: 0,
                        isSelected: true,
                        direction: 0
                    }); });
                    _f.label = 5;
                case 5:
                    if (!(_b < _c.length)) return [3 /*break*/, 8];
                    event_2 = _c[_b];
                    return [4 /*yield*/, event_2];
                case 6:
                    _f.sent();
                    _f.label = 7;
                case 7:
                    _b++;
                    return [3 /*break*/, 5];
                case 8:
                    _d = 0, _e = lib_dsp_1.ValueEvent.iterateWindow(__classPrivateFieldGet(this, _ValuePaintModifier_reader, "f").content.events, max, searchMax);
                    _f.label = 9;
                case 9:
                    if (!(_d < _e.length)) return [3 /*break*/, 12];
                    event_3 = _e[_d];
                    if (!(event_3.position > max)) return [3 /*break*/, 11];
                    return [4 /*yield*/, {
                            type: "value-event",
                            position: event_3.position,
                            value: event_3.value,
                            interpolation: event_3.interpolation,
                            index: event_3.index,
                            isSelected: event_3.isSelected,
                            direction: 0
                        }];
                case 10:
                    _f.sent();
                    _f.label = 11;
                case 11:
                    _d++;
                    return [3 /*break*/, 9];
                case 12: return [2 /*return*/];
            }
        });
    };
    ValuePaintModifier.prototype.readContentDuration = function (owner) { return owner.contentDuration; };
    ValuePaintModifier.prototype.update = function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        var clientRect = __classPrivateFieldGet(this, _ValuePaintModifier_element, "f").getBoundingClientRect();
        var position = __classPrivateFieldGet(this, _ValuePaintModifier_snapping, "f").xToUnitFloor(clientX - clientRect.left);
        var value = __classPrivateFieldGet(this, _ValuePaintModifier_valueAxis, "f").axisToValue(clientY - clientRect.top);
        if (__classPrivateFieldGet(this, _ValuePaintModifier_lastPosition, "f") === position && __classPrivateFieldGet(this, _ValuePaintModifier_lastValue, "f") === value) {
            return;
        }
        if (__classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f").length === 0) {
            __classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f").push({ position: position, value: value });
            __classPrivateFieldSet(this, _ValuePaintModifier_lastIndex, 0, "f");
        }
        else {
            var index = lib_std_1.BinarySearch.leftMostMapped(__classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f"), position, lib_std_1.NumberComparator, function (_a) {
                var position = _a.position;
                return position;
            });
            if (index === __classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f").length) {
                __classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f").push({ position: position, value: value });
            }
            else {
                var minIndex = Math.min(index, __classPrivateFieldGet(this, _ValuePaintModifier_lastIndex, "f"));
                var maxIndex = Math.max(index, __classPrivateFieldGet(this, _ValuePaintModifier_lastIndex, "f"));
                for (var i = minIndex; i <= maxIndex; i++) {
                    __classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f")[i].value = value;
                }
                if (__classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f")[index].position !== position) {
                    __classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f").splice(index, 0, { position: position, value: value });
                }
            }
            __classPrivateFieldSet(this, _ValuePaintModifier_lastIndex, index, "f");
        }
        __classPrivateFieldSet(this, _ValuePaintModifier_lastPosition, position, "f");
        __classPrivateFieldSet(this, _ValuePaintModifier_lastValue, value, "f");
        __classPrivateFieldGet(this, _ValuePaintModifier_instances, "m", _ValuePaintModifier_dispatchChange).call(this);
    };
    ValuePaintModifier.prototype.approve = function () {
        var _this = this;
        __classPrivateFieldGet(this, _ValuePaintModifier_instances, "m", _ValuePaintModifier_verifyStrokes).call(this);
        var offset = __classPrivateFieldGet(this, _ValuePaintModifier_reader, "f").offset;
        var min = lib_std_1.Arrays.getFirst(__classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f"), "Internal Error").position - offset;
        var max = lib_std_1.Arrays.getLast(__classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f"), "Internal Error").position - offset;
        var content = __classPrivateFieldGet(this, _ValuePaintModifier_reader, "f").content;
        var deletion = Array.from(content.events.iterateRange(min, max + 1));
        __classPrivateFieldGet(this, _ValuePaintModifier_editing, "f").modify(function () {
            var _a;
            deletion.forEach(function (event) { return event.box.delete(); });
            (_a = __classPrivateFieldGet(_this, _ValuePaintModifier_selection, "f")).select.apply(_a, __classPrivateFieldGet(_this, _ValuePaintModifier_strokes, "f").map(function (stroke) { return content.createEvent({
                position: stroke.position - offset,
                value: stroke.value,
                interpolation: lib_dsp_1.Interpolation.Linear,
                index: 0
            }); }));
        });
    };
    ValuePaintModifier.prototype.cancel = function () { __classPrivateFieldGet(this, _ValuePaintModifier_instances, "m", _ValuePaintModifier_dispatchChange).call(this); };
    return ValuePaintModifier;
}());
exports.ValuePaintModifier = ValuePaintModifier;
_ValuePaintModifier_editing = new WeakMap(), _ValuePaintModifier_element = new WeakMap(), _ValuePaintModifier_reader = new WeakMap(), _ValuePaintModifier_selection = new WeakMap(), _ValuePaintModifier_snapping = new WeakMap(), _ValuePaintModifier_valueAxis = new WeakMap(), _ValuePaintModifier_notifier = new WeakMap(), _ValuePaintModifier_strokes = new WeakMap(), _ValuePaintModifier_lastPosition = new WeakMap(), _ValuePaintModifier_lastValue = new WeakMap(), _ValuePaintModifier_lastIndex = new WeakMap(), _ValuePaintModifier_instances = new WeakSet(), _ValuePaintModifier_dispatchChange = function _ValuePaintModifier_dispatchChange() { __classPrivateFieldGet(this, _ValuePaintModifier_notifier, "f").notify(); }, _ValuePaintModifier_verifyStrokes = function _ValuePaintModifier_verifyStrokes() {
    if (__classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f").length === 0) {
        return (0, lib_std_1.panic)("No strokes available");
    }
    var prev = __classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f")[0];
    for (var i = 1; i < __classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f").length; i++) {
        var next = __classPrivateFieldGet(this, _ValuePaintModifier_strokes, "f")[i];
        if (prev.position >= next.position) {
            return (0, lib_std_1.panic)("Unsorted");
        }
        prev = next;
    }
};
