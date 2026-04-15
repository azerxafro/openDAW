"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragAndDrop = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var DragAndDrop;
(function (DragAndDrop) {
    var dragging = lib_std_1.Option.None;
    var hasFiles = function (event) {
        var _a, _b;
        var type = (_b = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.types) === null || _b === void 0 ? void 0 : _b.at(0);
        return type === "Files" || type === "application/x-moz-file";
    };
    var extractFiles = function (event) {
        var dataTransfer = event.dataTransfer;
        if (!(0, lib_std_1.isDefined)(dataTransfer)) {
            return lib_std_1.Arrays.empty();
        }
        if (hasFiles(event)) {
            return Array.from(dataTransfer.files);
        }
        return lib_std_1.Arrays.empty();
    };
    DragAndDrop.installSource = function (element, provider, classReceiver) {
        classReceiver !== null && classReceiver !== void 0 ? classReceiver : (classReceiver = element);
        element.draggable = true;
        return lib_std_1.Terminable.many(lib_dom_1.Events.subscribe(element, "dragend", function () {
            classReceiver.classList.remove("dragging");
            dragging = lib_std_1.Option.None;
        }), lib_dom_1.Events.subscribe(element, "dragstart", function (event) {
            var dataTransfer = event.dataTransfer;
            if (!(0, lib_std_1.isDefined)(dataTransfer)) {
                return;
            }
            dataTransfer.setData("application/json", "{custom: true}");
            dataTransfer.effectAllowed = "copyMove";
            classReceiver.classList.add("dragging");
            dragging = lib_std_1.Option.wrap(provider());
        }));
    };
    DragAndDrop.installTarget = function (element, process) {
        var count = 0 | 0;
        return lib_std_1.Terminable.many(lib_dom_1.Events.subscribe(element, "dragenter", function (event) {
            if (count++ === 0) {
                process.enter(dragging.match({
                    none: function () { return hasFiles(event) && process.drag(event, {
                        type: "file",
                        file: (0, lib_std_1.InaccessibleProperty)("Cannot access file while dragging")
                    }); },
                    some: function (data) { return process.drag(event, data); }
                }));
            }
        }), lib_dom_1.Events.subscribe(element, "dragover", function (event) {
            var dataTransfer = event.dataTransfer;
            if (!(0, lib_std_1.isDefined)(dataTransfer)) {
                return;
            }
            dragging.match({
                none: function () {
                    if (hasFiles(event) && process.drag(event, {
                        type: "file",
                        file: (0, lib_std_1.InaccessibleProperty)("Cannot access file while dragging")
                    })) {
                        event.preventDefault();
                        dataTransfer.dropEffect = "copy";
                    }
                },
                some: function (data) {
                    if (process.drag(event, data)) {
                        event.preventDefault();
                        dataTransfer.dropEffect = event.altKey || data.copy === true ? "copy" : "move";
                    }
                }
            });
        }), lib_dom_1.Events.subscribe(element, "dragleave", function (_event) {
            if (--count === 0) {
                process.leave();
            }
        }), lib_dom_1.Events.subscribe(element, "drop", function (event) {
            dragging.match({
                none: function () {
                    var files = extractFiles(event);
                    if (files.length === 0) {
                        return;
                    }
                    var data = { type: "file", file: files[0] };
                    if (process.drag(event, data)) {
                        event.preventDefault();
                        process.drop(event, data);
                        dragging = lib_std_1.Option.None;
                    }
                },
                some: function (data) {
                    if (process.drag(event, data)) {
                        event.preventDefault();
                        process.drop(event, data);
                        dragging = lib_std_1.Option.None;
                    }
                }
            });
            if (count > 0) {
                process.leave();
                count = 0;
            }
        }), lib_dom_1.Events.subscribe(element, "dragend", function (_event) { return count = 0; }, { capture: true }));
    };
    DragAndDrop.findInsertLocation = function (_a, parent, limit) {
        var _b;
        var clientX = _a.clientX;
        var elements = Array.from(parent.querySelectorAll("[data-drag]"));
        var _c = limit !== null && limit !== void 0 ? limit : [0, elements.length], minIndex = _c[0], maxIndex = _c[1];
        var index = minIndex;
        while (true) {
            var child = (_b = elements[index]) !== null && _b !== void 0 ? _b : null;
            if (index >= maxIndex) {
                return [index, child];
            }
            var rect = child.getBoundingClientRect();
            var center = (rect.left + rect.right) / 2;
            if (clientX < center) {
                return [index, child];
            }
            index++;
        }
    };
})(DragAndDrop || (exports.DragAndDrop = DragAndDrop = {}));
