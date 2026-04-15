"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadersArea = void 0;
var HeadersArea_sass_inline_1 = require("./HeadersArea.sass?inline");
var AutoScroll_ts_1 = require("@/ui/AutoScroll.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var DragAndDrop_ts_1 = require("@/ui/DragAndDrop.ts");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var DefaultInstrumentFactory_1 = require("@/ui/defaults/DefaultInstrumentFactory");
var className = lib_dom_1.Html.adoptStyleSheet(HeadersArea_sass_inline_1.default, "HeaderArea");
var HeadersArea = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, scrollModel = _a.scrollModel;
    return (<div className={className} tabIndex={-1} onInit={function (element) {
            var project = service.project;
            var api = project.api, editing = project.editing;
            lifecycle.ownAll(DragAndDrop_ts_1.DragAndDrop.installTarget(element, {
                drag: function (_event, data) { return data.type === "instrument"; },
                drop: function (_event, data) {
                    if (data.type === "instrument") {
                        var factory_1 = studio_adapters_1.InstrumentFactories[data.device];
                        editing.modify(function () { return DefaultInstrumentFactory_1.DefaultInstrumentFactory.create(api, factory_1); });
                    }
                },
                enter: function (_allowDrop) { },
                leave: function () { }
            }), (0, AutoScroll_ts_1.installAutoScroll)(element, function (_deltaX, deltaY) { if (deltaY !== 0) {
                scrollModel.moveBy(deltaY);
            } }));
        }}/>);
};
exports.HeadersArea = HeadersArea;
