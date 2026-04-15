"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonacoFactory = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var MonacoFactory;
(function (MonacoFactory) {
    MonacoFactory.create = function (_a) {
        var monaco = _a.monaco, language = _a.language, uri = _a.uri, initialCode = _a.initialCode, lifecycle = _a.lifecycle;
        var container = document.createElement("div");
        container.className = "monaco-editor";
        var modelUri = monaco.Uri.parse(uri);
        var model = monaco.editor.getModel(modelUri);
        if ((0, lib_std_1.isNull)(model)) {
            model = monaco.editor.createModel(initialCode, language, modelUri);
        }
        else {
            model.setValue(initialCode);
        }
        var editor = monaco.editor.create(container, {
            language: language,
            quickSuggestions: { other: true, comments: false, strings: false },
            occurrencesHighlight: "off",
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnCommitCharacter: true,
            acceptSuggestionOnEnter: "on",
            wordBasedSuggestions: "off",
            model: model,
            theme: "vs-dark",
            automaticLayout: true,
            stickyScroll: { enabled: false },
            editContext: false,
            dropIntoEditor: { enabled: false }
        });
        var allowed = ["c", "v", "x", "a", "z", "y"];
        lifecycle.ownAll(lib_dom_1.Events.subscribe(container, "keydown", function (event) {
            if ((event.ctrlKey || event.metaKey) && allowed.includes(event.key.toLowerCase())) {
                return;
            }
            event.stopPropagation();
        }), lib_dom_1.Events.subscribe(container, "keyup", function (event) {
            if ((event.ctrlKey || event.metaKey) && allowed.includes(event.key.toLowerCase())) {
                return;
            }
            event.stopPropagation();
        }), lib_dom_1.Events.subscribe(container, "keypress", function (event) { return event.stopPropagation(); }), lib_dom_1.Events.subscribe(container, "dragover", function (event) { return event.stopPropagation(); }));
        requestAnimationFrame(function () { return editor.focus(); });
        return { editor: editor, model: model, container: container };
    };
})(MonacoFactory || (exports.MonacoFactory = MonacoFactory = {}));
