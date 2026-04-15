"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoProject = void 0;
var DemoProject_sass_inline_1 = require("./DemoProject.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var className = lib_dom_1.Html.adoptStyleSheet(DemoProject_sass_inline_1.default, "DemoProject");
var DemoProject = function (_a) {
    var json = _a.json, load = _a.load;
    var coverUrl = json.hasCover
        ? "https://api.opendaw.studio/music/cover.php?id=".concat(json.id, "&preview=true")
        : "./empty.svg";
    return (<div className={className} onclick={load}>
            <img src={coverUrl} alt="cover" crossOrigin="anonymous"/>
            <div className="meta">
                <div className="title">
                    <span className="name">{json.metadata.name}</span>
                    <span> by </span>
                    <span className="artist">{json.metadata.artist}</span>
                    {json.bundleSize > 0 && (<span className="size">({lib_std_1.Bytes.toString(json.bundleSize)})</span>)}
                </div>
                <div className="tags">{json.metadata.tags
            .slice(0, 4)
            .filter(function (tag) { return lib_std_1.Strings.nonEmpty(tag); })
            .map(function (tag) { return <div>{tag}</div>; })}</div>
            </div>
        </div>);
};
exports.DemoProject = DemoProject;
