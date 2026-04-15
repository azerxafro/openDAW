"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopBrowser = void 0;
var LoopBrowser_sass_inline_1 = require("./LoopBrowser.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(LoopBrowser_sass_inline_1.default, "LoopBrowser");
var LoopBrowser = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var query = new lib_std_1.DefaultObservableValue("");
    var activeCategory = new lib_std_1.DefaultObservableValue("All");
    var playingId = new lib_std_1.DefaultObservableValue(null);
    var elementsContainer = <div className="loops-list"></div>;
    var categories = ["All", "Drums", "Bass", "Melodic", "Vocals", "FX"];
    var loops = [];
    var playLoop = function (id) {
        if (playingId.getValue() === id) {
            playingId.setValue(null);
        }
        else {
            playingId.setValue(id);
        }
        renderLoops();
    };
    var renderLoops = function () {
        var q = query.getValue().toLowerCase();
        var cat = activeCategory.getValue();
        var filtered = loops.filter(function (l) {
            return (cat === "All" || l.category === cat) &&
                (l.name.toLowerCase().includes(q));
        });
        elementsContainer.innerHTML = ""; // clear elements
        filtered.forEach(function (loop) {
            var isPlaying = playingId.getValue() === loop.id;
            var card = (<div className={"loop-card ".concat(isPlaying ? 'playing' : '')} draggable="true">
                    <div className="play-btn" onInit={function (el) { return el.onclick = function () { return playLoop(loop.id); }; }}>
                        <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Play}/>
                    </div>
                    <div className="loop-info">
                        <span className="loop-name">{loop.name}</span>
                        <span className="loop-meta">
                            <span>{loop.bpm} BPM</span>
                            {loop.key ? <span>Key: {loop.key}</span> : null}
                        </span>
                    </div>
                    <div className="loop-waveform">
                        <div style={{ height: "40%" }}></div>
                        <div style={{ height: "70%" }}></div>
                        <div style={{ height: "30%" }}></div>
                        <div style={{ height: "90%" }}></div>
                        <div style={{ height: "50%" }}></div>
                    </div>
                </div>);
            elementsContainer.appendChild(card);
        });
    };
    fetch("/assets/loops/index.json")
        .then(function (res) { return res.json(); })
        .then(function (data) {
        loops = data.loops || [];
        renderLoops();
    })
        .catch(function (err) { return console.warn("Could not load loops index", err); });
    return (<div className={className}>
            <div className="header">
                <input type="text" className="search-input" placeholder="Search loops..." onInit={function (el) {
            el.oninput = function () {
                query.setValue(el.value);
                renderLoops();
            };
        }}/>
                <div className="categories">
                    {categories.map(function (cat) { return (<div className="category-btn" onInit={function (el) {
                lifecycle.own(activeCategory.catchupAndSubscribe(function (owner) {
                    if (owner.getValue() === cat)
                        el.classList.add("active");
                    else
                        el.classList.remove("active");
                }));
                el.onclick = function () {
                    activeCategory.setValue(cat);
                    renderLoops();
                };
            }}>
                            {cat}
                        </div>); })}
                </div>
            </div>
            {elementsContainer}
        </div>);
};
exports.LoopBrowser = LoopBrowser;
