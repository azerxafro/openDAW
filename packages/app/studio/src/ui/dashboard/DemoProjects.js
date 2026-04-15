"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoProjects = void 0;
var DemoProjects_sass_inline_1 = require("./DemoProjects.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var ThreeDots_1 = require("@/ui/spinner/ThreeDots");
var DemoProject_1 = require("@/ui/dashboard/DemoProject");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var studio_core_1 = require("@opendaw/studio-core");
var className = lib_dom_1.Html.adoptStyleSheet(DemoProjects_sass_inline_1.default, "DemoProjects");
var ids = [
    "ae8ec50bfac", // Orange 3
    "192c9b77aaa", // Reese Boots
    "b3c0b901b24", // Open Up
    "8dd3364e113", // The Rocinante Experience
    "84f9c4fbb76", // Ambition
    "3a96772867c", // Fleur de Soul
    "97b0564366f", // Centauri
    "f9e029edeb0", // OpenDub Experience
    "0d8b487992b", // Chaotic
    "3038c24e87e", // Bury Me by Skyence Remix
    "468309b2035", // Sturm Chaser
    "932e7c1d1f1", // Liquid
    "7a5be6e2478", // Ben
    "16982e85776", // Fatso
    "1cc67c64dde", // Seek Deeper
    "65efa1e1f7f", // Shafted
    "b41528b9c53", // Dub Speak
    "b43d04558ec", // Sunset
    "cab976763f0" // Vapor Run
];
var listUrl = "https://api.opendaw.studio/music/list-by-ids.php?ids=".concat(ids.join(","));
var NewProjectJson = {
    id: "",
    hasCover: false,
    bundleSize: 0,
    metadata: {
        name: "New Project",
        artist: "openDAW",
        description: "",
        tags: ["clean slate"],
        created: "",
        modified: "",
        coverMimeType: ""
    }
};
var formatBytes = function (bytes) {
    if (bytes < 1024) {
        return "".concat(bytes, " B");
    }
    if (bytes < 1024 * 1024) {
        return "".concat((bytes / 1024).toFixed(1), " KB");
    }
    return "".concat((bytes / (1024 * 1024)).toFixed(1), " MB");
};
var loadDemoProject = function (service, json) { return __awaiter(void 0, void 0, void 0, function () {
    var sizeInfo, approved, dialog, folder, _a, status, arrayBuffer, error, _b, decodeStatus, profile, decodeError;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                sizeInfo = "(".concat(formatBytes(json.bundleSize), ")");
                return [4 /*yield*/, lib_std_1.RuntimeNotifier.approve({
                        headline: "Install Demo Project",
                        message: "Do you want to download the project bundle file ".concat(sizeInfo, "?")
                    })];
            case 1:
                approved = _c.sent();
                if (!approved) {
                    return [2 /*return*/];
                }
                dialog = lib_std_1.RuntimeNotifier.progress({ headline: "Loading Demo Project" });
                folder = json.id;
                return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(fetch("https://api.opendaw.studio/music/uploads/".concat(folder, "/project.odb"))
                        .then(lib_runtime_1.network.progress(function (progress) { return dialog.message = "Downloading bundle file... (".concat((progress * 100).toFixed(1), "%)"); }))
                        .then(function (x) { return x.arrayBuffer(); }))];
            case 2:
                _a = _c.sent(), status = _a.status, arrayBuffer = _a.value, error = _a.error;
                dialog.terminate();
                if (status === "rejected") {
                    return [2 /*return*/, lib_std_1.RuntimeNotifier.info({ headline: "Could not load bundle file", message: String(error) })];
                }
                return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(studio_core_1.ProjectBundle.decode(service, arrayBuffer))];
            case 3:
                _b = _c.sent(), decodeStatus = _b.status, profile = _b.value, decodeError = _b.error;
                if (decodeStatus === "rejected") {
                    return [2 /*return*/, lib_std_1.RuntimeNotifier.info({ headline: "Could not decode bundle file", message: String(decodeError) })];
                }
                return [4 /*yield*/, profile.saveAs(profile.meta)];
            case 4:
                _c.sent();
                service.projectProfileService.setValue(lib_std_1.Option.wrap(profile));
                return [2 /*return*/];
        }
    });
}); };
var DemoProjects = function (_a) {
    var service = _a.service;
    return (<div className={className}>
        <h3 style={{ color: studio_enums_1.Colors.orange.toString() }}>Start</h3>
        <div className="projects">
            <DemoProject_1.DemoProject json={NewProjectJson} load={function () { return service.newProject(); }}/>
            <hr />
            <lib_jsx_1.Await factory={function () { return fetch(listUrl)
            .then(function (res) { return res.json(); })
            .then(function (res) { return res; })
            .then(function (list) { return list.tracks; }); }} loading={function () { return <div>{(0, ThreeDots_1.ThreeDots)()}</div>; }} failure={function (_a) {
            var retry = _a.retry, reason = _a.reason;
            return (<div style={{ margin: "8px 0 0 4px", justifySelf: "center" }}>
                        <span>{reason}</span> <span onclick={retry} style={{
                    color: studio_enums_1.Colors.orange.toString(),
                    cursor: "pointer"
                }}>Click to retry.</span>
                    </div>);
        }} success={function (tracks) { return tracks.map(function (json) { return (<DemoProject_1.DemoProject json={json} load={function () { return loadDemoProject(service, json); }}/>); }); }}/>
        </div>
    </div>);
};
exports.DemoProjects = DemoProjects;
