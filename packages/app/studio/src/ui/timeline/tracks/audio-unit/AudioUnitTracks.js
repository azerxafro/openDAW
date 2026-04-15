"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioUnitTracks = void 0;
var AudioUnitTracks_sass_inline_1 = require("./AudioUnitTracks.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var className = lib_dom_1.Html.adoptStyleSheet(AudioUnitTracks_sass_inline_1.default, "AudioUnitTracks");
var AudioUnitTracks = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, adapter = _a.adapter;
    var isBus = adapter.type === studio_enums_1.AudioUnitType.Bus;
    var isAux = adapter.type === studio_enums_1.AudioUnitType.Aux;
    var isOutput = adapter.type === studio_enums_1.AudioUnitType.Output;
    var element = (<div className={lib_dom_1.Html.buildClassList(className, isAux && "aux", isBus && "bus", isOutput && "output")}/>);
    var audioUnitEditing = project.userEditingManager.audioUnit;
    lifecycle.ownAll(adapter.indexField.catchupAndSubscribe(function (field) { return element.style.gridRow = "".concat(field.getValue() + 1); }), audioUnitEditing.catchupAndSubscribe(function (optVertex) { return optVertex.match({
        none: function () { return element.classList.remove("editing"); },
        some: function (vertex) {
            var editing = project.boxAdapters.adapterFor(vertex.box, studio_adapters_1.Devices.isHost).audioUnitBoxAdapter();
            element.classList.toggle("editing", editing === adapter);
        }
    }); }));
    return element;
};
exports.AudioUnitTracks = AudioUnitTracks;
