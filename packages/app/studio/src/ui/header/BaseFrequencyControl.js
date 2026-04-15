"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFrequencyControl = void 0;
var BaseFrequencyControl_sass_inline_1 = require("./BaseFrequencyControl.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var DblClckTextInput_1 = require("@/ui/wrapper/DblClckTextInput");
var UnitDisplay_1 = require("@/ui/header/UnitDisplay");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var className = lib_dom_1.Html.adoptStyleSheet(BaseFrequencyControl_sass_inline_1.default, "BaseFrequencyControl");
var BaseFrequencyControl = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var projectProfileService = service.projectProfileService;
    var unitString = lifecycle.own(new lib_std_1.DefaultObservableValue(studio_adapters_1.BaseFrequencyRange.default.toString()));
    var projectActiveLifeTime = lifecycle.own(new lib_std_1.Terminator());
    var element = (<div className={className}><DblClckTextInput_1.DblClckTextInput numeric resolversFactory={function () {
            var resolvers = Promise.withResolvers();
            resolvers.promise.then(function (value) {
                var parsed = parseFloat(value);
                if (isNaN(parsed)) {
                    return;
                }
                var clamped = studio_adapters_1.Validator.clampBaseFrequency(parsed);
                projectProfileService.getValue()
                    .ifSome(function (_a) {
                    var _b = _a.project, editing = _b.editing, baseFrequency = _b.rootBox.baseFrequency;
                    return editing.modify(function () { return baseFrequency.setValue(clamped); });
                });
            }, lib_std_1.EmptyExec);
            return resolvers;
        }} provider={function () { return projectProfileService.getValue().match({
            none: function () { return ({ unit: "Hz", value: "" }); },
            some: function (_a) {
                var baseFrequency = _a.project.rootBox.baseFrequency;
                return ({ unit: "Hz", value: "".concat(baseFrequency.getValue()) });
            }
        }); }}>
            <UnitDisplay_1.UnitDisplay lifecycle={lifecycle} name="Hz" value={unitString} numChars={2} onInit={function (element) {
            lifecycle.own(projectProfileService.catchupAndSubscribe(function (optProfile) {
                projectActiveLifeTime.terminate();
                if (optProfile.isEmpty()) {
                    unitString.setValue(studio_adapters_1.BaseFrequencyRange.default.toString());
                    return;
                }
                var project = optProfile.unwrap().project;
                var baseFrequency = project.rootBox.baseFrequency;
                projectActiveLifeTime.ownAll(baseFrequency.catchupAndSubscribe(function () {
                    var value = baseFrequency.getValue();
                    element.classList.toggle("float", !Number.isInteger(value));
                    unitString.setValue("".concat(Math.floor(value)));
                }), lib_dom_1.Dragging.attach(element, function (event) { return projectProfileService.getValue().match({
                    none: function () { return lib_std_1.Option.None; },
                    some: function (_a) {
                        var project = _a.project;
                        var editing = project.editing, baseFrequency = project.rootBox.baseFrequency;
                        var pointer = event.clientY;
                        var oldValue = baseFrequency.getValue();
                        return lib_std_1.Option.wrap({
                            update: function (event) {
                                var newValue = studio_adapters_1.Validator.clampBaseFrequency(Math.round(oldValue + (pointer - event.clientY)));
                                editing.modify(function () { return baseFrequency.setValue(newValue); }, false);
                            },
                            cancel: function () { return editing.modify(function () { return baseFrequency.setValue(oldValue); }, false); },
                            approve: function () { return editing.mark(); }
                        });
                    }
                }); }));
            }));
        }}/>
        </DblClckTextInput_1.DblClckTextInput></div>);
    lifecycle.own(studio_core_1.StudioPreferences.catchupAndSubscribe(function (enabled) {
        return element.classList.toggle("hidden", !enabled);
    }, "visibility", "base-frequency"));
    return element;
};
exports.BaseFrequencyControl = BaseFrequencyControl;
