"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
var Dialog_sass_inline_1 = require("./Dialog.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var Button_tsx_1 = require("@/ui/components/Button.tsx");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(Dialog_sass_inline_1.default, "Dialog");
var Dialog = function (_a, children) {
    var headline = _a.headline, icon = _a.icon, onCancel = _a.onCancel, buttons = _a.buttons, cancelable = _a.cancelable, style = _a.style, growWidth = _a.growWidth, error = _a.error;
    var lifecycle = new lib_std_1.Terminator();
    var dialog = (<dialog className={lib_dom_1.Html.buildClassList(className, error && "error", growWidth && "grow-width")} style={style}>
            <h1><Icon_tsx_1.Icon symbol={icon}/> <span>{headline}</span></h1>
            {children}
            <footer>
                {buttons === null || buttons === void 0 ? void 0 : buttons.map(function (_a) {
            var onClick = _a.onClick, primary = _a.primary, text = _a.text;
            return (<Button_tsx_1.Button lifecycle={lifecycle} onClick={function () { return onClick({ close: function () { return dialog.close(); } }); }} appearance={primary === true ? {
                    framed: true,
                    color: studio_enums_1.Colors.blue
                } : {
                    color: studio_enums_1.Colors.gray
                }}><span>{text}</span></Button_tsx_1.Button>);
        })}
            </footer>
        </dialog>);
    if (cancelable === false) {
        dialog.oncancel = function (event) { return event.preventDefault(); };
    }
    dialog.onkeydown = function (event) {
        if (!(cancelable !== false && event.key === "Escape") && !lib_dom_1.Events.isTextInput(event.target)) {
            if (event.code !== "F12") {
                event.preventDefault();
            }
            event.stopPropagation();
        }
    };
    dialog.onclose = function () {
        lifecycle.terminate();
        if (dialog.returnValue === "") {
            (0, lib_std_1.safeExecute)(onCancel);
        }
        dialog.remove();
    };
    return dialog;
};
exports.Dialog = Dialog;
