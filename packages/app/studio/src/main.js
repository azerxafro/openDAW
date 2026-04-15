"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./main.sass");
var workers_main_js_worker_url_1 = require("@opendaw/studio-core/workers-main.js?worker&url");
var processors_js_url_1 = require("@opendaw/studio-core/processors.js?url");
var offline_engine_js_worker_url_1 = require("@opendaw/studio-core/offline-engine.js?worker&url");
var boot_1 = require("@/boot");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
if (lib_dom_1.Browser.isMobile()) {
    document.body.innerHTML = "<div style=\"display:flex;align-items:center;justify-content:center;height:100vh;padding:2em;text-align:center;font-family:system-ui;color:#ccc;background:#1a1a1a\">\n        <div><h1>LUCID DAW</h1><p>LUCID DAW requires a desktop browser.<br>Please visit on a computer.</p></div>\n    </div>";
}
else if (window.crossOriginIsolated) {
    var now_1 = Date.now();
    (0, studio_enums_1.initializeColors)(document.documentElement);
    (0, boot_1.boot)({
        workersUrl: workers_main_js_worker_url_1.default,
        workletsUrl: processors_js_url_1.default,
        offlineEngineUrl: offline_engine_js_worker_url_1.default
    }).then(function () { return console.debug("Booted in ".concat(Math.ceil(Date.now() - now_1), "ms")); });
}
else {
    alert("crossOriginIsolated must be enabled");
}
