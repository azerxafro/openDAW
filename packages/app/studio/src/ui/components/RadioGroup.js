"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroup = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var ButtonCheckboxRadio_tsx_1 = require("@/ui/components/ButtonCheckboxRadio.tsx");
var TextTooltip_tsx_1 = require("@/ui/surface/TextTooltip.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var RadioGroup = function (_a) {
    var lifecycle = _a.lifecycle, model = _a.model, elements = _a.elements, style = _a.style, className = _a.className, appearance = _a.appearance;
    var name = lib_dom_1.Html.nextID();
    var map = new Map();
    var children = elements.map(function (_a) {
        var value = _a.value, element = _a.element, tooltip = _a.tooltip, className = _a.className;
        var glue = lib_dom_1.Html.nextID();
        var input = (<input type="radio" id={glue} name={name} className={className} checked={value === model.getValue()} oninput={function () {
                model.setValue(value);
                input.checked = value === model.getValue();
                input.blur();
            }}/>);
        var label = <label className={className} htmlFor={glue}>{element}</label>;
        if ((0, lib_std_1.isDefined)(tooltip)) {
            lifecycle.own(TextTooltip_tsx_1.TextTooltip.simple(label, function () {
                var clientRect = label.getBoundingClientRect();
                return {
                    clientX: (clientRect.left + clientRect.right) * 0.5,
                    clientY: clientRect.bottom + 8,
                    text: (0, lib_std_1.getOrProvide)(tooltip)
                };
            }));
        }
        (0, lib_std_1.assert)(!map.has(value), "".concat(value, " is not a unique key"));
        map.set(value, input);
        return [input, label];
    });
    lifecycle.own(model.subscribe(function (owner) {
        var active = map.get(owner.getValue());
        if ((0, lib_std_1.isDefined)(active)) {
            active.checked = true;
        }
        else {
            children.forEach(function (_a) {
                var input = _a[0];
                return input.checked = false;
            });
        }
    }));
    return (<ButtonCheckboxRadio_tsx_1.ButtonCheckboxRadio lifecycle={lifecycle} style={style} appearance={appearance} className={className} dataClass="radio-group">{children}</ButtonCheckboxRadio_tsx_1.ButtonCheckboxRadio>);
};
exports.RadioGroup = RadioGroup;
