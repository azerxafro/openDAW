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
exports.DashboardPage = void 0;
var DashboardPage_sass_inline_1 = require("./DashboardPage.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var ThreeDots_1 = require("@/ui/spinner/ThreeDots");
var charts_1 = require("./charts");
var components_1 = require("./components");
var Tile_1 = require("./Tile");
var data_1 = require("./data");
var className = lib_dom_1.Html.adoptStyleSheet(DashboardPage_sass_inline_1.default, "DashboardPage");
var NPM_PACKAGE = "@opendaw/lib-std";
var sliceSeries = function (series, fromDate, toDate) {
    return series.filter(function (_a) {
        var date = _a[0];
        return date >= fromDate && date <= toDate;
    });
};
var unionDates = function (data) {
    var set = new Set();
    data.rooms.count.forEach(function (_a) {
        var date = _a[0];
        return set.add(date);
    });
    data.rooms.duration.forEach(function (_a) {
        var date = _a[0];
        return set.add(date);
    });
    data.users.forEach(function (_a) {
        var date = _a[0];
        return set.add(date);
    });
    return __spreadArray([], set, true).sort();
};
var StatsBody = function (_a) {
    var lifecycle = _a.lifecycle, data = _a.data, tiles = _a.tiles;
    var dates = unionDates(data);
    if (dates.length === 0) {
        return <div className="loading">No statistics available yet.</div>;
    }
    var range = lifecycle.own(new lib_std_1.DefaultObservableValue([0, dates.length - 1]));
    var liveRoomsSeries = lifecycle.own(new lib_std_1.DefaultObservableValue([]));
    var liveHoursSeries = lifecycle.own(new lib_std_1.DefaultObservableValue([]));
    var peakUsersSeries = lifecycle.own(new lib_std_1.DefaultObservableValue([]));
    lifecycle.own(range.catchupAndSubscribe(function (owner) {
        var _a = owner.getValue(), fromIndex = _a[0], toIndex = _a[1];
        var fromDate = dates[fromIndex];
        var toDate = dates[toIndex];
        var liveRooms = sliceSeries(data.rooms.count, fromDate, toDate);
        var liveHours = (0, data_1.minutesToHours)(sliceSeries(data.rooms.duration, fromDate, toDate));
        var peakUsers = sliceSeries(data.users, fromDate, toDate);
        liveRoomsSeries.setValue(liveRooms);
        liveHoursSeries.setValue(liveHours);
        peakUsersSeries.setValue(peakUsers);
        tiles.peakUsers.textContent = (0, data_1.formatNumber)(Math.max.apply(Math, __spreadArray([0], peakUsers.map(function (_a) {
            var value = _a[1];
            return value;
        }), false)));
    }));
    return (<div className="grid">
            <div className="span-12">
                <components_1.Card title="Daily Peak Users" accent={<span>concurrent</span>} className="hero">
                    <charts_1.LineChart lifecycle={lifecycle} series={peakUsersSeries} color={studio_enums_1.Colors.green.toString()}/>
                    <components_1.RangeControl lifecycle={lifecycle} dates={dates} range={range}/>
                </components_1.Card>
            </div>
            <div className="span-6">
                <components_1.Card title="Daily Live Rooms" accent={<span>rooms per day</span>} className="compact">
                    <charts_1.LineChart lifecycle={lifecycle} series={liveRoomsSeries} color={studio_enums_1.Colors.purple.toString()}/>
                </components_1.Card>
            </div>
            <div className="span-6">
                <components_1.Card title="Daily Live Rooms Hours" accent={<span>hours per day</span>} className="compact">
                    <charts_1.BarChart lifecycle={lifecycle} series={liveHoursSeries} color={studio_enums_1.Colors.blue.toString()}/>
                </components_1.Card>
            </div>
        </div>);
};
var GitHubTiles = function (_a) {
    var stats = _a.stats;
    return (<lib_jsx_1.Frag>
        <Tile_1.Tile label="GitHub stars" value={(0, data_1.formatNumber)(stats.stars)} icon="★"/>
        <Tile_1.Tile label="GitHub forks" value={(0, data_1.formatNumber)(stats.forks)} icon="⑂"/>
        <Tile_1.Tile label="GitHub watchers" value={(0, data_1.formatNumber)(stats.watchers)} icon="◉"/>
        <Tile_1.Tile label="GitHub Open issues" value={(0, data_1.formatNumber)(stats.openIssues)} icon="◈"/>
        <Tile_1.Tile label="GitHub Last commit" value={(0, data_1.formatRelativeDate)(stats.lastCommit)} icon="↗"/>
    </lib_jsx_1.Frag>);
};
var DiscordTiles = function (_a) {
    var stats = _a.stats;
    return (<lib_jsx_1.Frag>
        <Tile_1.Tile label="Discord members" value={(0, data_1.formatNumber)(stats.total)} icon="D"/>
        <Tile_1.Tile label="Discord online" value={(0, data_1.formatNumber)(stats.online)} icon="●"/>
    </lib_jsx_1.Frag>);
};
var ErrorTile = function (_a) {
    var stats = _a.stats;
    return (<Tile_1.Tile label="Errors fixed" value={stats.ratio} icon="✓"/>);
};
var NpmTile = function (_a) {
    var downloads = _a.downloads;
    return (<Tile_1.Tile label="NPM weekly" value={(0, data_1.formatNumber)(downloads)} icon="⤓"/>);
};
var BuildTile = function (_a) {
    var info = _a.info;
    return (<Tile_1.Tile label="Last build" value={(0, data_1.formatRelativeDate)(info.date)} icon="⚙"/>);
};
var AllTimeTiles = function (_a) {
    var data = _a.data;
    var totalRooms = (0, data_1.sumValues)(data.rooms.count);
    var totalMinutes = (0, data_1.sumValues)(data.rooms.duration);
    var totalHours = totalMinutes / 60;
    var allTimePeak = Math.max.apply(Math, __spreadArray([0], data.users.map(function (_a) {
        var value = _a[1];
        return value;
    }), false));
    var avgSession = totalRooms === 0 ? 0 : totalMinutes / totalRooms;
    return (<lib_jsx_1.Frag>
            <Tile_1.Tile label="Rooms Total Create" value={(0, data_1.formatNumber)(totalRooms)} icon="∑"/>
            <Tile_1.Tile label="Rooms Total Hours" value={(0, data_1.formatHours)(totalHours)} icon="⏱"/>
            <Tile_1.Tile label="Total Users" value={(0, data_1.formatNumber)(allTimePeak)} icon="↑"/>
            <Tile_1.Tile label="Avg session" value={(0, data_1.formatHours)(avgSession / 60)} icon="x̄"/>
        </lib_jsx_1.Frag>);
};
var SponsorsCard = function (_a) {
    var stats = _a.stats;
    var grid = <div className="sponsors"/>;
    grid.append.apply(grid, stats.sponsors.map(function (sponsor) {
        var _a, _b;
        return (<a className="sponsor" href={sponsor.url} target="_blank" rel="noopener noreferrer" title={(_a = sponsor.name) !== null && _a !== void 0 ? _a : sponsor.login}>
            <img className="sponsor-avatar" src={sponsor.avatarUrl} alt={sponsor.login} loading="lazy"/>
            <span className="sponsor-name">{(_b = sponsor.name) !== null && _b !== void 0 ? _b : sponsor.login}</span>
        </a>);
    }));
    return (<components_1.Card title="GitHub Sponsors" accent={<span>{(0, data_1.formatNumber)(stats.totalCount)} supporters · thank you ♥</span>}>
            {grid}
        </components_1.Card>);
};
var DashboardPage = function (_a) {
    var lifecycle = _a.lifecycle;
    var updatedAt = new Date().toLocaleString();
    var tiles = {
        peakUsers: <span />
    };
    var dataPromise = (function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, rooms, users;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        (0, data_1.fetchRoomStats)(),
                        (0, data_1.fetchUserStats)().catch(function () { return []; })
                    ])];
                case 1:
                    _a = _b.sent(), rooms = _a[0], users = _a[1];
                    return [2 /*return*/, { rooms: rooms, users: users }];
            }
        });
    }); })();
    return (<div className={className}>
            <header className="dashboard-head">
                <h1>openDAW Statistics</h1>
                <span className="updated">Updated {updatedAt}</span>
            </header>
            <lib_jsx_1.Await factory={function () { return (0, data_1.fetchSponsorStats)(); }} loading={function () { return null; }} failure={function () { return null; }} success={function (stats) { return stats.totalCount > 0 ? <SponsorsCard stats={stats}/> : null; }}/>
            <div className="tiles">
                <lib_jsx_1.Await factory={function () { return (0, data_1.fetchGitHubStats)(); }} loading={function () { return <Tile_1.Tile label="GitHub" value="…" icon="★"/>; }} failure={function () { return <Tile_1.Tile label="GitHub" value="n/a" icon="★"/>; }} success={function (stats) { return <GitHubTiles stats={stats}/>; }}/>
                <lib_jsx_1.Await factory={function () { return (0, data_1.fetchDiscordStats)(); }} loading={function () { return <Tile_1.Tile label="Discord" value="…" icon="D"/>; }} failure={function () { return <Tile_1.Tile label="Discord" value="n/a" icon="D"/>; }} success={function (stats) { return <DiscordTiles stats={stats}/>; }}/>
                <lib_jsx_1.Await factory={function () { return (0, data_1.fetchErrorStats)(); }} loading={function () { return <Tile_1.Tile label="Errors" value="…" icon="!"/>; }} failure={function () { return <Tile_1.Tile label="Errors" value="n/a" icon="!"/>; }} success={function (stats) { return <ErrorTile stats={stats}/>; }}/>
                <lib_jsx_1.Await factory={function () { return (0, data_1.fetchNpmWeeklyDownloads)(NPM_PACKAGE); }} loading={function () { return <Tile_1.Tile label="NPM weekly" value="…" icon="⤓"/>; }} failure={function () { return <Tile_1.Tile label="NPM weekly" value="n/a" icon="⤓"/>; }} success={function (downloads) { return <NpmTile downloads={downloads}/>; }}/>
                <lib_jsx_1.Await factory={function () { return (0, data_1.fetchBuildInfo)(); }} loading={function () { return <Tile_1.Tile label="Last build" value="…" icon="⚙"/>; }} failure={function () { return <Tile_1.Tile label="Last build" value="n/a" icon="⚙"/>; }} success={function (info) { return <BuildTile info={info}/>; }}/>
                <lib_jsx_1.Await factory={function () { return dataPromise; }} loading={function () { return <Tile_1.Tile label="All-time" value="…" icon="∑"/>; }} failure={function () { return <Tile_1.Tile label="All-time" value="n/a" icon="∑"/>; }} success={function (data) { return <AllTimeTiles data={data}/>; }}/>
                <Tile_1.Tile label="Peak users (range)" value={tiles.peakUsers} icon="U"/>
            </div>
            <lib_jsx_1.Await factory={function () { return dataPromise; }} loading={function () { return <ThreeDots_1.ThreeDots />; }} failure={function (_a) {
        var reason = _a.reason;
        return <p className="error">Failed to load stats: {reason}</p>;
    }} success={function (data) { return <StatsBody lifecycle={lifecycle} data={data} tiles={tiles}/>; }}/>
        </div>);
};
exports.DashboardPage = DashboardPage;
