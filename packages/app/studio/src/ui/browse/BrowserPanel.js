"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserPanel = void 0;
var BrowserPanel_sass_inline_1 = require("./BrowserPanel.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var RadioGroup_tsx_1 = require("@/ui/components/RadioGroup.tsx");
var SampleBrowser_tsx_1 = require("@/ui/browse/SampleBrowser.tsx");
var DevicesBrowser_tsx_1 = require("@/ui/browse/DevicesBrowser.tsx");
var BrowseScope_1 = require("@/ui/browse/BrowseScope");
var lib_dom_1 = require("@opendaw/lib-dom");
var SoundfontBrowser_1 = require("@/ui/browse/SoundfontBrowser");
var LoopBrowser_1 = require("@/ui/browse/LoopBrowser");
var className = lib_dom_1.Html.adoptStyleSheet(BrowserPanel_sass_inline_1.default, "BrowserPanel");
var BrowserPanel = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var scope = new lib_std_1.DefaultObservableValue(BrowseScope_1.BrowseScope.Devices);
    var placeholder = <lib_jsx_1.Group />;
    var contentLifecycle = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(scope.catchupAndSubscribe(function (owner) {
        contentLifecycle.terminate();
        (0, lib_jsx_1.replaceChildren)(placeholder, (function () {
            switch (owner.getValue()) {
                case BrowseScope_1.BrowseScope.Devices:
                    return <DevicesBrowser_tsx_1.DevicesBrowser lifecycle={contentLifecycle} service={service}/>;
                case BrowseScope_1.BrowseScope.Samples:
                    return <SampleBrowser_tsx_1.SampleBrowser lifecycle={contentLifecycle} service={service} background fontSize="0.75em"/>;
                case BrowseScope_1.BrowseScope.Soundfonts:
                    return <SoundfontBrowser_1.SoundfontBrowser lifecycle={contentLifecycle} service={service} background fontSize="0.75em"/>;
                case BrowseScope_1.BrowseScope.Loops:
                    return <LoopBrowser_1.LoopBrowser lifecycle={contentLifecycle} service={service}/>;
                default:
                    return <span>Unknown</span>;
            }
        })());
    }));
    return (<div className={className}>
            <RadioGroup_tsx_1.RadioGroup lifecycle={lifecycle} elements={[
            { value: BrowseScope_1.BrowseScope.Devices, element: <span>Devices</span> },
            { value: BrowseScope_1.BrowseScope.Samples, element: <span>Samples</span> },
            { value: BrowseScope_1.BrowseScope.Soundfonts, element: <span>Soundfonts</span> },
            { value: BrowseScope_1.BrowseScope.Loops, element: <span>Loops</span> }
        ]} model={scope} style={{ fontSize: "11px", columnGap: "8px", padding: "0.5em 0.75em" }}/>
            {placeholder}
        </div>);
};
exports.BrowserPanel = BrowserPanel;
