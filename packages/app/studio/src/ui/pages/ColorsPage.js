"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorsPage = void 0;
var ColorsPage = function () {
    var cssVars = {};
    Array.from(document.styleSheets).forEach(function (sheet) {
        try {
            var rules = sheet.cssRules;
            Array.from(rules).forEach(function (rule) {
                if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
                    Array.from(rule.style).forEach(function (prop) {
                        if (prop.startsWith("--")) {
                            var value = rule.style.getPropertyValue(prop).trim();
                            var style = new Option().style;
                            style.color = value;
                            if (style.color === "") {
                                return;
                            }
                            cssVars[prop] = value;
                        }
                    });
                }
            });
        }
        catch (_) { /*Ignore cross-origin stylesheets*/ }
    });
    return (<div style={{ flex: "1 0 0", display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
            {Object.entries(cssVars).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<div style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: value,
                    display: "flex",
                    placeItems: "center",
                    placeContent: "center",
                    color: "white",
                    textShadow: "0 1px 2px black"
                }}>{key}</div>);
        })}
        </div>);
};
exports.ColorsPage = ColorsPage;
