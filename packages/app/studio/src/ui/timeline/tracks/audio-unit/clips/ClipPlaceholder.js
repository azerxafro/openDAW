"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipPlaceholder = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var Clip_tsx_1 = require("@/ui/timeline/tracks/audio-unit/clips/Clip.tsx");
var ClipPlaceholder = function (_a) {
    var lifecycle = _a.lifecycle, project = _a.project, adapter = _a.adapter, gridColumn = _a.gridColumn;
    var element = <lib_jsx_1.Group />;
    var terminator = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(adapter.catchupAndSubscribe(function (owner) {
        terminator.terminate();
        var adapter = owner.getValue();
        if ((0, lib_std_1.isDefined)(adapter)) {
            (0, lib_jsx_1.replaceChildren)(element, <Clip_tsx_1.Clip lifecycle={terminator} project={project} adapter={adapter} gridColumn={gridColumn}/>);
        }
        else {
            (0, lib_jsx_1.replaceChildren)(element, <div className="placeholder" style={{ gridColumn: gridColumn }}/>);
        }
    }));
    return element;
};
exports.ClipPlaceholder = ClipPlaceholder;
