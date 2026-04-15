"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesBrowser = void 0;
var DevicesBrowser_sass_inline_1 = require("./DevicesBrowser.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_core_1 = require("@opendaw/studio-core");
var DragAndDrop_1 = require("@/ui/DragAndDrop");
var TextTooltip_1 = require("@/ui/surface/TextTooltip");
var Icon_1 = require("../components/Icon");
var DefaultInstrumentFactory_1 = require("@/ui/defaults/DefaultInstrumentFactory");
var className = lib_dom_1.Html.adoptStyleSheet(DevicesBrowser_sass_inline_1.default, "DevicesBrowser");
var DevicesBrowser = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var project = service.project;
    return (<div className={className}>
            <div className="resources">
                <section className="instrument">
                    <h1>Instruments</h1>
                    {createInstrumentList(lifecycle, project)}
                </section>
                <section className="audio">
                    <h1>Audio Effects</h1>
                    {createEffectList(lifecycle, project, studio_core_1.EffectFactories.AudioNamed, "audio-effect")}
                </section>
                <section className="midi">
                    <h1>Midi Effects</h1>
                    {createEffectList(lifecycle, project, studio_core_1.EffectFactories.MidiNamed, "midi-effect")}
                </section>
            </div>
            <div className="manual help-section">
                <section>
                    <h1>Creating an Instrument</h1>
                    <p>
                        To start making sound, click on an instrument from the list. This will create a new instance in
                        your
                        project.
                    </p>
                </section>
                <section>
                    <h1>Adding EffectFactories</h1>
                    <p>
                        Once an instrument is created, you can add effects. To do this, simply drag an effect
                        from the list and drop it into the instrument's device chain.
                    </p>
                </section>
            </div>
        </div>);
};
exports.DevicesBrowser = DevicesBrowser;
var createInstrumentList = function (lifecycle, project) { return (<ul>{Object.entries(studio_adapters_1.InstrumentFactories.Named).map(function (_a) {
        var key = _a[0], factory = _a[1];
        var element = (<li onclick={function () { return project.editing.modify(function () { return DefaultInstrumentFactory_1.DefaultInstrumentFactory.create(project.api, factory); }); }}>
                <div className="icon">
                    <Icon_1.Icon symbol={factory.defaultIcon}/>
                </div>
                {factory.defaultName}
                <span className="brief help-section">{factory.briefDescription}</span>
            </li>);
        lifecycle.ownAll(DragAndDrop_1.DragAndDrop.installSource(element, function () { return ({
            type: "instrument",
            device: key
        }); }), TextTooltip_1.TextTooltip.simple(element, function () {
            var _a = element.getBoundingClientRect(), bottom = _a.bottom, left = _a.left;
            return { clientX: left, clientY: bottom + 12, text: factory.description };
        }));
        return element;
    })}</ul>); };
var createEffectList = function (lifecycle, project, records, type) {
    var entries = Object.entries(records);
    var internal = entries.filter(function (_a) {
        var _ = _a[0], entry = _a[1];
        return !entry.external;
    });
    var external = entries.filter(function (_a) {
        var _ = _a[0], entry = _a[1];
        return entry.external;
    });
    var createItem = function (_a) {
        var key = _a[0], entry = _a[1];
        var element = (<li onInit={function (element) {
                lifecycle.own(studio_core_1.ContextMenu.subscribe(element, function (collector) { return collector.addItems(studio_core_1.MenuItem.default({
                    label: "Visit Manual Page for ".concat(entry.defaultName), selectable: (0, lib_std_1.isDefined)(entry.manualPage)
                }).setTriggerProcedure(function () { var _a; return lib_jsx_1.RouteLocation.get().navigateTo((_a = entry.manualPage) !== null && _a !== void 0 ? _a : "/"); })); }));
                element.onclick = function () {
                    var boxAdapters = project.boxAdapters, editing = project.editing, userEditingManager = project.userEditingManager;
                    var audioUnitOption = userEditingManager.audioUnit.get();
                    if (audioUnitOption.isEmpty()) {
                        lib_std_1.RuntimeNotifier.info({
                            headline: "No Source Device Yet",
                            message: "Please create an instrument or select an audio-bus first."
                        }).finally();
                        return;
                    }
                    audioUnitOption.ifSome(function (vertex) {
                        var deviceHost = boxAdapters.adapterFor(vertex.box, studio_adapters_1.Devices.isHost);
                        if (type === "midi-effect" && deviceHost.inputAdapter.mapOr(function (input) { return input.accepts !== "midi"; }, true)) {
                            lib_std_1.RuntimeNotifier.info({
                                headline: "Add Midi Effect",
                                message: "The selected audio unit does not have a midi input."
                            }).finally();
                            return;
                        }
                        var effectField = type === "audio-effect" ? deviceHost.audioEffects.field()
                            : type === "midi-effect" ? deviceHost.midiEffects.field()
                                : (0, lib_std_1.panic)("Unknown ".concat(type));
                        editing.modify(function () { return entry.create(project, effectField, effectField.pointerHub.incoming().length); });
                    });
                };
            }}>
                {entry.external
                ? <div className="icon external">
                        <img src="/images/tone3000.svg" alt="logo"/>
                    </div>
                : <div className="icon">
                        <Icon_1.Icon symbol={entry.defaultIcon}/>
                    </div>}
                {entry.defaultName}
                <span className="brief help-section">{entry.briefDescription}</span>
            </li>);
        lifecycle.ownAll(DragAndDrop_1.DragAndDrop.installSource(element, function () { return ({
            type: type,
            start_index: null,
            device: key
        }); }), TextTooltip_1.TextTooltip.simple(element, function () {
            var _a = element.getBoundingClientRect(), bottom = _a.bottom, left = _a.left;
            return { clientX: left, clientY: bottom + 12, text: entry.description };
        }));
        return element;
    };
    return (<ul>
            {internal.map(createItem)}
            {external.length > 0 && <hr />}
            {external.map(createItem)}
        </ul>);
};
