"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoldDeviceEditor = void 0;
var FoldDeviceEditor_sass_inline_1 = require("./FoldDeviceEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var DevicePeakMeter_tsx_1 = require("@/ui/devices/panel/DevicePeakMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var ControlBuilder_1 = require("@/ui/devices/ControlBuilder");
var RadioGroup_1 = require("@/ui/components/RadioGroup");
var EditWrapper_1 = require("@/ui/wrapper/EditWrapper");
var DisplayPaint_1 = require("@/ui/devices/DisplayPaint");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(FoldDeviceEditor_sass_inline_1.default, "FoldDeviceEditor");
var FoldDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var editing = project.editing, midiLearning = project.midiLearning;
    var _b = adapter.namedParameter, drive = _b.drive, volume = _b.volume;
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              <div className="oversampling">
                                  <h1>Oversampling</h1>
                                  <RadioGroup_1.RadioGroup lifecycle={lifecycle} appearance={{ framed: true }} model={EditWrapper_1.EditWrapper.forValue(editing, adapter.box.overSampling)} elements={[
                { value: 0, element: (<span>2</span>) },
                { value: 1, element: (<span>4</span>) },
                { value: 2, element: (<span>8</span>) }
            ]}/>
                              </div>
                              <canvas onInit={function (canvas) {
                var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                    var scale = 16; // oversampling
                    var devicePixelRatio = painter.devicePixelRatio, context = painter.context, actualWidth = painter.actualWidth, actualHeight = painter.actualHeight;
                    var w = actualWidth * scale;
                    var h2 = actualHeight * scale * 0.5;
                    var amountGain = (0, lib_dsp_1.dbToGain)(drive.getControlledValue());
                    var toY = function (value) { return h2 - (h2 - devicePixelRatio * 2 * scale) * value; };
                    context.save();
                    context.scale(1.0 / scale, 1.0 / scale);
                    context.lineWidth = devicePixelRatio * scale;
                    context.beginPath();
                    context.moveTo(0, toY(0.0));
                    context.lineTo(w, toY(0.0));
                    context.strokeStyle = studio_enums_1.Colors.shadow.toString();
                    context.stroke();
                    context.beginPath();
                    context.moveTo(0, toY(0.0));
                    for (var x = 1; x <= w; x++) {
                        context.lineTo(x, toY((0, lib_dsp_1.wavefold)(Math.sin(x / w * lib_std_1.TAU) * amountGain)));
                    }
                    context.strokeStyle = DisplayPaint_1.DisplayPaint.strokeStyle(0.75);
                    context.stroke();
                    context.restore();
                }));
                lifecycle.own(drive.catchupAndSubscribe(function () { return painter.requestUpdate(); }));
            }}/>
                              <div className="controls">
                                  {ControlBuilder_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: drive, anchor: 0.0,
                style: { gridColumn: "2" }
            })}
                                  {ControlBuilder_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: volume, anchor: 1.0,
                style: { gridColumn: "4" }
            })}
                              </div>
                          </div>); }} populateMeter={function () { return (<DevicePeakMeter_tsx_1.DevicePeakMeter lifecycle={lifecycle} receiver={project.liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.AudioNamed.Fold.defaultIcon}/>);
};
exports.FoldDeviceEditor = FoldDeviceEditor;
