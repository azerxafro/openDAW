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
exports.showConnectRoomDialog = void 0;
var StudioLiveRoomDialog_sass_inline_1 = require("./StudioLiveRoomDialog.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var Dialog_1 = require("@/ui/components/Dialog");
var Surface_1 = require("@/ui/surface/Surface");
var RoomAwareness_1 = require("@/service/RoomAwareness");
var className = lib_dom_1.Html.adoptStyleSheet(StudioLiveRoomDialog_sass_inline_1.default, "StudioLiveRoomDialog");
var randomRoomName = function (length) {
    if (length === void 0) { length = 11; }
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    var values = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(values, function (byte) { return chars[byte % chars.length]; }).join("");
};
var randomUserName = function () {
    var adjectives = [
        "Analog", "Electric", "Acoustic", "Harmonic", "Sonic",
        "Melodic", "Ambient", "Tonal", "Stereo", "Resonant",
        "Phantom", "Cosmic", "Modular", "Spectral", "Orbital",
        "Neon", "Lucid", "Astral", "Magnetic", "Chromatic"
    ];
    var nouns = [
        "Maestro", "Voyager", "Pioneer", "Prophet", "Nomad",
        "Atom", "Aurora", "Echo", "Nova", "Prism",
        "Opus", "Rebel", "Ghost", "Oracle", "Nexus",
        "Drifter", "Vertex", "Sphinx", "Cipher", "Pilot"
    ];
    var _a = crypto.getRandomValues(new Uint8Array(2)), a = _a[0], b = _a[1];
    return "".concat(adjectives[a % adjectives.length], " ").concat(nouns[b % nouns.length]);
};
var showConnectRoomDialog = function (prefillRoomName) {
    var _a = Promise.withResolvers(), resolve = _a.resolve, reject = _a.reject, promise = _a.promise;
    var identity = (0, RoomAwareness_1.readIdentity)();
    var hasRoomName = (0, lib_std_1.isDefined)(prefillRoomName) && prefillRoomName.length > 0;
    var urlPreview = (<span className="url-preview" onclick={function () { return __awaiter(void 0, void 0, void 0, function () {
            var text, status_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = urlPreview.textContent;
                        if (!(text.length > 0
                            && roomInput.value.trim().length > 0 && roomInput.checkValidity()
                            && nameInput.value.trim().length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(lib_dom_1.Clipboard.writeText(text))];
                    case 1:
                        status_1 = (_a.sent()).status;
                        if (!(status_1 === "resolved")) return [3 /*break*/, 3];
                        return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Clipboard", message: "Join link copied to clipboard." })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, lib_std_1.RuntimeNotifier.info({ headline: "Clipboard", message: "Could not copy to clipboard." })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); }}/>);
    var updateUrlPreview = function () {
        urlPreview.textContent = "".concat(location.origin, "/join/").concat(roomInput.value);
        var copyable = roomInput.value.trim().length > 0 && roomInput.checkValidity();
        urlPreview.classList.toggle("copyable", copyable);
    };
    var roomInput = (<input className="default input" type="text" placeholder="Required" maxLength={16} required={true} pattern="[a-z0-9\.\-_]+" title="Only lowercase letters, numbers, hyphens, dots, and underscores" value={hasRoomName ? prefillRoomName : randomRoomName()} disabled={hasRoomName}/>);
    var nameInput = (<input className="default input" type="text" placeholder="Required" value={identity.name.length > 0 ? identity.name : randomUserName()} maxLength={16} required={true}/>);
    var selectedColor = identity.color;
    var colorSwatches = (<div className="color-swatches">
            {(0, RoomAwareness_1.userColors)().map(function (color) {
            var swatch = (<span className={color === selectedColor ? "swatch selected" : "swatch"} style={{ backgroundColor: color }} onclick={function () {
                    selectedColor = color;
                    colorSwatches.querySelectorAll(".swatch").forEach(function (element) {
                        return element.classList.toggle("selected", element.style.backgroundColor === swatch.style.backgroundColor);
                    });
                }}/>);
            return swatch;
        })}
        </div>);
    var approve = function () {
        var roomName = roomInput.value.trim();
        var userName = nameInput.value.trim();
        if (roomName.length === 0 || userName.length === 0 || !roomInput.checkValidity()) {
            return;
        }
        resolve({ roomName: roomName, userName: userName, userColor: selectedColor });
    };
    var dialog = (<Dialog_1.Dialog headline="Join Live Room" icon={studio_enums_1.IconSymbol.Connected} cancelable={true} buttons={[
            { text: "Cancel", onClick: function (handler) { return handler.close(); } },
            {
                text: "Connect",
                primary: true,
                onClick: function (handler) {
                    approve();
                    handler.close();
                }
            }
        ]}>
            <div className={className}>
                <p>
                    Live rooms let you collaborate with others in real time.
                    Share the room name and anyone can join your session.
                </p>
                <p>
                    All data is exchanged directly between participants,
                    nothing is stored on the server.
                    Assets are kept locally in each user's browser.
                </p>
                <div className="group">
                    <label>Room Name</label>
                    {roomInput}
                    {urlPreview}
                </div>
                <div className="group">
                    <label>Your Name</label>
                    {nameInput}
                </div>
                <div className="group">
                    <label>Your Color</label>
                    {colorSwatches}
                </div>
                <p style={{ color: studio_enums_1.Colors.orange.toString() }}>
                    Rooms disappear shortly after the last user leaves.
                    Make sure to save your project before leaving!
                </p>
            </div>
        </Dialog_1.Dialog>);
    dialog.oncancel = function () { return reject(lib_std_1.Errors.AbortError); };
    dialog.onkeydown = function (event) {
        if (event.code === "Enter") {
            approve();
            dialog.close();
        }
    };
    Surface_1.Surface.get().flyout.appendChild(dialog);
    dialog.showModal();
    updateUrlPreview();
    if (hasRoomName) {
        nameInput.focus();
    }
    else {
        roomInput.addEventListener("input", function () {
            roomInput.value = roomInput.value.toLowerCase();
            updateUrlPreview();
        });
        roomInput.focus();
        roomInput.select();
    }
    return promise;
};
exports.showConnectRoomDialog = showConnectRoomDialog;
