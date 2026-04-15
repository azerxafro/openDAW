"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotePropertyAccessors = exports.NotePropertyChance = exports.NotePropertyCent = exports.NotePropertyVelocity = void 0;
var PropertyParameters_ts_1 = require("@/ui/timeline/editors/notes/property/PropertyParameters.ts");
exports.NotePropertyVelocity = new /** @class */ (function () {
    function class_1() {
        this.label = "Velocity";
        this.minmaxLabels = ["0%", "100%"];
        this.anchor = 0.0;
        this.valueMapping = PropertyParameters_ts_1.PropertyParameters.velocity.parameter.valueMapping;
        this.stringMapping = PropertyParameters_ts_1.PropertyParameters.velocity.parameter.stringMapping;
    }
    class_1.prototype.readRawValue = function (note) { return note.velocity; };
    class_1.prototype.readValue = function (strategy, note) { return strategy.readVelocity(note); };
    class_1.prototype.writeValue = function (box, value) { box.velocity.setValue(value); };
    return class_1;
}());
exports.NotePropertyCent = new /** @class */ (function () {
    function class_2() {
        this.label = "Cent";
        this.minmaxLabels = ["-50ct", "+50ct"];
        this.anchor = 0.5;
        this.valueMapping = PropertyParameters_ts_1.PropertyParameters.cent.parameter.valueMapping;
        this.stringMapping = PropertyParameters_ts_1.PropertyParameters.cent.parameter.stringMapping;
    }
    class_2.prototype.readRawValue = function (note) { return note.cent; };
    class_2.prototype.readValue = function (strategy, note) { return strategy.readCent(note); };
    class_2.prototype.writeValue = function (box, value) { box.cent.setValue(value); };
    return class_2;
}());
exports.NotePropertyChance = new /** @class */ (function () {
    function class_3() {
        this.label = "Chance";
        this.minmaxLabels = ["1%", "100%"];
        this.anchor = 0.0;
        this.valueMapping = PropertyParameters_ts_1.PropertyParameters.chance.parameter.valueMapping;
        this.stringMapping = PropertyParameters_ts_1.PropertyParameters.chance.parameter.stringMapping;
    }
    class_3.prototype.readRawValue = function (note) { return note.chance; };
    class_3.prototype.readValue = function (strategy, note) { return strategy.readChance(note); };
    class_3.prototype.writeValue = function (box, value) { box.chance.setValue(value); };
    return class_3;
}());
exports.NotePropertyAccessors = [exports.NotePropertyVelocity, exports.NotePropertyCent, exports.NotePropertyChance];
