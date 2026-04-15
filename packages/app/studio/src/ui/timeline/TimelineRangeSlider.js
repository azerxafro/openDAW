"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineRangeSlider = void 0;
var TimelineRangeSlider_sass_inline_1 = require("./TimelineRangeSlider.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var dragging_ts_1 = require("@/ui/hooks/dragging.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(TimelineRangeSlider_sass_inline_1.default, "TimelineRangeSlider");
var COLOR_HANDLER = "rgba(255,255,255,0.25)";
var COLOR_BACKGROUND = "rgba(255,255,255,0.125)";
var TimelineRangeSlider = function (_a) {
    var lifecycle = _a.lifecycle, range = _a.range, style = _a.style, extraClassName = _a.className;
    var radius = 5;
    var padding = radius * 2;
    var markerParts = (<lib_jsx_1.Frag>
            <path d={"M ".concat(radius, " 0h ").concat(radius, "v ").concat(radius * 2, "h -").concat(radius, "a ").concat(radius, " ").concat(radius, " 0 0 1 -").concat(radius, " -").concat(radius, "a ").concat(radius, " ").concat(radius, " 0 0 1 ").concat(radius, " -").concat(radius)} fill={COLOR_HANDLER}/>
            <path d={"M ".concat(radius * 2, " 0h ").concat(radius, "a ").concat(radius, " ").concat(radius, " 0 0 1 0 ").concat(radius * 2, "h ").concat(-radius, "v ").concat(-radius * 2)} fill={COLOR_HANDLER}/>
            <rect width="0" height={radius * 2} fill={COLOR_BACKGROUND}/>
        </lib_jsx_1.Frag>);
    var slider = (<svg classList="slider" viewBox="0 0 0 0" shape-rendering="geometricPrecision">{markerParts}</svg>);
    var dragLifeTime = lifecycle.own(new lib_std_1.Terminator());
    var computeSize = function () {
        var clientWidth = slider.clientWidth, clientHeight = slider.clientHeight;
        return ({ clientWidth: clientWidth, clientHeight: clientHeight, trackLength: clientWidth - padding * 2 });
    };
    var onUpdate = function () {
        if (!slider.isConnected) {
            return;
        }
        var trackLength = computeSize().trackLength;
        var x0 = Math.floor(range.min * trackLength);
        var x1 = Math.floor(range.max * trackLength);
        markerParts[0].setAttribute("transform", "translate(".concat(x0, ", 0)"));
        markerParts[1].setAttribute("transform", "translate(".concat(x1, ", 0)"));
        markerParts[2].x.baseVal.value = x0 + padding;
        markerParts[2].width.baseVal.value = x1 - x0;
    };
    var onResize = function () {
        var _a = computeSize(), clientWidth = _a.clientWidth, clientHeight = _a.clientHeight, trackLength = _a.trackLength;
        if (clientWidth === 0 || clientHeight === 0)
            return;
        slider.viewBox.baseVal.width = clientWidth;
        slider.viewBox.baseVal.height = clientHeight;
        dragLifeTime.terminate();
        dragLifeTime.own(dragging_ts_1.ValueDragging.installUnitValueRelativeDragging(function (event) {
            var _partIndex, _a;
            return lib_std_1.Option.wrap(new (_a = /** @class */ (function () {
                    function class_1() {
                        _partIndex.set(this, markerParts.indexOf(event.target));
                    }
                    class_1.prototype.start = function () {
                        switch (__classPrivateFieldGet(this, _partIndex, "f")) {
                            case 0:
                                return range.min;
                            case 1:
                                return range.max;
                            case 2:
                                return range.center;
                            default:
                                var rect = slider.getBoundingClientRect();
                                return range.center = (event.clientX - rect.left - padding) / trackLength;
                        }
                    };
                    class_1.prototype.modify = function (value) {
                        switch (__classPrivateFieldGet(this, _partIndex, "f")) {
                            case 0:
                                range.min = value;
                                return;
                            case 1:
                                range.max = value;
                                return;
                            default:
                                range.center = value;
                                return;
                        }
                    };
                    class_1.prototype.cancel = function (_prevValue) { };
                    class_1.prototype.finalise = function (_prevValue, _newValue) { };
                    class_1.prototype.finally = function () { };
                    return class_1;
                }()),
                _partIndex = new WeakMap(),
                _a));
        }, slider, { horizontal: true, trackLength: trackLength, ratio: 1.0 }));
        onUpdate();
    };
    lifecycle.own(lib_dom_1.Html.watchResize(slider, onResize));
    lifecycle.own(range.subscribe(onUpdate));
    lifecycle.own(lib_dom_1.Events.subscribeDblDwn(slider, function () { return range.showAll(); }));
    return <div className={lib_dom_1.Html.buildClassList(className, extraClassName)} style={style}>{slider}</div>;
};
exports.TimelineRangeSlider = TimelineRangeSlider;
