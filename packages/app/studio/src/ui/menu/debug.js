"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMenus = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var dialogs_tsx_1 = require("@/ui/components/dialogs.tsx");
var DebugMenus;
(function (DebugMenus) {
    DebugMenus.debugBox = function (box, separatorBefore) {
        if (separatorBefore === void 0) { separatorBefore = true; }
        return studio_core_1.MenuItem.default({ label: "Debug Box", separatorBefore: separatorBefore }).setTriggerProcedure(function () { return dialogs_tsx_1.Dialogs.debugBox(box); });
    };
})(DebugMenus || (exports.DebugMenus = DebugMenus = {}));
