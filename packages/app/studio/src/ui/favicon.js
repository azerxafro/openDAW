"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeFavicon = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var subscribeFavicon = function (observable) {
    return observable.catchupAndSubscribe(function (owner) {
        var link = document.querySelector("link[rel='icon']");
        if ((0, lib_std_1.isDefined)(link)) {
            link.href = (0, lib_std_1.isDefined)(owner.getValue()) ? "/favicon-live.svg" : "/favicon.svg";
        }
    });
};
exports.subscribeFavicon = subscribeFavicon;
