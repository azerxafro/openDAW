"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestMidiButton = void 0;
var RequestMidiButton_sass_inline_1 = require("./RequestMidiButton.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(RequestMidiButton_sass_inline_1.default, "RequestMidiButton");
var RequestMidiButton = function () { return (<div className={className} onclick={function () { return studio_core_1.MidiDevices.requestPermission(); }}>
        <span>Request </span><Icon_1.Icon symbol={studio_enums_1.IconSymbol.Midi}/>
    </div>); };
exports.RequestMidiButton = RequestMidiButton;
