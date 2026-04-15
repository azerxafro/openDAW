"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDown = void 0;
var DropDown_sass_inline_1 = require("./DropDown.sass?inline");
var MenuButton_tsx_1 = require("@/ui/components/MenuButton.tsx");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var studio_core_1 = require("@opendaw/studio-core");
var studio_enums_1 = require("@opendaw/studio-enums");
var Icon_1 = require("@/ui/components/Icon");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(DropDown_sass_inline_1.default, "DropDown");
var DropDown = function (_a) {
    var lifecycle = _a.lifecycle, owner = _a.owner, provider = _a.provider, mapping = _a.mapping, appearance = _a.appearance, width = _a.width;
    var injectLabel = lib_jsx_1.Inject.value(mapping(owner.getValue()));
    lifecycle.own(owner.subscribe(function (owner) { injectLabel.value = mapping(owner.getValue()); }));
    return (<div className={className}>
            <MenuButton_tsx_1.MenuButton root={studio_core_1.MenuItem.root().setRuntimeChildrenProcedure(function (parent) {
            var _loop_1 = function (value) {
                parent.addMenuItem(studio_core_1.MenuItem.default({
                    label: mapping(value),
                    checked: value === owner.getValue()
                }).setTriggerProcedure(function () { return owner.setValue(value); }));
            };
            for (var _i = 0, _a = provider(); _i < _a.length; _i++) {
                var value = _a[_i];
                _loop_1(value);
            }
        })} appearance={appearance !== null && appearance !== void 0 ? appearance : { framed: true, color: studio_enums_1.Colors.dark, activeColor: studio_enums_1.Colors.gray }}>
                <label style={{ minWidth: width !== null && width !== void 0 ? width : "unset" }}>{injectLabel}<Icon_1.Icon symbol={studio_enums_1.IconSymbol.Dropdown}/></label>
            </MenuButton_tsx_1.MenuButton>
        </div>);
};
exports.DropDown = DropDown;
