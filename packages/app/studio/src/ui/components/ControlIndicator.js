"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlIndicator = void 0;
var lib_jsx_1 = require("@opendaw/lib-jsx");
var ControlIndicator = function (_a, children) {
    var lifecycle = _a.lifecycle, parameter = _a.parameter;
    var element = <lib_jsx_1.Group>{children}</lib_jsx_1.Group>;
    lifecycle.own(parameter.catchupAndSubscribeControlSources({
        onControlSourceAdd: function () { return element.classList.add("automated"); },
        onControlSourceRemove: function () { return element.classList.remove("automated"); }
    }));
    return element;
};
exports.ControlIndicator = ControlIndicator;
