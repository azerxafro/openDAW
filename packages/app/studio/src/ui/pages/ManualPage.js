"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualPage = void 0;
var ManualPage_sass_inline_1 = require("./ManualPage.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var ThreeDots_1 = require("@/ui/spinner/ThreeDots");
var BackButton_1 = require("@/ui/pages/BackButton");
var Markdown_1 = require("@/ui/Markdown");
var Manuals_1 = require("@/ui/pages/Manuals");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var lib_std_1 = require("@opendaw/lib-std");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var className = lib_dom_1.Html.adoptStyleSheet(ManualPage_sass_inline_1.default, "ManualPage");
var addManuals = function (manuals) { return manuals.map(function (manual) {
    if (manual.type === "page") {
        return (<lib_jsx_1.Frag>
                {manual.separatorBefore && <hr />}
                <lib_jsx_1.LocalLink href={manual.path}>{manual.label}</lib_jsx_1.LocalLink>
            </lib_jsx_1.Frag>);
    }
    else if (manual.type === "folder") {
        return (<lib_jsx_1.Frag>
                {manual.separatorBefore && <hr />}
                <details open>
                    <summary>{manual.label}</summary>
                    <nav>{...addManuals(manual.files)}</nav>
                </details>
            </lib_jsx_1.Frag>);
    }
    else {
        return (0, lib_std_1.panic)();
    }
}); };
var ManualPage = function (_a) {
    var service = _a.service, path = _a.path;
    return (<div className={className}>
            <aside>
                <BackButton_1.BackButton />
                <nav>
                    <lib_jsx_1.LocalLink href="/manuals/">⇱</lib_jsx_1.LocalLink>
                    <hr />
                    {addManuals(Manuals_1.Manuals)}
                </nav>
            </aside>
            <div className="manual">
                {path === "/manuals/" ? (<p>Select a topic in the side bar...</p>) : (<lib_jsx_1.Await factory={function () { return lib_runtime_1.network.defaultFetch("".concat(path !== null && path !== void 0 ? path : "index", ".md?uuid=").concat(service.buildInfo.uuid))
                .then(function (x) { return x.text(); }); }} failure={function (error) { return "Unknown request (".concat(error.reason, ")"); }} loading={function () { return <ThreeDots_1.ThreeDots />; }} success={function (text) { return <Markdown_1.Markdown text={text} actions={{
                    "open-preferences": function () { return lib_jsx_1.RouteLocation.get().navigateTo("/preferences"); },
                    "backup-google-drive": function () { return studio_core_1.CloudBackup.backup(service.cloudAuthManager, "GoogleDrive").catch(lib_std_1.EmptyExec); },
                    "backup-dropbox": function () { return studio_core_1.CloudBackup.backup(service.cloudAuthManager, "Dropbox").catch(lib_std_1.EmptyExec); }
                }}/>; }}/>)}
            </div>
        </div>);
};
exports.ManualPage = ManualPage;
