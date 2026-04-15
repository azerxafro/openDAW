"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameValidator = void 0;
var lib_std_1 = require("@opendaw/lib-std");
exports.NameValidator = {
    validate: function (value, match, origin) {
        var _a;
        var trimmed = value.trim();
        if (trimmed.length >= 1 && trimmed.length <= 64) {
            match.success(trimmed);
        }
        else {
            (_a = match.failure) === null || _a === void 0 ? void 0 : _a.call(null);
            lib_std_1.RuntimeNotifier.info({ message: "A name must have one to 64 chararacters.", origin: origin }).catch(lib_std_1.EmptyExec);
        }
    }
};
