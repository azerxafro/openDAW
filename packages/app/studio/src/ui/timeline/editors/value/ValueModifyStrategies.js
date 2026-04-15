"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueModifyStrategy = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var ValueModifyStrategy;
(function (ValueModifyStrategy) {
    ValueModifyStrategy.Identity = Object.freeze({
        showOrigin: function () { return false; },
        snapValue: function () { return lib_std_1.Option.None; },
        readPosition: function (event) { return event.position; },
        readValue: function (event) { return event.value; },
        readInterpolation: function (event) { return event.interpolation; },
        translateSearch: function (value) { return value; },
        isVisible: function (_event) { return true; },
        iterator: function (_searchMin, _searchMax) { return lib_std_1.IterableIterators.empty(); },
        readContentDuration: function (region) { return region.contentDuration; }
    });
})(ValueModifyStrategy || (exports.ValueModifyStrategy = ValueModifyStrategy = {}));
