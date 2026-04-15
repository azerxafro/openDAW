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
exports.ShortcutManagerView = void 0;
var ShortcutManagerView_sass_inline_1 = require("./ShortcutManagerView.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var dialogs_1 = require("@/ui/components/dialogs");
var Surface_1 = require("@/ui/surface/Surface");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(ShortcutManagerView_sass_inline_1.default, "ShortcutManagerView");
var lastOpenIndex = 0;
var ShortcutManagerView = function (_a) {
    var lifecycle = _a.lifecycle, contexts = _a.contexts, updateNotifier = _a.updateNotifier;
    return (<div className={className} onInit={function (element) {
            var update = function () { return (0, lib_jsx_1.replaceChildren)(element, lib_std_1.Objects.entries(contexts).map(function (_a, index) {
                var key = _a[0], shortcuts = _a[1];
                return (<details className="context" open={lastOpenIndex === index} onInit={function (element) { return element.ontoggle = function () {
                        if (element.open) {
                            lastOpenIndex = index;
                            element.scrollIntoView();
                        }
                    }; }}>
                    <summary>
                        <h3>{lib_std_1.Strings.hyphenToCamelCase(key)}</h3>
                    </summary>
                    <div className="shortcuts">
                        {lib_std_1.Objects.entries(shortcuts).map(function (_a) {
                        var key = _a[0], entry = _a[1];
                        return (<div className="shortcut" onclick={function () { return __awaiter(void 0, void 0, void 0, function () {
                                var keys;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, editShortcut(shortcuts, entry)];
                                        case 1:
                                            keys = _a.sent();
                                            shortcuts[key].shortcut.overrideWith(keys);
                                            update();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }}><span>{entry.description}</span>
                                <hr />
                                <div className="shortcut-keys">{entry.shortcut.format().map(function (symbol) { return <span>{symbol}</span>; })}</div>
                            </div>);
                    })}
                    </div>
                </details>);
            })); };
            lifecycle.own(updateNotifier.subscribe(update));
            update();
        }}>
        </div>);
};
exports.ShortcutManagerView = ShortcutManagerView;
var editShortcut = function (definitions, original) { return __awaiter(void 0, void 0, void 0, function () {
    var lifecycle, abortController, shortcut;
    return __generator(this, function (_a) {
        lifecycle = new lib_std_1.Terminator();
        abortController = new AbortController();
        shortcut = lifecycle.own(new lib_std_1.DefaultObservableValue(original.shortcut));
        return [2 /*return*/, dialogs_1.Dialogs.show({
                headline: "Edit Shortcut",
                content: (<div style={{ display: "flex", flexDirection: "column", rowGap: "0.75em" }}>
                <h3 style={{ color: studio_enums_1.Colors.orange.toString() }}>Shortcut for "{original.description}"</h3>
                <div style={{ color: studio_enums_1.Colors.blue.toString(), height: "1.25em", display: "flex", columnGap: "1px" }} onConnect={function (element) {
                        lifecycle.own(lib_dom_1.Events.subscribe(Surface_1.Surface.get(element).owner, "keydown", function (event) {
                            lib_dom_1.Shortcut.fromEvent(event).ifSome(function (newShortcut) {
                                shortcut.setValue(newShortcut);
                                (0, lib_jsx_1.replaceChildren)(element, newShortcut.format().map(function (symbol) { return <span>{symbol}</span>; }));
                            });
                            event.preventDefault();
                            event.stopImmediatePropagation();
                        }, { capture: true }));
                    }}>{original.shortcut.format().map(function (symbol) { return <span>{symbol}</span>; })}</div>
                <div style={{ display: "flex", columnGap: "1px" }} onInit={function (element) { return shortcut.catchupAndSubscribe(function (owner) {
                        var shortcut = owner.getValue();
                        var conflicts = Object.values(definitions)
                            .find(function (other) { return !other.shortcut.equals(original.shortcut) && other.shortcut.equals(shortcut); });
                        if ((0, lib_std_1.isAbsent)(conflicts)) {
                            element.textContent = "No conflict.";
                            element.style.color = studio_enums_1.Colors.dark.toString();
                        }
                        else {
                            element.textContent = "Conflicts with \"".concat(conflicts.description, "\".");
                            element.style.color = studio_enums_1.Colors.red.toString();
                        }
                    }); }}/>
            </div>),
                abortSignal: abortController.signal,
                buttons: [{
                        text: "Cancel",
                        primary: false,
                        onClick: function () { return abortController.abort(); }
                    }]
            }).then(function () {
                var newShortcut = shortcut.getValue();
                var conflicts = lib_std_1.Objects.entries(definitions)
                    .find(function (_a) {
                    var _ = _a[0], other = _a[1];
                    return !other.shortcut.equals(original.shortcut) && other.shortcut.equals(newShortcut);
                });
                return (0, lib_std_1.isDefined)(conflicts) ? original.shortcut : shortcut.getValue();
            }, function () { return original.shortcut; }).finally(function () { return lifecycle.terminate(); })];
    });
}); };
