"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DblClckTextInput = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var FloatingTextInput_tsx_1 = require("@/ui/components/FloatingTextInput.tsx");
var DblClckTextInput = function (_a, _b) {
    var resolversFactory = _a.resolversFactory, provider = _a.provider, location = _a.location, numeric = _a.numeric;
    var element = _b[0];
    (0, lib_std_1.assertInstanceOf)(element, Element);
    element.ondblclick = function () {
        var rect = element.getBoundingClientRect();
        var option = lib_std_1.Option.from(provider);
        if (option.isEmpty()) {
            return;
        }
        var _a = option.unwrap(), value = _a.value, unit = _a.unit;
        var point = (0, lib_std_1.isDefined)(location) ? location() : { x: rect.left, y: rect.top + (rect.height >> 1) };
        element.ownerDocument.body.appendChild(<FloatingTextInput_tsx_1.FloatingTextInput position={point} value={value} unit={unit} numeric={numeric} resolvers={resolversFactory()}/>);
    };
    return element;
};
exports.DblClckTextInput = DblClckTextInput;
