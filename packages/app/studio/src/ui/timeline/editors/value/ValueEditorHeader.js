"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueEditorHeader = void 0;
var ValueEditorHeader_sass_inline_1 = require("./ValueEditorHeader.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ValueEditorHeader_sass_inline_1.default, "ValueEditorHeader");
var ValueEditorHeader = function (_a) {
    var lifecycle = _a.lifecycle, context = _a.context;
    var _b = lib_dom_1.ModfierKeys.System, Cmd = _b.Cmd, Opt = _b.Opt, Shift = _b.Shift;
    var name = <p />;
    var element = (<div className={className}>
            <p className="help-section manual">
                Double-click to create/delete value.<br />
                {Shift} click on segment to cut.<br />
                {Cmd} + drag to paint events.<br />
                Drag + {Cmd} to copy events.<br />
                Optional hold {Shift} to disable value snapping or hold {Opt} to contrain movement to time.
            </p>
        </div>);
    lifecycle.own(context.catchupAndSubscribeValueAssignment(function (optAssignment) {
        if (optAssignment.isEmpty()) {
            name.textContent = "Unassigned";
        }
        else {
            var assignment = optAssignment.unwrap();
            name.textContent = "Name: \"".concat(assignment.adapter.name, "\"");
        }
    }));
    return element;
};
exports.ValueEditorHeader = ValueEditorHeader;
