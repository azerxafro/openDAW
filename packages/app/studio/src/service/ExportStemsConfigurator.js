"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportStemsConfigurator = void 0;
var ExportStemsConfigurator_sass_inline_1 = require("./ExportStemsConfigurator.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var Checkbox_1 = require("@/ui/components/Checkbox");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var studio_enums_1 = require("@opendaw/studio-enums");
var Icon_1 = require("@/ui/components/Icon");
var TextInput_1 = require("@/ui/components/TextInput");
var className = lib_dom_1.Html.adoptStyleSheet(ExportStemsConfigurator_sass_inline_1.default, "ExportStemsConfigurator");
var ExportStemsConfigurator = function (_a) {
    var lifecycle = _a.lifecycle, configuration = _a.configuration;
    var includeAll = new lib_std_1.DefaultObservableValue(true);
    var includeAudioEffectsAll = new lib_std_1.DefaultObservableValue(true);
    var includeSendsAll = new lib_std_1.DefaultObservableValue(true);
    return (<div className={className}>
            <header>
                <div>Name</div>
                <Checkbox_1.Checkbox lifecycle={lifecycle} model={includeAll} appearance={{ activeColor: studio_enums_1.Colors.cream, cursor: "pointer" }}>
                    <span style={{ color: studio_enums_1.Colors.gray.toString() }}>Export</span>
                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                </Checkbox_1.Checkbox>
                <Checkbox_1.Checkbox lifecycle={lifecycle} model={includeAudioEffectsAll} appearance={{ activeColor: studio_enums_1.Colors.blue, cursor: "pointer" }}>
                    <span style={{ color: studio_enums_1.Colors.gray.toString() }}>Audio FX</span>
                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                </Checkbox_1.Checkbox>
                <Checkbox_1.Checkbox lifecycle={lifecycle} model={includeSendsAll} appearance={{ activeColor: studio_adapters_1.ColorCodes.forAudioType(studio_enums_1.AudioUnitType.Aux), cursor: "pointer" }}>
                    <span style={{ color: studio_enums_1.Colors.gray.toString() }}>Send FX</span>
                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                </Checkbox_1.Checkbox>
                <div>File Name</div>
            </header>
            <div className="list">
                {Object.values(configuration).map(function (stem) {
            var include = new lib_std_1.DefaultObservableValue(stem.include);
            var includeAudioEffects = new lib_std_1.DefaultObservableValue(stem.includeAudioEffects);
            var includeSends = new lib_std_1.DefaultObservableValue(stem.includeSends);
            var fileName = new lib_std_1.DefaultObservableValue(studio_adapters_1.ExportStemsConfiguration.sanitizeFileName(stem.label));
            lifecycle.ownAll(include.subscribe(function (owner) { return stem.include = owner.getValue(); }), includeAudioEffects.subscribe(function (owner) { return stem.includeAudioEffects = owner.getValue(); }), includeSends.subscribe(function (owner) { return stem.includeSends = owner.getValue(); }), fileName.subscribe(function (owner) { return stem.fileName = owner.getValue(); }), includeAll.subscribe(function (owner) { return include.setValue(owner.getValue()); }), includeAudioEffectsAll.subscribe(function (owner) { return includeAudioEffects.setValue(owner.getValue()); }), includeSendsAll.subscribe(function (owner) { return includeSends.setValue(owner.getValue()); }));
            return (<lib_jsx_1.Frag>
                            <div className="name" style={{ color: studio_adapters_1.ColorCodes.forAudioType(stem.type).toString() }}>{stem.label}</div>
                            <Checkbox_1.Checkbox lifecycle={lifecycle} model={include} appearance={{ activeColor: studio_enums_1.Colors.cream }}>
                                <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                            </Checkbox_1.Checkbox>
                            <Checkbox_1.Checkbox lifecycle={lifecycle} model={includeAudioEffects} appearance={{ activeColor: studio_enums_1.Colors.blue }}>
                                <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                            </Checkbox_1.Checkbox>
                            {stem.type === studio_enums_1.AudioUnitType.Output ? <div /> : (<Checkbox_1.Checkbox lifecycle={lifecycle} model={includeSends} appearance={{ activeColor: studio_adapters_1.ColorCodes.forAudioType(studio_enums_1.AudioUnitType.Aux) }}>
                                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                                </Checkbox_1.Checkbox>)}
                            <TextInput_1.TextInput lifecycle={lifecycle} model={fileName}/>
                        </lib_jsx_1.Frag>);
        })}
            </div>
        </div>);
};
exports.ExportStemsConfigurator = ExportStemsConfigurator;
