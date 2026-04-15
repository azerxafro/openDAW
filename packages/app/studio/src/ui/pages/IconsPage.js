"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconsPage = void 0;
var IconsPage_sass_inline_1 = require("./IconsPage.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(IconsPage_sass_inline_1.default, "IconsPage");
var IconsPage = function (_a) { return (<div className={className}>
        <h1>Icons</h1>
        <div>{Object.keys(studio_enums_1.IconSymbol)
        .filter(function (key) { return !isNaN(Number(studio_enums_1.IconSymbol[key])); })
        .sort()
        .map(function (key) { return (<lib_jsx_1.Frag>
                    <label>{key}</label>
                    <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol[key]}/>
                    <div className="background">
                        <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol[key]}/>
                    </div>
                </lib_jsx_1.Frag>); })}</div>
    </div>); };
exports.IconsPage = IconsPage;
