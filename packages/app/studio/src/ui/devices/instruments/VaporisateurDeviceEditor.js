"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaporisateurDeviceEditor = void 0;
var VaporisateurDeviceEditor_sass_inline_1 = require("./VaporisateurDeviceEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var ParameterLabel_1 = require("@/ui/components/ParameterLabel");
var RelativeUnitValueDragging_1 = require("@/ui/wrapper/RelativeUnitValueDragging");
var RadioGroup_1 = require("@/ui/components/RadioGroup");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var EditWrapper_1 = require("@/ui/wrapper/EditWrapper");
var WaveformDisplay_1 = require("@/ui/devices/instruments/VaporisateurDeviceEditor/WaveformDisplay");
var EnvelopeDisplay_1 = require("@/ui/devices/instruments/VaporisateurDeviceEditor/EnvelopeDisplay");
var FilterDisplay_1 = require("@/ui/devices/instruments/VaporisateurDeviceEditor/FilterDisplay");
var Logo_1 = require("@/ui/devices/instruments/VaporisateurDeviceEditor/Logo");
var OscillatorSelector_1 = require("@/ui/devices/instruments/VaporisateurDeviceEditor/OscillatorSelector");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var className = lib_dom_1.Html.adoptStyleSheet(VaporisateurDeviceEditor_sass_inline_1.default, "editor");
var smoothNoise = function (x, frequency) {
    var p = x * frequency;
    var i0 = Math.floor(p);
    var i1 = i0 + 1;
    var t = p - i0;
    var fade = t * t * (3.0 - 2.0 * t);
    var hash = function (n) {
        var v = Math.sin(n * 127.1) * 43758.5453123;
        return (v - Math.floor(v)) * 2.0 - 1.0;
    };
    var n0 = hash(i0);
    var n1 = hash(i1);
    return n0 + (n1 - n0) * fade;
};
var VaporisateurDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning, liveStreamReceiver = project.liveStreamReceiver;
    var _b = adapter.namedParameter, oscillators = _b.oscillators, noise = _b.noise, unisonCount = _b.unisonCount, unisonDetune = _b.unisonDetune, unisonStereo = _b.unisonStereo, glideTime = _b.glideTime, cutoff = _b.cutoff, resonance = _b.resonance, filterEnvelope = _b.filterEnvelope, filterKeyboard = _b.filterKeyboard, filterOrder = _b.filterOrder, lfoWaveform = _b.lfoWaveform, lfoRate = _b.lfoRate, lfoTargetTune = _b.lfoTargetTune, lfoTargetCutoff = _b.lfoTargetCutoff, lfoTargetVolume = _b.lfoTargetVolume, attack = _b.attack, decay = _b.decay, sustain = _b.sustain, release = _b.release, voicingMode = _b.voicingMode;
    var createLabelControlFrag = function (lifecycle, parameter, threshold) { return (<lib_jsx_1.Frag>
            <h3>{parameter.name}</h3>
            <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={adapter.deviceHost().audioUnitBoxAdapter().tracks} parameter={parameter}>
                <RelativeUnitValueDragging_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={parameter} options={(0, lib_std_1.isDefined)(threshold) ? { snap: { threshold: threshold } } : undefined} supressValueFlyout={true}>
                    <ParameterLabel_1.ParameterLabel lifecycle={lifecycle} parameter={parameter} classList={["center"]} framed={true}/>
                </RelativeUnitValueDragging_1.RelativeUnitValueDragging>
            </AutomationControl_1.AutomationControl>
        </lib_jsx_1.Frag>); };
    var createWaveformSelector = function (lifecycle, parameter) { return (<lib_jsx_1.Frag>
            <h3>{parameter.name}</h3>
            <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={adapter.deviceHost().audioUnitBoxAdapter().tracks} parameter={parameter}>
                <RadioGroup_1.RadioGroup lifecycle={lifecycle} model={EditWrapper_1.EditWrapper.forAutomatableParameter(editing, parameter)} style={{ fontSize: "9px" }} elements={[
            {
                value: lib_dsp_1.ClassicWaveform.sine,
                element: <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Sine}/>
            },
            {
                value: lib_dsp_1.ClassicWaveform.triangle,
                element: <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Triangle}/>
            },
            {
                value: lib_dsp_1.ClassicWaveform.saw,
                element: <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Sawtooth}/>
            },
            {
                value: lib_dsp_1.ClassicWaveform.square,
                element: <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Square}/>
            }
        ]}/>
            </AutomationControl_1.AutomationControl>
        </lib_jsx_1.Frag>); };
    var bindWaveformParameter = function (lifecycle, parameter) {
        var func = new lib_std_1.DefaultObservableValue(lib_std_1.identity);
        lifecycle.own(parameter.catchupAndSubscribe(function (owner) {
            var waveform = owner.getControlledValue();
            switch (waveform) {
                case lib_dsp_1.ClassicWaveform.sine:
                    return func.setValue(function (x) { return Math.sin(x * lib_std_1.TAU); });
                case lib_dsp_1.ClassicWaveform.triangle:
                    return func.setValue(function (x) { return 1.0 - 4.0 * Math.abs(x - 0.5); });
                case lib_dsp_1.ClassicWaveform.saw:
                    return func.setValue(function (x) { return 2.0 * x - 1.0; });
                case lib_dsp_1.ClassicWaveform.square:
                    return func.setValue(function (x) { return x < 0.5 ? 1.0 : -1.0; });
                default:
                    return (0, lib_std_1.Unhandled)(waveform);
            }
        }));
        return func;
    };
    var oscIndex = lifecycle.own(new lib_std_1.DefaultObservableValue(0));
    var noiseTable = lib_std_1.ObservableValue.seal(function (x) { return smoothNoise(x, 32); });
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forAudioUnitInput(parent, service, deviceHost); }} populateControls={function () { return (<div className={className}>
                              <div className="label unisono-section"/>
                              <div className="label oscillator-section"/>
                              <div className="label filter-section"/>
                              <div className="label lfo-section"/>
                              <div className="label env-section"/>
                              <div style={{ display: "contents" }}>
                                  <Logo_1.Logo />
                                  <div />
                                  <div>
                                      <h3>Play-Mode</h3>
                                      <RadioGroup_1.RadioGroup lifecycle={lifecycle} model={EditWrapper_1.EditWrapper.forAutomatableParameter(editing, voicingMode)} style={{ fontSize: "9px" }} elements={[
                {
                    value: 0,
                    element: <span>MONO</span>
                },
                {
                    value: 1,
                    element: <span>POLY</span>
                }
            ]}/>
                                  </div>
                                  <div>{createLabelControlFrag(lifecycle, glideTime)}</div>
                                  <div className="unisono-section">
                                      {createLabelControlFrag(lifecycle, unisonCount)}
                                  </div>
                                  <div className="unisono-section">
                                      {createLabelControlFrag(lifecycle, unisonDetune, 0.5)}
                                  </div>
                                  <div className="unisono-section">
                                      {createLabelControlFrag(lifecycle, unisonStereo)}
                                  </div>
                              </div>
                              <div style={{ display: "contents" }} onInit={function (element) {
                var oscLifecycle = lifecycle.own(new lib_std_1.Terminator());
                lifecycle.own(oscIndex.catchupAndSubscribe(function (owner) {
                    oscLifecycle.terminate();
                    var sourceIndex = owner.getValue();
                    (0, lib_jsx_1.replaceChildren)(element, sourceIndex === 2 ? (<lib_jsx_1.Frag>
                                              <header>
                                                  <WaveformDisplay_1.WaveformDisplay lifecycle={oscLifecycle} adapter={noiseTable}/>
                                              </header>
                                              <OscillatorSelector_1.OscillatorSelector lifecycle={oscLifecycle} oscIndex={oscIndex}/>
                                              <div>
                                                  {createLabelControlFrag(oscLifecycle, noise.attack)}
                                              </div>
                                              <div>
                                                  {createLabelControlFrag(oscLifecycle, noise.hold)}
                                              </div>
                                              <div>
                                                  {createLabelControlFrag(oscLifecycle, noise.release)}
                                              </div>
                                              <div>
                                                  {createLabelControlFrag(oscLifecycle, noise.volume)}
                                              </div>
                                          </lib_jsx_1.Frag>) : (<lib_jsx_1.Frag>
                                              <header>
                                                  <WaveformDisplay_1.WaveformDisplay lifecycle={oscLifecycle} adapter={bindWaveformParameter(oscLifecycle, oscillators[sourceIndex].waveform)}/>
                                              </header>
                                              <OscillatorSelector_1.OscillatorSelector lifecycle={oscLifecycle} oscIndex={oscIndex}/>
                                              <div>
                                                  {createWaveformSelector(oscLifecycle, oscillators[sourceIndex].waveform)}
                                              </div>
                                              <div>
                                                  {createLabelControlFrag(oscLifecycle, oscillators[sourceIndex].octave)}
                                              </div>
                                              <div>
                                                  {createLabelControlFrag(oscLifecycle, oscillators[sourceIndex].tune, 0.5)}
                                              </div>
                                              <div>
                                                  {createLabelControlFrag(oscLifecycle, oscillators[sourceIndex].volume)}
                                              </div>
                                          </lib_jsx_1.Frag>));
                }));
            }}>
                              </div>
                              <div style={{ display: "contents" }}>
                                  <header>
                                      <FilterDisplay_1.FilterDisplay lifecycle={lifecycle} cutoff={cutoff} resonance={resonance} order={filterOrder}/>
                                  </header>
                                  <div />
                                  <div>{createLabelControlFrag(lifecycle, cutoff)}</div>
                                  <div>{createLabelControlFrag(lifecycle, resonance)}</div>
                                  <div>{createLabelControlFrag(lifecycle, filterEnvelope, 0.5)}</div>
                                  <div>{createLabelControlFrag(lifecycle, filterKeyboard, 0.5)}</div>
                                  <div>{createLabelControlFrag(lifecycle, filterOrder, 0.5)}</div>
                              </div>
                              <div style={{ display: "contents" }}>
                                  <header>
                                      <WaveformDisplay_1.WaveformDisplay lifecycle={lifecycle} adapter={bindWaveformParameter(lifecycle, lfoWaveform)}/>
                                  </header>
                                  <div />
                                  <div>{createWaveformSelector(lifecycle, lfoWaveform)}</div>
                                  <div>{createLabelControlFrag(lifecycle, lfoRate)}</div>
                                  <div>{createLabelControlFrag(lifecycle, lfoTargetTune, 0.5)}</div>
                                  <div>{createLabelControlFrag(lifecycle, lfoTargetCutoff, 0.5)}</div>
                                  <div>{createLabelControlFrag(lifecycle, lfoTargetVolume, 0.5)}</div>
                              </div>
                              <div style={{ display: "contents" }}>
                                  <header>
                                      <EnvelopeDisplay_1.EnvelopeDisplay lifecycle={lifecycle} sustain={sustain} receiver={liveStreamReceiver} address={adapter.address.append(0)}/>
                                  </header>
                                  <div />
                                  <div>{createLabelControlFrag(lifecycle, attack)}</div>
                                  <div>{createLabelControlFrag(lifecycle, decay)}</div>
                                  <div>{createLabelControlFrag(lifecycle, sustain)}</div>
                                  <div>{createLabelControlFrag(lifecycle, release)}</div>
                              </div>
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={liveStreamReceiver} address={adapter.address}/>); }} icon={studio_adapters_1.InstrumentFactories.Vaporisateur.defaultIcon}/>);
};
exports.VaporisateurDeviceEditor = VaporisateurDeviceEditor;
