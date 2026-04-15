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
exports.ProjectProfileInfo = void 0;
var ProjectInfo_sass_inline_1 = require("./ProjectInfo.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var Cover_1 = require("./Cover");
var lib_dom_1 = require("@opendaw/lib-dom");
var Button_1 = require("@/ui/components/Button");
var studio_enums_1 = require("@opendaw/studio-enums");
var PublishMusic_1 = require("@/ui/info-panel/PublishMusic");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var className = lib_dom_1.Html.adoptStyleSheet(ProjectInfo_sass_inline_1.default, "ProjectInfo");
var ProjectProfileInfo = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    if (!service.hasProfile) {
        return "No project profile.";
    }
    var profile = service.profile;
    var meta = profile.meta, cover = profile.cover;
    var inputName = (<input type="text" className="default" placeholder="Type in your's project name" value={meta.name}/>);
    var inputArtist = (<input type="text" className="default" placeholder="Type in your artist name" value={meta.artist}/>);
    var inputTags = (<input type="text" className="default" placeholder="Type in your's project tags" value={meta.tags.join(", ")}/>);
    var inputDescription = (<textarea className="default" placeholder="Type in your's project description" value={meta.description}/>);
    var coverModel = new lib_std_1.MutableObservableOption(cover.unwrapOrUndefined());
    var buttonPublishText = lib_jsx_1.Inject.value((0, lib_std_1.isDefined)(meta.radioToken) ? "Republish" : "Publish");
    var unpublishButton = (<Button_1.Button lifecycle={lifecycle} className={(0, lib_std_1.isDefined)(meta.radioToken) ? undefined : "hidden"} onClick={function () { return __awaiter(void 0, void 0, void 0, function () {
            var approved, _a, status, error;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, lib_std_1.RuntimeNotifier.approve({
                            headline: "Unpublish Project?",
                            message: "You can publish later again."
                        })];
                    case 1:
                        approved = _c.sent();
                        if (!approved) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(PublishMusic_1.PublishMusic.deleteMusic((_b = meta.radioToken) !== null && _b !== void 0 ? _b : ""))];
                    case 2:
                        _a = _c.sent(), status = _a.status, error = _a.error;
                        if (!(status === "rejected")) return [3 /*break*/, 4];
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                                headline: "Could not unpublish",
                                message: String(error)
                            })];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4:
                        unpublishButton.classList.toggle("hidden", true);
                        buttonPublishText.value = "Republish";
                        delete meta.radioToken;
                        return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(profile.save())];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                                headline: "Project unpublished",
                                message: ""
                            })];
                    case 6: return [2 /*return*/, _c.sent()];
                }
            });
        }); }}>
            Delete
        </Button_1.Button>);
    var form = (<div className="form">
            <div className="label">Name</div>
            <label info="Maximum 128 characters">{inputName}</label>
            <div className="label">Artist</div>
            <label info="Maximum 128 characters">{inputArtist}</label>
            <div className="label">Tags</div>
            <label info="Separate tags with commas">{inputTags}</label>
            <div className="label">Description</div>
            <label info="Maximum 512 characters">{inputDescription}</label>
            <div className="label">Cover</div>
            <Cover_1.Cover lifecycle={lifecycle} model={coverModel}/>
            <div className="experimental-section" style={{ display: "contents" }}>
                <div className="label"/>
                <div style={{ display: "flex", flexDirection: "column", rowGap: "1em" }}>
                    <div>
                        Publish your music to <a href="https://music.opendaw.studio" style={{ color: studio_enums_1.Colors.purple }} target="music.opendaw.studio">our music
                        page</a>
                    </div>
                    <div style={{ display: "flex", columnGap: "1em" }}>
                        <Button_1.Button lifecycle={lifecycle} onClick={function () { return __awaiter(void 0, void 0, void 0, function () {
            var approved, saveResult, progressValue, dialog, _a, status, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Save current input values before dialog steals focus
                        profile.updateMetaData("name", inputName.value);
                        profile.updateMetaData("artist", inputArtist.value);
                        profile.updateMetaData("tags", inputTags.value.split(",").map(function (x) { return x.trim(); }));
                        profile.updateMetaData("description", inputDescription.value);
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.approve({
                                headline: "Publish Your Music",
                                message: "Ensure all samples, soundfonts, and images are cleared of copyright.\n                                    Publishing makes your entire track visible to everyone.\n                                    Prepare proper metadata and upload a cover before starting.\n                                    \n                                    You are responsible for all content you share.\n                                    \n                                    All music is then published under CC BY-NC-SA 4.0"
                            })];
                    case 1:
                        approved = _b.sent();
                        if (!approved) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(profile.save())];
                    case 2:
                        saveResult = _b.sent();
                        if (saveResult.status === "rejected") {
                            return [2 /*return*/, lib_std_1.RuntimeNotifier.info({
                                    headline: "Problem",
                                    message: String(saveResult.error)
                                })];
                        }
                        progressValue = new lib_std_1.DefaultObservableValue(0.0);
                        dialog = lib_std_1.RuntimeNotifier.progress({
                            headline: "Publishing Music",
                            progress: progressValue
                        });
                        return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(PublishMusic_1.PublishMusic
                                .publishMusic(profile, function (progress) { return progressValue.setValue(progress); }, function (message) { return dialog.message = message; }))];
                    case 3:
                        _a = _b.sent(), status = _a.status, error = _a.error;
                        dialog.terminate();
                        if (!(status === "rejected")) return [3 /*break*/, 5];
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({
                                headline: "Could not publish",
                                message: String(error)
                            })];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5:
                        unpublishButton.classList.toggle("hidden", (0, lib_std_1.isUndefined)(meta.radioToken));
                        buttonPublishText.value = (0, lib_std_1.isDefined)(meta.radioToken) ? "Republish" : "Publish";
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Publish complete", message: "" })];
                    case 6: return [2 /*return*/, _b.sent()];
                }
            });
        }); }} appearance={{ framed: true, color: studio_enums_1.Colors.purple }}>
                            {buttonPublishText}
                        </Button_1.Button>
                        {unpublishButton}
                    </div>
                </div>
            </div>
        </div>);
    lifecycle.ownAll(lib_dom_1.Events.subscribe(form, "keydown", function (event) {
        if (event.code === "Enter" && event.target instanceof HTMLInputElement) {
            event.target.blur();
        }
    }), lib_dom_1.Events.subscribe(inputName, "blur", function () { return profile.updateMetaData("name", inputName.value); }), lib_dom_1.Events.subscribe(inputArtist, "blur", function () { return profile.updateMetaData("artist", inputArtist.value); }), lib_dom_1.Events.subscribe(inputDescription, "blur", function () { return profile.updateMetaData("description", inputDescription.value); }), lib_dom_1.Events.subscribe(inputTags, "blur", function () { return profile.updateMetaData("tags", inputTags.value.split(",").map(function (x) { return x.trim(); })); }), lib_dom_1.Events.subscribe(inputName, "input", function () { return lib_dom_1.Html.limitChars(inputDescription, "value", 128); }), lib_dom_1.Events.subscribe(inputDescription, "input", function () { return lib_dom_1.Html.limitChars(inputDescription, "value", 512); }), coverModel.subscribe(function (owner) { return profile.updateCover(owner); }));
    return (<div className={className}>
            {form}
        </div>);
};
exports.ProjectProfileInfo = ProjectProfileInfo;
