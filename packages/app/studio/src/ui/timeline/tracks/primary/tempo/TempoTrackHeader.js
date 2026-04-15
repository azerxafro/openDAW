"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempoTrackHeader = void 0;
var TempoTrackHeader_sass_inline_1 = require("./TempoTrackHeader.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var NumberInput_1 = require("@/ui/components/NumberInput");
var Button_1 = require("@/ui/components/Button");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var Checkbox_1 = require("@/ui/components/Checkbox");
var EditWrapper_1 = require("@/ui/wrapper/EditWrapper");
var className = lib_dom_1.Html.adoptStyleSheet(TempoTrackHeader_sass_inline_1.default, "TempoTrackHeader");
var MinBpmPadding = 30;
var TempoTrackHeader = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, bpmRange = _a.bpmRange;
    var _b = service.project, editing = _b.editing, timelineBoxAdapter = _b.timelineBoxAdapter;
    var clampRange = function () {
        timelineBoxAdapter.tempoTrackEvents.ifSome(function (adapter) {
            var _a = adapter.events.asArray().reduce(function (range, event) {
                range[0] = Math.min(event.value, range[0]);
                range[1] = Math.max(event.value, range[1]);
                return range;
            }, [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]), min = _a[0], max = _a[1];
            if (Number.isFinite(min) && Number.isFinite(max)) {
                if (max - min < MinBpmPadding) {
                    var center = (min + max) / 2;
                    var low = Math.max(studio_adapters_1.TempoRange.min, center - MinBpmPadding / 2);
                    bpmRange[0].setValue(low);
                    bpmRange[1].setValue(low + MinBpmPadding);
                }
                else {
                    bpmRange[0].setValue(Math.max(min - MinBpmPadding, studio_adapters_1.TempoRange.min));
                    bpmRange[1].setValue(Math.min(max + MinBpmPadding, studio_adapters_1.TempoRange.max));
                }
            }
        });
    };
    return (<div className={className}>
            <header>
                <span>Tempo</span>
                <Checkbox_1.Checkbox lifecycle={lifecycle} model={EditWrapper_1.EditWrapper.forValue(editing, timelineBoxAdapter.box.tempoTrack.enabled)}>
                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox} style={{ fontSize: "11px" }}/>
                </Checkbox_1.Checkbox>
            </header>
            <div className="bpm-range">
                <NumberInput_1.NumberInput lifecycle={lifecycle} model={bpmRange[0]} step={1} maxChars={4} guard={{
            guard: function (value) {
                return (0, lib_std_1.clamp)(Math.round(value), studio_adapters_1.TempoRange.min, bpmRange[1].getValue() - MinBpmPadding);
            }
        }}/>
                <hr />
                <NumberInput_1.NumberInput lifecycle={lifecycle} model={bpmRange[1]} step={1} maxChars={4} guard={{
            guard: function (value) {
                return (0, lib_std_1.clamp)(Math.round(value), bpmRange[0].getValue() + MinBpmPadding, studio_adapters_1.TempoRange.max);
            }
        }}/>
                <Button_1.Button lifecycle={lifecycle} appearance={{ cursor: "pointer", tooltip: "Reset visible range to fit all events" }} onClick={clampRange}>
                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Compressor}/>
                </Button_1.Button>
            </div>
        </div>);
};
exports.TempoTrackHeader = TempoTrackHeader;
