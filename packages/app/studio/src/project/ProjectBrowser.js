"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectBrowser = void 0;
var ProjectBrowser_sass_inline_1 = require("./ProjectBrowser.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var dialogs_1 = require("@/ui/components/dialogs");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var SearchInput_1 = require("@/ui/components/SearchInput");
var ThreeDots_1 = require("@/ui/spinner/ThreeDots");
var className = lib_dom_1.Html.adoptStyleSheet(ProjectBrowser_sass_inline_1.default, "ProjectBrowser");
var ProjectBrowser = function (_a) {
    var service = _a.service, lifecycle = _a.lifecycle, select = _a.select;
    var now = new Date().getTime();
    var filter = new lib_std_1.DefaultObservableValue("");
    return (<div className={className}>
            <div className="filter">
                <SearchInput_1.SearchInput lifecycle={lifecycle} model={filter} style={{ gridColumn: "1 / -1" }}/>
            </div>
            <header>
                <div className="name">Name</div>
                <div className="time">Modified</div>
                <div />
            </header>
            <lib_jsx_1.Await factory={function () { return studio_core_1.ProjectStorage.listProjects(); }} loading={function () { return (<div className="loader"><ThreeDots_1.ThreeDots /></div>); }} failure={function (_a) {
            var reason = _a.reason, retry = _a.retry;
            return (<div className="error" onclick={retry}>
                           {reason instanceof DOMException ? reason.name : String(reason)}
                       </div>);
        }} repeat={function (exec) { return lifecycle.own(lib_std_1.RuntimeSignal
            .subscribe(function (signal) { return signal === studio_core_1.ProjectSignals.StorageUpdated && exec(); })); }} success={function (projects) { return (<lib_jsx_1.Frag>
                           <div className="content">
                               <div className="list">
                                   {projects
                .toSorted(function (a, b) { return -(0, lib_std_1.StringComparator)(a.meta.modified, b.meta.modified); })
                .map(function (_a) {
                var uuid = _a.uuid, meta = _a.meta;
                var icon = <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Delete} className="delete-icon"/>;
                var timeString = lib_std_1.TimeSpan.millis(new Date(meta.modified).getTime() - now).toUnitString();
                var row = (<lib_jsx_1.Group onInit={function (element) { return filter.catchupAndSubscribe(function (owner) {
                        element.classList.toggle("hidden", !meta.name
                            .toLowerCase()
                            .includes(owner.getValue().toLowerCase()));
                    }); }}>
                                                   <div className="labels" onclick={function () { return select([uuid, meta]); }} onInit={function (element) { return lifecycle.own(studio_core_1.ContextMenu.subscribe(element, function (collector) { return collector.addItems(studio_core_1.MenuItem.default({
                        label: "Show UUID"
                    }).setTriggerProcedure(function () { return lib_std_1.RuntimeNotifier.info({
                        headline: meta.name,
                        message: lib_std_1.UUID.toString(uuid)
                    }); })); })); }}>
                                                       <div className="name">{meta.name}</div>
                                                       <div className="time">{timeString}</div>
                                                   </div>
                                                   {icon}
                                               </lib_jsx_1.Group>);
                icon.onclick = function (event) {
                    event.stopPropagation();
                    dialogs_1.Dialogs.approve({
                        headline: "Delete Project?",
                        message: "Are you sure? This cannot be undone."
                    }).then(function (approved) {
                        if (approved) {
                            service.deleteProject(uuid, meta).then(function () { return row.remove(); });
                        }
                    });
                };
                return row;
            })}
                               </div>
                           </div>
                       </lib_jsx_1.Frag>); }}/>
        </div>);
};
exports.ProjectBrowser = ProjectBrowser;
