"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlValues = void 0;
var ControlValues_sass_inline_1 = require("./ControlValues.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var ControlValue_1 = require("@/ui/devices/instruments/MIDIOutputEditor/ControlValue");
var className = lib_dom_1.Html.adoptStyleSheet(ControlValues_sass_inline_1.default, "ControlValues");
var ControlValues = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, adapter = _a.adapter;
    return (<div className={className}>
        <lib_jsx_1.Group onInit={function (parent) {
            var set = lib_std_1.UUID.newSet(function (_a) {
                var uuid = _a.uuid;
                return uuid;
            });
            lifecycle.ownAll(adapter.box.parameters.pointerHub.catchupAndSubscribe({
                onAdded: function (_a) {
                    var box = _a.box;
                    var parameterBox = (0, lib_std_1.asInstanceOf)(box, studio_boxes_1.MIDIOutputParameterBox);
                    var parameter = adapter.parameters.parameterAt(parameterBox.value.address);
                    var lifecycle = new lib_std_1.Terminator();
                    var element = (<ControlValue_1.ControlValue lifecycle={lifecycle} project={project} tracks={adapter.deviceHost().audioUnitBoxAdapter().tracks} box={parameterBox} parameter={parameter}/>);
                    parent.appendChild(element);
                    set.add({ uuid: box.address.uuid, lifecycle: lifecycle });
                    lifecycle.own({ terminate: function () { return element.remove(); } });
                },
                onRemoved: function (_a) {
                    var uuid = _a.box.address.uuid;
                    return set.removeByKey(uuid).lifecycle.terminate();
                }
            }));
        }}/>
    </div>);
};
exports.ControlValues = ControlValues;
