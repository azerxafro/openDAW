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
exports.Logs = void 0;
var Logs_sass_inline_1 = require("./Logs.sass?inline");
var lib_dom_1 = require("@opendaw/lib-dom");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var className = lib_dom_1.Html.adoptStyleSheet(Logs_sass_inline_1.default, "Logs");
var Logs = function (_a) {
    var errorTime = _a.errorTime, entries = _a.entries;
    return (<div className={className}>
            <lib_jsx_1.Group>
                <h4>Level</h4>
                <h4>Since</h4>
                <h4>Message</h4>
            </lib_jsx_1.Group>
            {entries.map(function (_a) {
            var time = _a.time, level = _a.level, args = _a.args;
            var elapsed = lib_std_1.TimeSpan.millis(new Date(time).getTime() - errorTime);
            var _b = elapsed.split(), h = _b.h, m = _b.m, s = _b.s;
            return (<lib_jsx_1.Group>
                        <div>[{level.toUpperCase()}]</div>
                        <div>
                            <span style={{ opacity: "0.5" }}>
                                {h.toFixed(0).padStart(2, "0")}
                            </span>
                            <span> </span>
                            <span>
                                {m.toFixed(0).padStart(2, "0")}
                            </span>
                            <span>:</span>
                            <span>
                                {s.toFixed(0).padStart(2, "0")}
                            </span>
                            <span style={{ opacity: "0.5" }}>
                                .{(Math.abs(elapsed.millis()) % 1000).toFixed(0).padStart(3, "0")}
                            </span>
                        </div>
                        {renderLogEntry(args)}
                    </lib_jsx_1.Group>);
        })}
        </div>);
};
exports.Logs = Logs;
var renderLogEntry = function (parameters) {
    var format = parameters.at(0);
    var args = parameters.slice(1);
    var container = (<div style={{ display: "inline" }}></div>);
    if (!(0, lib_std_1.isDefined)(format)) {
        return container;
    }
    var argIndex = 0;
    var style = {};
    var regex = /%[cdfiosO%]/g;
    var lastIndex = 0;
    var matches = __spreadArray([], format.matchAll(regex), true);
    if (matches.length === 0) {
        container.appendChild(makeSpan(__spreadArray([format], args, true).join(" "), {}));
        return container;
    }
    for (var i = 0; i < matches.length; i++) {
        var match = matches[i][0];
        var index = matches[i].index;
        var raw = format.slice(lastIndex, index);
        if ((0, lib_std_1.isDefined)(raw) && raw.length > 0) {
            container.appendChild(makeSpan(raw, style));
        }
        if (match === "%%") {
            container.appendChild(makeSpan("%", style));
        }
        else if (match === "%c") {
            var cssText = args[argIndex++];
            if ((0, lib_std_1.isDefined)(cssText)) {
                style = parseStyle(cssText);
            }
            else {
                style = {};
            }
        }
        else {
            var val = args[argIndex++];
            if ((0, lib_std_1.isDefined)(val)) {
                container.appendChild(makeSpan(formatToken(match, val), style));
            }
        }
        lastIndex = index + match.length;
    }
    var tail = format.slice(lastIndex);
    if ((0, lib_std_1.isDefined)(tail) && tail.length > 0) {
        container.appendChild(makeSpan(tail, style));
    }
    return container;
};
var makeSpan = function (text, style) {
    return <span style={style}>{text}</span>;
};
var formatToken = function (token, val) {
    switch (token) {
        case "%d":
        case "%i":
            return parseInt(val).toString();
        case "%f":
            return parseFloat(val).toString();
        case "%s":
            return String(val);
        case "%o":
        case "%O":
            return typeof val === "object" ? JSON.stringify(val) : String(val);
        default:
            return String(val);
    }
};
var parseStyle = function (input) {
    var result = {};
    for (var _i = 0, _a = input.split(";"); _i < _a.length; _i++) {
        var part = _a[_i];
        var _b = part.split(":").map(function (s) { return s.trim(); }), key = _b[0], value = _b[1];
        if (!(0, lib_std_1.isDefined)(key) || !(0, lib_std_1.isDefined)(value) || key.length === 0 || value.length === 0) {
            continue;
        }
        var camel = key.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); });
        result[camel] = value;
    }
    return result;
};
