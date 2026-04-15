"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showNewAudioBusOrAuxDialog = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var Dialog_tsx_1 = require("@/ui/components/Dialog.tsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var RadioGroup_tsx_1 = require("@/ui/components/RadioGroup.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var Icons = [
    studio_enums_1.IconSymbol.AudioBus, studio_enums_1.IconSymbol.Waveform, studio_enums_1.IconSymbol.Flask, studio_enums_1.IconSymbol.BassGuitar, studio_enums_1.IconSymbol.Guitar,
    studio_enums_1.IconSymbol.DrumSet, studio_enums_1.IconSymbol.Microphone, studio_enums_1.IconSymbol.Saxophone, studio_enums_1.IconSymbol.Heart, studio_enums_1.IconSymbol.Robot
];
// TODO Find a more appropriate place
var showNewAudioBusOrAuxDialog = function (suggestName, factory, defaultIcon) {
    var lifecycle = new lib_std_1.Terminator();
    var iconValue = new lib_std_1.DefaultObservableValue(defaultIcon);
    var input = <input type="text" value={suggestName} autofocus style={{
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            outline: "none",
            border: "none"
        }}/>;
    var dialog = (<Dialog_tsx_1.Dialog headline="Create Aux Bus" icon={studio_enums_1.IconSymbol.Add} cancelable={true} buttons={[{
                text: "Cancel",
                primary: false,
                onClick: function (handler) { return handler.close(); }
            }, {
                text: "Create",
                primary: true,
                onClick: function (handler) {
                    factory({ name: input.value, icon: iconValue.getValue() });
                    handler.close();
                }
            }]}>
            <div style={{ padding: "1em 0", display: "grid", gridTemplateRows: "auto auto 0px auto auto", rowGap: "4px" }}>
                <span>Icon</span>
                <RadioGroup_tsx_1.RadioGroup lifecycle={lifecycle} model={iconValue} elements={Icons.map(function (icon) { return ({
            value: icon,
            element: (<Icon_tsx_1.Icon symbol={icon} style={{ fontSize: "1.5em" }}/>)
        }); })} style={{ gap: "0.5em" }}/>
                <div />
                <span>Name</span>
                {input}
            </div>
        </Dialog_tsx_1.Dialog>);
    input.onfocus = function () { return input.select(); };
    input.onblur = function () { return input.focus(); };
    input.onkeydown = function (event) {
        if (event.code === "Enter") {
            factory({ name: input.value, icon: iconValue.getValue() });
            dialog.close();
        }
    };
    document.body.appendChild(dialog);
    dialog.addEventListener("close", function () { return lifecycle.terminate(); }, { once: true });
    dialog.showModal();
};
exports.showNewAudioBusOrAuxDialog = showNewAudioBusOrAuxDialog;
