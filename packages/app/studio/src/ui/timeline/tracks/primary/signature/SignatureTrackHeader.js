"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureTrackHeader = void 0;
var SignatureTrackHeader_sass_inline_1 = require("./SignatureTrackHeader.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var Checkbox_1 = require("@/ui/components/Checkbox");
var EditWrapper_1 = require("@/ui/wrapper/EditWrapper");
var studio_enums_1 = require("@opendaw/studio-enums");
var Icon_1 = require("@/ui/components/Icon");
var className = lib_dom_1.Html.adoptStyleSheet(SignatureTrackHeader_sass_inline_1.default, "SignatureTrackHeader");
var SignatureTrackHeader = function (_a) {
    var lifecycle = _a.lifecycle, editing = _a.editing, timelineBox = _a.timelineBox;
    return (<div className={className}>
            <header>
                <span>Signature</span>
                <Checkbox_1.Checkbox lifecycle={lifecycle} model={EditWrapper_1.EditWrapper.forValue(editing, timelineBox.signatureTrack.enabled)}>
                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox} style={{ fontSize: "11px" }}/>
                </Checkbox_1.Checkbox>
            </header>
        </div>);
};
exports.SignatureTrackHeader = SignatureTrackHeader;
