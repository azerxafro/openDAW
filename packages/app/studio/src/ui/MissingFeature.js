"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingFeature = void 0;
var MissingFeature_sass_inline_1 = require("./MissingFeature.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(MissingFeature_sass_inline_1.default, "MissingFeature");
var MissingFeature = function (_a) {
    var error = _a.error;
    return (<div className={className}>
            <h1>Get openDAW Working</h1>
            <h2>An important feature <span style={{ color: studio_enums_1.Colors.purple.toString() }}>"{error}"</span> is missing.</h2>
            <p>Please update your browser or switch to the latest Chrome (recommended).</p>
            <p>openDAW should run on all modern browsers like Chrome, Edge, Firefox, and Safari.</p>
            <p>If you are already using one of these, please report your problem to <a href="mailto:support@opendaw.org">support@opendaw.org</a></p>
        </div>);
};
exports.MissingFeature = MissingFeature;
