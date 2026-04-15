"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyTable = void 0;
var PropertyTable_sass_inline_1 = require("./PropertyTable.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var TimeCodeInput_tsx_1 = require("@/ui/components/TimeCodeInput.tsx");
var PropertyParameters_ts_1 = require("@/ui/timeline/editors/notes/property/PropertyParameters.ts");
var NumberInput_tsx_1 = require("@/ui/components/NumberInput.tsx");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_enums_1 = require("@opendaw/studio-enums");
var NoteModifyStrategies_ts_1 = require("@/ui/timeline/editors/notes/NoteModifyStrategies.ts");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var className = lib_dom_1.Html.adoptStyleSheet(PropertyTable_sass_inline_1.default, "PropertyTable");
var PropertyTable = function (_a) {
    var lifecycle = _a.lifecycle, selection = _a.selection, modifyContext = _a.modifyContext, editing = _a.editing;
    var position = PropertyParameters_ts_1.PropertyParameters.position, duration = PropertyParameters_ts_1.PropertyParameters.duration, pitch = PropertyParameters_ts_1.PropertyParameters.pitch, velocity = PropertyParameters_ts_1.PropertyParameters.velocity, cent = PropertyParameters_ts_1.PropertyParameters.cent, chance = PropertyParameters_ts_1.PropertyParameters.chance, playCount = PropertyParameters_ts_1.PropertyParameters.playCount, playCurve = PropertyParameters_ts_1.PropertyParameters.playCurve;
    var positionInput = <TimeCodeInput_tsx_1.TimeCodeInput lifecycle={lifecycle} model={position.parameter} negativeWarning oneBased/>;
    var durationInput = <TimeCodeInput_tsx_1.TimeCodeInput lifecycle={lifecycle} model={duration.parameter} negativeWarning/>;
    var pitchString = lib_jsx_1.Inject.value(lib_dsp_1.MidiKeys.toFullString(pitch.parameter.getValue()));
    var pitchInput = <NumberInput_tsx_1.NumberInput lifecycle={lifecycle} model={pitch.parameter}/>;
    var velocityInput = <NumberInput_tsx_1.NumberInput lifecycle={lifecycle} model={velocity.parameter} mapper={velocity.parameter.stringMapping} step={0.01}/>;
    var centInput = <NumberInput_tsx_1.NumberInput lifecycle={lifecycle} model={cent.parameter}/>;
    var chanceInput = <NumberInput_tsx_1.NumberInput lifecycle={lifecycle} model={chance.parameter}/>;
    var playCountInput = <NumberInput_tsx_1.NumberInput lifecycle={lifecycle} model={playCount.parameter}/>;
    var playCurveInput = <NumberInput_tsx_1.NumberInput lifecycle={lifecycle} model={playCurve.parameter} mapper={playCurve.parameter.stringMapping} step={0.01}/>;
    var element = (<div className={className}>
            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Start}/>
            {positionInput}
            <div />
            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Duration}/>
            {durationInput}
            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Piano}/>
            <div className="group">
                {pitchInput}
                <div className="unit">{pitchString}</div>
            </div>
            <div />
            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Velocity}/>
            <div className="group">
                {velocityInput}
                <div className="unit">%</div>
            </div>
            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Dial}/>
            <div className="group">
                {centInput}
                <div className="unit">cents</div>
            </div>
            <div />
            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Random}/>
            <div className="group">
                {chanceInput}
                <div className="unit">%</div>
            </div>
            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Divide}/>
            <div className="group connect">
                {playCountInput}
                <div className="unit">#</div>
                <hr />
            </div>
            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Curve}/>
            <div className="group">
                {playCurveInput}
                <div className="unit">%</div>
            </div>
        </div>);
    var focus = null;
    var updateState = lifecycle.own((0, lib_dom_1.deferNextFrame)(function () {
        if (selection.isEmpty()) {
            element.classList.add("disabled");
            positionInput.classList.remove("invalid");
            durationInput.classList.remove("invalid");
            pitchInput.classList.remove("invalid");
            velocityInput.classList.remove("invalid");
            centInput.classList.remove("invalid");
            chanceInput.classList.remove("invalid");
            playCountInput.classList.remove("invalid");
            playCurveInput.classList.remove("invalid");
        }
        else {
            element.classList.remove("disabled");
            var adapters = selection.selected();
            positionInput.classList.toggle("invalid", !lib_std_1.Arrays.satisfy(adapters, function (a, b) { return a.position === b.position; }));
            durationInput.classList.toggle("invalid", !lib_std_1.Arrays.satisfy(adapters, function (a, b) { return a.duration === b.duration; }));
            pitchInput.classList.toggle("invalid", !lib_std_1.Arrays.satisfy(adapters, function (a, b) { return a.pitch === b.pitch; }));
            velocityInput.classList.toggle("invalid", !lib_std_1.Arrays.satisfy(adapters, function (a, b) { return a.velocity === b.velocity; }));
            centInput.classList.toggle("invalid", !lib_std_1.Arrays.satisfy(adapters, function (a, b) { return a.cent === b.cent; }));
            chanceInput.classList.toggle("invalid", !lib_std_1.Arrays.satisfy(adapters, function (a, b) { return a.chance === b.chance; }));
            playCountInput.classList.toggle("invalid", !lib_std_1.Arrays.satisfy(adapters, function (a, b) { return a.playCount === b.playCount; }));
            playCurveInput.classList.toggle("invalid", !lib_std_1.Arrays.satisfy(adapters, function (a, b) { return a.playCurve === b.playCurve; }));
            if (focus !== null) {
                var modifier = modifyContext.modifier;
                var strategy = modifier.unwrapOrElse(NoteModifyStrategies_ts_1.NoteModifyStrategies.Identity).selectedModifyStrategy();
                ignore = true;
                position.parameter.setValue(strategy.readPosition(focus));
                duration.parameter.setValue(strategy.readComplete(focus) - strategy.readPosition(focus));
                pitch.parameter.setValue(strategy.readPitch(focus));
                velocity.parameter.setValue(strategy.readVelocity(focus));
                cent.parameter.setValue(strategy.readCent(focus));
                chance.parameter.setValue(strategy.readChance(focus));
                playCount.parameter.setValue(focus.playCount);
                playCurve.parameter.setValue(focus.playCurve);
                ignore = false;
            }
        }
    }));
    var ignore = false;
    lifecycle.ownAll.apply(lifecycle, __spreadArray(__spreadArray([], Object.values(PropertyParameters_ts_1.PropertyParameters)
        .map(function (_a) {
        var parameter = _a.parameter, fieldName = _a.fieldName;
        return parameter.subscribe(function (owner) {
            if (ignore) {
                return;
            }
            editing.modify(function () {
                return selection.selected()
                    .forEach(function (adapter) { return adapter.box[fieldName].setValue(owner.getValue()); });
            });
        });
    }), false), [selection.catchupAndSubscribe({
            onSelected: function (adapter) {
                focus = adapter;
                updateState.request();
            },
            onDeselected: function (adapter) {
                if (focus === adapter) {
                    focus = null;
                }
                updateState.request();
            }
        }),
        pitch.parameter.subscribe(function (owner) { return pitchString.value = lib_dsp_1.MidiKeys.toFullString(owner.getValue()); }),
        modifyContext.subscribeUpdate(updateState.request)], false));
    updateState.immediate();
    return element;
};
exports.PropertyTable = PropertyTable;
