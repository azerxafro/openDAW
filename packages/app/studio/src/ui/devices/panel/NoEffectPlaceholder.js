"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoEffectPlaceholder = void 0;
var NoEffectPlaceholder_sass_inline_1 = require("./NoEffectPlaceholder.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var TextButton_1 = require("@/ui/components/TextButton");
var PanelType_1 = require("@/ui/workspace/PanelType");
var className = lib_dom_1.Html.adoptStyleSheet(NoEffectPlaceholder_sass_inline_1.default, "NoEffectPlaceholder");
var NoEffectPlaceholder = function (_a) {
    var service = _a.service;
    return (<div className={className}>
            Drag an effect from the <TextButton_1.TextButton onClick={function () {
            service.switchScreen("default");
            service.panelLayout.showIfAvailable(PanelType_1.PanelType.BrowserPanel);
        }}>Device Browser</TextButton_1.TextButton>
        </div>);
};
exports.NoEffectPlaceholder = NoEffectPlaceholder;
