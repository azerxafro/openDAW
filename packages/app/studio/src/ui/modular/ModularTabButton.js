"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModularTabButton = void 0;
var ModularTabButton_sass_inline_1 = require("./ModularTabButton.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ModularTabButton_sass_inline_1.default, "ModularTabButton");
var ModularTabButton = function (_a) {
    var lifecycle = _a.lifecycle, userFocus = _a.userFocus, adapter = _a.adapter;
    var nameValue = lifecycle.own(lib_jsx_1.Inject.value(adapter.labelField.getValue()));
    lifecycle.own(adapter.labelField.subscribe(function (owner) { return nameValue.value = owner.getValue(); }));
    var element = (<div className={className} onclick={function () { return userFocus.edit(adapter.editingField); }}>
            {nameValue}
        </div>);
    lifecycle.own(userFocus.catchupAndSubscribe(function (subject) { return subject.match({
        none: function () { return element.classList.remove("focus"); },
        some: function (vertex) { element.classList.toggle("focus", vertex === adapter.editingField); }
    }); }));
    return element;
};
exports.ModularTabButton = ModularTabButton;
