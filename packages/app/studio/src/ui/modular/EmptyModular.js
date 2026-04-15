"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyModular = void 0;
var EmptyModular_sass_inline_1 = require("./EmptyModular.sass?inline");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(EmptyModular_sass_inline_1.default, "EmptyModular");
var EmptyModular = function (_a) {
    return (<div className={className}>
            <div>
                <h1>
                    <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Box}/><span>No Modular System</span>
                </h1>
                <p>
                    Create a new modular system in the devices panel (not yet functional though).
                </p>
            </div>
        </div>);
};
exports.EmptyModular = EmptyModular;
