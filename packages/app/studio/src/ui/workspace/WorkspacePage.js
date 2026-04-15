"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspacePage = void 0;
var WorkspacePage_sass_inline_1 = require("./WorkspacePage.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var WorkspaceBuilder_1 = require("@/ui/workspace/WorkspaceBuilder");
var className = lib_dom_1.Html.adoptStyleSheet(WorkspacePage_sass_inline_1.default, "WorkspacePage");
var WorkspacePage = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    // const page: Nullable<string> = PageUtils.extractSecondSegment(path)
    // console.debug(page)
    var main = <main />;
    var screenLifeTime = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(service.layout.screen.catchupAndSubscribe(function (owner) {
        screenLifeTime.terminate();
        WorkspaceBuilder_1.WorkspaceBuilder.buildScreen(screenLifeTime, service.panelLayout, main, owner.getValue(), service.roomAwareness);
    }));
    return <div className={className}>{main}</div>;
};
exports.WorkspacePage = WorkspacePage;
