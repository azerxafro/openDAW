"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showTone3000Dialog = void 0;
var Tone3000Dialog_sass_inline_1 = require("./Tone3000Dialog.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var dialogs_1 = require("@/ui/components/dialogs");
var className = lib_dom_1.Html.adoptStyleSheet(Tone3000Dialog_sass_inline_1.default, "Tone3000Dialog");
var showTone3000Dialog = function () {
    return dialogs_1.Dialogs.show({
        headline: "Tone 3000",
        okText: "Open Tone 3000",
        cancelable: true,
        growWidth: true,
        buttons: [{ text: "Cancel", onClick: function (handler) { return handler.close(); } }],
        content: (<div className={className}>
                <p>
                    openDAW partners with <strong>Tone 3000</strong> for NAM models.
                </p>
                <p>
                    <strong>Tone 3000</strong> is an online platform for sharing and downloading
                    NAM captures.<br />
                    Browse thousands of amp, pedal, and full-rig tones from the community.
                </p>
                <div>
                    <strong>How it works:</strong>
                    <ol>
                        <li>Sign in with your email (one-time passcode, no password needed)</li>
                        <li>Browse or search for a tone</li>
                        <li>Click the <strong>Download</strong> button to send it back to your device</li>
                    </ol>
                </div>
                <p className="hint">
                    Make sure popups are enabled for this site.
                </p>
            </div>)
    });
};
exports.showTone3000Dialog = showTone3000Dialog;
