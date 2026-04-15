"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxesDebugView = void 0;
var BoxesDebugView_sass_inline_1 = require("./BoxesDebugView.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var dialogs_tsx_1 = require("@/ui/components/dialogs.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(BoxesDebugView_sass_inline_1.default, "BoxesDebugView");
var BoxesDebugView = function (_a) {
    var boxGraph = _a.boxGraph;
    return (<div className={className}>
            <h2>Boxes</h2>
            <div className="boxes">
                <div className="title">
                    <span className="name">Name</span>
                    <span className="dependencies">In</span>
                    <span className="dependencies">Out</span>
                    <span className="name">ID</span>
                </div>
                <div className="scrollable">
                    {boxGraph.boxes().toSorted(function (a, b) { return (0, lib_std_1.NumberComparator)(a.creationIndex, b.creationIndex); }).map(function (box) { return (<div className="box" onclick={function () { return dialogs_tsx_1.Dialogs.debugBox(box); }}>
                            <span className="name">{box.name}</span>
                            <span className="dependencies">{box.incomingEdges().length}</span>
                            <span className="dependencies">{box.outgoingEdges().length}</span>
                            <span className="uuid">{lib_std_1.UUID.toString(box.address.uuid)}</span>
                        </div>); })}
                </div>
            </div>
        </div>);
};
exports.BoxesDebugView = BoxesDebugView;
