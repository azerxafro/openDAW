"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyPage = void 0;
var PrivacyPage_sass_inline_1 = require("./PrivacyPage.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(PrivacyPage_sass_inline_1.default, "PrivacyPage");
var PrivacyPage = function (_a) { return (<div className={className}>
        <h1>Privacy Policy</h1>
        <p style={{ color: studio_enums_1.Colors.blue.toString() }}>openDAW respects your privacy. This application does not collect
            personal data, create user accounts, or track visitors.</p>
        <h3>Local storage</h3>
        <p>Your projects and samples are stored on your own device (local file system or browser storage). No
            personal information is sent to our servers.</p>
        <h3>Cloud connections</h3>
        <p>If you choose to connect a cloud service (e.g. Google Drive or Dropbox), openDAW uses the official OAuth
            process. The access tokens are stored only in your browser or desktop app and are never shared with us.</p>
        <h3>Data usage</h3>
        <p>openDAW does not process, analyze, or share any personal data. Files remain under your control in your chosen
            storage location.</p>
        <h3>Contact</h3>
        <p>For questions about this policy, contact: <a style={{ color: studio_enums_1.Colors.blue }} href="mailto:hello@opendaw.org">hello@opendaw.org</a>
        </p>
    </div>); };
exports.PrivacyPage = PrivacyPage;
