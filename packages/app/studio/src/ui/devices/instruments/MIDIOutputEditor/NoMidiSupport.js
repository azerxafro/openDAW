"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoMidiSupport = void 0;
var NoMidiSupport_sass_inline_1 = require("./NoMidiSupport.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(NoMidiSupport_sass_inline_1.default, "NoMidiSupport");
var NoMidiSupport = function () { return (<div className={className}>
        <div>You browser does not support MIDI</div>
        <div>Tip: Chrome and Firefox do</div>
    </div>); };
exports.NoMidiSupport = NoMidiSupport;
