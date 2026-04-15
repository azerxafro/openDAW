"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var WorkspacePage_tsx_1 = require("@/ui/workspace/WorkspacePage.tsx");
var ComponentsPage_tsx_1 = require("@/ui/pages/ComponentsPage.tsx");
var IconsPage_tsx_1 = require("@/ui/pages/IconsPage.tsx");
var AutomationPage_tsx_1 = require("@/ui/pages/AutomationPage.tsx");
var SampleUploadPage_tsx_1 = require("@/ui/pages/SampleUploadPage.tsx");
var Footer_1 = require("@/ui/Footer");
var RoomStatus_1 = require("@/ui/RoomStatus");
var ChatOverlay_1 = require("@/ui/ChatOverlay");
var ManualPage_1 = require("@/ui/pages/ManualPage");
var ColorsPage_1 = require("@/ui/pages/ColorsPage");
var Header_1 = require("@/ui/header/Header");
var ErrorsPage_tsx_1 = require("@/ui/pages/ErrorsPage.tsx");
var ImprintPage_tsx_1 = require("@/ui/pages/ImprintPage.tsx");
var GraphPage_1 = require("@/ui/pages/GraphPage");
var CodeEditorPage_1 = require("@/ui/pages/CodeEditorPage");
var OpenBundlePage_1 = require("@/ui/pages/OpenBundlePage");
var DashboardPage_1 = require("@/ui/pages/stats/DashboardPage");
var PrivacyPage_1 = require("@/ui/pages/PrivacyPage");
var PreferencesPage_1 = require("@/ui/pages/PreferencesPage");
var TestPage_1 = require("@/ui/pages/TestPage");
var JoinRoomPage_1 = require("@/ui/pages/JoinRoomPage");
var PerformancePage_1 = require("@/ui/pages/PerformancePage");
var App = function (service) {
    var terminator = new lib_std_1.Terminator();
    var favicon = document.querySelector("link[rel='icon']");
    if ((0, lib_std_1.isDefined)(favicon)) {
        terminator.own(service.roomAwareness.catchupAndSubscribe(function (owner) {
            return favicon.href = (0, lib_std_1.isDefined)(owner.getValue()) ? "/favicon-live.svg" : "/favicon.svg";
        }));
    }
    return (<lib_jsx_1.Frag>
            <Header_1.Header lifecycle={new lib_std_1.Terminator()} service={service}/>
            <lib_jsx_1.Router runtime={terminator} service={service} fallback={function () { return (<div style={{ flex: "1 0 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <span style={{ fontSize: "50vmin" }}>404</span>
                    </div>); }} routes={[
            { path: "/", factory: WorkspacePage_tsx_1.WorkspacePage },
            { path: "/manuals/*", factory: ManualPage_1.ManualPage },
            { path: "/preferences", factory: PreferencesPage_1.PreferencesPage },
            { path: "/imprint", factory: ImprintPage_tsx_1.ImprintPage },
            { path: "/privacy", factory: PrivacyPage_1.PrivacyPage },
            { path: "/icons", factory: IconsPage_tsx_1.IconsPage },
            { path: "/code", factory: CodeEditorPage_1.CodeEditorPage },
            { path: "/scripting", factory: CodeEditorPage_1.CodeEditorPage },
            { path: "/components", factory: ComponentsPage_tsx_1.ComponentsPage },
            { path: "/automation", factory: AutomationPage_tsx_1.AutomationPage },
            { path: "/errors", factory: ErrorsPage_tsx_1.ErrorsPage },
            { path: "/upload", factory: SampleUploadPage_tsx_1.SampleUploadPage },
            { path: "/colors", factory: ColorsPage_1.ColorsPage },
            { path: "/graph", factory: GraphPage_1.GraphPage },
            { path: "/stats", factory: DashboardPage_1.DashboardPage },
            {
                path: "/users", factory: function (context) {
                    history.replaceState(null, "", "/stats");
                    return (0, DashboardPage_1.DashboardPage)(context);
                }
            },
            { path: "/open-bundle/*", factory: OpenBundlePage_1.OpenBundlePage },
            { path: "/test", factory: TestPage_1.TestPage },
            { path: "/performance", factory: PerformancePage_1.PerformancePage },
            { path: "/join/*", factory: JoinRoomPage_1.JoinRoomPage }
        ]}/>
            <ChatOverlay_1.ChatOverlay lifecycle={terminator} service={service}/>
            <RoomStatus_1.RoomStatus lifecycle={terminator} service={service}/>
            <Footer_1.Footer lifecycle={terminator} service={service}/>
        </lib_jsx_1.Frag>);
};
exports.App = App;
