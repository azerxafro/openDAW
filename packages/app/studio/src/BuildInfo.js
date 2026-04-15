"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildInfo = void 0;
// This JSON gets created right before building (check ../vite.config.ts) and stored in the public folder.
var zod_1 = require("zod");
exports.BuildInfo = zod_1.z.object({
    date: zod_1.z.number(),
    uuid: zod_1.z.string(),
    env: zod_1.z.enum(["production", "development"])
});
