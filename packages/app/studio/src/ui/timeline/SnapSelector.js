"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapSelector = void 0;
var SnapSelector_sass_inline_1 = require("./SnapSelector.sass?inline");
var MenuButton_tsx_1 = require("@/ui/components/MenuButton.tsx");
var Snapping_ts_1 = require("@/ui/timeline/Snapping.ts");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(SnapSelector_sass_inline_1.default, "SnapSelector");
var SnapSelector = function (_a) {
    var lifecycle = _a.lifecycle, snapping = _a.snapping;
    var snappingName = lib_jsx_1.Inject.value(snapping.unit.name);
    lifecycle.own(snapping.subscribe(function (snapping) { snappingName.value = snapping.unit.name; }));
    return (<div className={className}>
            <label>Snap</label>
            <MenuButton_tsx_1.MenuButton root={Snapping_ts_1.Snapping.createMenuRoot(snapping)} appearance={{ framed: true, color: studio_enums_1.Colors.gray, activeColor: studio_enums_1.Colors.bright }}>
                <label style={{ minWidth: "5em" }}>{snappingName}<Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Dropdown}/></label>
            </MenuButton_tsx_1.MenuButton>
        </div>);
};
exports.SnapSelector = SnapSelector;
