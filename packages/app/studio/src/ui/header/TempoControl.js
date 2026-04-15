"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempoControl = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var UnitDisplay_1 = require("@/ui/header/UnitDisplay");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var DblClckTextInput_1 = require("@/ui/wrapper/DblClckTextInput");
var studio_core_1 = require("@opendaw/studio-core");
var GlobalShortcuts_1 = require("@/ui/shortcuts/GlobalShortcuts");
var TempoControl = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var projectProfileService = service.projectProfileService, tempo = service.timeline.primaryVisibility.tempo;
    var unitString = lifecycle.own(new lib_std_1.DefaultObservableValue("120"));
    var projectActiveLifeTime = lifecycle.own(new lib_std_1.Terminator());
    return (<DblClckTextInput_1.DblClckTextInput numeric resolversFactory={function () {
            var resolvers = Promise.withResolvers();
            resolvers.promise.then(function (value) {
                var bpmValue = parseFloat(value);
                if (isNaN(bpmValue)) {
                    return;
                }
                projectProfileService.getValue().ifSome(function (_a) {
                    var _b = _a.project, editing = _b.editing, bpm = _b.timelineBox.bpm;
                    return editing.modify(function () { return bpm.setValue(studio_adapters_1.Validator.clampBpm(bpmValue)); });
                });
            }, lib_std_1.EmptyExec);
            return resolvers;
        }} provider={function () { return projectProfileService.getValue().match({
            none: function () { return ({ unit: "bpm", value: "" }); },
            some: function (_a) {
                var bpm = _a.project.timelineBox.bpm;
                return ({ unit: "bpm", value: bpm.getValue().toFixed(3) });
            }
        }); }}>
            <UnitDisplay_1.UnitDisplay lifecycle={lifecycle} name="bpm" value={unitString} numChars={3} onInit={function (element) {
            lifecycle.own(projectProfileService.catchupAndSubscribe(function (optProfile) {
                projectActiveLifeTime.terminate();
                if (optProfile.isEmpty()) {
                    return;
                }
                var project = optProfile.unwrap().project;
                var timelineBoxAdapter = project.timelineBoxAdapter, engine = project.engine;
                projectActiveLifeTime.ownAll(engine.bpm.catchupAndSubscribe(function (owner) {
                    var bpm = owner.getValue();
                    element.classList.toggle("float", !Number.isInteger(bpm));
                    return unitString.setValue("".concat(Math.floor(bpm)));
                }), timelineBoxAdapter.catchupAndSubscribeTempoAutomation(function (opt) {
                    return element.classList.toggle("automated", opt.nonEmpty());
                }), lib_dom_1.Dragging.attach(element, function (event) { return projectProfileService.getValue().match({
                    none: function () { return lib_std_1.Option.None; },
                    some: function (_a) {
                        var project = _a.project;
                        var editing = project.editing;
                        var bpmField = project.timelineBox.bpm;
                        var pointer = event.clientY;
                        var oldValue = bpmField.getValue();
                        return lib_std_1.Option.wrap({
                            update: function (event) {
                                var newValue = studio_adapters_1.Validator.clampBpm(oldValue + (pointer - event.clientY) * 2.0);
                                editing.modify(function () { return project.timelineBox.bpm.setValue(Math.round(newValue)); }, false);
                            },
                            cancel: function () { return editing.modify(function () { return project.timelineBox.bpm.setValue(oldValue); }, false); },
                            approve: function () { return editing.mark(); }
                        });
                    }
                }); }), studio_core_1.ContextMenu.subscribe(element, function (collector) {
                    return collector.addItems(studio_core_1.MenuItem.default({
                        label: "Show Tempo Automation",
                        checked: tempo.getValue(),
                        shortcut: GlobalShortcuts_1.GlobalShortcuts["toggle-tempo-track"].shortcut.format()
                    }).setTriggerProcedure(function () { return tempo.setValue(!tempo.getValue()); }), studio_core_1.MenuItem.default({
                        label: "Enable Automation",
                        checked: projectProfileService.getValue()
                            .mapOr(function (_a) {
                            var enabled = _a.project.timelineBox.tempoTrack.enabled;
                            return enabled.getValue();
                        }, false)
                    }).setTriggerProcedure(function () { return projectProfileService.getValue()
                        .ifSome(function (_a) {
                        var _b = _a.project, editing = _b.editing, enabled = _b.timelineBox.tempoTrack.enabled;
                        return editing.modify(function () { return enabled.setValue(!enabled.getValue()); });
                    }); }));
                }));
            }));
        }}/>
        </DblClckTextInput_1.DblClckTextInput>);
};
exports.TempoControl = TempoControl;
