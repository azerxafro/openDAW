"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxDebugView = void 0;
var BoxDebugView_sass_inline_1 = require("./BoxDebugView.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(BoxDebugView_sass_inline_1.default, "BoxDebugView");
var BoxDebugView = function (_a) {
    var box = _a.box;
    var content = <div style={{ display: "contents" }}/>;
    var uuidElement = <h2>{lib_std_1.UUID.toString(box.address.uuid)}</h2>;
    var incoming = function (vertex) { return "\u2190 ".concat((vertex.pointerHub.incoming().length)); };
    var render = function (vertex) { return (<div className="fields">
            <div className="type">
				<span>
					{vertex.isBox() ? vertex.name : vertex.isField() ? vertex.fieldName : ""}
				</span> <span className="pointer">{incoming(vertex)}</span>
            </div>
            {Array.from(vertex.fields()).map(function (field) {
            return (<div className={lib_dom_1.Html.buildClassList("field", field.deprecated && "deprecated")}>
                        <span className="key">{field.fieldKey}</span>
                        <span className="name">{field.deprecated ? "".concat(field.fieldName, " (deprecated)") : field.fieldName}
                        </span>
                        {field.accept({
                    visitPrimitiveField: function (field) { return (<div className="value">
                                        <span>{"".concat(field.getValue())}</span> <span className="pointer">{incoming(field)}</span>
                                    </div>); },
                    visitPointerField: function (field) { return (field.targetVertex.match({
                        none: function () { return <div className="target">→ unset</div>; },
                        some: function (vertex) { return (<div className="target clickable" onclick={function () {
                                uuidElement.textContent = lib_std_1.UUID.toString(vertex.box.address.uuid);
                                (0, lib_jsx_1.replaceChildren)(content, render(vertex.box));
                            }}>
                                                {"\u2192 ".concat(vertex.box.name, "/").concat(vertex.address.fieldKeys)}
                                            </div>); }
                    })); },
                    visitObjectField: function (field) { return (<div className="object">
                                        {render(field)}
                                    </div>); },
                    visitArrayField: function (field) { return (<span classNam="value">N:{field.size()}</span>); },
                    visitField: function (field) { return (<div className="value"><span>⌾</span> <span className="pointer">{incoming(field)}</span></div>); }
                })}
                    </div>);
        })}
        </div>); };
    (0, lib_jsx_1.replaceChildren)(content, render(box));
    return (<div className={className}>
            {uuidElement}
            {content}
        </div>);
};
exports.BoxDebugView = BoxDebugView;
