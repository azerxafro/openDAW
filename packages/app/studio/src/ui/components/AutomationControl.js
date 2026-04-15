"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationControl = void 0;
var AutomationControl_sass_inline_1 = require("./AutomationControl.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var automation_ts_1 = require("@/ui/menu/automation.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(AutomationControl_sass_inline_1.default, "AutomationControl");
var getChildrenBounds = function (element, offset) {
    var rect = element.getBoundingClientRect();
    if (rect.width > 0 || rect.height > 0) {
        return new DOMRect(rect.left - offset, rect.top - offset, rect.width + offset * 2, rect.height + offset * 2);
    }
    var left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;
    for (var _i = 0, _a = element.children; _i < _a.length; _i++) {
        var child = _a[_i];
        var childRect = child.getBoundingClientRect();
        if (childRect.width === 0 && childRect.height === 0) {
            continue;
        }
        left = Math.min(left, childRect.left);
        top = Math.min(top, childRect.top);
        right = Math.max(right, childRect.right);
        bottom = Math.max(bottom, childRect.bottom);
    }
    if (left === Infinity) {
        return new DOMRect();
    }
    return new DOMRect(left - offset, top - offset, right - left + offset * 2, bottom - top + offset * 2);
};
var syncIndicator = function (indicator, target, offset) {
    var bounds = getChildrenBounds(target, offset);
    var offsetParent = indicator.offsetParent;
    if (offsetParent === null) {
        indicator.style.left = "".concat(bounds.left, "px");
        indicator.style.top = "".concat(bounds.top, "px");
    }
    else {
        var parentRect = offsetParent.getBoundingClientRect();
        indicator.style.left = "".concat(bounds.left - parentRect.left, "px");
        indicator.style.top = "".concat(bounds.top - parentRect.top, "px");
    }
    indicator.style.width = "".concat(bounds.width, "px");
    indicator.style.height = "".concat(bounds.height, "px");
};
var AutomationControl = function (_a, children) {
    var lifecycle = _a.lifecycle, editing = _a.editing, midiLearning = _a.midiLearning, tracks = _a.tracks, parameter = _a.parameter, disableAutomation = _a.disableAutomation, offset = _a.offset;
    var indicatorOffset = offset !== null && offset !== void 0 ? offset : 0;
    var element = (<div className={className}>{children}</div>);
    var target = (0, lib_std_1.asDefined)(element.firstElementChild, "firstElementChild not defined");
    var indicator = (<div className="automation-indicator hidden"/>);
    element.appendChild(indicator);
    var syncSubscription = lib_std_1.Terminable.Empty;
    var sourceCount = 0;
    lifecycle.ownAll.apply(lifecycle, __spreadArray(__spreadArray([(0, automation_ts_1.attachParameterContextMenu)(editing, midiLearning, tracks, parameter, target, disableAutomation),
        parameter.catchupAndSubscribeControlSources({
            onControlSourceAdd: function (source) {
                indicator.classList.add(source);
                if (sourceCount++ === 0) {
                    indicator.classList.remove("hidden");
                    syncSubscription = lib_dom_1.AnimationFrame.add(function () { return syncIndicator(indicator, target, indicatorOffset); });
                }
            },
            onControlSourceRemove: function (source) {
                indicator.classList.remove(source);
                if (--sourceCount === 0) {
                    syncSubscription.terminate();
                    syncSubscription = lib_std_1.Terminable.Empty;
                    indicator.classList.add("hidden");
                }
            }
        }),
        parameter.registerTracks(tracks)], (disableAutomation === true ? [] : [
        lib_dom_1.Events.subscribe(element, "pointerdown", function (event) {
            if (event.buttons !== 1) {
                return;
            }
            console.debug("touchStart");
            parameter.touchStart();
        }, { capture: true }),
        lib_dom_1.Events.subscribe(element, "pointerup", function () { return parameter.touchEnd(); }, { capture: true }),
        lib_dom_1.Events.subscribe(element, "pointercancel", function () { return parameter.touchEnd(); }, { capture: true })
    ]), false), [lib_std_1.Terminable.create(function () { return syncSubscription.terminate(); })], false));
    return element;
};
exports.AutomationControl = AutomationControl;
