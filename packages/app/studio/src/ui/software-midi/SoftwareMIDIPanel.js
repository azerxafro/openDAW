"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftwareMIDIPanel = void 0;
var SoftwareMIDIPanel_sass_inline_1 = require("./SoftwareMIDIPanel.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var PianoRollLayout_1 = require("@/ui/PianoRollLayout");
var studio_core_1 = require("@opendaw/studio-core");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var NumberInput_1 = require("@/ui/components/NumberInput");
var MenuButton_1 = require("@/ui/components/MenuButton");
var Icon_1 = require("@/ui/components/Icon");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_midi_1 = require("@opendaw/lib-midi");
var FlexSpacer_1 = require("@/ui/components/FlexSpacer");
var PianoRoll_1 = require("@/ui/software-midi/PianoRoll");
var Button_1 = require("@/ui/components/Button");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var Surface_1 = require("@/ui/surface/Surface");
var SoftwareMIDIShortcuts_1 = require("@/ui/shortcuts/SoftwareMIDIShortcuts");
var className = lib_dom_1.Html.adoptStyleSheet(SoftwareMIDIPanel_sass_inline_1.default, "SoftwareMIDIPanel");
var SoftwareMIDIPanel = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var numKeys = 18;
    var pianoLayout = new PianoRollLayout_1.PianoRollLayout(0, numKeys - 1, {
        whiteKeys: { width: 23, height: 48 },
        blackKeys: { width: 19, height: 24 }
    });
    var softwareMIDIInput = studio_core_1.MidiDevices.softwareMIDIInput;
    var octave = new lib_std_1.DefaultObservableValue(5, { guard: function (value) { return (0, lib_std_1.clamp)(value, 0, 10); } });
    var channel = new lib_std_1.DefaultObservableValue(0, { guard: function (value) { return (0, lib_std_1.clamp)(value, 0, 15); } });
    var velocity = new lib_std_1.DefaultObservableValue(100, { guard: function (value) { return (0, lib_std_1.clamp)(value, 0, 100); } });
    var svg = (<PianoRoll_1.PianoRoll lifecycle={lifecycle} pianoLayout={pianoLayout}/>);
    var midiIndicator = <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Connected}/>;
    var element = <div className={className}>
        <header>
            <span>MIDI Keyboard</span>
            <Button_1.Button lifecycle={lifecycle} onClick={function () { return service.toggleSoftwareKeyboard(); }} appearance={{ color: studio_enums_1.Colors.shadow, tooltip: "Close MIDI Keyboard" }}>
                <Icon_1.Icon symbol={studio_enums_1.IconSymbol.Close}/>
            </Button_1.Button>
        </header>
        <div className="controls">
            <div className="unit">
                <span>Octave</span>
                <NumberInput_1.NumberInput lifecycle={lifecycle} model={octave} mapper={{
            x: function (y) { return ({ unit: "", value: String(y - 2) }); },
            y: function (x) { return ({
                type: "explicit",
                value: parseInt(x) + 2
            }); }
        }} className="octave"/>
            </div>
            <div className="unit">
                <span>Channel</span>
                <NumberInput_1.NumberInput lifecycle={lifecycle} model={channel} mapper={{
            x: function (y) { return ({ unit: "", value: String(y + 1) }); },
            y: function (x) { return ({
                type: "explicit",
                value: parseInt(x) - 1
            }); }
        }} className="channel"/>
            </div>
            <div className="unit">
                <span>Velocity</span>
                <NumberInput_1.NumberInput lifecycle={lifecycle} model={velocity} mapper={{
            x: function (y) { return ({ unit: "", value: String(y) }); },
            y: function (x) { return ({
                type: "explicit",
                value: parseInt(x)
            }); }
        }} className="velocity"/>
            </div>
            <FlexSpacer_1.FlexSpacer />
            <MenuButton_1.MenuButton root={studio_core_1.MenuItem.root()
            .setRuntimeChildrenProcedure(function (parent) { return parent.addMenuItem.apply(parent, service.projectProfileService.getValue()
            .map(function (_a) {
            var _b = _a.project, boxAdapters = _b.boxAdapters, captureDevices = _b.captureDevices, pointerHub = _b.rootBox.audioUnits.pointerHub;
            return pointerHub.incoming()
                .map(function (_a) {
                var box = _a.box;
                return (0, lib_std_1.asInstanceOf)(box, studio_boxes_1.AudioUnitBox);
            })
                .filter(function (box) { return box.capture.targetVertex
                .mapOr(function (_a) {
                var box = _a.box;
                return (0, lib_std_1.isInstanceOf)(box, studio_boxes_1.CaptureMidiBox);
            }, false); })
                .map(function (box) {
                var _a = boxAdapters.adapterFor(box, studio_adapters_1.AudioUnitBoxAdapter), label = _a.label, uuid = _a.uuid;
                return captureDevices.get(uuid).match({
                    none: function () { return studio_core_1.MenuItem.default({ label: label, selectable: false }); },
                    some: function (capture) { return studio_core_1.MenuItem.default({
                        label: label,
                        checked: capture.armed.getValue()
                    }).setTriggerProcedure(function () { return captureDevices.setArm(capture, true); }); }
                });
            });
        })
            .map(function (adapters) { return adapters.length === 0 ? undefined : adapters; })
            .match({
            none: function () { return [studio_core_1.MenuItem.default({ label: "No MIDI instruments found" })]; },
            some: function (adapters) { return adapters; }
        })); })} appearance={{
            tinyTriangle: true,
            tooltip: "Click to connect to MIDI instruments."
        }}>{midiIndicator}</MenuButton_1.MenuButton>
        </div>
        <div className="piano">
            {svg}
        </div>
    </div>;
    var activeKeys = new Int8Array(numKeys).fill(-1);
    var lastPointerKey = -1;
    var lastPointerKeyPitch = -1;
    var stopPointerNote = function () {
        if (lastPointerKeyPitch !== -1) {
            softwareMIDIInput.sendNoteOff(lastPointerKeyPitch);
            lastPointerKey = -1;
            lastPointerKeyPitch = -1;
        }
    };
    var pointerPlayListener = function (event) {
        if (event.buttons === 0) {
            return;
        }
        if ((0, lib_std_1.isInstanceOf)(event.target, SVGRectElement)) {
            var rect = event.target;
            var dataKey = rect.dataset.key;
            if ((0, lib_std_1.isUndefined)(dataKey)) {
                return;
            }
            var key = parseInt(dataKey);
            if (lastPointerKey === key) {
                return;
            }
            stopPointerNote();
            var pitch = key + octave.getValue() * 12;
            if (pitch >= 0 && pitch < 128) {
                softwareMIDIInput.sendNoteOn(pitch);
                lastPointerKey = key;
                lastPointerKeyPitch = pitch;
            }
        }
    };
    var shortcuts = lib_dom_1.ShortcutManager.get()
        .createContext(lib_std_1.Predicates.alwaysTrue, "SoftwareMIDIPanel", Number.MAX_SAFE_INTEGER);
    var activeCodes = new Map();
    var playNote = function (shortcut, index) {
        activeCodes.set(shortcut.code, index);
        if (activeKeys[index] > -1) {
            softwareMIDIInput.sendNoteOff(activeKeys[index]);
            activeKeys[index] = -1;
        }
        else {
            var pitch = index + octave.getValue() * 12;
            if (pitch >= 0 && pitch < 128) {
                softwareMIDIInput.sendNoteOn(pitch, velocity.getValue() / 100.0);
                activeKeys[index] = pitch;
            }
        }
    };
    lifecycle.ownAll.apply(lifecycle, __spreadArray(__spreadArray([lib_dom_1.Events.subscribe(softwareMIDIInput, "midimessage", function (event) {
            var update = function () {
                var _a;
                for (var key = 0; key < numKeys; key++) {
                    var note = key + octave.getValue() * 12;
                    (_a = svg.querySelector("[data-key=\"".concat(key, "\"]"))) === null || _a === void 0 ? void 0 : _a.classList.toggle("active", softwareMIDIInput.hasActiveNote(note));
                }
            };
            lib_midi_1.MidiData.accept(event.data, {
                noteOn: function (_note, _velocity) { return update(); },
                noteOff: function (_note) { return update(); }
            });
        }),
        softwareMIDIInput.countListeners.catchupAndSubscribe(function (owner) {
            return midiIndicator.style.color = owner.getValue() > 1 ? studio_enums_1.Colors.green.toString() : studio_enums_1.Colors.red.toString();
        }),
        shortcuts,
        shortcuts.register(SoftwareMIDIShortcuts_1.SoftwareMIDIShortcuts["increment-octave"].shortcut, function () { return octave.setValue(octave.getValue() + 1); }),
        shortcuts.register(SoftwareMIDIShortcuts_1.SoftwareMIDIShortcuts["decrement-octave"].shortcut, function () { return octave.setValue(octave.getValue() - 1); })], SoftwareMIDIShortcuts_1.NoteShortcuts.map(function (_a, index) {
        var shortcut = _a.shortcut;
        return shortcuts.register(shortcut, function () { return playNote(shortcut, index); });
    }), false), [Surface_1.Surface.subscribeKeyboard("keyup", function (event) {
            var _a;
            var index = (_a = activeCodes.get(lib_dom_1.Shortcut.resolveCode(event))) !== null && _a !== void 0 ? _a : -1;
            if (index >= 0) {
                if (activeKeys[index] === -1) {
                    return;
                }
                softwareMIDIInput.sendNoteOff(activeKeys[index]);
                activeKeys[index] = -1;
                event.preventDefault();
            }
        }, Number.MAX_SAFE_INTEGER),
        lib_dom_1.Events.subscribe(element, "pointerdown", function (event) {
            pointerPlayListener(event);
            // we do not use setPointerCapture here because we do want a simple way to detect a drag onto a key.
            var subscription = lib_std_1.Terminable.many(lib_dom_1.Events.subscribe(window, "pointermove", pointerPlayListener, { capture: true }), lib_dom_1.Events.subscribe(window, "pointerup", function () {
                subscription.terminate();
                stopPointerNote();
            }, { capture: true }));
        }, { capture: true }),
        lib_dom_1.Dragging.attach(element, function (_a) {
            var startX = _a.clientX, startY = _a.clientY, target = _a.target;
            if (target !== element) {
                return lib_std_1.Option.None;
            }
            var _b = element.getBoundingClientRect(), top = _b.top, left = _b.left, width = _b.width, height = _b.height;
            return lib_std_1.Option.wrap({
                update: function (_a) {
                    var clientX = _a.clientX, clientY = _a.clientY;
                    var newX = (0, lib_std_1.clamp)(left + (clientX - startX), 1, window.innerWidth - width - 1);
                    var newY = (0, lib_std_1.clamp)(top + (clientY - startY), 1, window.innerHeight - height - 1);
                    element.style.transform = "translate(".concat(newX, "px, ").concat(newY, "px)");
                }
            });
        }),
        lib_std_1.Terminable.create(function () { return softwareMIDIInput.releaseAllNotes(); })], false));
    return element;
};
exports.SoftwareMIDIPanel = SoftwareMIDIPanel;
