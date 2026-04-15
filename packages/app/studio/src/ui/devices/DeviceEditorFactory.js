"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceEditorFactory = void 0;
var ArpeggioDeviceEditor_tsx_1 = require("@/ui/devices/midi-effects/ArpeggioDeviceEditor.tsx");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var DelayDeviceEditor_tsx_1 = require("@/ui/devices/audio-effects/DelayDeviceEditor.tsx");
var ReverbDeviceEditor_tsx_1 = require("@/ui/devices/audio-effects/ReverbDeviceEditor.tsx");
var RevampDeviceEditor_tsx_1 = require("@/ui/devices/audio-effects/RevampDeviceEditor.tsx");
var ModularDeviceEditor_tsx_1 = require("@/ui/devices/audio-effects/ModularDeviceEditor.tsx");
var lib_std_1 = require("@opendaw/lib-std");
var PitchDeviceEditor_1 = require("./midi-effects/PitchDeviceEditor");
var TapeDeviceEditor_tsx_1 = require("@/ui/devices/instruments/TapeDeviceEditor.tsx");
var VaporisateurDeviceEditor_tsx_1 = require("@/ui/devices/instruments/VaporisateurDeviceEditor.tsx");
var AudioBusEditor_tsx_1 = require("@/ui/devices/AudioBusEditor.tsx");
var ApparatDeviceEditor_1 = require("./instruments/ApparatDeviceEditor");
var NanoDeviceEditor_1 = require("./instruments/NanoDeviceEditor");
var PlayfieldDeviceEditor_1 = require("./instruments/PlayfieldDeviceEditor");
var StereoToolDeviceEditor_1 = require("./audio-effects/StereoToolDeviceEditor");
var PlayfieldSampleEditor_1 = require("./instruments/PlayfieldSampleEditor");
var ZeitgeistDeviceEditor_1 = require("@/ui/devices/midi-effects/ZeitgeistDeviceEditor");
var UnknownEffectDeviceEditor_1 = require("@/ui/devices/UnknownEffectDeviceEditor");
var SoundfontDeviceEditor_1 = require("@/ui/devices/instruments/SoundfontDeviceEditor");
var MaximizerDeviceEditor_1 = require("@/ui/devices/audio-effects/MaximizerDeviceEditor");
var CompressorDeviceEditor_1 = require("@/ui/devices/audio-effects/CompressorDeviceEditor");
var GateDeviceEditor_1 = require("@/ui/devices/audio-effects/GateDeviceEditor");
var CrusherDeviceEditor_1 = require("@/ui/devices/audio-effects/CrusherDeviceEditor");
var FoldDeviceEditor_1 = require("@/ui/devices/audio-effects/FoldDeviceEditor");
var MIDIOutputDeviceEditor_1 = require("@/ui/devices/instruments/MIDIOutputDeviceEditor");
var VelocityDeviceEditor_1 = require("@/ui/devices/midi-effects/VelocityDeviceEditor");
var TidalDeviceEditor_1 = require("@/ui/devices/audio-effects/TidalDeviceEditor");
var DattorroReverbDeviceEditor_1 = require("@/ui/devices/audio-effects/DattorroReverbDeviceEditor");
var NeuralAmpDeviceEditor_1 = require("@/ui/devices/audio-effects/NeuralAmpDeviceEditor");
var WaveshaperDeviceEditor_1 = require("@/ui/devices/audio-effects/WaveshaperDeviceEditor");
var SpielwerkDeviceEditor_1 = require("@/ui/devices/midi-effects/SpielwerkDeviceEditor");
var WerkstattDeviceEditor_1 = require("@/ui/devices/audio-effects/WerkstattDeviceEditor");
var DeviceEditorFactory;
(function (DeviceEditorFactory) {
    DeviceEditorFactory.toMidiEffectDeviceEditor = function (service, lifecycle, box, deviceHost) {
        return (0, lib_std_1.asDefined)(box.accept({
            visitUnknownMidiEffectDeviceBox: function (box) { return (<UnknownEffectDeviceEditor_1.UnknownEffectDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters
                    .adapterFor(box, studio_adapters_1.UnknownMidiEffectDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitArpeggioDeviceBox: function (box) { return (<ArpeggioDeviceEditor_tsx_1.ArpeggioDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.ArpeggioDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitPitchDeviceBox: function (box) { return (<PitchDeviceEditor_1.PitchDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.PitchDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitVelocityDeviceBox: function (box) { return (<VelocityDeviceEditor_1.VelocityDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.VelocityDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitZeitgeistDeviceBox: function (box) { return (<ZeitgeistDeviceEditor_1.ZeitgeistDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.ZeitgeistDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitSpielwerkDeviceBox: function (box) { return (<SpielwerkDeviceEditor_1.SpielwerkDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.SpielwerkDeviceBoxAdapter)} deviceHost={deviceHost}/>); }
        }), "No MidiEffectDeviceEditor found for ".concat(box));
    };
    DeviceEditorFactory.toInstrumentDeviceEditor = function (service, lifecycle, box, deviceHost) {
        return (0, lib_std_1.asDefined)(box.accept({
            visitApparatDeviceBox: function (box) { return (<ApparatDeviceEditor_1.ApparatDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.ApparatDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitTapeDeviceBox: function (box) { return (<TapeDeviceEditor_tsx_1.TapeDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.TapeDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitVaporisateurDeviceBox: function (box) { return (<VaporisateurDeviceEditor_tsx_1.VaporisateurDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.VaporisateurDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitMIDIOutputDeviceBox: function (box) { return (<MIDIOutputDeviceEditor_1.MIDIOutputDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.MIDIOutputDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitSoundfontDeviceBox: function (box) { return (<SoundfontDeviceEditor_1.SoundfontDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.SoundfontDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitNanoDeviceBox: function (box) { return (<NanoDeviceEditor_1.NanoDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.NanoDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitPlayfieldDeviceBox: function (box) { return (<PlayfieldDeviceEditor_1.PlayfieldDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.PlayfieldDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitPlayfieldSampleBox: function (box) { return (<PlayfieldSampleEditor_1.PlayfieldSampleEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.PlayfieldSampleBoxAdapter)} deviceHost={deviceHost}/>); },
            visitAudioBusBox: function (box) { return (<AudioBusEditor_tsx_1.AudioBusEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.AudioBusBoxAdapter)}/>); }
        }), "No MidiEffectDeviceEditor found for ".concat(box));
    };
    DeviceEditorFactory.toAudioEffectDeviceEditor = function (service, lifecycle, box, deviceHost) {
        return (0, lib_std_1.asDefined)(box.accept({
            visitUnknownAudioEffectDeviceBox: function (box) { return (<UnknownEffectDeviceEditor_1.UnknownEffectDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters
                    .adapterFor(box, studio_adapters_1.UnknownAudioEffectDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitStereoToolDeviceBox: function (box) { return (<StereoToolDeviceEditor_1.StereoToolDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.StereoToolDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitMaximizerDeviceBox: function (box) { return (<MaximizerDeviceEditor_1.MaximizerDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.MaximizerDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitDelayDeviceBox: function (box) { return (<DelayDeviceEditor_tsx_1.DelayDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.DelayDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitDattorroReverbDeviceBox: function (box) { return (<DattorroReverbDeviceEditor_1.DattorroReverbDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.DattorroReverbDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitTidalDeviceBox: function (box) { return (<TidalDeviceEditor_1.TidalDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.TidalDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitCrusherDeviceBox: function (box) { return (<CrusherDeviceEditor_1.CrusherDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.CrusherDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitFoldDeviceBox: function (box) { return (<FoldDeviceEditor_1.FoldDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.FoldDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitCompressorDeviceBox: function (box) { return (<CompressorDeviceEditor_1.CompressorDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.CompressorDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitGateDeviceBox: function (box) { return (<GateDeviceEditor_1.GateDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.GateDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitReverbDeviceBox: function (box) { return (<ReverbDeviceEditor_tsx_1.ReverbDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.ReverbDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitRevampDeviceBox: function (box) { return (<RevampDeviceEditor_tsx_1.RevampDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.RevampDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitModularDeviceBox: function (box) { return (<ModularDeviceEditor_tsx_1.ModularDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.ModularDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitNeuralAmpDeviceBox: function (box) { return (<NeuralAmpDeviceEditor_1.NeuralAmpDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.NeuralAmpDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitWaveshaperDeviceBox: function (box) { return (<WaveshaperDeviceEditor_1.WaveshaperDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.WaveshaperDeviceBoxAdapter)} deviceHost={deviceHost}/>); },
            visitWerkstattDeviceBox: function (box) { return (<WerkstattDeviceEditor_1.WerkstattDeviceEditor lifecycle={lifecycle} service={service} adapter={service.project.boxAdapters.adapterFor(box, studio_adapters_1.WerkstattDeviceBoxAdapter)} deviceHost={deviceHost}/>); }
        }), "No AudioEffectDeviceEditor found for ".concat(box));
    };
})(DeviceEditorFactory || (exports.DeviceEditorFactory = DeviceEditorFactory = {}));
