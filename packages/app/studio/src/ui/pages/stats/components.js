"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeControl = exports.Card = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var Card = function (_a, children) {
    var title = _a.title, accent = _a.accent, className = _a.className;
    return (<div className={"card".concat((0, lib_std_1.isDefined)(className) ? " ".concat(className) : "")}>
        {((0, lib_std_1.isDefined)(title) || (0, lib_std_1.isDefined)(accent)) && (<div className="card-head">
                {(0, lib_std_1.isDefined)(title) && <h2>{title}</h2>}
                {(0, lib_std_1.isDefined)(accent) && <div className="card-accent">{accent}</div>}
            </div>)}
        <div className="card-body">{children}</div>
    </div>);
};
exports.Card = Card;
var RangeControl = function (_a) {
    var lifecycle = _a.lifecycle, dates = _a.dates, range = _a.range;
    var track = <div className="range-track"/>;
    var selection = <div className="range-selection"/>;
    var handleFrom = <div className="range-handle from"/>;
    var handleTo = <div className="range-handle to"/>;
    var labelFrom = <span className="range-label"/>;
    var labelTo = <span className="range-label right"/>;
    var indexToRatio = function (index) { return dates.length <= 1 ? 0 : index / (dates.length - 1); };
    var ratioToIndex = function (ratio) {
        var clamped = Math.max(0, Math.min(1, ratio));
        return Math.round(clamped * Math.max(0, dates.length - 1));
    };
    var render = function (_a) {
        var _b, _c;
        var fromIndex = _a[0], toIndex = _a[1];
        var fromRatio = indexToRatio(fromIndex);
        var toRatio = indexToRatio(toIndex);
        selection.style.left = "".concat(fromRatio * 100, "%");
        selection.style.width = "".concat(Math.max(0, (toRatio - fromRatio) * 100), "%");
        handleFrom.style.left = "".concat(fromRatio * 100, "%");
        handleTo.style.left = "".concat(toRatio * 100, "%");
        labelFrom.textContent = (_b = dates[fromIndex]) !== null && _b !== void 0 ? _b : "";
        labelTo.textContent = (_c = dates[toIndex]) !== null && _c !== void 0 ? _c : "";
    };
    lifecycle.own(range.catchupAndSubscribe(function (owner) { return render(owner.getValue()); }));
    var beginDrag = function (which) { return function (event) {
        event.preventDefault();
        var rect = track.getBoundingClientRect();
        var startRatio = (event.clientX - rect.left) / rect.width;
        var _a = range.getValue(), startFrom = _a[0], startTo = _a[1];
        var startSpan = startTo - startFrom;
        var onMove = function (moveEvent) {
            var ratio = (moveEvent.clientX - rect.left) / rect.width;
            if (which === "from") {
                var next = Math.min(ratioToIndex(ratio), startTo);
                range.setValue([next, startTo]);
            }
            else if (which === "to") {
                var next = Math.max(ratioToIndex(ratio), startFrom);
                range.setValue([startFrom, next]);
            }
            else {
                var delta = ratioToIndex(ratio) - ratioToIndex(startRatio);
                var nextFrom = startFrom + delta;
                var nextTo = startTo + delta;
                if (nextFrom < 0) {
                    nextFrom = 0;
                    nextTo = startSpan;
                }
                if (nextTo > dates.length - 1) {
                    nextTo = dates.length - 1;
                    nextFrom = nextTo - startSpan;
                }
                range.setValue([nextFrom, nextTo]);
            }
        };
        var onUp = function () {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
    }; };
    lifecycle.own(lib_dom_1.Events.subscribe(handleFrom, "pointerdown", beginDrag("from")));
    lifecycle.own(lib_dom_1.Events.subscribe(handleTo, "pointerdown", beginDrag("to")));
    lifecycle.own(lib_dom_1.Events.subscribe(selection, "pointerdown", beginDrag("band")));
    return (<div className="range-control">
            <div className="range-labels">
                {labelFrom}
                {labelTo}
            </div>
            <div className="range-wrap">
                {track}
                {selection}
                {handleFrom}
                {handleTo}
            </div>
        </div>);
};
exports.RangeControl = RangeControl;
