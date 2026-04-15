"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuButton = void 0;
var MenuButton_sass_inline_1 = require("./MenuButton.sass?inline");
var Menu_tsx_1 = require("@/ui/components/Menu.tsx");
var lib_std_1 = require("@opendaw/lib-std");
var Surface_tsx_1 = require("@/ui/surface/Surface.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(MenuButton_sass_inline_1.default, "MenuButton");
var MenuButton = function (_a, children) {
    var _b;
    var root = _a.root, onInit = _a.onInit, style = _a.style, appearance = _a.appearance, horizontal = _a.horizontal, stretch = _a.stretch, pointer = _a.pointer, groupId = _a.groupId;
    var current = lib_std_1.Option.None;
    var button = (<button onInit={onInit} className={lib_dom_1.Html.buildClassList(className, (appearance === null || appearance === void 0 ? void 0 : appearance.framed) && "framed", (appearance === null || appearance === void 0 ? void 0 : appearance.tinyTriangle) && "tiny-triangle", stretch && "stretch", pointer && "pointer")} onpointerdown={function (event) {
            if (event.ctrlKey || !root.hasChildren) {
                return;
            }
            event.stopPropagation();
            toggle();
        }} onpointerenter={function () {
            var _a;
            var focus = button.ownerDocument.activeElement;
            if (focus instanceof HTMLElement
                && focus.getAttribute("data-menu-group-id") === groupId) {
                lib_dom_1.Html.unfocus((_a = focus.ownerDocument.defaultView) !== null && _a !== void 0 ? _a : window);
                toggle();
            }
        }} title={(_b = (0, lib_std_1.getOrProvide)(appearance === null || appearance === void 0 ? void 0 : appearance.tooltip)) !== null && _b !== void 0 ? _b : ""}>{children}</button>);
    if ((0, lib_std_1.isDefined)(appearance === null || appearance === void 0 ? void 0 : appearance.color)) {
        button.style.setProperty("--color", appearance.color.toString());
    }
    if ((0, lib_std_1.isDefined)(appearance === null || appearance === void 0 ? void 0 : appearance.activeColor)) {
        button.style.setProperty("--color-active", appearance.activeColor.toString());
    }
    if ((0, lib_std_1.isDefined)(style)) {
        Object.assign(button.style, style);
    }
    var toggle = function () {
        current = current.match({
            none: function () {
                button.classList.add("active");
                var rect = button.getBoundingClientRect();
                var menu = Menu_tsx_1.Menu.create(root, groupId);
                menu.moveTo(rect[horizontal !== null && horizontal !== void 0 ? horizontal : "left"], rect.bottom + Menu_tsx_1.Menu.Padding);
                menu.attach(Surface_tsx_1.Surface.get(button).flyout);
                menu.own({ terminate: toggle });
                return lib_std_1.Option.wrap(menu);
            },
            some: function (menu) {
                button.classList.remove("active");
                menu.terminate();
                return lib_std_1.Option.None;
            }
        });
    };
    return button;
};
exports.MenuButton = MenuButton;
