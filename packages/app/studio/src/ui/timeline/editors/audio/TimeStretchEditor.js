"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeStretchEditor = void 0;
var TimeStretchEditor_sass_inline_1 = require("./TimeStretchEditor.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var studio_enums_1 = require("@opendaw/studio-enums");
var RadioGroup_1 = require("@/ui/components/RadioGroup");
var Icon_1 = require("@/ui/components/Icon");
var NumberInput_1 = require("@/ui/components/NumberInput");
var className = lib_dom_1.Html.adoptStyleSheet(TimeStretchEditor_sass_inline_1.default, "TimeStretchEditor");
var TimeStretchEditor = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, reader = _a.reader;
    var editing = project.editing;
    var audioContent = reader.audioContent;
    var transientPlayModeEnumValue = new lib_std_1.DefaultObservableValue(null);
    var activeLifecycle = lifecycle.own(new lib_std_1.Terminator());
    var observableCents = new lib_std_1.DefaultObservableValue(0.0);
    return (<div className={className} onInit={function (element) {
            lifecycle.ownAll(audioContent.box.playMode.catchupAndSubscribe(function () {
                activeLifecycle.terminate();
                audioContent.asPlayModeTimeStretch.match({
                    none: function () { return transientPlayModeEnumValue.setValue(null); },
                    some: function (adapter) {
                        activeLifecycle.ownAll(adapter.box.transientPlayMode.catchupAndSubscribe(function (transientPlayMode) {
                            return transientPlayModeEnumValue.setValue(transientPlayMode.getValue());
                        }), adapter.box.playbackRate
                            .catchupAndSubscribe(function () { return observableCents.setValue(adapter.cents); }), observableCents.subscribe(function (owner) {
                            var value = owner.getValue();
                            editing.modify(function () { return adapter.cents = value; });
                        }));
                    }
                });
                var disabled = transientPlayModeEnumValue.getValue() === null;
                element.classList.toggle("disabled", disabled);
                if (disabled) {
                    activeLifecycle.own(lib_dom_1.Events.subscribe(element, "click", function (event) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                    }, { capture: true, passive: false }));
                }
            }), transientPlayModeEnumValue.subscribe(function (owner) { return audioContent.asPlayModeTimeStretch
                .ifSome(function (adapter) {
                var _a;
                var value = (_a = owner.getValue()) !== null && _a !== void 0 ? _a : studio_enums_1.TransientPlayMode.Once;
                editing.modify(function () { return adapter.box.transientPlayMode.setValue(value); });
            }); }));
        }}>
            <RadioGroup_1.RadioGroup lifecycle={lifecycle} model={transientPlayModeEnumValue} elements={[
            {
                value: studio_enums_1.TransientPlayMode.Once,
                element: (<Icon_1.Icon symbol={studio_enums_1.IconSymbol.PlayOnce}/>),
                tooltip: "Play transient once"
            },
            {
                value: studio_enums_1.TransientPlayMode.Repeat,
                element: (<Icon_1.Icon symbol={studio_enums_1.IconSymbol.PlayRepeat}/>),
                tooltip: "Repeat transient"
            },
            {
                value: studio_enums_1.TransientPlayMode.Pingpong,
                element: (<Icon_1.Icon symbol={studio_enums_1.IconSymbol.PlayAlternate}/>),
                tooltip: "Alternate playback"
            }
        ]}/>
            <NumberInput_1.NumberInput lifecycle={lifecycle} mapper={lib_std_1.StringMapping.numeric({ unit: "cents" })} className="input" maxChars={4} step={1} model={observableCents}/>
            <span>cents</span>
        </div>);
};
exports.TimeStretchEditor = TimeStretchEditor;
