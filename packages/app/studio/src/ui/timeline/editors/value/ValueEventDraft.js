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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueEventDraft = void 0;
var ValueEventDraft;
(function (ValueEventDraft) {
    var _Solver_instances, _Solver_strategy, _Solver_selectedIterator, _Solver_unselectedIterator, _Solver_nextUnselected, _Solver_nextSelected, _Solver_next, _Solver_evalNext, _Solver_pullSelected, _Solver_pullUnselected;
    ValueEventDraft.wrapUnselected = function (event) {
        var value = event.value;
        var position = event.position;
        var index = event.index;
        var interpolation = event.interpolation;
        return ({ type: "value-event", position: position, index: index, value: value, interpolation: interpolation, direction: 0, isSelected: false });
    };
    ValueEventDraft.wrapSelected = function (event, strategy) {
        var value = strategy.readValue(event);
        var position = strategy.readPosition(event);
        var index = event.index;
        var interpolation = event.interpolation;
        var direction = Math.sign(position - event.position);
        return ({ type: "value-event", position: position, index: index, value: value, interpolation: interpolation, direction: direction, isSelected: true });
    };
    ValueEventDraft.min = function (a, b) {
        if (null === a) {
            return b;
        }
        if (null === b) {
            return a;
        }
        if (a.position > b.position) {
            return b;
        }
        if (a.position < b.position) {
            return a;
        }
        if (a.direction > b.direction) {
            return a;
        }
        if (a.direction < b.direction) {
            return b;
        }
        if (a.index > b.index) {
            return b;
        }
        if (a.index < b.index) {
            return a;
        }
        return b;
    };
    ValueEventDraft.max = function (a, b) {
        if (null === a) {
            return b;
        }
        if (null === b) {
            return a;
        }
        if (a.position < b.position) {
            return b;
        }
        if (a.position > b.position) {
            return a;
        }
        if (a.direction < b.direction) {
            return a;
        }
        if (a.direction > b.direction) {
            return b;
        }
        if (a.index < b.index) {
            return b;
        }
        if (a.index > b.index) {
            return a;
        }
        return b;
    };
    var Solver = /** @class */ (function () {
        function Solver(collection, strategy, searchFrom, _searchMax) {
            _Solver_instances.add(this);
            _Solver_strategy.set(this, void 0);
            _Solver_selectedIterator.set(this, void 0);
            _Solver_unselectedIterator.set(this, void 0);
            _Solver_nextUnselected.set(this, null);
            _Solver_nextSelected.set(this, null);
            _Solver_next.set(this, null);
            __classPrivateFieldSet(this, _Solver_strategy, strategy, "f");
            __classPrivateFieldSet(this, _Solver_selectedIterator, collection.iterateFrom(strategy.translateSearch(searchFrom), function (adapter) { return adapter.isSelected; }), "f");
            __classPrivateFieldSet(this, _Solver_unselectedIterator, collection.iterateFrom(searchFrom), "f");
            __classPrivateFieldSet(this, _Solver_nextSelected, __classPrivateFieldGet(this, _Solver_instances, "m", _Solver_pullSelected).call(this), "f");
            __classPrivateFieldSet(this, _Solver_nextUnselected, __classPrivateFieldGet(this, _Solver_instances, "m", _Solver_pullUnselected).call(this), "f");
            __classPrivateFieldGet(this, _Solver_instances, "m", _Solver_evalNext).call(this);
        }
        Solver.prototype.iterate = function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(__classPrivateFieldGet(this, _Solver_next, "f") !== null)) return [3 /*break*/, 2];
                        result = __classPrivateFieldGet(this, _Solver_next, "f");
                        __classPrivateFieldGet(this, _Solver_instances, "m", _Solver_evalNext).call(this);
                        return [4 /*yield*/, result];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        };
        return Solver;
    }());
    _Solver_strategy = new WeakMap(), _Solver_selectedIterator = new WeakMap(), _Solver_unselectedIterator = new WeakMap(), _Solver_nextUnselected = new WeakMap(), _Solver_nextSelected = new WeakMap(), _Solver_next = new WeakMap(), _Solver_instances = new WeakSet(), _Solver_evalNext = function _Solver_evalNext() {
        __classPrivateFieldSet(this, _Solver_next, ValueEventDraft.min(__classPrivateFieldGet(this, _Solver_nextUnselected, "f"), __classPrivateFieldGet(this, _Solver_nextSelected, "f")), "f");
        if (__classPrivateFieldGet(this, _Solver_next, "f") === null) {
            return;
        }
        while (__classPrivateFieldGet(this, _Solver_nextUnselected, "f") === ValueEventDraft.min(__classPrivateFieldGet(this, _Solver_next, "f"), __classPrivateFieldGet(this, _Solver_nextUnselected, "f"))) {
            __classPrivateFieldSet(this, _Solver_nextUnselected, __classPrivateFieldGet(this, _Solver_instances, "m", _Solver_pullUnselected).call(this), "f");
        }
        while (__classPrivateFieldGet(this, _Solver_nextSelected, "f") === ValueEventDraft.min(__classPrivateFieldGet(this, _Solver_nextSelected, "f"), __classPrivateFieldGet(this, _Solver_next, "f"))) {
            __classPrivateFieldSet(this, _Solver_nextSelected, __classPrivateFieldGet(this, _Solver_instances, "m", _Solver_pullSelected).call(this), "f");
        }
    }, _Solver_pullSelected = function _Solver_pullSelected() {
        var _a = __classPrivateFieldGet(this, _Solver_selectedIterator, "f").next(), done = _a.done, event = _a.value;
        if (done) {
            return null;
        }
        return ValueEventDraft.wrapSelected(event, __classPrivateFieldGet(this, _Solver_strategy, "f"));
    }, _Solver_pullUnselected = function _Solver_pullUnselected() {
        for (;;) {
            var _a = __classPrivateFieldGet(this, _Solver_unselectedIterator, "f").next(), done = _a.done, event_1 = _a.value;
            if (done) {
                return null;
            }
            if ((!event_1.isSelected || __classPrivateFieldGet(this, _Solver_strategy, "f").showOrigin()) && __classPrivateFieldGet(this, _Solver_strategy, "f").isVisible(event_1)) {
                return ValueEventDraft.wrapUnselected(event_1);
            }
        }
    };
    ValueEventDraft.Solver = Solver;
})(ValueEventDraft || (exports.ValueEventDraft = ValueEventDraft = {}));
