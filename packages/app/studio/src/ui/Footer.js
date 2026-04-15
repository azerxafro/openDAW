"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
var Footer_sass_inline_1 = require("./Footer.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_std_1 = require("@opendaw/lib-std");
var Surface_1 = require("@/ui/surface/Surface");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_core_1 = require("@opendaw/studio-core");
var studio_enums_1 = require("@opendaw/studio-enums");
var UserCounter_1 = require("@/UserCounter");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var FooterItem_1 = require("@/ui/FooterItem");
var className = lib_dom_1.Html.adoptStyleSheet(Footer_sass_inline_1.default, "footer");
var Footer = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var audioContext = service.audioContext, buildInfo = service.buildInfo, engine = service.engine, projectProfileService = service.projectProfileService;
    return (<footer className={className}>
            <FooterItem_1.FooterItem title="Online" onInit={function (_a) {
            var value = _a.value;
            var updateOnline = function () { return value.textContent = navigator.onLine ? "Yes" : "No"; };
            lifecycle.ownAll(lib_dom_1.Events.subscribe(window, "online", updateOnline), lib_dom_1.Events.subscribe(window, "offline", updateOnline));
            updateOnline();
        }}/>
            <FooterItem_1.FooterItem className="name" title="Project" onInit={function (_a) {
            var component = _a.component, value = _a.value;
            var profileLifecycle = lifecycle.own(new lib_std_1.Terminator());
            lifecycle.ownAll(lib_dom_1.Events.subscribe(component, "dblclick", function (event) {
                var optProfile = projectProfileService.getValue();
                if (optProfile.isEmpty()) {
                    return;
                }
                var profile = optProfile.unwrap();
                var name = profile.meta.name;
                if ((0, lib_std_1.isDefined)(name)) {
                    Surface_1.Surface.get(component).requestFloatingTextInput(event, name)
                        .then(function (name) { return profile.updateMetaData("name", name); });
                }
            }), projectProfileService.catchupAndSubscribe(function (optProfile) {
                profileLifecycle.terminate();
                if (optProfile.nonEmpty()) {
                    var profile = optProfile.unwrap();
                    var observer = function (meta) { return value.textContent = meta.name; };
                    profileLifecycle.own(profile.subscribeMetaData(observer));
                    observer(profile.meta);
                }
                else {
                    value.textContent = "⏏︎";
                }
            }));
        }}/>
            <FooterItem_1.FooterItem title="SampleRate">{audioContext.sampleRate}</FooterItem_1.FooterItem>
            <FooterItem_1.FooterItem title="Latency" minWidth="6ch" onInit={function (_a) {
            var value = _a.value;
            lifecycle.own(lib_runtime_1.Runtime.scheduleInterval(function () {
                var outputLatency = audioContext.outputLatency;
                if (outputLatency > 0.0) {
                    value.textContent = "".concat((outputLatency * 1000.0).toFixed(1), "ms");
                }
            }, 1000));
        }}>N/A</FooterItem_1.FooterItem>
            <FooterItem_1.FooterItem title="CPU Load" minWidth="4ch" onInit={function (_a) {
            var component = _a.component, value = _a.value;
            lifecycle.own(engine.preferences.catchupAndSubscribe(function (enabled) {
                component.classList.toggle("hidden", !enabled);
            }, "debug", "dspLoadMeasurement"));
            lifecycle.own(engine.cpuLoad.catchupAndSubscribe(function (owner) {
                var percent = Math.min(owner.getValue(), 100);
                value.textContent = "".concat(percent, "%");
                value.style.color = percent >= 100 ? studio_enums_1.Colors.red.toString()
                    : percent > 75 ? studio_enums_1.Colors.orange.toString() : "";
            }));
        }}>0%</FooterItem_1.FooterItem>
            <FooterItem_1.FooterItem title="FPS" onInit={function (_a) {
            var component = _a.component, value = _a.value;
            var lifeSpan = lifecycle.own(new lib_std_1.Terminator());
            lifecycle.own(studio_core_1.StudioPreferences.catchupAndSubscribe(function (show) {
                component.classList.toggle("hidden", !show);
                if (show) {
                    var frame_1 = 0 | 0;
                    var lastTime_1 = Date.now();
                    lifeSpan.own(lib_dom_1.AnimationFrame.add(function () {
                        if (Date.now() - lastTime_1 >= 1000) {
                            value.textContent = String(frame_1);
                            lastTime_1 = Date.now();
                            frame_1 = 0;
                        }
                        else {
                            frame_1++;
                        }
                    }));
                }
                else {
                    lifeSpan.terminate();
                }
            }, "debug", "footer-show-fps-meter"));
        }}>0</FooterItem_1.FooterItem>
            <FooterItem_1.FooterItem title="Samples (GC)" onInit={function (_a) {
            var component = _a.component, value = _a.value;
            var lifeSpan = lifecycle.own(new lib_std_1.Terminator());
            lifecycle.own(studio_core_1.StudioPreferences.catchupAndSubscribe(function (show) {
                component.classList.toggle("hidden", !show);
                if (show) {
                    lifeSpan.own(lib_runtime_1.Runtime.scheduleInterval(function () {
                        value.textContent = lib_dsp_1.AudioData.count().toString();
                    }, 1000));
                }
                else {
                    lifeSpan.terminate();
                }
            }, "debug", "footer-show-samples-memory"));
        }}>0</FooterItem_1.FooterItem>
            <div style={{ display: "contents" }} onInit={function (element) {
            var lifeSpan = lifecycle.own(new lib_std_1.Terminator());
            lifecycle.own(studio_core_1.StudioPreferences.catchupAndSubscribe(function (show) {
                element.classList.toggle("hidden", !show);
                if (show) {
                    (0, lib_jsx_1.replaceChildren)(element, (<lib_jsx_1.Frag>
                                     <FooterItem_1.FooterItem title="Build Version">{buildInfo.uuid}</FooterItem_1.FooterItem>
                                     <FooterItem_1.FooterItem title="Build Time" onInit={function (_a) {
                            var value = _a.value;
                            var buildDateMillis = new Date(buildInfo.date).getTime();
                            var update = function () { return value.textContent =
                                lib_std_1.TimeSpan.millis(buildDateMillis - new Date().getTime()).toUnitString(); };
                            lifeSpan.own(lib_runtime_1.Runtime.scheduleInterval(update, 1000));
                            update();
                        }}/>
                                 </lib_jsx_1.Frag>));
                }
                else {
                    (0, lib_jsx_1.replaceChildren)(element);
                    lifeSpan.terminate();
                }
            }, "debug", "footer-show-build-infos"));
        }}/>
            <FooterItem_1.FooterItem title="Users" onInit={function (_a) {
            var value = _a.value;
            var counter = new UserCounter_1.UserCounter("https://api.opendaw.studio/users/user-counter.php");
            counter.subscribe(function (count) { return value.textContent = String(count); });
        }}>#</FooterItem_1.FooterItem>
            <div style={{ display: "contents" }} onInit={function (element) { return service.registerFooter(function () {
            var titleRef;
            var valueRef;
            var item = <FooterItem_1.FooterItem title="" onInit={function (_a) {
                    var title = _a.title, value = _a.value;
                    titleRef = title;
                    valueRef = value;
                }}/>;
            element.appendChild(item);
            return {
                setTitle: function (text) { return titleRef.textContent = text; },
                setValue: function (text) { return valueRef.textContent = text; },
                terminate: function () { if (item.isConnected) {
                    item.remove();
                } }
            };
        }); }}/>
            <div style={{ flex: "1" }}/>
            <div style={{ color: studio_enums_1.Colors.cream.toString() }}>
                <lib_jsx_1.LocalLink href="/privacy">Privacy</lib_jsx_1.LocalLink> · <lib_jsx_1.LocalLink href="/imprint">Imprint</lib_jsx_1.LocalLink>
            </div>
        </footer>);
};
exports.Footer = Footer;
