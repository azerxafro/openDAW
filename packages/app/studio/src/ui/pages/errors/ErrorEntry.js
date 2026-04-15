"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEntry = void 0;
var ErrorEntry_sass_inline_1 = require("./ErrorEntry.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var dialogs_1 = require("@/ui/components/dialogs");
var Stack_1 = require("@/ui/pages/errors/Stack");
var Logs_1 = require("@/ui/pages/errors/Logs");
var className = lib_dom_1.Html.adoptStyleSheet(ErrorEntry_sass_inline_1.default, "ErrorEntry");
var ErrorEntry = function (_a) {
    var entry = _a.entry;
    var nowTime = new Date().getTime();
    var errorTime = new Date(entry.date).getTime();
    var errorTimeString = lib_std_1.TimeSpan.millis(errorTime - nowTime).toUnitString();
    var buildTimeString = lib_std_1.TimeSpan.millis(new Date(entry.build_date).getTime() - nowTime).toUnitString();
    var userAgent = entry.user_agent.replace(/^Mozilla\/[\d.]+\s*/, "");
    var errorMessage = lib_std_1.Strings.fallback(entry.error_message, "No message");
    return (<div className={className && lib_dom_1.Html.buildClassList("row", entry.fixed === 1 && "fixed")}>
            <div>{entry.id}</div>
            <div>{errorTimeString}</div>
            <div>{buildTimeString}</div>
            <div>{entry.error_name}</div>
            <div className="error-message" title={errorMessage}>{errorMessage}</div>
            <div>{entry.script_tags}</div>
            <div className="browser" title={userAgent}>{userAgent}</div>
            <div style={{ cursor: "pointer" }} onclick={function () { return dialogs_1.Dialogs.show({
            headline: "Error Stack",
            content: (<Stack_1.Stack stack={entry.error_stack}/>)
        }); }}>
                📂
            </div>
            <div style={{ cursor: "pointer" }} onclick={function () {
            var entries = JSON.parse(entry.logs);
            return dialogs_1.Dialogs.show({
                headline: "Logs",
                content: (<Logs_1.Logs errorTime={errorTime} entries={entries.reverse()}/>)
            });
        }}>
                📂
            </div>
            <div style={{ cursor: entry.fixed ? "default" : "pointer" }} onclick={function () {
            if (entry.fixed) {
                return;
            }
            var errorData = {
                id: entry.id,
                date: entry.date,
                build_uuid: entry.build_uuid,
                build_env: entry.build_env,
                build_date: entry.build_date,
                error_name: entry.error_name,
                error_message: entry.error_message,
                error_stack: entry.error_stack,
                user_agent: entry.user_agent,
                script_tags: entry.script_tags,
                logs: entry.logs
            };
            var prompt = "Please help me fix this error in the openDAW codebase.\n\nError Information:\n```json\n".concat(JSON.stringify(errorData, null, 2), "\n```\n\nBefore fixing it, tell me how to reproduce it!\n\nPlease analyze the error stack trace and logs to identify the root cause and suggest a fix.");
            lib_dom_1.Clipboard.writeText(prompt).then(function () {
                lib_std_1.RuntimeNotifier.info({
                    headline: "Prompt Copied",
                    message: "The error information has been copied to clipboard. Paste it into Claude to get help fixing this error."
                });
            });
        }}>
                {entry.fixed ? "Yes 👍" : "No 🙄"}
            </div>
        </div>);
};
exports.ErrorEntry = ErrorEntry;
