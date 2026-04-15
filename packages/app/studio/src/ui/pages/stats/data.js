"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNumber = exports.formatHours = exports.minutesToHours = exports.lastValue = exports.sumValues = exports.fetchErrorStats = exports.bestColumnCount = exports.fetchNpmWeeklyDownloads = exports.formatRelativeDate = exports.fetchBuildInfo = exports.fetchSponsorStats = exports.fetchDiscordStats = exports.fetchGitHubStats = exports.fetchUserStats = exports.fetchRoomStats = void 0;
var lib_std_1 = require("@opendaw/lib-std");
var sortByDate = function (record) {
    return Object.entries(record).sort(function (_a, _b) {
        var a = _a[0];
        var b = _b[0];
        return a.localeCompare(b);
    });
};
var cacheGet = function (key, ttlMs) {
    var raw = sessionStorage.getItem(key);
    if ((0, lib_std_1.isAbsent)(raw))
        return lib_std_1.Option.None;
    var parsed = JSON.parse(raw);
    if (Date.now() - parsed.at > ttlMs)
        return lib_std_1.Option.None;
    return lib_std_1.Option.wrap(parsed.value);
};
var cacheSet = function (key, value) { return sessionStorage.setItem(key, JSON.stringify({
    at: Date.now(),
    value: value
})); };
var fetchJson = function (url, init) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url, init)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("".concat(response.status, " ").concat(response.statusText));
                }
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var fetchRoomStats = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, count, duration;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    fetchJson("https://live.opendaw.studio/stats/rooms-count.json", { mode: "cors" }),
                    fetchJson("https://live.opendaw.studio/stats/rooms-duration.json", { mode: "cors" })
                ])];
            case 1:
                _a = _b.sent(), count = _a[0], duration = _a[1];
                return [2 /*return*/, { count: sortByDate(count), duration: sortByDate(duration) }];
        }
    });
}); };
exports.fetchRoomStats = fetchRoomStats;
var fetchUserStats = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchJson("https://api.opendaw.studio/users/graph.json", {
                    mode: "cors",
                    credentials: "include"
                })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, sortByDate(data)];
        }
    });
}); };
exports.fetchUserStats = fetchUserStats;
var GITHUB_REPO = "andremichelle/openDAW";
var GITHUB_CACHE_KEY = "stats:github:v2";
var GITHUB_TTL = 10 * 60 * 1000;
var fetchGitHubStats = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cached, repo, stats;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cached = cacheGet(GITHUB_CACHE_KEY, GITHUB_TTL);
                if (cached.nonEmpty())
                    return [2 /*return*/, cached.unwrap()];
                return [4 /*yield*/, fetchJson("https://api.github.com/repos/".concat(GITHUB_REPO))];
            case 1:
                repo = _a.sent();
                stats = {
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    watchers: repo.subscribers_count,
                    openIssues: repo.open_issues_count,
                    lastCommit: new Date(repo.pushed_at).getTime()
                };
                cacheSet(GITHUB_CACHE_KEY, stats);
                return [2 /*return*/, stats];
        }
    });
}); };
exports.fetchGitHubStats = fetchGitHubStats;
var DISCORD_INVITE = "ZRm8du7vn4";
var DISCORD_CACHE_KEY = "stats:discord";
var DISCORD_TTL = 5 * 60 * 1000;
var fetchDiscordStats = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cached, data, stats;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cached = cacheGet(DISCORD_CACHE_KEY, DISCORD_TTL);
                if (cached.nonEmpty())
                    return [2 /*return*/, cached.unwrap()];
                return [4 /*yield*/, fetchJson("https://discord.com/api/v10/invites/".concat(DISCORD_INVITE, "?with_counts=true"))];
            case 1:
                data = _a.sent();
                stats = {
                    name: data.guild.name,
                    total: data.approximate_member_count,
                    online: data.approximate_presence_count
                };
                cacheSet(DISCORD_CACHE_KEY, stats);
                return [2 /*return*/, stats];
        }
    });
}); };
exports.fetchDiscordStats = fetchDiscordStats;
var fetchSponsorStats = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, fetchJson("/sponsors.json")];
}); }); };
exports.fetchSponsorStats = fetchSponsorStats;
var fetchBuildInfo = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, fetchJson("/build-info.json")];
}); }); };
exports.fetchBuildInfo = fetchBuildInfo;
var formatRelativeDate = function (timestamp) {
    var diff = Date.now() - timestamp;
    var days = Math.floor(diff / (24 * 60 * 60 * 1000));
    if (days === 0)
        return "today";
    if (days === 1)
        return "1 day ago";
    if (days < 30)
        return "".concat(days, " days ago");
    var months = Math.floor(days / 30);
    if (months === 1)
        return "1 month ago";
    return "".concat(months, " months ago");
};
exports.formatRelativeDate = formatRelativeDate;
var NPM_CACHE_KEY = "stats:npm";
var NPM_TTL = 60 * 60 * 1000;
var fetchNpmWeeklyDownloads = function (packageName) { return __awaiter(void 0, void 0, void 0, function () {
    var key, cached, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = "".concat(NPM_CACHE_KEY, ":").concat(packageName);
                cached = cacheGet(key, NPM_TTL);
                if (cached.nonEmpty())
                    return [2 /*return*/, cached.unwrap()];
                return [4 /*yield*/, fetchJson("https://api.npmjs.org/downloads/point/last-week/".concat(packageName))];
            case 1:
                data = _a.sent();
                cacheSet(key, data.downloads);
                return [2 /*return*/, data.downloads];
        }
    });
}); };
exports.fetchNpmWeeklyDownloads = fetchNpmWeeklyDownloads;
var bestColumnCount = function (totalCells) {
    if (totalCells <= 1)
        return 1;
    var bestCols = totalCells;
    for (var rows = 1; rows * rows <= totalCells; rows++) {
        if (totalCells % rows === 0)
            bestCols = totalCells / rows;
    }
    return bestCols;
};
exports.bestColumnCount = bestColumnCount;
var ERROR_CACHE_KEY = "stats:errors";
var ERROR_TTL = 5 * 60 * 1000;
var fetchErrorStats = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cached, data, stats;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cached = cacheGet(ERROR_CACHE_KEY, ERROR_TTL);
                if (cached.nonEmpty())
                    return [2 /*return*/, cached.unwrap()];
                return [4 /*yield*/, fetchJson("https://logs.opendaw.studio/status.php")];
            case 1:
                data = _a.sent();
                stats = {
                    total: data.Total,
                    fixed: data.Fixed,
                    unfixed: data.Unfixed,
                    ratio: data.Ratio
                };
                cacheSet(ERROR_CACHE_KEY, stats);
                return [2 /*return*/, stats];
        }
    });
}); };
exports.fetchErrorStats = fetchErrorStats;
var sumValues = function (series) {
    return series.reduce(function (acc, _a) {
        var value = _a[1];
        return acc + value;
    }, 0);
};
exports.sumValues = sumValues;
var lastValue = function (series) {
    return series.length === 0 ? 0 : series[series.length - 1][1];
};
exports.lastValue = lastValue;
var minutesToHours = function (series) {
    return series.map(function (_a) {
        var date = _a[0], minutes = _a[1];
        return [date, minutes / 60];
    });
};
exports.minutesToHours = minutesToHours;
var formatHours = function (hours) {
    if (hours < 1)
        return "".concat(Math.round(hours * 60), " min");
    if (hours < 100)
        return "".concat(hours.toFixed(1), " h");
    return "".concat(Math.round(hours), " h");
};
exports.formatHours = formatHours;
var formatNumber = function (value) {
    if (value >= 1000000)
        return "".concat((value / 1000000).toFixed(1), "M");
    if (value >= 1000)
        return "".concat((value / 1000).toFixed(1), "K");
    return value.toString();
};
exports.formatNumber = formatNumber;
