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
exports.Markdown = exports.renderMarkdown = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var Markdown_sass_inline_1 = require("./Markdown.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var markdown_it_1 = require("markdown-it");
var markdown_it_table_1 = require("markdown-it-table");
var studio_enums_1 = require("@opendaw/studio-enums");
var Icon_1 = require("@/ui/components/Icon");
var className = lib_dom_1.Html.adoptStyleSheet(Markdown_sass_inline_1.default, "Markdown");
var renderMarkdown = function (element, text, actions) {
    var _a, _b;
    if (lib_dom_1.Browser.isWindows()) {
        Object.entries(lib_dom_1.ModfierKeys.Mac)
            .forEach(function (_a) {
            var key = _a[0], value = _a[1];
            return text = text.replaceAll(value, lib_dom_1.ModfierKeys.Win[key]);
        });
    }
    var md = (0, markdown_it_1.default)();
    md.use(markdown_it_table_1.markdownItTable);
    element.innerHTML = md.render(text);
    element.querySelectorAll("img").forEach(function (img) {
        img.crossOrigin = "anonymous";
        img.style.maxWidth = "100%";
    });
    element.querySelectorAll("a").forEach(function (a) {
        if (a.href.startsWith("action://")) {
            var actionName = a.href.replace("action://", "");
            var action_1 = actions === null || actions === void 0 ? void 0 : actions[actionName];
            if ((0, lib_std_1.isDefined)(action_1)) {
                a.onclick = function (event) {
                    event.preventDefault();
                    action_1();
                };
            }
            return;
        }
        var url = new URL(a.href);
        if (url.origin === location.origin) {
            a.onclick = function (event) {
                event.preventDefault();
                lib_jsx_1.RouteLocation.get().navigateTo(url.pathname);
            };
        }
        else {
            a.target = "_blank";
        }
    });
    element.querySelectorAll("code").forEach(function (code) {
        code.title = "Click to copy to clipboard";
        code.onclick = function () { return __awaiter(void 0, void 0, void 0, function () {
            var status_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, lib_std_1.isDefined)(code.textContent)) return [3 /*break*/, 2];
                        return [4 /*yield*/, lib_runtime_1.Promises.tryCatch(lib_dom_1.Clipboard.writeText(code.textContent))];
                    case 1:
                        status_1 = (_a.sent()).status;
                        alert(status_1 === "resolved"
                            ? "Copied to clipboard"
                            : "Could not copy to clipboard.");
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
    });
    // Replace {icon:Name} with Icon components
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    var iconPattern = /\{icon:(\w+)\}/g;
    var nodesToReplace = [];
    var node;
    while ((node = walker.nextNode())) {
        var matches = [];
        var match = void 0;
        while ((match = iconPattern.exec((_a = node.textContent) !== null && _a !== void 0 ? _a : "")) !== null) {
            matches.push({ match: match[0], name: match[1], index: match.index });
        }
        if (matches.length > 0) {
            nodesToReplace.push({ node: node, matches: matches });
        }
    }
    for (var _i = 0, nodesToReplace_1 = nodesToReplace; _i < nodesToReplace_1.length; _i++) {
        var _c = nodesToReplace_1[_i], node_1 = _c.node, matches = _c.matches;
        var parent_1 = node_1.parentNode;
        if (!parent_1) {
            continue;
        }
        var text_1 = (_b = node_1.textContent) !== null && _b !== void 0 ? _b : "";
        var lastIndex = 0;
        var fragment = document.createDocumentFragment();
        for (var _d = 0, matches_1 = matches; _d < matches_1.length; _d++) {
            var _e = matches_1[_d], match = _e.match, name_1 = _e.name, index = _e.index;
            if (index > lastIndex) {
                fragment.appendChild(document.createTextNode(text_1.slice(lastIndex, index)));
            }
            fragment.appendChild(<Icon_1.Icon symbol={studio_enums_1.IconSymbol.fromName(name_1)} className="icon"/>);
            lastIndex = index + match.length;
        }
        if (lastIndex < text_1.length) {
            fragment.appendChild(document.createTextNode(text_1.slice(lastIndex)));
        }
        parent_1.replaceChild(fragment, node_1);
    }
};
exports.renderMarkdown = renderMarkdown;
var Markdown = function (_a) {
    var text = _a.text, actions = _a.actions;
    if (text.startsWith("<")) {
        return "Invalid Markdown";
    }
    var element = <div className={lib_dom_1.Html.buildClassList(className, "markdown")}/>;
    (0, exports.renderMarkdown)(element, text, actions);
    return element;
};
exports.Markdown = Markdown;
