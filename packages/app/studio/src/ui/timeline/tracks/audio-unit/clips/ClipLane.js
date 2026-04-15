"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipLane = void 0;
var ClipLane_sass_inline_1 = require("./ClipLane.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var ClipPlaceholder_tsx_1 = require("@/ui/timeline/tracks/audio-unit/clips/ClipPlaceholder.tsx");
var ClipModifyStrategy_ts_1 = require("@/ui/timeline/tracks/audio-unit/clips/ClipModifyStrategy.ts");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ClipLane_sass_inline_1.default, "ClipLane");
var ClipLane = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service, trackManager = _a.trackManager, adapter = _a.adapter;
    var project = service.project, clips = service.timeline.clips;
    var container = (<div className={className}/>);
    var runtime = lifecycle.own(new lib_std_1.Terminator());
    var cells = [];
    var restockPlaceholders = function (count) {
        for (var index = cells.length; index < count; index++) {
            var terminator = lifecycle.spawn();
            var adapter_1 = new lib_std_1.DefaultObservableValue(null);
            var placeholder = (<ClipPlaceholder_tsx_1.ClipPlaceholder lifecycle={terminator} project={project} adapter={adapter_1} gridColumn={"".concat(index + 1, " / ").concat(index + 2)}/>);
            container.appendChild(placeholder);
            (0, lib_std_1.assert)(!(0, lib_std_1.isDefined)(cells[index]), "Cannot restock busy placeholder.");
            cells[index] = { terminator: terminator, placeholder: placeholder, adapter: adapter_1 };
        }
    };
    var populatePlaceholder = function () {
        var updates = lib_std_1.Arrays.create(function () { return null; }, cells.length);
        var update = function (strategy, filterSelected, hideSelected) {
            var listIndex = adapter.listIndex;
            var translateTrackIndex = strategy.translateTrackIndex(listIndex);
            var optTrack = trackManager.getByIndex(translateTrackIndex);
            if (optTrack.isEmpty()) {
                return;
            }
            var clips = optTrack.unwrap().trackBoxAdapter.clips.collection.adapters();
            for (var _i = 0, clips_1 = clips; _i < clips_1.length; _i++) {
                var clip = clips_1[_i];
                if (clip.isSelected ? hideSelected : !filterSelected) {
                    continue;
                }
                var index = strategy.readClipIndex(clip);
                if (index < cells.length) {
                    var selected = clip.isSelected && !filterSelected;
                    var mirrored = strategy.readMirror(clip);
                    updates[index] = { clip: clip, selected: selected, mirrored: mirrored };
                }
            }
        };
        var modifier = trackManager.currentClipModifier;
        var strategies = modifier.unwrapOrElse(ClipModifyStrategy_ts_1.ClipModifyStrategies.Identity);
        update(strategies.unselectedModifyStrategy(), true, !strategies.showOrigin());
        update(strategies.selectedModifyStrategy(), false, false);
        updates.forEach(function (update, index) {
            if ((0, lib_std_1.isDefined)(update)) {
                var clip = update.clip, selected = update.selected, mirrored = update.mirrored;
                var _a = cells[index], adapter_2 = _a.adapter, placeholder = _a.placeholder;
                adapter_2.setValue(clip);
                // Let's override the selection status by knowing the HTML structure 😬
                var clipElement = placeholder.firstElementChild;
                clipElement === null || clipElement === void 0 ? void 0 : clipElement.classList.toggle("selected", selected);
                clipElement === null || clipElement === void 0 ? void 0 : clipElement.classList.toggle("mirrored", mirrored);
            }
            else {
                cells[index].adapter.setValue(null);
            }
        });
    };
    var depletePlaceholders = function (count) { return cells
        .splice(count)
        .forEach(function (_a) {
        var adapter = _a.adapter, placeholder = _a.placeholder, terminator = _a.terminator;
        if ((0, lib_std_1.isDefined)(adapter.getValue())) {
            adapter.setValue(null);
        }
        placeholder.remove();
        terminator.terminate();
    }); };
    var clipsCount = clips.count;
    var requestRebuild = (0, lib_dom_1.deferNextFrame)(function () {
        var count = clipsCount.getValue();
        restockPlaceholders(count);
        populatePlaceholder();
        depletePlaceholders(count);
    }).request;
    lifecycle.own(clips.visible.catchupAndSubscribe(function (owner) {
        runtime.terminate();
        if (owner.getValue()) {
            runtime.ownAll(clipsCount.catchupAndSubscribe(requestRebuild), adapter.clips.subscribeChanges(requestRebuild), adapter.clips.collection.catchupAndSubscribe({
                onAdd: function (_adapter) { return requestRebuild(); },
                onRemove: function (removed) {
                    var _a, _b;
                    return (_b = (_a = cells
                        .find(function (_a) {
                        var adapter = _a.adapter;
                        return adapter.getValue() === removed;
                    })) === null || _a === void 0 ? void 0 : _a.adapter) === null || _b === void 0 ? void 0 : _b.setValue(null);
                },
                onReorder: function (_adapter) { return requestRebuild(); }
            }), {
                terminate: function () {
                    cells.forEach(function (_a) {
                        var adapter = _a.adapter, placeholder = _a.placeholder, terminator = _a.terminator;
                        adapter.setValue(null);
                        placeholder.remove();
                        terminator.terminate();
                    });
                    lib_std_1.Arrays.clear(cells);
                }
            });
            requestRebuild();
        }
    }));
    return container;
};
exports.ClipLane = ClipLane;
