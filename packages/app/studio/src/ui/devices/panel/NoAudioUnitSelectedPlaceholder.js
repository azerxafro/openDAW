"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoAudioUnitSelectedPlaceholder = void 0;
var NoAudioUnitSelectedPlaceholder_sass_inline_1 = require("./NoAudioUnitSelectedPlaceholder.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var TextButton_1 = require("@/ui/components/TextButton");
var className = lib_dom_1.Html.adoptStyleSheet(NoAudioUnitSelectedPlaceholder_sass_inline_1.default, "NoAudioUnitSelectedPlaceholder");
var NoAudioUnitSelectedPlaceholder = function (_a) {
    var service = _a.service;
    return (<div className={lib_dom_1.Html.buildClassList(className, "help-section")}>
            Empty Device Chain (Click track in
            <TextButton_1.TextButton onClick={function () { return service.switchScreen("default"); }}>timeline</TextButton_1.TextButton>
            or channel-strip in
            <TextButton_1.TextButton onClick={function () { return service.switchScreen("mixer"); }}>mixer</TextButton_1.TextButton>
            to show device chain)
        </div>);
};
exports.NoAudioUnitSelectedPlaceholder = NoAudioUnitSelectedPlaceholder;
