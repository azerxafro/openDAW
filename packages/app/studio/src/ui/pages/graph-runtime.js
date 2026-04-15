"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphPanel = exports.GRAPH_INTERACTION_HINT = void 0;
// graph-runtime.ts
var force_graph_1 = require("force-graph");
var d3 = require("d3-force");
var lib_std_1 = require("@opendaw/lib-std");
exports.GRAPH_INTERACTION_HINT = "Drag nodes to reposition. Scroll to zoom. Drag background to pan. Hover a node to see its name.";
var stringToUnit = function (value) {
    return Array.from(value).reduce(function (h, char) { return (h * 31 + char.charCodeAt(0)) >>> 0; }, 0) / 0xffffffff;
};
var createGraphPanel = function (canvas, data, opts) {
    if (opts === void 0) { opts = {}; }
    var dark = !!opts.dark;
    var nodes = data.nodes;
    var links = data.edges;
    var hovered = null;
    var graph = new force_graph_1.default(canvas)
        .graphData({ nodes: nodes, links: links })
        .backgroundColor(dark ? "#0e0f12" : "#ffffff")
        .nodeId("id")
        .linkSource("source")
        .linkTarget("target")
        .nodeRelSize(6)
        .enableNodeDrag(true)
        .autoPauseRedraw(false)
        .linkColor(function () { return (dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)"); })
        .linkWidth(1)
        .nodeVal(function (_a) {
        var root = _a.root;
        return root ? 48 : 3;
    })
        .nodeColor(function (n) {
        var _a;
        var hue = stringToUnit((_a = n.label) !== null && _a !== void 0 ? _a : "");
        return "hsl(".concat(hue * 360, ", 75%, 50%)");
    })
        // draw labels ourselves on top:
        .nodeCanvasObjectMode(function () { return "after"; })
        .nodeCanvasObject(function (_node, _ctx) {
        /* labels drawn in onRenderFramePost */
    })
        // update hover state
        .onNodeHover(function (node) { return hovered = node || null; });
    graph.onRenderFramePost(function (ctx) {
        var _a, _b;
        var zoom = (_a = graph.zoom) === null || _a === void 0 ? void 0 : _a.call(graph);
        var threshold = 1.2;
        var drawPill = function (x, y, text) {
            var padX = 6;
            var padY = 3;
            var tw = ctx.measureText(text).width;
            var w = tw + padX * 2;
            var h = 16 + padY * 2;
            var rx = 6;
            ctx.beginPath();
            ctx.moveTo(x - w / 2 + rx, y - h / 2);
            ctx.lineTo(x + w / 2 - rx, y - h / 2);
            ctx.quadraticCurveTo(x + w / 2, y - h / 2, x + w / 2, y - h / 2 + rx);
            ctx.lineTo(x + w / 2, y + h / 2 - rx);
            ctx.quadraticCurveTo(x + w / 2, y + h / 2, x + w / 2 - rx, y + h / 2);
            ctx.lineTo(x - w / 2 + rx, y + h / 2);
            ctx.quadraticCurveTo(x - w / 2, y + h / 2, x - w / 2, y + h / 2 - rx);
            ctx.lineTo(x - w / 2, y - h / 2 + rx);
            ctx.quadraticCurveTo(x - w / 2, y - h / 2, x - w / 2 + rx, y - h / 2);
            ctx.closePath();
            ctx.fillStyle = dark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.8)";
            ctx.fill();
            ctx.strokeStyle = dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)";
            ctx.stroke();
            ctx.fillStyle = dark ? "#ffffff" : "#000000";
            ctx.fillText(text, x, y);
        };
        ctx.save();
        var fontSize = 12 / zoom;
        ctx.font = "".concat(fontSize, "px system-ui, -apple-system, Segoe UI, Roboto");
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        var g = graph.graphData();
        if (zoom >= threshold) {
            for (var _i = 0, _c = g.nodes; _i < _c.length; _i++) {
                var node = _c[_i];
                if ((0, lib_std_1.isUndefined)(node.label) || (0, lib_std_1.isUndefined)(node.x) || (0, lib_std_1.isUndefined)(node.y)) {
                    continue;
                }
                ctx.fillText(node.label, node.x, node.y);
            }
        }
        if (hovered && typeof hovered.x === "number" && typeof hovered.y === "number") {
            var text = (_b = hovered.label) !== null && _b !== void 0 ? _b : hovered.id;
            drawPill(hovered.x, hovered.y - 18 / zoom, text);
        }
        ctx.restore();
    });
    graph
        .d3Force("charge", d3.forceManyBody().strength(-150))
        .d3Force("link", d3.forceLink()
        .id(function (n) { return n.id; })
        .distance(70)
        .strength(0.8))
        .d3Force("center", d3.forceCenter(0, 0));
    var applySize = function () {
        var _a = canvas.getBoundingClientRect(), width = _a.width, height = _a.height;
        graph.width(width).height(height);
    };
    var resizeObserver = new ResizeObserver(applySize);
    resizeObserver.observe(canvas);
    applySize();
    return {
        terminate: function () {
            try {
                resizeObserver.disconnect();
            }
            catch (_a) { }
            try {
                graph.graphData({ nodes: [], links: [] });
            }
            catch (_b) { }
            graph._destructor();
        },
        resize: function () {
            applySize();
        }
    };
};
exports.createGraphPanel = createGraphPanel;
