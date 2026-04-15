"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestPage = void 0;
var TestPage_sass_inline_1 = require("./TestPage.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(TestPage_sass_inline_1.default, "TestPage");
var TestPage = function (_a) {
    return (<div className={className}>
            <h1>Test Page</h1>
        </div>);
};
exports.TestPage = TestPage;
