"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureContextMenu = void 0;
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var lib_std_1 = require("@opendaw/lib-std");
var debug_1 = require("@/ui/menu/debug");
var Surface_1 = require("@/ui/surface/Surface");
var FloatingTextInput_1 = require("@/ui/components/FloatingTextInput");
var SignatureContextMenu;
(function (SignatureContextMenu) {
    var PresetSignatures = [
        [4, 4], [3, 4], [2, 4], [6, 8], [5, 4], [7, 8], [12, 8]
    ];
    SignatureContextMenu.install = function (element, range, capturing, editing, trackAdapter) {
        return studio_core_1.ContextMenu.subscribe(element, function (_a) {
            var addItems = _a.addItems, client = _a.client;
            var signature = capturing.captureEvent(client);
            if (signature === null) {
                return;
            }
            var optAdapter = trackAdapter.adapterAt(signature.index);
            addItems(studio_core_1.MenuItem.default({ label: "Edit Signature" }).setTriggerProcedure(function () {
                var resolvers = Promise.withResolvers();
                var clientRect = element.getBoundingClientRect();
                Surface_1.Surface.get(element).flyout.appendChild((0, FloatingTextInput_1.FloatingTextInput)({
                    position: {
                        x: range.unitToX(signature.accumulatedPpqn) + clientRect.left,
                        y: clientRect.top + clientRect.height / 2
                    },
                    value: "".concat(signature.nominator, "/").concat(signature.denominator),
                    resolvers: resolvers
                }));
                resolvers.promise.then(function (value) {
                    var attempt = studio_adapters_1.Parsing.parseTimeSignature(value);
                    if (attempt.isSuccess()) {
                        var _a = attempt.result(), nominator_1 = _a[0], denominator_1 = _a[1];
                        optAdapter.match({
                            none: function () { return editing.modify(function () { return trackAdapter.changeSignature(nominator_1, denominator_1); }); },
                            some: function (adapter) {
                                editing.modify(function () {
                                    var box = adapter.box;
                                    box.nominator.setValue(nominator_1);
                                    box.denominator.setValue(denominator_1);
                                });
                            }
                        });
                    }
                }, lib_std_1.EmptyExec);
            }), studio_core_1.MenuItem.default({ label: "Presets" }).setRuntimeChildrenProcedure(function (parent) {
                parent.addMenuItem.apply(parent, PresetSignatures.map(function (_a) {
                    var nominator = _a[0], denominator = _a[1];
                    return studio_core_1.MenuItem.default({
                        label: "".concat(nominator, "/").concat(denominator),
                        checked: signature.nominator === nominator && signature.denominator === denominator
                    }).setTriggerProcedure(function () {
                        optAdapter.match({
                            none: function () { return editing.modify(function () { return trackAdapter.changeSignature(nominator, denominator); }); },
                            some: function (adapter) {
                                editing.modify(function () {
                                    var box = adapter.box;
                                    box.nominator.setValue(nominator);
                                    box.denominator.setValue(denominator);
                                });
                            }
                        });
                    });
                }));
            }));
            if (optAdapter.nonEmpty()) {
                addItems(studio_core_1.MenuItem.default({ label: "Delete" }).setTriggerProcedure(function () { return optAdapter.ifSome(function (adapter) {
                    return editing.modify(function () { return trackAdapter.deleteAdapter(adapter); });
                }); }), debug_1.DebugMenus.debugBox(optAdapter.unwrap().box));
            }
        });
    };
})(SignatureContextMenu || (exports.SignatureContextMenu = SignatureContextMenu = {}));
