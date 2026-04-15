"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editor_worker_worker_1 = require("monaco-editor/esm/vs/editor/editor.worker?worker");
var ts_worker_worker_1 = require("monaco-editor/esm/vs/language/typescript/ts.worker?worker");
var createWorker = function (Worker) {
    var worker = new Worker();
    worker.onerror = function (event) {
        event.preventDefault();
        console.warn("Monaco worker error (falling back to main thread):", event.message);
    };
    return worker;
};
// noinspection JSUnusedGlobalSymbols
self.MonacoEnvironment = {
    getWorker: function (_workerId, label) {
        switch (label) {
            case "typescript":
            case "javascript":
                return createWorker(ts_worker_worker_1.default);
            default:
                return createWorker(editor_worker_worker_1.default);
        }
    }
};
(function () {
    if (typeof document.caretPositionFromPoint !== "function")
        return;
    var original = document.caretPositionFromPoint.bind(document);
    document.caretPositionFromPoint = function (x, y) {
        var clampedY = Math.min(y, window.innerHeight - 2);
        var clampedX = Math.min(x, window.innerWidth - 2);
        return original(Math.max(0, clampedX), Math.max(0, clampedY));
    };
})();
