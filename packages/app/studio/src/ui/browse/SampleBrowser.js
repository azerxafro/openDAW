"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleBrowser = void 0;
var SampleBrowser_sass_inline_1 = require("./SampleBrowser.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var SampleView_1 = require("@/ui/browse/SampleView");
var SampleSelection_1 = require("@/ui/browse/SampleSelection");
var NumberInput_1 = require("@/ui/components/NumberInput");
var ResourceBrowser_1 = require("@/ui/browse/ResourceBrowser");
var className = lib_dom_1.Html.adoptStyleSheet(SampleBrowser_sass_inline_1.default, "Samples");
var location = new lib_std_1.DefaultObservableValue(0 /* AssetLocation.OpenDAW */);
var SampleBrowser = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, background = _a.background, fontSize = _a.fontSize;
    var linearVolume = service.samplePlayback.linearVolume;
    var config = {
        name: "samples",
        headers: [
            { label: "Name" },
            { label: "Bpm", align: "right" },
            { label: "Sec", align: "right" }
        ],
        fetchOnline: function () { return studio_core_1.OpenSampleAPI.get().all(); },
        fetchLocal: function () { return studio_core_1.SampleStorage.get().list(); },
        renderEntry: function (_a) {
            var entryLifecycle = _a.lifecycle, entryService = _a.service, selection = _a.selection, item = _a.item, loc = _a.location, refresh = _a.refresh;
            return (<SampleView_1.SampleView lifecycle={entryLifecycle} service={entryService} sampleSelection={selection} playback={entryService.samplePlayback} sample={item} location={loc} refresh={refresh}/>);
        },
        resolveEntryName: function (sample) { return sample.name; },
        createSelection: function (svc, htmlSelection) { return new SampleSelection_1.SampleSelection(svc, htmlSelection); },
        importSignal: "import-sample",
        footer: function (_a) {
            var footerLifecycle = _a.lifecycle;
            return (<div className="footer">
                <label>Volume:</label>
                <NumberInput_1.NumberInput lifecycle={footerLifecycle} maxChars={3} step={1} model={linearVolume}/>
                <label>dB</label>
            </div>);
        },
        onReload: function () { return service.samplePlayback.eject(); },
        onTerminate: function () { return service.samplePlayback.eject(); }
    };
    return (<ResourceBrowser_1.ResourceBrowser lifecycle={lifecycle} service={service} config={config} className={className} background={background} fontSize={fontSize} location={location}/>);
};
exports.SampleBrowser = SampleBrowser;
