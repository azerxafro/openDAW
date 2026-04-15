"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WiringFlyout = void 0;
var WiringFlyout_sass_inline_1 = require("./WiringFlyout.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(WiringFlyout_sass_inline_1.default, "WiringFlyout");
var ConnectionIndicator = function (_a) { return (<svg classList="connection" viewBox="0 0 32 16" width={28} height={14}>
        <circle cx="7" cy="8" r="4" fill="currentColor"/>
        <circle cx="25" cy="8" r="4" fill="currentColor"/>
        <line x1="11" y1="8" x2="21" y2="8"/>
    </svg>); };
var WiringFlyout = function (_a) {
    var autoTerminator = _a.autoTerminator, environment = _a.environment, connectorAdapter = _a.connectorAdapter, position = _a.position;
    var connections = connectorAdapter.connections;
    var catchAll = <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.DragConnections} style={{ pointerEvents: "all" }}/>;
    catchAll.classList.toggle("hidden", connections.length < 2 || true); // TODO Drag multiple connections
    var connectionCatcher = (<div className="connections">
            {connections.toSorted(function (a, b) {
            var counterpartA = a.target === connectorAdapter.field ? a.source : a.target;
            var counterpartB = b.source === connectorAdapter.field ? b.target : b.source;
            var ya = environment.findConnectorByViewAddress(counterpartA.address).pinPoint.y;
            var yb = environment.findConnectorByViewAddress(counterpartB.address).pinPoint.y;
            return ya - yb;
        }).map(function (connection) {
            var button = <ConnectionIndicator connection={connection}/>;
            autoTerminator.own(lib_dom_1.Events.subscribe(button, "pointerover", function () {
                var terminable = environment.highlightWire(connection);
                lib_dom_1.Events.subscribe(button, "pointerout", function () { terminable.terminate(); }, { once: true });
            }));
            autoTerminator.own(lib_dom_1.Events.subscribe(button, "pointerdown", function (event) {
                environment.beginRewiring(connection, connectorAdapter, lib_std_1.Point.fromClient(event));
                autoTerminator.terminate();
            }));
            return button;
        })}
        </div>);
    connectionCatcher.classList.toggle("hidden", connections.length === 0);
    var newConnection = (<svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
            <circle cx={12} cy={12} r={10} fill="black"/>
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path>
        </svg>);
    autoTerminator.own(lib_dom_1.Events.subscribe(newConnection, "pointerdown", function (event) {
        environment.beginWiring(connectorAdapter, lib_std_1.Point.fromClient(event));
        autoTerminator.terminate();
    }));
    var element = (<div className={className} style={{ top: "".concat(position.y, "px"), left: "".concat(position.x, "px") }} tabIndex={-1}>
            {catchAll}
            {connectionCatcher}
            {newConnection}
        </div>);
    element.onblur = function () { return autoTerminator.terminate(); };
    autoTerminator.own(lib_dom_1.Html.watchResize(element, function () { return element.focus(); }));
    autoTerminator.own({ terminate: function () { return element.remove(); } });
    return element;
};
exports.WiringFlyout = WiringFlyout;
