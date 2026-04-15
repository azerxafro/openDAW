"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceParameters = void 0;
var DeviceParameters_sass_inline_1 = require("./DeviceParameters.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var NumberInput_1 = require("@/ui/components/NumberInput");
var EditWrapper_1 = require("@/ui/wrapper/EditWrapper");
var className = lib_dom_1.Html.adoptStyleSheet(DeviceParameters_sass_inline_1.default, "DeviceParameters");
var DeviceParameters = function (_a) {
    var lifecycle = _a.lifecycle, editing = _a.editing, channel = _a.box.channel;
    return (<lib_jsx_1.Frag>
        <div className={className}>
            <span>Channel:</span>
            <NumberInput_1.NumberInput lifecycle={lifecycle} model={EditWrapper_1.EditWrapper.forValue(editing, channel)} mapper={{
            y: function (x) {
                var int = parseInt(x);
                return Number.isFinite(int)
                    ? { type: "explicit", value: int - 1 }
                    : { type: "unknown", value: x };
            },
            x: function (y) { return ({
                unit: "#",
                value: String(y + 1)
            }); }
        }} guard={{
            guard: function (value) { return (0, lib_std_1.clamp)(value, 0, 15); }
        }}/>
        </div>
    </lib_jsx_1.Frag>);
};
exports.DeviceParameters = DeviceParameters;
