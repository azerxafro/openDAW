"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidechainButton = void 0;
var SidechainButton_sass_inline_1 = require("./SidechainButton.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_core_1 = require("@opendaw/studio-core");
var MenuButton_1 = require("@/ui/components/MenuButton");
var className = lib_dom_1.Html.adoptStyleSheet(SidechainButton_sass_inline_1.default, "SidechainButton");
var SidechainButton = function (_a) {
    var sideChain = _a.sideChain, rootBoxAdapter = _a.rootBoxAdapter, editing = _a.editing;
    var createSideChainMenu = function (parent) {
        var isSelected = function (address) {
            return sideChain.targetAddress.mapOr(function (other) { return other.equals(address); }, false);
        };
        var createSelectableItem = function (output) {
            if (output.children().nonEmpty()) {
                return studio_core_1.MenuItem.default({ label: output.label })
                    .setRuntimeChildrenProcedure(function (subParent) {
                    return output.children().ifSome(function (children) {
                        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                            var child = children_1[_i];
                            subParent.addMenuItem(createSelectableItem(child));
                        }
                    });
                });
            }
            return studio_core_1.MenuItem.default({
                label: output.label,
                checked: isSelected(output.address)
            }).setTriggerProcedure(function () { return editing.modify(function () {
                return sideChain.targetAddress = lib_std_1.Option.wrap(output.address);
            }); });
        };
        sideChain.targetAddress.ifSome(function () {
            return parent.addMenuItem(studio_core_1.MenuItem.default({ label: "Remove Sidechain" })
                .setTriggerProcedure(function () { return editing.modify(function () {
                return sideChain.targetAddress = lib_std_1.Option.None;
            }); }));
        });
        parent.addMenuItem(studio_core_1.MenuItem.header({ label: "Tracks", icon: studio_enums_1.IconSymbol.OpenDAW, color: studio_enums_1.Colors.orange }));
        for (var _i = 0, _a = rootBoxAdapter.labeledAudioOutputs(); _i < _a.length; _i++) {
            var output = _a[_i];
            parent.addMenuItem(createSelectableItem(output));
        }
    };
    return (<MenuButton_1.MenuButton onInit={function (button) {
            button.classList.add(className);
            sideChain.catchupAndSubscribe(function (pointer) {
                return button.classList.toggle("has-source", pointer.nonEmpty());
            });
        }} root={studio_core_1.MenuItem.root().setRuntimeChildrenProcedure(createSideChainMenu)} appearance={{ tinyTriangle: true }}>Sidechain</MenuButton_1.MenuButton>);
};
exports.SidechainButton = SidechainButton;
