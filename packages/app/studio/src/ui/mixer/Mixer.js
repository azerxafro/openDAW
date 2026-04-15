"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixer = void 0;
var Mixer_sass_inline_1 = require("./Mixer.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var ChannelStrip_tsx_1 = require("@/ui/mixer/ChannelStrip.tsx");
var lib_box_1 = require("@opendaw/lib-box");
var Scroller_tsx_1 = require("@/ui/components/Scroller.tsx");
var ScrollModel_ts_1 = require("@/ui/components/ScrollModel.ts");
var DragAndDrop_1 = require("@/ui/DragAndDrop");
var AutoScroll_1 = require("@/ui/AutoScroll");
var InsertMarker_1 = require("@/ui/components/InsertMarker");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_core_1 = require("@opendaw/studio-core");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var className = lib_dom_1.Html.adoptStyleSheet(Mixer_sass_inline_1.default, "mixer");
var Mixer = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var project = service.project;
    var headers = (<div className="headers">
            <h5 />
            <h5>Input</h5>
            <h5>Sends</h5>
            <h5>Output</h5>
            <h5>Pan</h5>
            <h5>Volume</h5>
            <h5>Exclude</h5>
        </div>);
    var channelStripContainer = (<div className="channel-strips">
            {headers}
        </div>);
    var channelStripWrapper = (<div className="channel-strips-wrapper">
            {channelStripContainer}
        </div>);
    var scrollModel = new ScrollModel_ts_1.ScrollModel();
    var element = (<div className={className}>
            {/*<TimelineNavigation lifecycle={lifecycle} service={service} />*/}
            {channelStripWrapper}
            <Scroller_tsx_1.Scroller lifecycle={lifecycle} model={scrollModel} orientation={Scroller_tsx_1.Orientation.horizontal} floating/>
        </div>);
    var updateScroller = function () {
        var visibleSize = element.clientWidth;
        var contentSize = channelStripContainer.clientWidth;
        scrollModel.visibleSize = visibleSize;
        scrollModel.contentSize = contentSize;
    };
    var audioUnits = lib_std_1.UUID.newSet(function (entry) { return entry.adapter.uuid; });
    var updateDom = (0, lib_dom_1.deferNextFrame)(function () {
        lib_dom_1.Html.empty(channelStripContainer);
        channelStripContainer.appendChild(headers);
        audioUnits.values()
            .toSorted(function (a, b) { return a.adapter.indexField.getValue() - b.adapter.indexField.getValue(); })
            .forEach(function (_a) {
            var editor = _a.editor;
            return channelStripContainer.appendChild(editor);
        });
        updateScroller();
    });
    var removeEditingIndicator = function () { return channelStripContainer
        .querySelectorAll(".editing")
        .forEach(function (_a) {
        var classList = _a.classList;
        return classList.remove("editing");
    }); };
    var insertMarker = <InsertMarker_1.InsertMarker />;
    var scrollIntoViewEnabled = true;
    var editing = project.editing, boxGraph = project.boxGraph, rootBoxAdapter = project.rootBoxAdapter, userEditingManager = project.userEditingManager, boxAdapters = project.boxAdapters;
    lifecycle.ownAll(studio_core_1.ClipboardManager.install(element, studio_core_1.AudioUnitsClipboard.createHandler({
        getEnabled: function () { return true; },
        editing: editing,
        boxGraph: boxGraph,
        rootBoxAdapter: rootBoxAdapter,
        audioUnitEditing: userEditingManager.audioUnit,
        getEditedAudioUnit: function () { return userEditingManager.audioUnit.get().flatMap(function (vertex) {
            if (vertex.box.name === studio_boxes_1.AudioUnitBox.ClassName) {
                return lib_std_1.Option.wrap(boxAdapters.adapterFor(vertex.box, studio_adapters_1.AudioUnitBoxAdapter));
            }
            return lib_std_1.Option.None;
        }); }
    })), project.rootBoxAdapter.audioUnits.catchupAndSubscribe({
        onAdd: function (adapter) {
            var terminator = lifecycle.spawn();
            var editor = <ChannelStrip_tsx_1.ChannelStrip lifecycle={terminator} service={service} adapter={adapter} compact={false}/>;
            terminator.ownAll(lib_dom_1.Events.subscribe(editor, "pointerdown", function () {
                scrollIntoViewEnabled = false;
                if (!project.userEditingManager.audioUnit.isEditing(adapter.box.editing)) {
                    project.userEditingManager.audioUnit.edit(adapter.box.editing);
                }
            }), lib_dom_1.Events.subscribe(editor, "pointerup", function () { return scrollIntoViewEnabled = true; }));
            audioUnits.add({ adapter: adapter, terminator: terminator, editor: editor });
            updateDom.request();
        },
        onRemove: function (adapter) {
            var _a = audioUnits.removeByKey(adapter.uuid), editor = _a.editor, terminator = _a.terminator;
            terminator.terminate();
            editor.remove();
            updateDom.request();
        },
        onReorder: function (_adapter) { return updateDom.request(); }
    }), project.userEditingManager.audioUnit.catchupAndSubscribe(function (optVertex) { return optVertex.match({
        none: removeEditingIndicator,
        some: function (vertex) {
            removeEditingIndicator();
            var uuid = project.boxAdapters.adapterFor(vertex.box, studio_adapters_1.Devices.isHost).audioUnitBoxAdapter().uuid;
            audioUnits.opt(uuid).ifSome(function (_a) {
                var editor = _a.editor;
                editor.classList.add("editing");
                if (scrollIntoViewEnabled) {
                    editor.scrollIntoView({ behavior: "smooth", inline: "center" });
                }
            });
        }
    }); }), lib_dom_1.Html.watchResize(element, updateScroller), lib_dom_1.Events.subscribe(headers, "pointerdown", function () { return project.userEditingManager.audioUnit.clear(); }), lib_dom_1.Events.subscribe(element, "wheel", function (event) { return scrollModel.position += event.deltaX; }, { passive: false }), (function () {
        var ignore = false;
        return lib_std_1.Terminable.many(scrollModel.subscribe(function () {
            if (ignore) {
                return;
            }
            channelStripWrapper.scrollLeft = scrollModel.position;
        }), lib_dom_1.Events.subscribe(channelStripWrapper, "scroll", function () {
            ignore = true;
            scrollModel.position = channelStripWrapper.scrollLeft;
            ignore = false;
        }, { capture: true, passive: false }));
    })(), DragAndDrop_1.DragAndDrop.installTarget(element, {
        drag: function (event, dragData) {
            var type = dragData.type;
            if (type !== "channelstrip") {
                return false;
            }
            var optAdapter = project.boxGraph.findBox(lib_std_1.UUID.parse(dragData.uuid))
                .map(function (box) { return project.boxAdapters.adapterFor(box, studio_adapters_1.AudioUnitBoxAdapter); });
            if (optAdapter.isEmpty()) {
                return false;
            }
            var limit = optAdapter.unwrap().indicesLimit();
            var _a = DragAndDrop_1.DragAndDrop.findInsertLocation(event, element, limit), index = _a[0], successor = _a[1];
            var delta = index - dragData.start_index;
            if (delta < 0 || delta > 1) {
                if (insertMarker.nextSibling !== successor) {
                    channelStripContainer.insertBefore(insertMarker, successor);
                }
            }
            else if (insertMarker.isConnected) {
                insertMarker.remove();
            }
            return true;
        },
        drop: function (event, dragData) {
            if (insertMarker.isConnected) {
                insertMarker.remove();
            }
            var type = dragData.type;
            if (type !== "channelstrip") {
                return;
            }
            var optAdapter = project.boxGraph.findBox(lib_std_1.UUID.parse(dragData.uuid))
                .map(function (box) { return project.boxAdapters.adapterFor(box, studio_adapters_1.AudioUnitBoxAdapter); });
            var _a = optAdapter.unwrap().indicesLimit(), min = _a[0], max = _a[1];
            if (min === max) {
                return;
            }
            var index = DragAndDrop_1.DragAndDrop.findInsertLocation(event, element)[0];
            var delta = (0, lib_std_1.clamp)(index, min, max) - dragData.start_index;
            if (delta < 0 || delta > 1) { // if delta is zero or one, it has no effect on the order
                service.project.editing.modify(function () {
                    return lib_box_1.IndexedBox.moveIndex(project.rootBox.audioUnits, dragData.start_index, delta);
                });
            }
        },
        enter: function () { },
        leave: function () {
            if (insertMarker.isConnected) {
                insertMarker.remove();
            }
        }
    }), (0, AutoScroll_1.installAutoScroll)(channelStripWrapper, function (deltaX, _deltaY) { return scrollModel.position += deltaX; }, { padding: [0, 32, 0, 0] }));
    return element;
};
exports.Mixer = Mixer;
