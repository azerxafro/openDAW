"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphPage = void 0;
var GraphPage_sass_inline_1 = require("./GraphPage.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var ThreeDots_1 = require("@/ui/spinner/ThreeDots");
var lib_std_1 = require("@opendaw/lib-std");
var studio_enums_1 = require("@opendaw/studio-enums");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var className = lib_dom_1.Html.adoptStyleSheet(GraphPage_sass_inline_1.default, "GraphPage");
var GraphPage = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var element = (<div className={className}>
            {service.projectProfileService.getValue().match({
            none: function () { return (<lib_jsx_1.Frag>
                        <h1>Graph</h1>
                        <p onclick={function () { return service.closeProject(); }} style={{ color: studio_enums_1.Colors.dark.toString(), cursor: "pointer" }}>Open a project first...</p>
                    </lib_jsx_1.Frag>); },
            some: function (_a) {
                var project = _a.project, meta = _a.meta;
                return (<lib_jsx_1.Await factory={function () { return Promise.resolve().then(function () { return require("./graph-runtime"); }); }} failure={function (_a) {
                    var reason = _a.reason;
                    return (<p>{reason}</p>);
                }} loading={function () { return (<ThreeDots_1.ThreeDots />); }} success={function (_a) {
                        var createGraphPanel = _a.createGraphPanel, GRAPH_INTERACTION_HINT = _a.GRAPH_INTERACTION_HINT;
                        var stripBoxSuffix = function (label) {
                            return (label === null || label === void 0 ? void 0 : label.endsWith("Box"))
                                ? label.slice(0, -3)
                                : label;
                        };
                        var boxes = project.boxGraph.boxes();
                        var data = {
                            nodes: boxes.map(function (box) { return ({
                                id: lib_std_1.UUID.toString(box.address.uuid),
                                label: stripBoxSuffix(box.name),
                                root: box instanceof studio_boxes_1.RootBox
                            }); }),
                            edges: boxes.flatMap(function (box) { return box.outgoingEdges().map(function (_a) {
                                var pointer = _a[0], address = _a[1];
                                return ({
                                    source: lib_std_1.UUID.toString(pointer.box.address.uuid),
                                    target: lib_std_1.UUID.toString(address.uuid)
                                });
                            }); })
                        };
                        var container = (<div className="wrapper"/>);
                        var controller = createGraphPanel(container, data, { dark: true });
                        lifecycle.own(controller);
                        lifecycle.own(lib_dom_1.Html.watchResize(element, function () { return controller.resize(); }));
                        return (<lib_jsx_1.Frag>
                                       <h1>Graph '{meta.name}'</h1>
                                       <p style={{
                                fontSize: "0.75em",
                                color: studio_enums_1.Colors.dark.toString()
                            }}>{GRAPH_INTERACTION_HINT}</p>
                                       {container}
                                   </lib_jsx_1.Frag>);
                    }}/>);
            }
        })}
        </div>);
    return element;
};
exports.GraphPage = GraphPage;
