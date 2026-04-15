"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
var SearchInput_sass_inline_1 = require("./SearchInput.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(SearchInput_sass_inline_1.default, "SearchInput");
var SearchInput = function (_a) {
    var lifecycle = _a.lifecycle, model = _a.model, placeholder = _a.placeholder, style = _a.style;
    var input = (<input type="search" value={model.getValue()} placeholder={placeholder} oninput={function (event) {
            if (event.target instanceof HTMLInputElement) {
                model.setValue(event.target.value);
            }
        }} onConnect={function (element) {
            element.focus();
            lifecycle.own(model.subscribe(function (owner) { return element.value = owner.getValue(); }));
        }}/>);
    var element = (<div className={className} style={style}>
            <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Search}/>
            {input}
        </div>);
    element.focus = function () {
        input.blur();
        input.focus();
    };
    return element;
};
exports.SearchInput = SearchInput;
