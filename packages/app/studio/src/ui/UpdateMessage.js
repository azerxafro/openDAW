"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMessage = void 0;
var UpdateMessage_sass_inline_1 = require("./UpdateMessage.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(UpdateMessage_sass_inline_1.default, "UpdateMessage");
var UpdateMessage = function () {
    return (<div className={className}>
            Update available! (please save now and reload!)
        </div>);
};
exports.UpdateMessage = UpdateMessage;
