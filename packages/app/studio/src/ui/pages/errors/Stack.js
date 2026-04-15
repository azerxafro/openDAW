"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
var Stack_sass_inline_1 = require("./Stack.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(Stack_sass_inline_1.default, "Stack");
var Stack = function (_a) {
    var stack = _a.stack;
    return (<pre className={className}>{stack.length === 0 ? "No stack trace available." : stack}</pre>);
};
exports.Stack = Stack;
