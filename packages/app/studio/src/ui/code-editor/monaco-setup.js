"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monaco = void 0;
require("@/monaco/imports");
var monaco = require("monaco-editor");
exports.monaco = monaco;
require("monaco-editor/esm/vs/language/typescript/monaco.contribution");
require("monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution");
require("monaco-editor/esm/vs/editor/contrib/clipboard/browser/clipboard");
monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false
});
monaco.languages.typescript.javascriptDefaults.addExtraLib("\n/** Audio sample rate in Hz (e.g. 44100 or 48000) */\ndeclare const sampleRate: number;\n", "ts:werkstatt-globals.d.ts");
