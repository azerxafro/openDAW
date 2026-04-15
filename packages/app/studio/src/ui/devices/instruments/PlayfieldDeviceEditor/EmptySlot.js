"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptySlot = void 0;
var EmptySlot_sass_inline_1 = require("./EmptySlot.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var SlotDragAndDrop_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/SlotDragAndDrop");
var NoteLabel_1 = require("@/ui/devices/instruments/PlayfieldDeviceEditor/NoteLabel");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_core_1 = require("@opendaw/studio-core");
var className = lib_dom_1.Html.adoptStyleSheet(EmptySlot_sass_inline_1.default, "EmptySlot");
var EmptySlot = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.service.project, noteReceiver = _a.noteReceiver, sampleSelector = _a.sampleSelector, octave = _a.octave, semitone = _a.semitone;
    var browseButton = (<div className="audio-file">
            <Icon_1.Icon symbol={studio_enums_1.IconSymbol.AudioFile}/>
        </div>);
    var element = (<div className={className} data-slot-index={octave.getValue() * 12 + semitone}>
            <header />
            {browseButton}
            <footer>
                <NoteLabel_1.NoteLabel lifecycle={lifecycle} octave={octave} semitone={semitone}/>
            </footer>
        </div>);
    lifecycle.ownAll(octave.catchupAndSubscribe(function (owner) {
        var slotIndex = owner.getValue() * 12 + semitone;
        element.setAttribute("data-slot-index", String(slotIndex));
    }), SlotDragAndDrop_1.SlotDragAndDrop.installTarget({
        element: element,
        project: project,
        getSlotIndex: function () { return octave.getValue() * 12 + semitone; }
    }), sampleSelector.configureDrop(element), sampleSelector.configureBrowseClick(browseButton), noteReceiver.subscribe(function (receiver) { return browseButton.classList
        .toggle("playing", receiver.isNoteOn(octave.getValue() * 12 + semitone)); }), studio_core_1.ContextMenu.subscribe(element, function (collector) { return collector.addItems(sampleSelector.createBrowseMenuData()); }));
    return element;
};
exports.EmptySlot = EmptySlot;
