"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelResizer = void 0;
var PanelResizer_sass_inline_1 = require("./PanelResizer.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var AxisProperty_ts_1 = require("@/ui/workspace/AxisProperty.ts");
var className = lib_dom_1.Html.adoptStyleSheet(PanelResizer_sass_inline_1.default, "PanelResizer");
var PanelResizer = function (_a) {
    var lifecycle = _a.lifecycle, orientation = _a.orientation, siblings = _a.siblings, panelContents = _a.panelContents, target = _a.target;
    var element = <div className={lib_dom_1.Html.buildClassList(className, orientation)}/>;
    var direction = AxisProperty_ts_1.AxisProperty[orientation];
    lifecycle.own(lib_dom_1.Dragging.attach(element, function (beginEvent) {
        var successor = element.nextElementSibling;
        if (successor === null) {
            return lib_std_1.Option.None;
        }
        var parent = element.parentElement;
        if (parent === null) {
            return lib_std_1.Option.None;
        }
        var elements = siblings
            .map(function (_a) {
            var content = _a.content, element = _a.element;
            return {
                content: content,
                element: element,
                size: element[direction.size],
                style: element.style
            };
        });
        var curr = elements.find(function (_a) {
            var element = _a.element;
            return element === target;
        });
        var next = elements.find(function (_a) {
            var element = _a.element;
            return element === successor;
        });
        if (!(0, lib_std_1.isDefined)(curr) || !(0, lib_std_1.isDefined)(next)) {
            return lib_std_1.Option.None;
        }
        if (panelContents.isClosed(curr.content) || panelContents.isClosed(next.content)) {
            return lib_std_1.Option.None;
        }
        var currConstrains = curr.content.constrains;
        var nextConstrains = next.content.constrains;
        if (currConstrains.type === "fixed" || nextConstrains.type === "fixed") {
            return lib_std_1.Option.None;
        }
        var beginPointer = beginEvent[direction.pointer];
        var beginSizeA = curr.size;
        var beginSizeB = next.size;
        var sumSize = curr.size + next.size;
        var sumFlex = currConstrains.flex + nextConstrains.flex;
        return lib_std_1.Option.wrap({
            update: function (event) {
                var _a, _b;
                var minSizeA = currConstrains.minSize;
                var minSizeB = nextConstrains.minSize;
                var maxSizeA = (_a = currConstrains.maxSize) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER;
                var maxSizeB = (_b = nextConstrains.maxSize) !== null && _b !== void 0 ? _b : Number.MAX_SAFE_INTEGER;
                var delta = event[direction.pointer] - beginPointer;
                var sizeA = (0, lib_std_1.clamp)(beginSizeA + delta, Math.max(minSizeA, sumSize - maxSizeB), Math.min(maxSizeA, sumSize - minSizeB));
                var sizeB = (0, lib_std_1.clamp)(beginSizeB - delta, Math.max(minSizeB, sumSize - maxSizeA), Math.min(maxSizeB, sumSize - minSizeA));
                var flexA = sizeA / sumSize * sumFlex;
                var flexB = sizeB / sumSize * sumFlex;
                currConstrains.flex = flexA;
                nextConstrains.flex = flexB;
                curr.style.flexGrow = flexA.toString();
                next.style.flexGrow = flexB.toString();
            }
        });
    }));
    return element;
};
exports.PanelResizer = PanelResizer;
