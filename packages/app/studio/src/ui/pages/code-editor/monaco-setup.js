"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monaco = void 0;
require("@/monaco/imports");
var monaco = require("monaco-editor");
exports.monaco = monaco;
require("monaco-editor/esm/vs/language/typescript/monaco.contribution");
require("monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution");
var api_declaration_raw_1 = require("@opendaw/studio-scripting/api.declaration?raw");
var library_raw_1 = require("@opendaw/studio-scripting/library?raw");
// Configure TypeScript defaults
var tsDefaults = monaco.languages.typescript.typescriptDefaults;
tsDefaults.setEagerModelSync(true);
tsDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    allowJs: true,
    noLib: true,
    checkJs: false,
    strict: true,
    jsx: monaco.languages.typescript.JsxEmit.Preserve,
    noEmit: false,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true
});
tsDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    noSuggestionDiagnostics: false,
    onlyVisible: false,
    diagnosticCodesToIgnore: []
});
tsDefaults.addExtraLib(library_raw_1.default, "file:///library.d.ts");
tsDefaults.addExtraLib(api_declaration_raw_1.default, "ts:opendaw.d.ts");
tsDefaults.addExtraLib("\ndeclare const console: Console\ndeclare const Math: Math\n", "ts:libs.d.ts");
