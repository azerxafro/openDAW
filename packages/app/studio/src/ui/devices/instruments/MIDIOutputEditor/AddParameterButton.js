"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddParameterButton = void 0;
var AddParameterButton_sass_inline_1 = require("./AddParameterButton.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var Icon_1 = require("@/ui/components/Icon");
var className = lib_dom_1.Html.adoptStyleSheet(AddParameterButton_sass_inline_1.default, "AddParameterButton");
var AddParameterButton = function (_a) {
    var _b = _a.project, boxGraph = _b.boxGraph, editing = _b.editing, adapter = _a.adapter;
    return (<div className={className} onclick={function () { return editing.modify(function () {
            var tracks = adapter.audioUnitBoxAdapter().box.tracks;
            var index = tracks.pointerHub.incoming().length;
            var nextController = Math.min(adapter.box.parameters.pointerHub.filter(studio_enums_1.Pointers.Parameter)
                .reduce(function (id, _a) {
                var box = _a.box;
                return Math.max(id, (0, lib_std_1.asInstanceOf)(box, studio_boxes_1.MIDIOutputParameterBox).controller.getValue() + 1);
            }, 64), 127);
            var parameter = studio_boxes_1.MIDIOutputParameterBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                box.label.setValue("CC");
                box.owner.refer(adapter.box.parameters);
                box.controller.setValue(nextController);
            });
            studio_boxes_1.TrackBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) {
                box.index.setValue(index);
                box.target.refer(parameter.value);
                box.type.setValue(studio_adapters_1.TrackType.Value);
                box.tracks.refer(tracks);
            });
        }); }}><Icon_1.Icon symbol={studio_enums_1.IconSymbol.Add}/> <span>CC</span></div>);
};
exports.AddParameterButton = AddParameterButton;
