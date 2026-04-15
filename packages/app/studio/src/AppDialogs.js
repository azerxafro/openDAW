"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showStoragePersistDialog = void 0;
var Dialog_1 = require("@/ui/components/Dialog");
var studio_enums_1 = require("@opendaw/studio-enums");
var Surface_1 = require("@/ui/surface/Surface");
var lib_runtime_1 = require("@opendaw/lib-runtime");
var showStoragePersistDialog = function () {
    var _a = Promise.withResolvers(), resolve = _a.resolve, promise = _a.promise;
    var dialog = (<Dialog_1.Dialog headline="Firefox Denies Storage Access" icon={studio_enums_1.IconSymbol.System} cancelable={false} growWidth={true} buttons={[{
                text: "Allow",
                primary: true,
                onClick: function (handler) { return lib_runtime_1.Promises.tryCatch(navigator.storage.persist()).then(function (_a) {
                    var status = _a.status, value = _a.value;
                    if (status === "resolved" && value) {
                        console.debug("Firefox now persists storage.");
                        handler.close();
                        resolve();
                    }
                }); }
            }]}>
            <div style={{ padding: "1em 0" }}>
                <h2 style={{ color: studio_enums_1.Colors.red.toString() }}>Data loss is probable if you do not take action.</h2>
                <p>To make this a permanent friendship, please go to:</p>
                <p style={{ color: studio_enums_1.Colors.yellow.toString() }}>Preferences - Privacy & Security - Cookies & Site Data -
                    Manage
                    Exceptions...</p>
                <p>and add opendaw.studio to the list. You will never be bothered again.</p>
            </div>
        </Dialog_1.Dialog>);
    Surface_1.Surface.get().body.appendChild(dialog);
    dialog.showModal();
    return promise;
};
exports.showStoragePersistDialog = showStoragePersistDialog;
