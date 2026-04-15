"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlGroup = void 0;
var ControlGroup_sass_inline_1 = require("./ControlGroup.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var RelativeUnitValueDragging_1 = require("@/ui/wrapper/RelativeUnitValueDragging");
var ParameterLabel_1 = require("@/ui/components/ParameterLabel");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var className = lib_dom_1.Html.adoptStyleSheet(ControlGroup_sass_inline_1.default, "ControlGroup");
var ControlGroup = function (_a) {
    var lifecycle = _a.lifecycle, color = _a.color, name = _a.name, editing = _a.editing, midiLearning = _a.midiLearning, tracks = _a.tracks, parameters = _a.parameters, _b = _a.gridUV, u = _b.u, v = _b.v, style = _a.style;
    return (<div className={className} style={__assign(__assign({}, style), { gridArea: "".concat(v + 1, "/").concat(u + 1, "/auto/span 2") })} onInit={function (element) { var _a; return element.style.setProperty("--background-color", (_a = color === null || color === void 0 ? void 0 : color.toString()) !== null && _a !== void 0 ? _a : "red"); }}>
            <h1>{name}</h1>
            <div className="controls">
                {parameters.map(function (parameter) { return (<lib_jsx_1.Frag>
                        <span className="parameter-name">{parameter.name}</span>
                        <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={tracks} parameter={parameter}>
                            <RelativeUnitValueDragging_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={parameter} supressValueFlyout={true}>
                                <ParameterLabel_1.ParameterLabel lifecycle={lifecycle} parameter={parameter} framed/>
                            </RelativeUnitValueDragging_1.RelativeUnitValueDragging>
                        </AutomationControl_1.AutomationControl>
                    </lib_jsx_1.Frag>); })}
            </div>
        </div>);
};
exports.ControlGroup = ControlGroup;
