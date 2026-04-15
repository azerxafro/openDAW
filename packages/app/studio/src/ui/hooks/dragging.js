"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueDragging = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var ValueDragging;
(function (ValueDragging) {
    ValueDragging.installUnitValueRelativeDragging = function (factory, target, options) {
        return lib_dom_1.Dragging.attach(target, function (event) {
            var _a;
            var optProcess = factory(event);
            if (optProcess.isEmpty()) {
                return lib_std_1.Option.None;
            }
            var horizontal = (options === null || options === void 0 ? void 0 : options.horizontal) === true;
            var process = optProcess.unwrap();
            var startValue = process.start();
            if (!Number.isFinite(startValue)) {
                console.warn("ValueDragging: start() returned non-finite value (".concat(startValue, "); aborting drag"));
                (0, lib_std_1.safeExecute)(process.finally);
                return lib_std_1.Option.None;
            }
            var guide = lib_std_1.ValueGuide.create(options);
            if (event.shiftKey) {
                guide.disable();
            }
            else {
                guide.enable();
            }
            guide.begin(startValue);
            guide.ratio(event.altKey ? 0.25 : (_a = options === null || options === void 0 ? void 0 : options.ratio) !== null && _a !== void 0 ? _a : 1.5);
            var pointer = horizontal ? event.clientX : -event.clientY;
            return lib_std_1.Option.wrap({
                abortSignal: process.abortSignal,
                update: function (event) {
                    var _a;
                    if (event.shiftKey) {
                        guide.disable();
                    }
                    else {
                        guide.enable();
                    }
                    guide.ratio(event.altKey ? 0.25 : (_a = options === null || options === void 0 ? void 0 : options.ratio) !== null && _a !== void 0 ? _a : 1.5);
                    var newPointer = horizontal ? event.clientX : -event.clientY;
                    guide.moveBy(newPointer - pointer);
                    pointer = newPointer;
                    process.modify(guide.value());
                },
                approve: function () { return process.finalise(startValue, guide.value()); },
                cancel: function () { return process.cancel(startValue); },
                finally: function () { return (0, lib_std_1.safeExecute)(process.finally); }
            });
        }, { pointerLock: true });
    };
})(ValueDragging || (exports.ValueDragging = ValueDragging = {}));
