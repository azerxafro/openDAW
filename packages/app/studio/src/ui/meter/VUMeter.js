"use strict";
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
exports.VUMeter = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var lib_std_1 = require("@opendaw/lib-std");
var VUMeter;
(function (VUMeter) {
    var _Geometry_mapping, _Geometry_needleAnchor, _Geometry_needleRadius, _Geometry_scaleRadius, _Geometry_scaleRadian, _StripeBuilder_instances, _StripeBuilder_geometry, _StripeBuilder_style, _StripeBuilder_pathBuilder, _StripeBuilder_markers, _StripeBuilder_u0, _StripeBuilder_u1, _StripeBuilder_v0, _StripeBuilder_v1, _StripeBuilder_pen, _StripeBuilder_moveTo, _StripeBuilder_lineTo, _StripeBuilder_bendTo;
    var getGoogleFontUrl = function (fontFamily, fontWeight) {
        return "url(\"https://fonts.googleapis.com/css?family=".concat(fontFamily.replace(" ", "+"), ":").concat(fontWeight, "\")");
    };
    VUMeter.Element = function (_a) {
        var _b = _a.design, width = _b.width, height = _b.height, backgroundColor = _b.backgroundColor, background = _b.background, needle = _b.needle, geometry = _b.geometry, anchor = _b.anchor, fontFamily = _b.fontFamily, fontWeight = _b.fontWeight, model = _a.model;
        var updateNeedle = function (gain) { return needle.setAttribute("transform", "translate(".concat(anchor.x, ", ").concat(anchor.y + geometry.needleRadius, ") rotate(").concat(geometry.unitToNeedleDegree((0, lib_dsp_1.gainToDb)(gain)), ")")); };
        model.subscribe(function (owner) { return updateNeedle(owner.getValue()); });
        updateNeedle(model.getValue());
        return (<svg viewBox={"0 0 ".concat(width, " ").concat(height)} width={width} height={height} style={{ backgroundColor: backgroundColor }} text-anchor="middle" alignment-baseline="central" font-family={fontFamily}>
                <style>{"@import ".concat((getGoogleFontUrl(fontFamily, fontWeight)), ";")}</style>
                {background}
                <g style={{ filter: "drop-shadow(0px 8px 3px rgba(0, 0, 0, 0.3))" }}>{needle}</g>
            </svg>);
    };
    var Geometry = /** @class */ (function () {
        function Geometry(mapping, needleRadius, width, height) {
            _Geometry_mapping.set(this, void 0);
            _Geometry_needleAnchor.set(this, void 0);
            _Geometry_needleRadius.set(this, void 0);
            _Geometry_scaleRadius.set(this, void 0);
            _Geometry_scaleRadian.set(this, void 0);
            __classPrivateFieldSet(this, _Geometry_mapping, mapping, "f");
            __classPrivateFieldSet(this, _Geometry_needleRadius, needleRadius, "f");
            __classPrivateFieldSet(this, _Geometry_scaleRadius, (Math.pow((width / 2.0), 2) + Math.pow(height, 2)) / (2.0 * height), "f");
            __classPrivateFieldSet(this, _Geometry_scaleRadian, Math.asin(width / (2.0 * __classPrivateFieldGet(this, _Geometry_scaleRadius, "f"))), "f");
            __classPrivateFieldSet(this, _Geometry_needleAnchor, lib_std_1.Point.create(0.0, needleRadius), "f");
        }
        Object.defineProperty(Geometry.prototype, "needleRadius", {
            get: function () { return __classPrivateFieldGet(this, _Geometry_needleRadius, "f"); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geometry.prototype, "scaleRadius", {
            get: function () { return __classPrivateFieldGet(this, _Geometry_scaleRadius, "f"); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Geometry.prototype, "scaleRadian", {
            get: function () { return __classPrivateFieldGet(this, _Geometry_scaleRadian, "f"); },
            enumerable: false,
            configurable: true
        });
        Geometry.prototype.positionToU = function (position, offset) {
            return position + offset / (__classPrivateFieldGet(this, _Geometry_scaleRadius, "f") * __classPrivateFieldGet(this, _Geometry_scaleRadian, "f") * 2.0);
        };
        Geometry.prototype.unitToU = function (unit, offset) {
            if (offset === void 0) { offset = 0.0; }
            return this.positionToU(__classPrivateFieldGet(this, _Geometry_mapping, "f").x(unit), offset);
        };
        Geometry.prototype.unitToNeedleDegree = function (unit) {
            var p = lib_std_1.Point.subtract(this.localToGlobal((0, lib_std_1.clamp)(__classPrivateFieldGet(this, _Geometry_mapping, "f").x(unit), 0.0, 1.0), 0.0), __classPrivateFieldGet(this, _Geometry_needleAnchor, "f"));
            return Math.atan2(p.x, -p.y) * 180.0 / Math.PI;
        };
        Geometry.prototype.localToGlobal = function (u, v) {
            var a = this.radianAt(u);
            var p = {
                x: __classPrivateFieldGet(this, _Geometry_scaleRadius, "f") * Math.sin(a),
                y: __classPrivateFieldGet(this, _Geometry_scaleRadius, "f") * (1.0 - Math.cos(a))
            };
            return v === 0.0 ? p : lib_std_1.Point.add(p, lib_std_1.Point.scaleTo(lib_std_1.Point.subtract(p, __classPrivateFieldGet(this, _Geometry_needleAnchor, "f")), v));
        };
        Geometry.prototype.radianAt = function (x) { return x * __classPrivateFieldGet(this, _Geometry_scaleRadian, "f") * 2.0 - __classPrivateFieldGet(this, _Geometry_scaleRadian, "f"); };
        Geometry.prototype.degAt = function (x) { return this.radianAt(x) * 180.0 / Math.PI; };
        Geometry.prototype.buildStripe = function (style) { return new StripeBuilder(this, style); };
        Geometry.prototype.buildLabel = function (u, text, distance, size, angle, _a) {
            var _b = _a === void 0 ? {} : _a, fill = _b.fill, stroke = _b.stroke;
            var p0 = this.localToGlobal(u, 0.0);
            var p1 = lib_std_1.Point.add(p0, lib_std_1.Point.scaleTo(lib_std_1.Point.subtract(p0, __classPrivateFieldGet(this, _Geometry_needleAnchor, "f")), distance));
            return (<text font-size={"".concat(size, "px")} fill={fill !== null && fill !== void 0 ? fill : "none"} stroke={stroke !== null && stroke !== void 0 ? stroke : "none"} transform={"translate(".concat(p1.x, ", ").concat(p1.y, ") rotate(").concat(angle, ")")}>{text}</text>);
        };
        return Geometry;
    }());
    _Geometry_mapping = new WeakMap(), _Geometry_needleAnchor = new WeakMap(), _Geometry_needleRadius = new WeakMap(), _Geometry_scaleRadius = new WeakMap(), _Geometry_scaleRadian = new WeakMap();
    VUMeter.Geometry = Geometry;
    var StripeBuilder = /** @class */ (function () {
        function StripeBuilder(geometry, style) {
            _StripeBuilder_instances.add(this);
            _StripeBuilder_geometry.set(this, void 0);
            _StripeBuilder_style.set(this, void 0);
            _StripeBuilder_pathBuilder.set(this, lib_dom_1.Svg.pathBuilder());
            _StripeBuilder_markers.set(this, []);
            _StripeBuilder_u0.set(this, 0.0);
            _StripeBuilder_u1.set(this, 1.0);
            _StripeBuilder_v0.set(this, 0.0);
            _StripeBuilder_v1.set(this, 1.0);
            _StripeBuilder_pen.set(this, 0.0);
            __classPrivateFieldSet(this, _StripeBuilder_geometry, geometry, "f");
            __classPrivateFieldSet(this, _StripeBuilder_style, style, "f");
        }
        StripeBuilder.prototype.setSection = function (u0, u1, v0, v1) {
            __classPrivateFieldSet(this, _StripeBuilder_u0, u0, "f");
            __classPrivateFieldSet(this, _StripeBuilder_u1, u1, "f");
            __classPrivateFieldSet(this, _StripeBuilder_v0, v0, "f");
            __classPrivateFieldSet(this, _StripeBuilder_v1, v1, "f");
            return this;
        };
        StripeBuilder.prototype.addMarker = function (u0, u1, length) {
            __classPrivateFieldGet(this, _StripeBuilder_markers, "f").push({ u0: u0, u1: u1, length: length });
            return this;
        };
        StripeBuilder.prototype.addMarkerAt = function (unit, width, length, align) {
            if (align === void 0) { align = "center"; }
            if (align === "start") {
                this.addMarker(__classPrivateFieldGet(this, _StripeBuilder_geometry, "f").unitToU(unit, 0.0), __classPrivateFieldGet(this, _StripeBuilder_geometry, "f").unitToU(unit, width), length);
            }
            else if (align === "center") {
                this.addMarker(__classPrivateFieldGet(this, _StripeBuilder_geometry, "f").unitToU(unit, -width / 2.0), __classPrivateFieldGet(this, _StripeBuilder_geometry, "f").unitToU(unit, width / 2.0), length);
            }
            else if (align === "end") {
                this.addMarker(__classPrivateFieldGet(this, _StripeBuilder_geometry, "f").unitToU(unit, -width), __classPrivateFieldGet(this, _StripeBuilder_geometry, "f").unitToU(unit, 0.0), length);
            }
            return this;
        };
        StripeBuilder.prototype.build = function () {
            var _a, _b;
            var markers = __classPrivateFieldGet(this, _StripeBuilder_markers, "f");
            var u0 = (_a = markers === null || markers === void 0 ? void 0 : markers.reduce(function (x, marker) { return Math.min(x, marker.u0); }, __classPrivateFieldGet(this, _StripeBuilder_u0, "f"))) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _StripeBuilder_u0, "f");
            var u1 = (_b = markers === null || markers === void 0 ? void 0 : markers.reduce(function (x, marker) { return Math.max(x, marker.u1); }, __classPrivateFieldGet(this, _StripeBuilder_u1, "f"))) !== null && _b !== void 0 ? _b : __classPrivateFieldGet(this, _StripeBuilder_u1, "f");
            __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_moveTo).call(this, u0, __classPrivateFieldGet(this, _StripeBuilder_v1, "f"));
            if (markers === undefined || markers.length === 0) {
                __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_bendTo).call(this, u1, __classPrivateFieldGet(this, _StripeBuilder_v1, "f"), true);
                __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_lineTo).call(this, u1, __classPrivateFieldGet(this, _StripeBuilder_v0, "f"));
                __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_bendTo).call(this, u0, __classPrivateFieldGet(this, _StripeBuilder_v0, "f"), false);
                var _c = __classPrivateFieldGet(this, _StripeBuilder_style, "f"), fill_1 = _c.fill, stroke_1 = _c.stroke;
                return <path d={__classPrivateFieldGet(this, _StripeBuilder_pathBuilder, "f").close().get()} fill={fill_1 !== null && fill_1 !== void 0 ? fill_1 : "none"} stroke={stroke_1 !== null && stroke_1 !== void 0 ? stroke_1 : "none"}/>;
            }
            for (var _i = 0, _d = markers.filter(function (marker) { return marker.length > 0.0; }).sort(function (a, b) { return a.u0 - b.u0; }); _i < _d.length; _i++) {
                var marker = _d[_i];
                if (__classPrivateFieldGet(this, _StripeBuilder_pen, "f") < marker.u0) {
                    __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_bendTo).call(this, marker.u0, __classPrivateFieldGet(this, _StripeBuilder_v1, "f"), true);
                }
                __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_lineTo).call(this, marker.u0, __classPrivateFieldGet(this, _StripeBuilder_v1, "f") + marker.length);
                __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_bendTo).call(this, marker.u1, __classPrivateFieldGet(this, _StripeBuilder_v1, "f") + marker.length, true);
                __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_lineTo).call(this, marker.u1, __classPrivateFieldGet(this, _StripeBuilder_v1, "f"));
            }
            if (__classPrivateFieldGet(this, _StripeBuilder_pen, "f") < u1) {
                __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_bendTo).call(this, u1, __classPrivateFieldGet(this, _StripeBuilder_v1, "f"), true);
            }
            __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_lineTo).call(this, u1, __classPrivateFieldGet(this, _StripeBuilder_v0, "f"));
            for (var _e = 0, _f = markers.filter(function (marker) { return marker.length < 0.0; }).sort(function (a, b) { return b.u0 - a.u0; }); _e < _f.length; _e++) {
                var marker = _f[_e];
                if (__classPrivateFieldGet(this, _StripeBuilder_pen, "f") > marker.u1) {
                    __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_bendTo).call(this, marker.u1, __classPrivateFieldGet(this, _StripeBuilder_v0, "f"), false);
                }
                __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_lineTo).call(this, marker.u1, __classPrivateFieldGet(this, _StripeBuilder_v0, "f") + marker.length);
                __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_bendTo).call(this, marker.u0, __classPrivateFieldGet(this, _StripeBuilder_v0, "f") + marker.length, false);
                __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_lineTo).call(this, marker.u0, __classPrivateFieldGet(this, _StripeBuilder_v0, "f"));
            }
            if (__classPrivateFieldGet(this, _StripeBuilder_pen, "f") > u0) {
                __classPrivateFieldGet(this, _StripeBuilder_instances, "m", _StripeBuilder_bendTo).call(this, u0, __classPrivateFieldGet(this, _StripeBuilder_v0, "f"), false);
            }
            var _g = __classPrivateFieldGet(this, _StripeBuilder_style, "f"), fill = _g.fill, stroke = _g.stroke;
            return <path d={__classPrivateFieldGet(this, _StripeBuilder_pathBuilder, "f").close().get()} fill={fill !== null && fill !== void 0 ? fill : "none"} stroke={stroke !== null && stroke !== void 0 ? stroke : "none"}/>;
        };
        return StripeBuilder;
    }());
    _StripeBuilder_geometry = new WeakMap(), _StripeBuilder_style = new WeakMap(), _StripeBuilder_pathBuilder = new WeakMap(), _StripeBuilder_markers = new WeakMap(), _StripeBuilder_u0 = new WeakMap(), _StripeBuilder_u1 = new WeakMap(), _StripeBuilder_v0 = new WeakMap(), _StripeBuilder_v1 = new WeakMap(), _StripeBuilder_pen = new WeakMap(), _StripeBuilder_instances = new WeakSet(), _StripeBuilder_moveTo = function _StripeBuilder_moveTo(u, v) {
        var _a = __classPrivateFieldGet(this, _StripeBuilder_geometry, "f").localToGlobal(u, v), x = _a.x, y = _a.y;
        __classPrivateFieldGet(this, _StripeBuilder_pathBuilder, "f").moveTo(x, y);
        __classPrivateFieldSet(this, _StripeBuilder_pen, u, "f");
    }, _StripeBuilder_lineTo = function _StripeBuilder_lineTo(u, v) {
        var _a = __classPrivateFieldGet(this, _StripeBuilder_geometry, "f").localToGlobal(u, v), x = _a.x, y = _a.y;
        __classPrivateFieldGet(this, _StripeBuilder_pathBuilder, "f").lineTo(x, y);
        __classPrivateFieldSet(this, _StripeBuilder_pen, u, "f");
    }, _StripeBuilder_bendTo = function _StripeBuilder_bendTo(u, v, sweep) {
        var _a = __classPrivateFieldGet(this, _StripeBuilder_geometry, "f").localToGlobal(u, v), x = _a.x, y = _a.y;
        var r = __classPrivateFieldGet(this, _StripeBuilder_geometry, "f").scaleRadius + v;
        __classPrivateFieldGet(this, _StripeBuilder_pathBuilder, "f").arc(r, r, 0.0, false, sweep, x, y);
        __classPrivateFieldSet(this, _StripeBuilder_pen, u, "f");
    };
})(VUMeter || (exports.VUMeter = VUMeter = {}));
