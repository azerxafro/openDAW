"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageUtils = void 0;
// TODO Remove?
var PageUtils;
(function (PageUtils) {
    PageUtils.extractFirstSegment = function (path) {
        var match = path.match(/^\/([^\/]+)(?:\/|$)/);
        return match ? match[1] : null;
    };
    PageUtils.extractSecondSegment = function (path) {
        var match = path.match(/^\/[^\/]+\/([^\/]+)\/?$/);
        return match ? match[1] : null;
    };
})(PageUtils || (exports.PageUtils = PageUtils = {}));
