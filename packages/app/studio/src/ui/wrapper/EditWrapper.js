"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditWrapper = void 0;
var EditWrapper;
(function (EditWrapper) {
    EditWrapper.forValue = function (editing, owner) {
        return new /** @class */ (function () {
            function class_1() {
            }
            class_1.prototype.getValue = function () { return owner.getValue(); };
            class_1.prototype.setValue = function (value) {
                editing.modify(function () { return owner.setValue(value); }, false);
            };
            class_1.prototype.subscribe = function (observer) {
                var _this = this;
                return owner.subscribe(function () { return observer(_this); });
            };
            class_1.prototype.catchupAndSubscribe = function (observer) {
                return owner.catchupAndSubscribe(observer);
            };
            return class_1;
        }());
    };
    EditWrapper.forAutomatableParameter = function (editing, adapter) {
        return new /** @class */ (function () {
            function class_2() {
            }
            class_2.prototype.getValue = function () { return adapter.getControlledValue(); };
            class_2.prototype.setValue = function (value) {
                editing.modify(function () { return adapter.setValue(value); });
            };
            class_2.prototype.subscribe = function (observer) {
                var _this = this;
                return adapter.subscribe(function () { return observer(_this); });
            };
            class_2.prototype.catchupAndSubscribe = function (observer) {
                return adapter.catchupAndSubscribe(observer);
            };
            return class_2;
        }());
    };
})(EditWrapper || (exports.EditWrapper = EditWrapper = {}));
