"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImprintPage = void 0;
var ImprintPage_sass_inline_1 = require("./ImprintPage.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(ImprintPage_sass_inline_1.default, "ImprintPage");
var ImprintPage = function (_a) { return (<div className={className}>
        <h1>Imprint</h1>
        <h3>In accordance with § 5 TMG (German Telemedia Act)</h3>
        <h4>Responsible for content:</h4>
        <p>
            <span style={{ color: studio_enums_1.Colors.cream.toString() }}>André Michelle</span><br />
            <span style={{ color: studio_enums_1.Colors.dark.toString() }}>Cologne, Germany</span><br />
            Email: <a style={{ color: studio_enums_1.Colors.blue }} href="mailto:hello@opendaw.org">hello@opendaw.org</a>
        </p>
        <p>
            This website is a personal, non-commercial project.<br />
            <span style={{ color: studio_enums_1.Colors.red.toString() }}>No tracking, no data collection, no user accounts.</span>
        </p>
        <p>
            This imprint is provided to comply with German law.<br />
        </p>
        <p>
            For inquiries regarding openDAW, please use the contact above or visit <a style={{ color: studio_enums_1.Colors.blue }} href="https://opendaw.org">opendaw.org</a>
        </p>
    </div>); };
exports.ImprintPage = ImprintPage;
