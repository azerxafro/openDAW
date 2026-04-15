"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipPlaybackButton = void 0;
var ClipPlaybackButton_sass_inline_1 = require("./ClipPlaybackButton.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var Icon_1 = require("@/ui/components/Icon");
var Clip_1 = require("./Clip");
var className = lib_dom_1.Html.adoptStyleSheet(ClipPlaybackButton_sass_inline_1.default, "ClipPlaybackButton");
var ClipPlaybackButton = function (_a) {
    var lifecycle = _a.lifecycle, engine = _a.engine, adapter = _a.adapter, state = _a.state;
    var iconModel = new lib_std_1.DefaultObservableValue(studio_enums_1.IconSymbol.Play);
    var element = (<div className={className} ondblclick={function (event) { return event.stopPropagation(); }} onclick={function () {
            if (state.getValue() !== Clip_1.ClipState.Idle) {
                engine.scheduleClipStop([adapter.trackBoxAdapter.unwrap().uuid]);
            }
            else if (!adapter.box.mute.getValue()) {
                engine.scheduleClipPlay([adapter.uuid]);
            }
        }}>
            <Icon_1.IconCartridge lifecycle={lifecycle} symbol={iconModel} style={{ color: studio_enums_1.Colors.gray.toString() }}/>
        </div>);
    lifecycle.own(state.catchupAndSubscribe(function (owner) {
        switch (owner.getValue()) {
            case Clip_1.ClipState.Idle:
                iconModel.setValue(studio_enums_1.IconSymbol.Play);
                break;
            case Clip_1.ClipState.Waiting:
                break;
            case Clip_1.ClipState.Playing:
                iconModel.setValue(studio_enums_1.IconSymbol.Stop);
                break;
        }
    }));
    return element;
};
exports.ClipPlaybackButton = ClipPlaybackButton;
