"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupShadertoyRunner = void 0;
var lib_dom_1 = require("@opendaw/lib-dom");
var setupShadertoyRunner = function (runner, canvas, highres) {
    runner.resetTime();
    return lib_dom_1.AnimationFrame.add(function () {
        var scale = highres.getValue() ? devicePixelRatio : 1;
        canvas.width = canvas.clientWidth * scale;
        canvas.height = canvas.clientHeight * scale;
        runner.render();
    });
};
exports.setupShadertoyRunner = setupShadertoyRunner;
