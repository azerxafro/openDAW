"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertMarker = void 0;
var InsertMarker_sass_inline_1 = require("./InsertMarker.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var Icon_1 = require("@/ui/components/Icon");
var className = lib_dom_1.Html.adoptStyleSheet(InsertMarker_sass_inline_1.default, "InsertMarker");
var InsertMarker = function () {
    return (<div className={className}>
            <Icon_1.Icon symbol={studio_enums_1.IconSymbol.ArrayDown}/>
        </div>);
};
exports.InsertMarker = InsertMarker;
