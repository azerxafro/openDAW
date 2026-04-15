"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scroller = exports.Orientation = void 0;
var Scroller_sass_inline_1 = require("./Scroller.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var Orientation;
(function (Orientation) {
    Orientation["vertical"] = "vertical";
    Orientation["horizontal"] = "horizontal";
})(Orientation || (exports.Orientation = Orientation = {}));
var OrientationProperties = (_a = {},
    _a[Orientation.vertical] = {
        position: "top",
        size: "height",
        clientPointer: "clientY",
        clientSize: "clientHeight"
    },
    _a[Orientation.horizontal] = {
        position: "left",
        size: "width",
        clientPointer: "clientX",
        clientSize: "clientWidth"
    },
    _a);
var className = lib_dom_1.Html.adoptStyleSheet(Scroller_sass_inline_1.default, "Scroller");
var Scroller = function (_a) {
    var lifecycle = _a.lifecycle, model = _a.model, orientation = _a.orientation, floating = _a.floating;
    orientation !== null && orientation !== void 0 ? orientation : (orientation = Orientation.vertical);
    floating !== null && floating !== void 0 ? floating : (floating = false);
    var props = OrientationProperties[orientation];
    var thumb = <div />;
    var element = (<div className={lib_dom_1.Html.buildClassList(className, orientation, floating && "floating")}>{thumb}</div>);
    var update = function () {
        thumb.style.visibility = model.scrollable() ? "visible" : "hidden";
        thumb.style[props.position] = "".concat(model.thumbPosition + 1, "px");
        thumb.style[props.size] = "".concat(model.thumbSize - 2, "px");
    };
    lifecycle.own(model.subscribe(update));
    lifecycle.own(lib_dom_1.Dragging.attach(element, function (event) {
        var trackPosition = event[props.clientPointer] - element.getBoundingClientRect()[props.position];
        var delta = event.target === thumb ? trackPosition - model.thumbPosition : model.thumbSize / 2;
        model.moveTo(trackPosition - delta);
        return lib_std_1.Option.wrap({
            update: function (event) {
                trackPosition = event[props.clientPointer] - element.getBoundingClientRect()[props.position];
                model.moveTo(trackPosition - delta);
            }
        });
    }));
    update();
    lifecycle.own(lib_dom_1.Html.watchResize(element, function () { return model.trackSize = element[props.clientSize]; }));
    return element;
};
exports.Scroller = Scroller;
