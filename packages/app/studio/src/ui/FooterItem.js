"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterItem = void 0;
var FooterItem_sass_inline_1 = require("./FooterItem.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(FooterItem_sass_inline_1.default, "footer-item");
var FooterItem = function (_a, children) {
    var title = _a.title, minWidth = _a.minWidth, extraClassName = _a.className, onInit = _a.onInit;
    var titleElem = (<span className="label">{title}</span>);
    var valueElem = (<span className="value" style={{ minWidth: minWidth }}>{children}</span>);
    var component = (<div className={lib_dom_1.Html.buildClassList(className, extraClassName)}>
            {titleElem}{valueElem}
        </div>);
    onInit === null || onInit === void 0 ? void 0 : onInit({ component: component, title: titleElem, value: valueElem });
    return component;
};
exports.FooterItem = FooterItem;
