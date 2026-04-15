"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeterControl = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var DblClckTextInput_1 = require("@/ui/wrapper/DblClckTextInput");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var UnitDisplay_1 = require("@/ui/header/UnitDisplay");
var studio_core_1 = require("@opendaw/studio-core");
var GlobalShortcuts_1 = require("@/ui/shortcuts/GlobalShortcuts");
var lib_box_1 = require("@opendaw/lib-box");
var MeterControl = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var projectProfileService = service.projectProfileService, signatureVisible = service.timeline.primaryVisibility.signature;
    var unitString = lifecycle.own(new lib_std_1.DefaultObservableValue("4/4"));
    var projectActiveLifeTime = lifecycle.own(new lib_std_1.Terminator());
    return (<DblClckTextInput_1.DblClckTextInput numeric resolversFactory={function () {
            var resolvers = Promise.withResolvers();
            resolvers.promise.then(function (value) {
                var attempt = studio_adapters_1.Parsing.parseTimeSignature(value);
                if (attempt.isSuccess()) {
                    var _a = attempt.result(), nominator_1 = _a[0], denominator_1 = _a[1];
                    projectProfileService.getValue()
                        .ifSome(function (_a) {
                        var _b = _a.project, editing = _b.editing, signatureTrack = _b.timelineBoxAdapter.signatureTrack;
                        return editing.modify(function () { return signatureTrack.changeSignature(nominator_1, denominator_1); });
                    });
                }
            }, lib_std_1.EmptyExec);
            return resolvers;
        }} provider={function () { return projectProfileService.getValue().match({
            none: function () { return ({ unit: "", value: "" }); },
            some: function (_a) {
                var _b = _a.project.timelineBox.signature, nominator = _b.nominator, denominator = _b.denominator;
                return ({ unit: "", value: "".concat(nominator.getValue(), "/").concat(denominator.getValue()) });
            }
        }); }}>
            <UnitDisplay_1.UnitDisplay lifecycle={lifecycle} name="meter" value={unitString} numChars={3} onInit={function (element) {
            lifecycle.own(projectProfileService.catchupAndSubscribe(function (optProfile) {
                projectActiveLifeTime.terminate();
                if (optProfile.isEmpty()) {
                    return;
                }
                var project = optProfile.unwrap().project;
                var boxGraph = project.boxGraph, timelineBoxAdapter = project.timelineBoxAdapter, engine = project.engine;
                var signatureTrack = timelineBoxAdapter.signatureTrack;
                var updateSignatureLabel = function () {
                    var _a = signatureTrack.enabled
                        ? signatureTrack.signatureAt(engine.position.getValue())
                        : timelineBoxAdapter.signature, nominator = _a[0], denominator = _a[1];
                    unitString.setValue("".concat(nominator, "/").concat(denominator));
                    element.classList.toggle("automated", signatureTrack.enabled && signatureTrack.nonEmpty());
                };
                updateSignatureLabel();
                projectActiveLifeTime.ownAll(boxGraph.subscribeVertexUpdates(lib_box_1.Propagation.Children, timelineBoxAdapter.box.signature.address, updateSignatureLabel), timelineBoxAdapter.signatureTrack.subscribe(updateSignatureLabel), signatureVisible.subscribe(updateSignatureLabel), signatureTrack.subscribe(updateSignatureLabel), engine.position.subscribe(updateSignatureLabel), studio_core_1.ContextMenu.subscribe(element, function (collector) {
                    return collector.addItems(studio_core_1.MenuItem.default({
                        label: "Show Signature Automation",
                        checked: signatureVisible.getValue(),
                        shortcut: GlobalShortcuts_1.GlobalShortcuts["toggle-signature-track"].shortcut.format()
                    }).setTriggerProcedure(function () { return signatureVisible.setValue(!signatureVisible.getValue()); }), studio_core_1.MenuItem.default({
                        label: "Enable Automation",
                        checked: projectProfileService.getValue()
                            .mapOr(function (_a) {
                            var enabled = _a.project.timelineBox.signatureTrack.enabled;
                            return enabled.getValue();
                        }, false)
                    }).setTriggerProcedure(function () { return projectProfileService.getValue()
                        .ifSome(function (_a) {
                        var _b = _a.project, editing = _b.editing, enabled = _b.timelineBox.signatureTrack.enabled;
                        return editing.modify(function () { return enabled.setValue(!enabled.getValue()); });
                    }); }));
                }));
            }));
        }}/>
        </DblClckTextInput_1.DblClckTextInput>);
};
exports.MeterControl = MeterControl;
