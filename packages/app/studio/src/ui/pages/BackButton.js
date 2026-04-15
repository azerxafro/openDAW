"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackButton = void 0;
var BackButton_sass_inline_1 = require("./BackButton.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var className = lib_dom_1.Html.adoptStyleSheet(BackButton_sass_inline_1.default, "BackButton");
var BackButton = function () {
    return (<div className={className}>
            <lib_jsx_1.LocalLink href="/">
                <Icon_1.Icon symbol={studio_enums_1.IconSymbol.OpenDAW} style={{ fontSize: "1.25em" }}/><span>GO BACK TO STUDIO</span>
            </lib_jsx_1.LocalLink>
        </div>);
};
exports.BackButton = BackButton;
