"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueEventsEditor = void 0;
var ValueEventsEditor_sass_inline_1 = require("./ValueEventsEditor.sass?inline");
var ValueEditor_tsx_1 = require("@/ui/timeline/editors/value/ValueEditor.tsx");
var ValueEditorHeader_tsx_1 = require("@/ui/timeline/editors/value/ValueEditorHeader.tsx");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ValueEventsEditor_sass_inline_1.default, "ValueEventsEditor");
var ValueEventsEditor = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, context = _a.context, editMenu = _a.menu.editMenu, range = _a.range, snapping = _a.snapping, eventMapping = _a.eventMapping, reader = _a.reader;
    return (<div className={className}>
            <ValueEditorHeader_tsx_1.ValueEditorHeader lifecycle={lifecycle} service={service} context={context}/>
            <ValueEditor_tsx_1.ValueEditor lifecycle={lifecycle} service={service} range={range} snapping={snapping} eventMapping={eventMapping} context={context} reader={reader} editMenu={editMenu}/>
        </div>);
};
exports.ValueEventsEditor = ValueEventsEditor;
