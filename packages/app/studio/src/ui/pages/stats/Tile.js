"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
var Tile_sass_inline_1 = require("./Tile.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(Tile_sass_inline_1.default, "Tile");
var Tile = function (_a) {
    var label = _a.label, value = _a.value, icon = _a.icon;
    return (<div className={className}>
        <div className="tile-text">
            <div className="tile-label">{label}</div>
            <div className="tile-value">{value}</div>
        </div>
        <div className="tile-icon">
            <span className="tile-icon-glyph">{icon}</span>
        </div>
    </div>);
};
exports.Tile = Tile;
