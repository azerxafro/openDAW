"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotePadPanel = void 0;
var NotePadPanel_sass_inline_1 = require("./NotePadPanel.sass?inline");
var NotePadTemplate_md_raw_1 = require("./NotePadTemplate.md?raw");
var lib_std_1 = require("@opendaw/lib-std");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var Checkbox_1 = require("@/ui/components/Checkbox");
var Markdown_1 = require("@/ui/Markdown");
var lib_dom_1 = require("@opendaw/lib-dom");
var GlobalShortcuts_1 = require("@/ui/shortcuts/GlobalShortcuts");
var className = lib_dom_1.Html.adoptStyleSheet(NotePadPanel_sass_inline_1.default, "NotePadPanel");
var NotePadPanel = function (_a) {
    var _b, _c;
    var lifecycle = _a.lifecycle, service = _a.service;
    var markdownText = new lib_std_1.DefaultObservableValue("");
    var editMode = new lib_std_1.DefaultObservableValue(false);
    var notepad = <div className="content"/>;
    var saveNotepad = function () {
        var innerText = notepad.innerText;
        if (innerText === NotePadTemplate_md_raw_1.default) {
            return;
        }
        markdownText.setValue(innerText);
        service.profile.updateMetaData("notepad", innerText);
    };
    var update = function () {
        lib_dom_1.Html.empty(notepad);
        var text = markdownText.getValue();
        if (editMode.getValue()) {
            notepad.textContent = text;
            notepad.setAttribute("contentEditable", "true");
            notepad.focus();
        }
        else {
            notepad.removeAttribute("contentEditable");
            (0, Markdown_1.renderMarkdown)(notepad, text);
        }
    };
    if (((_c = (_b = service.profile.meta.notepad) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0) {
        markdownText.setValue(service.profile.meta.notepad);
    }
    else {
        markdownText.setValue(NotePadTemplate_md_raw_1.default);
    }
    update();
    var element = (<div className={className}>
            {notepad}
            <Checkbox_1.Checkbox lifecycle={lifecycle} model={editMode} style={{ fontSize: "1rem", position: "sticky", top: "0.75em", right: "0.75em" }} appearance={{ cursor: "pointer" }}>
                <div style={{ display: "flex" }}>
                    <Icon_1.Icon symbol={studio_enums_1.IconSymbol.EditBox}/>
                </div>
            </Checkbox_1.Checkbox>
        </div>);
    var shortcuts = lib_dom_1.ShortcutManager.get().createContext(lib_std_1.Predicates.alwaysTrue, "NotePadPanel");
    lifecycle.ownAll(shortcuts, shortcuts.register(GlobalShortcuts_1.GlobalShortcuts["project-save"].shortcut, function () {
        saveNotepad();
        return false;
    }, { activeInTextField: true }), editMode.subscribe(function () {
        if (!editMode.getValue()) {
            saveNotepad();
        }
        update();
    }), lib_dom_1.Events.subscribe(notepad, "blur", function () { return editMode.setValue(false); }), lib_dom_1.Events.subscribe(notepad, "input", function () { return lib_dom_1.Html.limitChars(notepad, "innerText", 10000); }), { terminate: function () { if (editMode.getValue()) {
            saveNotepad();
        } } });
    return element;
};
exports.NotePadPanel = NotePadPanel;
