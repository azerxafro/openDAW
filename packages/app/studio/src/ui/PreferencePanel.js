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
exports.PreferencePanel = void 0;
var PreferencePanel_sass_inline_1 = require("./PreferencePanel.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var Checkbox_1 = require("@/ui/components/Checkbox");
var Icon_1 = require("@/ui/components/Icon");
var NumberInput_1 = require("@/ui/components/NumberInput");
var RadioGroup_1 = require("@/ui/components/RadioGroup");
var className = lib_dom_1.Html.adoptStyleSheet(PreferencePanel_sass_inline_1.default, "PreferencePanel");
var PreferencePanel = function (_a) {
    var lifecycle = _a.lifecycle, preferences = _a.preferences, _b = _a.pathPrefix, pathPrefix = _b === void 0 ? [] : _b, labels = _a.labels, options = _a.options;
    var settings = pathPrefix.reduce(function (obj, key) { return obj[key]; }, preferences.settings);
    return (<div className={className}>
            {Object.keys(labels).map(function (key) {
            var pKey = key;
            var setting = settings[pKey];
            var label = labels[pKey];
            var currentPath = __spreadArray(__spreadArray([], pathPrefix, true), [pKey], false);
            if (typeof setting === "object" && setting !== null && typeof label === "object" && "fields" in label) {
                var nestedLabels = label;
                var nestedOptions = options === null || options === void 0 ? void 0 : options[pKey];
                return (<details className="accordion" open>
                            <summary>{nestedLabels.label}</summary>
                            <exports.PreferencePanel lifecycle={lifecycle} preferences={preferences} pathPrefix={currentPath} labels={nestedLabels.fields} options={nestedOptions}/>
                        </details>);
            }
            var createModel = function () {
                var _a;
                return lifecycle.own((_a = preferences).createMutableObservableValue.apply(_a, currentPath));
            };
            switch (typeof setting) {
                case "boolean": {
                    return (<lib_jsx_1.Frag>
                                <Checkbox_1.Checkbox lifecycle={lifecycle} model={createModel()} appearance={{
                            color: studio_enums_1.Colors.black,
                            activeColor: studio_enums_1.Colors.bright,
                            cursor: "pointer"
                        }}>
                                    <span style={{ color: studio_enums_1.Colors.shadow.toString() }}>{label}</span>
                                    <hr />
                                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                                </Checkbox_1.Checkbox>
                            </lib_jsx_1.Frag>);
                }
                case "number": {
                    var fieldOptions = options === null || options === void 0 ? void 0 : options[pKey];
                    if (fieldOptions) {
                        return (<div className="select-field">
                                    <span style={{ color: studio_enums_1.Colors.shadow.toString() }}>{label}</span>
                                    <hr />
                                    <RadioGroup_1.RadioGroup lifecycle={lifecycle} model={createModel()} elements={fieldOptions.map(function (option) { return ({
                                value: option.value,
                                element: <span>{option.label}</span>
                            }); })} appearance={{
                                color: studio_enums_1.Colors.black,
                                activeColor: studio_enums_1.Colors.bright,
                                cursor: "pointer"
                            }}/>
                                </div>);
                    }
                    return (<div className="number-field">
                                <span style={{ color: studio_enums_1.Colors.shadow.toString() }}>{label}</span>
                                <hr />
                                <NumberInput_1.NumberInput lifecycle={lifecycle} model={createModel()} maxChars={4} className="big"/>
                            </div>);
                }
                case "string": {
                    var fieldOptions = options === null || options === void 0 ? void 0 : options[pKey];
                    if (fieldOptions) {
                        return (<div className="select-field">
                                    <span style={{ color: studio_enums_1.Colors.shadow.toString() }}>{label}</span>
                                    <hr />
                                    <RadioGroup_1.RadioGroup lifecycle={lifecycle} model={createModel()} elements={fieldOptions.map(function (option) { return ({
                                value: option.value,
                                element: <span>{option.label}</span>
                            }); })} appearance={{
                                color: studio_enums_1.Colors.black,
                                activeColor: studio_enums_1.Colors.bright,
                                cursor: "pointer"
                            }}/>
                                </div>);
                    }
                    return null;
                }
                default:
                    return null;
            }
        })}
        </div>);
};
exports.PreferencePanel = PreferencePanel;
