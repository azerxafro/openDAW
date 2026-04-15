"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
var Dashboard_sass_inline_1 = require("./Dashboard.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var Resources_1 = require("@/ui/dashboard/Resources");
var DemoProjects_1 = require("@/ui/dashboard/DemoProjects");
var className = lib_dom_1.Html.adoptStyleSheet(Dashboard_sass_inline_1.default, "Dashboard");
var Dashboard = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    return (<div className={className}>
            <article>
                <h1>Welcome to openDAW</h1>
                <h2>A new holistic exploration of music creation inside your browser</h2>
                <p style={{ margin: "0.5em 0 0 0" }}>
                    openDAW is an open source web based music studio with a clear focus on <a href="https://opendaw.org/education" target="education">education</a> and <lib_jsx_1.LocalLink href="/privacy">data privacy</lib_jsx_1.LocalLink>,
                    open to everyone with no login required so you can start creating <a href="https://music.opendaw.studio/" target="music">music</a> right away. The studio is still
                    evolving and not production ready yet.
                </p>
                <div className="columns">
                    <DemoProjects_1.DemoProjects lifecycle={lifecycle} service={service}/>
                    <Resources_1.Resources lifecycle={lifecycle} service={service}/>
                </div>
                <p style={{ marginTop: "3em", fontSize: "11px", textAlign: "center" }}>
                    Visit <a href="https://discord.opendaw.studio/" target="discord">Discord</a> and <a href="https://github.com/andremichelle/opendaw" target="github">GitHub</a> for more information.
                    Subscribe to our <a href="https://buttondown.com/opendaw" target="newsletter">Newsletter</a>.
                    Built with ❤️
                </p>
            </article>
        </div>);
};
exports.Dashboard = Dashboard;
