"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var ProgressBar_sass_inline_1 = require("./ProgressBar.sass?inline");
var className = lib_dom_1.Html.adoptStyleSheet(ProgressBar_sass_inline_1.default, "ProgressBar");
var ProgressBar = function (_a) {
    var lifecycle = _a.lifecycle, progress = _a.progress;
    var element = (<div className={className}>
            <div />
        </div>);
    var update = function () { return element.style.setProperty("--progress", progress.getValue().toFixed(3)); };
    lifecycle.own(progress.subscribe(update));
    update();
    return element;
};
exports.ProgressBar = ProgressBar;
