"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceBuilder = void 0;
var Workspace_ts_1 = require("@/ui/workspace/Workspace.ts");
var PanelPlaceholder_tsx_1 = require("@/ui/workspace/PanelPlaceholder.tsx");
var PanelResizer_tsx_1 = require("@/ui/workspace/PanelResizer.tsx");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var WorkspaceBuilder;
(function (WorkspaceBuilder) {
    WorkspaceBuilder.buildScreen = function (lifecycle, panelContents, element, screenKey, roomAwareness) {
        lib_dom_1.Html.empty(element);
        if (screenKey === null) {
            return;
        }
        var build = function (container, siblings, content, next, orientation) {
            var element = (function () {
                if (content.type === "panel") {
                    return (<PanelPlaceholder_tsx_1.PanelPlaceholder lifecycle={lifecycle} orientation={orientation} siblings={siblings} panelContents={panelContents} panelState={content} roomAwareness={roomAwareness}/>);
                }
                else if (content.type === "layout") {
                    var section = (<section className={lib_dom_1.Html.buildClassList("workspace", content.orientation)}>
                            <div className="fill"/>
                        </section>);
                    var children = [];
                    for (var _i = 0, _a = lib_std_1.Iterables.pairWise(content.contents); _i < _a.length; _i++) {
                        var _b = _a[_i], curr = _b[0], next_1 = _b[1];
                        build(section, children, curr, next_1, content.orientation);
                    }
                    return section;
                }
                else {
                    return (0, lib_std_1.Unhandled)(content);
                }
            })();
            siblings.push({ element: element, content: content });
            (0, lib_jsx_1.appendChildren)(container, element);
            if (content.constrains.type === "flex" && (0, lib_std_1.isDefined)(next) && next.constrains.type === "flex") {
                container.appendChild(<PanelResizer_tsx_1.PanelResizer lifecycle={lifecycle} panelContents={panelContents} target={element} orientation={orientation} siblings={siblings}/>);
            }
        };
        build(element, [], Workspace_ts_1.Workspace.Default[screenKey].content, null, "vertical");
    };
})(WorkspaceBuilder || (exports.WorkspaceBuilder = WorkspaceBuilder = {}));
