"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spotlight = void 0;
var Spotlight_sass_inline_1 = require("./Spotlight.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(Spotlight_sass_inline_1.default, "Spotlight");
var Spotlight;
(function (Spotlight) {
    Spotlight.install = function (surface, service) {
        var position = lib_std_1.Point.create(surface.width / 2, surface.height / 3);
        var current = null;
        return lib_std_1.Terminable.many(lib_dom_1.Events.subscribe(surface.owner, "keydown", function (event) {
            var shiftEnter = event.shiftKey && event.code === "Enter";
            var cmdKeyF = lib_dom_1.Keyboard.isControlKey(event) && event.code === "KeyF";
            if (shiftEnter || cmdKeyF) {
                event.preventDefault();
                if (current === null) {
                    var terminator = new lib_std_1.Terminator();
                    terminator.own({ terminate: function () { return current = null; } });
                    current = (<Spotlight.View terminator={terminator} surface={surface} service={service} position={position}/>);
                }
                else {
                    current.blur();
                    current === null || current === void 0 ? void 0 : current.querySelectorAll("*").forEach(function (element) { return element.blur(); });
                }
            }
        }, { capture: true }));
    };
    Spotlight.View = function (_a) {
        var terminator = _a.terminator, surface = _a.surface, service = _a.service, position = _a.position;
        var inputField = (<input type="text" value="" placeholder="Search anything..."/>);
        var result = (<div className="result hidden"/>);
        var element = (<div className={className} tabindex={-1}>
                <header>
                    <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.OpenDAW}/>
                    {inputField}
                </header>
                {result}
            </div>);
        var updatePosition = function () { return element.style.transform = "translate(".concat(position.x, "px, ").concat(position.y, "px)"); };
        updatePosition();
        terminator.ownAll(lib_dom_1.Dragging.attach(element, function (_a) {
            var clientX = _a.clientX, clientY = _a.clientY;
            var tx = position.x;
            var ty = position.y;
            return lib_std_1.Option.wrap({
                update: function (event) {
                    position.x = tx + event.clientX - clientX;
                    position.y = ty + event.clientY - clientY;
                    updatePosition();
                },
                cancel: function () {
                    position.x = tx;
                    position.y = ty;
                    updatePosition();
                },
                finally: function () { return inputField.focus(); }
            });
        }), lib_dom_1.Events.subscribe(inputField, "input", function () {
            var results = service.spotlightDataSupplier.query(inputField.value);
            var hasResults = results.length === 0;
            result.classList.toggle("hidden", hasResults);
            (0, lib_jsx_1.replaceChildren)(result, results.map(function (_a) {
                var icon = _a.icon, name = _a.name;
                return (<div className="result-item">
                        <Icon_tsx_1.Icon symbol={icon}/>
                        <span>{name}</span>
                    </div>);
            }));
        }), lib_dom_1.Events.subscribe(inputField, "keydown", function (event) {
            if (event.code === "Enter") {
                var results = service.spotlightDataSupplier.query(inputField.value); // TODO keep from last search
                if (results.length > 0) {
                    results[0].exec();
                    terminator.terminate();
                }
            }
            else if (event.code === "CursorDown") {
            }
        }), lib_dom_1.Events.subscribe(element, "focusout", function (event) {
            var relatedTarget = event.relatedTarget;
            if (relatedTarget === null) {
                terminator.terminate();
            }
            else if (relatedTarget instanceof Element) {
                if (!relatedTarget.contains(element) && !element.contains(relatedTarget)) {
                    terminator.terminate();
                }
            }
        }), {
            terminate: function () {
                if (element.isConnected) {
                    element.remove();
                }
            }
        });
        requestAnimationFrame(function () {
            inputField.focus();
            inputField.select();
        });
        (0, lib_jsx_1.appendChildren)(surface.flyout, element);
        return element;
    };
})(Spotlight || (exports.Spotlight = Spotlight = {}));
