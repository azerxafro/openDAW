"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VelocityDeviceEditor = void 0;
var VelocityDeviceEditor_sass_inline_1 = require("./VelocityDeviceEditor.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var DeviceEditor_tsx_1 = require("@/ui/devices/DeviceEditor.tsx");
var menu_items_ts_1 = require("@/ui/devices/menu-items.ts");
var ControlBuilder_tsx_1 = require("@/ui/devices/ControlBuilder.tsx");
var DeviceMidiMeter_tsx_1 = require("@/ui/devices/panel/DeviceMidiMeter.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(VelocityDeviceEditor_sass_inline_1.default, "VelocityDeviceEditor");
var VelocityDeviceEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, adapter = _a.adapter, deviceHost = _a.deviceHost;
    var project = service.project;
    var editing = project.editing, liveStreamReceiver = project.liveStreamReceiver, midiLearning = project.midiLearning;
    var _b = adapter.namedParameter, magnetPosition = _b.magnetPosition, magnetStrength = _b.magnetStrength, offset = _b.offset;
    var particleLifeTime = 20;
    var velocities = [];
    return (<DeviceEditor_tsx_1.DeviceEditor lifecycle={lifecycle} project={project} adapter={adapter} populateMenu={function (parent) { return menu_items_ts_1.MenuItems.forEffectDevice(parent, service, deviceHost, adapter); }} populateControls={function () { return (<div className={className}>
                              <div className="header">
                                  <div className="canvas">
                                      <canvas onInit={function (canvas) {
                var painter = lifecycle.own(new studio_core_1.CanvasPainter(canvas, function (painter) {
                    var context = painter.context, devicePixelRatio = painter.devicePixelRatio, width = painter.width, height = painter.height;
                    var pad = 4;
                    var right = width - pad;
                    var bottom = height - pad;
                    context.save();
                    context.scale(devicePixelRatio, devicePixelRatio);
                    context.beginPath();
                    context.setLineDash([2, 2]);
                    context.moveTo(pad, pad);
                    context.lineTo(right, pad);
                    context.moveTo(pad, bottom);
                    context.lineTo(right, bottom);
                    var gradient = context.createLinearGradient(pad, 0, right, 0);
                    gradient.addColorStop(0.0, "hsla(200, 40%, 70%, 0.1)");
                    gradient.addColorStop(1.0, "hsla(200, 40%, 70%, 0.3)");
                    context.strokeStyle = gradient;
                    context.stroke();
                    context.setLineDash(lib_std_1.Arrays.empty());
                    for (var i = velocities.length - 1; i >= 0; i--) {
                        var _a = velocities[i], original = _a.original, computed = _a.computed;
                        if (--velocities[i].lifeTime === 0) {
                            velocities.splice(i, 1);
                            continue;
                        }
                        var x0 = pad + original * (width - pad * 2);
                        var x1 = pad + computed * (width - pad * 2);
                        context.beginPath();
                        var mu = 1.0 - velocities[i].lifeTime / particleLifeTime;
                        context.arc((0, lib_std_1.linear)(x0, x1, mu), (0, lib_std_1.linear)(pad, bottom, mu), 1, 0.0, lib_std_1.TAU);
                        context.fillStyle = studio_enums_1.Colors.blue.toString();
                        context.fill();
                    }
                    var magPos = magnetPosition.getControlledValue();
                    var magStr = magnetStrength.getControlledValue();
                    var minMag = magPos * magStr;
                    var maxMag = 1.0 + (magPos - 1.0) * magStr;
                    // Magnet range
                    context.beginPath();
                    context.lineWidth = 1.0 / devicePixelRatio;
                    context.moveTo(pad + minMag * (width - pad * 2), bottom);
                    context.lineTo(pad + maxMag * (width - pad * 2), bottom);
                    context.strokeStyle = studio_enums_1.Colors.green.toString();
                    context.stroke();
                    // Magnet anchor
                    context.strokeStyle = "none";
                    context.beginPath();
                    context.arc(pad + magPos * (width - pad * 2) - 1.0 / devicePixelRatio, bottom, 2, 0.0, lib_std_1.TAU);
                    context.fillStyle = studio_enums_1.Colors.green.toString();
                    context.fill();
                    context.restore();
                }));
                lifecycle.own(liveStreamReceiver.subscribeIntegers(adapter.address.append(0), function (array) {
                    for (var i = 0; i < array.length; i++) {
                        var element = array[i];
                        if (element === 0) {
                            break;
                        }
                        var original = element & 0xFF;
                        var computed = (element >> 8) & 0xFF;
                        velocities.push({
                            original: original / 127.0,
                            computed: computed / 127.0,
                            lifeTime: particleLifeTime
                        });
                    }
                    painter.requestUpdate();
                }));
            }}/>
                                  </div>
                                  <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Magnet} style={{ color: studio_enums_1.Colors.green.toString() }}/>
                                  <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Random} style={{ color: studio_enums_1.Colors.orange.toString() }}/>
                                  <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Add} style={{ color: studio_enums_1.Colors.yellow.toString() }}/>
                              </div>
                              {Object.values(adapter.namedParameter).map(function (parameter) { return ControlBuilder_tsx_1.ControlBuilder.createKnob({
                lifecycle: lifecycle,
                editing: editing,
                midiLearning: midiLearning,
                adapter: adapter,
                parameter: parameter,
                anchor: parameter === offset ? 0.5 : 0.0
            }); })}
                          </div>); }} populateMeter={function () { return (<DeviceMidiMeter_tsx_1.DeviceMidiMeter lifecycle={lifecycle} receiver={liveStreamReceiver} address={adapter.address}/>); }} icon={studio_core_1.EffectFactories.MidiNamed.Velocity.defaultIcon}/>);
};
exports.VelocityDeviceEditor = VelocityDeviceEditor;
