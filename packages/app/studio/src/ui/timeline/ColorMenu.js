"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorMenu = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var ColorMenu;
(function (ColorMenu) {
    var Colors = [
        { label: "Blue", hue: studio_adapters_1.ColorCodes.forTrackType(studio_adapters_1.TrackType.Audio) },
        { label: "Orange", hue: studio_adapters_1.ColorCodes.forTrackType(studio_adapters_1.TrackType.Notes) },
        { label: "Green", hue: studio_adapters_1.ColorCodes.forTrackType(studio_adapters_1.TrackType.Value) },
        { label: "Red", hue: 8.0 },
        { label: "Purple", hue: 322.0 },
        { label: "Yellow", hue: 60.0 }
    ].sort(function (a, b) { return a.hue - b.hue; });
    ColorMenu.createItem = function (procedure) { return studio_core_1.MenuItem.default({ label: "Color" })
        .setRuntimeChildrenProcedure(function (parent) { return parent
        .addMenuItem.apply(parent, Colors.map(function (_a) {
        var label = _a.label, hue = _a.hue;
        return studio_core_1.MenuItem.default({ label: label })
            .setTriggerProcedure(function () { return procedure(hue); });
    })); }); };
})(ColorMenu || (exports.ColorMenu = ColorMenu = {}));
