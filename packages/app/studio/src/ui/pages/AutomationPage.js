"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationPage = void 0;
var AutomationPage_sass_inline_1 = require("./AutomationPage.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_core_1 = require("@opendaw/studio-core");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(AutomationPage_sass_inline_1.default, "AutomationPage");
var section = {
    position: lib_dsp_1.PPQN.Quarter * 2,
    loopOffset: lib_dsp_1.PPQN.Quarter * 2,
    complete: lib_dsp_1.PPQN.Bar * 2 + lib_dsp_1.PPQN.Quarter * 2,
    loopDuration: lib_dsp_1.PPQN.Bar
};
var EdgeCases = [
    {
        label: "Empty",
        events: [],
        section: section
    },
    {
        label: "One Center",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 0,
                value: 0.5,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "One Left Outside",
        events: [
            {
                type: "value-event",
                position: -lib_dsp_1.PPQN.Quarter,
                index: 0,
                value: 0.5,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "One Right Outside",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 5,
                index: 0,
                value: 0.5,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "Linear",
        events: [
            { type: "value-event", position: 0, index: 0, value: 0.0, interpolation: lib_dsp_1.Interpolation.Linear },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Bar,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "Linear Overlap",
        events: [
            {
                type: "value-event",
                position: -lib_dsp_1.PPQN.Quarter,
                index: 0,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Linear
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Bar + lib_dsp_1.PPQN.Quarter,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "First In",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 0,
                value: 0.5,
                interpolation: lib_dsp_1.Interpolation.Linear
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Bar,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "Last In",
        events: [
            { type: "value-event", position: 0, index: 0, value: 0.0, interpolation: lib_dsp_1.Interpolation.Linear },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 0,
                value: 0.5,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "Both In",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter,
                index: 0,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Linear
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Bar - lib_dsp_1.PPQN.Quarter,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "Two Center",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Linear
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 1,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "Two Center IO (top first)",
        events: [
            { type: "value-event", position: 0, index: 0, value: 0.5, interpolation: lib_dsp_1.Interpolation.Linear },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Linear
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 1,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Linear
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Bar,
                index: 0,
                value: 0.5,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "Two Center IO (bottom first)",
        events: [
            { type: "value-event", position: 0, index: 0, value: 0.5, interpolation: lib_dsp_1.Interpolation.Linear },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 1,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Linear
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 0,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Linear
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Bar,
                index: 0,
                value: 0.5,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "Interpolation.None",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 1,
                index: 0,
                value: 0.75,
                interpolation: lib_dsp_1.Interpolation.Linear
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 3,
                index: 0,
                value: 0.25,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "Interpolation.None (clip-in)",
        events: [
            {
                type: "value-event",
                position: -lib_dsp_1.PPQN.Quarter * 1,
                index: 0,
                value: 0.75,
                interpolation: lib_dsp_1.Interpolation.None
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 3,
                index: 0,
                value: 0.25,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "Interpolation.None (clip-out)",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 1,
                index: 0,
                value: 0.75,
                interpolation: lib_dsp_1.Interpolation.None
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 5,
                index: 0,
                value: 0.25,
                interpolation: lib_dsp_1.Interpolation.Linear
            }
        ],
        section: section
    },
    {
        label: "Interpolation None (clip-out with step)",
        events: [
            { type: "value-event", position: -960, index: 0, value: 0.5, interpolation: lib_dsp_1.Interpolation.None },
            { type: "value-event", position: 960, index: 0, value: 0, interpolation: lib_dsp_1.Interpolation.None },
            { type: "value-event", position: 2880, index: 0, value: 1, interpolation: lib_dsp_1.Interpolation.None },
            { type: "value-event", position: 4800, index: 0, value: 0.5, interpolation: lib_dsp_1.Interpolation.None }
        ],
        section: section
    },
    {
        label: "Interpolation.None (three events)",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 1,
                index: 0,
                value: 0.75,
                interpolation: lib_dsp_1.Interpolation.None
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 0,
                value: 0.25,
                interpolation: lib_dsp_1.Interpolation.None
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 3,
                index: 0,
                value: 0.50,
                interpolation: lib_dsp_1.Interpolation.None
            }
        ],
        section: section
    },
    {
        label: "Curve Exact",
        events: [
            { type: "value-event", position: 0, index: 0, value: 0.0, interpolation: lib_dsp_1.Interpolation.Curve(0.7) },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Bar,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.0)
            }
        ],
        section: section
    },
    {
        label: "Curve Fit",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter,
                index: 0,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.7)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Bar - lib_dsp_1.PPQN.Quarter,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.0)
            }
        ],
        section: section
    },
    {
        label: "Curve Overlap",
        events: [
            {
                type: "value-event",
                position: -lib_dsp_1.PPQN.Quarter,
                index: 0,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.7)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Bar + lib_dsp_1.PPQN.Quarter,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.0)
            }
        ],
        section: section
    },
    {
        label: "Curve Starts Half",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Bar / 2,
                index: 0,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.7)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Bar,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.0)
            }
        ],
        section: section
    },
    {
        label: "Curve Stops Half",
        events: [
            { type: "value-event", position: 0, index: 0, value: 0.0, interpolation: lib_dsp_1.Interpolation.Curve(0.7) },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Bar / 2,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.0)
            }
        ],
        section: section
    },
    {
        label: "Curve Up-Repeat",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 0,
                index: 0,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.7)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 1,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.7)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 1,
                index: 1,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.7)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.7)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 1,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.7)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 3,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.7)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 3,
                index: 1,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.7)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 4,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.7)
            }
        ],
        section: section
    },
    {
        label: "Curve Bounce",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 0,
                index: 0,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.8)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 1,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.2)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 0,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.8)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 3,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.2)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 4,
                index: 0,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.8)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 5,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.2)
            }
        ],
        section: section
    },
    {
        label: "Approx Sine",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 0,
                index: 0,
                value: 0.5,
                interpolation: lib_dsp_1.Interpolation.Curve(0.8)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 1,
                index: 0,
                value: 1.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.2)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 2,
                index: 0,
                value: 0.5,
                interpolation: lib_dsp_1.Interpolation.Curve(0.8)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 3,
                index: 0,
                value: 0.0,
                interpolation: lib_dsp_1.Interpolation.Curve(0.2)
            },
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter * 4,
                index: 0,
                value: 0.5,
                interpolation: lib_dsp_1.Interpolation.Curve(0.8)
            }
        ],
        section: section
    },
    {
        label: "Linear Issue",
        events: [
            {
                type: "value-event",
                position: lib_dsp_1.PPQN.Quarter,
                index: 0,
                value: 0.25,
                interpolation: lib_dsp_1.Interpolation.Curve(0.9405259683098594)
            },
            { type: "value-event", position: lib_dsp_1.PPQN.Quarter, index: 1, value: 0, interpolation: lib_dsp_1.Interpolation.Linear },
            { type: "value-event", position: lib_dsp_1.PPQN.Quarter * 3, index: 0, value: 0.5, interpolation: lib_dsp_1.Interpolation.Linear }
        ],
        section: section
    }
];
var AutomationPage = function (_a) {
    var range = new studio_core_1.TimelineRange();
    range.width = 256;
    range.maxUnits = lib_dsp_1.PPQN.Bar * 6;
    range.showUnitInterval(0, lib_dsp_1.PPQN.Bar * 3);
    var unitMin = range.unitMin;
    var unitMax = range.unitMax;
    var height = 48;
    var loopColor = "rgba(64, 255, 64, 0.25)";
    var contentColor = "rgba(255, 255, 255, 0.5)";
    return (<div className={className}>
            <div>
                <h1>Automation Edge Cases</h1>
                <div>
                    {EdgeCases.map(function (_a) {
            var label = _a.label, section = _a.section, events = _a.events;
            var canvas = (<canvas width={range.width * devicePixelRatio} height={height * devicePixelRatio} style={{
                    width: "".concat(range.width, "px"),
                    height: "".concat(height, "px")
                }}/>);
            var context = canvas.getContext("2d");
            var radius = 3 * devicePixelRatio;
            var x0 = range.unitToX(section.position) * devicePixelRatio;
            var x1 = range.unitToX(section.complete) * devicePixelRatio;
            context.fillStyle = "rgba(0, 0, 0, 0.25)";
            context.fillRect(x0, 0, x1 - x0, height * devicePixelRatio);
            var actualHeight = height * devicePixelRatio;
            var valueToY = function (x) { return (actualHeight - radius) - x * (actualHeight - radius * 2); };
            var eventCollection = lib_dsp_1.EventCollection.create(lib_dsp_1.ValueEvent.Comparator);
            events.forEach(function (event) { return eventCollection.add(event); });
            for (var _i = 0, _b = lib_dsp_1.LoopableRegion.locateLoops(section, unitMin, unitMax); _i < _b.length; _i++) {
                var pass = _b[_i];
                if (pass.index > 0) {
                    var x = Math.floor(range.unitToX(pass.resultStart) * devicePixelRatio);
                    context.fillStyle = loopColor;
                    context.fillRect(x, 0, devicePixelRatio, actualHeight);
                }
                var windowMin = pass.resultStart - pass.rawStart;
                var windowMax = pass.resultEnd - pass.rawStart;
                var iterator = lib_dsp_1.ValueEvent.iterateWindow(eventCollection, windowMin, windowMax);
                studio_core_1.ValueStreamRenderer.render(context, range, iterator, valueToY, contentColor, 0.2, 0.0, pass);
                context.strokeStyle = "rgba(255, 255, 255, 0.25)";
            }
            var offset = section.position - section.loopOffset;
            for (var _c = 0, _d = lib_dsp_1.ValueEvent.iterateWindow(eventCollection, offset, offset + section.loopDuration); _c < _d.length; _c++) {
                var event_1 = _d[_c];
                var x = range.unitToX(offset + section.loopDuration + event_1.position) * devicePixelRatio;
                var y = valueToY(event_1.value);
                context.beginPath();
                context.arc(x, y, radius, 0.0, lib_std_1.TAU);
                context.stroke();
            }
            var N = 9;
            context.fillStyle = "rgba(255, 255, 0, 0.5)";
            context.beginPath();
            for (var i = 1; i < N; i++) {
                var position = i / N * section.loopDuration;
                var x = range.unitToX(offset + section.loopDuration + position) * devicePixelRatio;
                context.moveTo(x, 0);
                context.lineTo(x, actualHeight);
            }
            context.stroke();
            context.strokeStyle = "none";
            var iteratable = lib_dsp_1.ValueEvent.quantise(eventCollection, 0, section.loopDuration, N);
            for (var result = iteratable.next();; result = iteratable.next()) {
                if (result.done) {
                    break;
                }
                else {
                    var _e = result.value, position = _e.position, value = _e.value;
                    var x = range.unitToX(offset + section.loopDuration + position) * devicePixelRatio;
                    var y = valueToY(value);
                    context.beginPath();
                    context.arc(x, y, radius, 0.0, lib_std_1.TAU);
                    context.fillStyle = "rgba(255, 0, 0, 0.5)";
                    context.fill();
                }
            }
            return (<div className="edge-case">
                                <h5>{label}</h5>
                                {canvas}
                            </div>);
        })}
                </div>
            </div>
        </div>);
};
exports.AutomationPage = AutomationPage;
