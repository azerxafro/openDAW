"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelPlaceholder = void 0;
var PanelPlaceholder_sass_inline_1 = require("./PanelPlaceholder.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var AxisProperty_ts_1 = require("@/ui/workspace/AxisProperty.ts");
var studio_core_1 = require("@opendaw/studio-core");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(PanelPlaceholder_sass_inline_1.default, "PanelPlaceholder");
var PanelPlaceholder = function (_a) {
    var lifecycle = _a.lifecycle, panelContents = _a.panelContents, orientation = _a.orientation, siblings = _a.siblings, panelState = _a.panelState, roomAwareness = _a.roomAwareness;
    var icon = panelState.icon, name = panelState.name, constrains = panelState.constrains, minimizable = panelState.minimizable, popoutable = panelState.popoutable;
    var HeaderSize = 18;
    var container = <lib_jsx_1.Group />;
    var element = <div className={lib_dom_1.Html.buildClassList(className, orientation)} data-panel-type={name}/>;
    var panelContent = panelContents.getByType(panelState.panelType);
    // It works, but it feels misplaced here, because we are updating the siblings as well.
    // The panel system is a weak spot. FIXME Panel-System
    var updateLayout = function () {
        var _a;
        var style = element.style;
        var property = AxisProperty_ts_1.AxisProperty[orientation];
        // Update element style and css-class
        if ((panelState.isMinimized || panelContent.isPopout) && minimizable) {
            style.flexGrow = "0";
            style[property.maxStyle] = style[property.minStyle] = "".concat(HeaderSize, "px");
            element.classList.add("closed");
        }
        else {
            element.classList.remove("closed");
            if (constrains.type === "fixed") {
                style.flexGrow = "0";
                style[property.minStyle] = style[property.maxStyle] = "".concat(constrains.fixedSize + HeaderSize, "px");
            }
            else if (constrains.type === "flex") {
                style.flexGrow = constrains.flex.toString();
                style[property.minStyle] = "".concat(constrains.minSize, "px");
                style[property.maxStyle] = "".concat((_a = constrains.maxSize) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER, "px");
            }
        }
        // Update siblings flexGrow
        var flexible = [];
        siblings.forEach(function (_a) {
            var content = _a.content, style = _a.element.style;
            if (!panelContents.isClosed(content) && content.constrains.type === "flex") {
                flexible.push({ constrains: content.constrains, style: style });
            }
        });
        if (flexible.length === 1) {
            flexible[0].style.flexGrow = "1"; // stretch element to occupy remaining space
        }
        else {
            flexible.forEach(function (_a) {
                var style = _a.style, constrains = _a.constrains;
                return style.flexGrow = constrains.flex.toString();
            });
        }
    };
    var popupLabel = (<div className="popup-label">
				<span>
					{"".concat(panelState.name, " is currently in another window.")}
				</span>
            </div>);
    var popoutIcon = new lib_std_1.DefaultObservableValue(studio_enums_1.IconSymbol.Embed);
    var minimizedIcon = new lib_std_1.DefaultObservableValue(studio_enums_1.IconSymbol.Minimized);
    var handler = lifecycle.own(panelContent.bind(panelState, container, {
        onEmbed: function () {
            if (popupLabel.isConnected) {
                popupLabel.remove();
            }
            popoutIcon.setValue(studio_enums_1.IconSymbol.Embed);
            minimizedIcon.setValue(studio_enums_1.IconSymbol.Minimized);
            updateLayout();
        },
        onPopout: function () {
            if (!panelState.minimizable) {
                container.appendChild(popupLabel);
            }
            popoutIcon.setValue(studio_enums_1.IconSymbol.Popout);
            updateLayout();
        },
        onMinimized: function () {
            if (popupLabel.isConnected) {
                popupLabel.remove();
            }
            popoutIcon.setValue(studio_enums_1.IconSymbol.Embed);
            minimizedIcon.setValue(studio_enums_1.IconSymbol.Maximized);
            updateLayout();
        }
    }));
    var presenceDots = <div className="presence-dots"/>;
    var header = (<header>
                <Icon_tsx_1.Icon symbol={icon}/> <span>{name}</span> {presenceDots}
            </header>);
    var roomLifecycle = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(roomAwareness.catchupAndSubscribe(function (owner) {
        roomLifecycle.terminate();
        var awareness = owner.getValue();
        if ((0, lib_std_1.isDefined)(awareness)) {
            var render_1 = function () {
                var states = awareness.awareness.getStates();
                var localId = awareness.clientID;
                var dots = [];
                states.forEach(function (state, clientId) {
                    var user = state.user;
                    if ((0, lib_std_1.isDefined)(user) && user.panel === name) {
                        dots.push({ userName: user.name, color: user.color, self: clientId === localId });
                    }
                });
                dots.sort(function (first, second) { return first.self === second.self ? 0 : first.self ? -1 : 1; });
                lib_jsx_1.replaceChildren.apply(void 0, __spreadArray([presenceDots], dots.map(function (dot) { return (<span className="dot" style={{ backgroundColor: dot.color }} title={dot.userName}/>); }), false));
            };
            var awarenessApi_1 = awareness.awareness;
            awarenessApi_1.on("change", render_1);
            roomLifecycle.own({ terminate: function () { return awarenessApi_1.off("change", render_1); } });
            render_1();
        }
        else {
            (0, lib_jsx_1.replaceChildren)(presenceDots);
        }
    }));
    (0, lib_jsx_1.appendChildren)(element, <lib_jsx_1.Frag>{header}{container}</lib_jsx_1.Frag>);
    lifecycle.own(lib_dom_1.Events.subscribe(header, "dblclick", function () { return handler.toggleMinimize(); }));
    lifecycle.own(studio_core_1.ContextMenu.subscribe(header, function (collector) { return collector.addItems(studio_core_1.MenuItem.default({
        label: "Popout into new browser window",
        checked: handler.isPopout(),
        hidden: !lib_dom_1.Browser.isWeb(),
        selectable: popoutable
    }).setTriggerProcedure(handler.togglePopout)); }));
    return element;
};
exports.PanelPlaceholder = PanelPlaceholder;
