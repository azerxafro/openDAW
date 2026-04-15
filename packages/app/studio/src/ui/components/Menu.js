"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
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
exports.Menu = exports.ValueSliderMenuDataElement = exports.DefaultMenuDataElement = exports.HeaderMenuDataElement = void 0;
var Menu_sass_inline_1 = require("./Menu.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_std_1 = require("@opendaw/lib-std");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var Surface_tsx_1 = require("@/ui/surface/Surface.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(Menu_sass_inline_1.default, "menu");
var HeaderMenuDataElement = function (_a) {
    var _b, _c;
    var data = _a.data;
    return (<div className={lib_dom_1.Html.buildClassList("header")} style={{ "--color": (_c = (_b = data === null || data === void 0 ? void 0 : data.color) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : studio_enums_1.Colors.gray.toString() }}>
        <div className="icon-space"/>
        {data.icon && <Icon_tsx_1.Icon symbol={data.icon} style={{ margin: "0 0.25em", fontSize: "1.25em" }}/>}
        <div className="label">{data.label}</div>
        <div className="shortcut"/>
    </div>);
};
exports.HeaderMenuDataElement = HeaderMenuDataElement;
var DefaultMenuDataElement = function (_a) {
    var _b;
    var data = _a.data;
    return (<div className={lib_dom_1.Html.buildClassList("default", data.checked && "checked")}>
        <svg classList="check-icon" viewBox="0 0 12 12">
            <path d="M2 7L5 10L10 3"/>
        </svg>
        {data.icon && <Icon_tsx_1.Icon symbol={data.icon} style={{ margin: "0 0.25em", fontSize: "1.25em" }}/>}
        <div className="label">{data.label}</div>
        <div className="shortcut">{__spreadArray([], (_b = data.shortcut) !== null && _b !== void 0 ? _b : [], true).map(function (s) { return <span>{s}</span>; })}</div>
        <svg classList="children-icon" viewBox="0 0 12 12">
            <path d="M4 2L8 6L4 10"/>
        </svg>
    </div>);
};
exports.DefaultMenuDataElement = DefaultMenuDataElement;
var ValueSliderMenuDataElement = function (_a) {
    var _b;
    var _c = _a.data, icon = _c.icon, model = _c.model, valueMapping = _c.valueMapping, stringMapping = _c.stringMapping, name = _c.name, color = _c.color, minValueWidth = _c.minValueWidth, lifecycle = _a.lifecycle;
    var valueLabel = (<div className="value" style={{ minWidth: minValueWidth }}/>);
    var unitLabel = (<div className="unit"/>);
    var update = function (value) {
        var _a = stringMapping.x(value), unit = _a.unit, string = _a.value;
        valueLabel.textContent = string;
        unitLabel.textContent = unit;
    };
    return (<div className="input-value" style={{ "--color": (_b = color === null || color === void 0 ? void 0 : color.toString()) !== null && _b !== void 0 ? _b : studio_enums_1.Colors.gray.toString() }}>
            <Icon_tsx_1.Icon symbol={icon} style={{ margin: "0 0.25em", fontSize: "1.25em" }}/>
            <div className="name">{name}</div>
            <input type="range" min="0" max="1" step="any" data-close-on-blur onInit={function (element) {
            element.oninput = function () { return model.setValue(valueMapping.y(element.valueAsNumber)); };
            lifecycle.own(model.catchupAndSubscribe(function (owner) {
                var value = owner.getValue();
                update(value);
                element.valueAsNumber = valueMapping.x(value);
            }));
        }}/>
            {valueLabel}
            {unitLabel}
        </div>);
};
exports.ValueSliderMenuDataElement = ValueSliderMenuDataElement;
var Menu = /** @class */ (function () {
    function Menu(parent, item, groupId) {
        var _this = this;
        _Menu_instances.add(this);
        _Menu_terminator.set(this, void 0);
        _Menu_parent.set(this, void 0);
        _Menu_item.set(this, void 0);
        _Menu_groupId.set(this, void 0);
        _Menu_element.set(this, void 0);
        _Menu_scrollUp.set(this, void 0);
        _Menu_container.set(this, void 0);
        _Menu_scrollDown.set(this, void 0);
        _Menu_openTime.set(this, void 0);
        _Menu_childMenu.set(this, lib_std_1.Option.None);
        _Menu_x.set(this, 0);
        _Menu_y.set(this, 0);
        __classPrivateFieldSet(this, _Menu_terminator, new lib_std_1.Terminator(), "f");
        __classPrivateFieldSet(this, _Menu_parent, parent, "f");
        __classPrivateFieldSet(this, _Menu_item, item, "f");
        __classPrivateFieldSet(this, _Menu_groupId, groupId, "f");
        var _b = __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_createHtml).call(this), element = _b.element, scrollUp = _b.scrollUp, container = _b.container, scrollDown = _b.scrollDown;
        __classPrivateFieldSet(this, _Menu_element, element, "f");
        __classPrivateFieldSet(this, _Menu_scrollUp, scrollUp, "f");
        __classPrivateFieldSet(this, _Menu_container, container, "f");
        __classPrivateFieldSet(this, _Menu_scrollDown, scrollDown, "f");
        __classPrivateFieldSet(this, _Menu_openTime, Date.now(), "f");
        __classPrivateFieldGet(this, _Menu_element, "f").onblur = function (event) {
            var related = event.relatedTarget;
            if (related === null) {
                // lost focus
                _this.root.terminate();
            }
            else if (related instanceof HTMLElement && !(0, lib_std_1.isDefined)(related.getAttribute("data-close-on-blur"))) {
                // an unrelated element has been focussed
                _this.root.terminate();
            }
        };
    }
    Menu.create = function (item, groupId) {
        var oldFocus = document.activeElement;
        var menu = new _a(lib_std_1.Option.None, item, groupId !== null && groupId !== void 0 ? groupId : "");
        if (oldFocus instanceof HTMLElement) {
            menu.own(lib_std_1.Terminable.create(function () { return oldFocus.focus(); }));
        }
        return menu;
    };
    Menu.prototype.own = function (terminable) { return __classPrivateFieldGet(this, _Menu_terminator, "f").own(terminable); };
    Menu.prototype.ownAll = function () {
        var _b;
        var terminables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            terminables[_i] = arguments[_i];
        }
        (_b = __classPrivateFieldGet(this, _Menu_terminator, "f")).ownAll.apply(_b, terminables);
    };
    Menu.prototype.spawn = function () { return __classPrivateFieldGet(this, _Menu_terminator, "f").spawn(); };
    Object.defineProperty(Menu.prototype, "root", {
        get: function () { return __classPrivateFieldGet(this, _Menu_parent, "f").isEmpty() ? this : __classPrivateFieldGet(this, _Menu_parent, "f").unwrap().root; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "element", {
        get: function () { return __classPrivateFieldGet(this, _Menu_element, "f"); },
        enumerable: false,
        configurable: true
    });
    Menu.prototype.moveTo = function (x, y) {
        __classPrivateFieldSet(this, _Menu_x, x | 0, "f");
        __classPrivateFieldSet(this, _Menu_y, y | 0, "f");
        __classPrivateFieldGet(this, _Menu_element, "f").style.transform = "translate(".concat(__classPrivateFieldGet(this, _Menu_x, "f"), "px, ").concat(__classPrivateFieldGet(this, _Menu_y, "f"), "px)");
    };
    Menu.prototype.attach = function (parentElement) {
        var _this = this;
        parentElement.appendChild(__classPrivateFieldGet(this, _Menu_element, "f"));
        var _b = __classPrivateFieldGet(this, _Menu_element, "f").getBoundingClientRect(), right = _b.right, bottom = _b.bottom, width = _b.width, height = _b.height;
        var owner = Surface_tsx_1.Surface.get(parentElement).owner;
        var innerWidth = owner.innerWidth;
        var innerHeight = owner.innerHeight;
        var offset = parseFloat(getComputedStyle(__classPrivateFieldGet(this, _Menu_element, "f")).fontSize) / 4;
        if (right > innerWidth) {
            __classPrivateFieldGet(this, _Menu_parent, "f").match({
                none: function () { return _this.moveTo(innerWidth - width - offset, __classPrivateFieldGet(_this, _Menu_y, "f")); },
                some: function () { return _this.moveTo(offset - width, __classPrivateFieldGet(_this, _Menu_y, "f")); }
            });
        }
        if (height > innerHeight) {
            __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_setupScrolling).call(this);
            this.moveTo(__classPrivateFieldGet(this, _Menu_x, "f"), -parentElement.getBoundingClientRect().top);
        }
        else if (bottom > innerHeight) {
            this.moveTo(__classPrivateFieldGet(this, _Menu_x, "f"), __classPrivateFieldGet(this, _Menu_y, "f") - bottom + innerHeight);
        }
        lib_dom_1.AnimationFrame.once(function () { return __classPrivateFieldGet(_this, _Menu_element, "f").focus(); });
    };
    Menu.prototype.terminate = function () {
        __classPrivateFieldGet(this, _Menu_childMenu, "f").ifSome(function (menu) { return menu.terminate(); });
        __classPrivateFieldSet(this, _Menu_childMenu, lib_std_1.Option.None, "f");
        __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_changeSelected).call(this);
        __classPrivateFieldGet(this, _Menu_element, "f").onblur = null;
        __classPrivateFieldGet(this, _Menu_element, "f").remove();
        __classPrivateFieldGet(this, _Menu_item, "f").removeRuntimeChildren();
        __classPrivateFieldGet(this, _Menu_terminator, "f").terminate();
    };
    var _Menu_instances, _a, _Menu_terminator, _Menu_parent, _Menu_item, _Menu_groupId, _Menu_element, _Menu_scrollUp, _Menu_container, _Menu_scrollDown, _Menu_openTime, _Menu_childMenu, _Menu_x, _Menu_y, _Menu_onPointerEnter, _Menu_onPointerLeave, _Menu_onPointerUp, _Menu_changeSelected, _Menu_isChild, _Menu_closeChildMenu, _Menu_createHtml, _Menu_setupScrolling, _Menu_canScroll, _Menu_computeEmInPixels;
    _a = Menu, _Menu_terminator = new WeakMap(), _Menu_parent = new WeakMap(), _Menu_item = new WeakMap(), _Menu_groupId = new WeakMap(), _Menu_element = new WeakMap(), _Menu_scrollUp = new WeakMap(), _Menu_container = new WeakMap(), _Menu_scrollDown = new WeakMap(), _Menu_openTime = new WeakMap(), _Menu_childMenu = new WeakMap(), _Menu_x = new WeakMap(), _Menu_y = new WeakMap(), _Menu_instances = new WeakSet(), _Menu_onPointerEnter = function _Menu_onPointerEnter(item, itemElement) {
        __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_changeSelected).call(this, itemElement);
        if (__classPrivateFieldGet(this, _Menu_childMenu, "f").nonEmpty()) {
            if (item.hasChildren && __classPrivateFieldGet(__classPrivateFieldGet(this, _Menu_childMenu, "f").unwrap(), _Menu_item, "f") === item) {
                // no need to remove and recreate the same pull-down
                return;
            }
            __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_closeChildMenu).call(this);
        }
        if (item.hasChildren) {
            var itemRect = itemElement.getBoundingClientRect();
            var elementRect = __classPrivateFieldGet(this, _Menu_element, "f").getBoundingClientRect();
            var childMenu = new _a(lib_std_1.Option.wrap(this), item, __classPrivateFieldGet(this, _Menu_groupId, "f"));
            var em = parseFloat(getComputedStyle(__classPrivateFieldGet(this, _Menu_element, "f")).fontSize);
            childMenu.moveTo(elementRect.width - em / 4, (itemRect.top - elementRect.top) - em);
            childMenu.attach(__classPrivateFieldGet(this, _Menu_element, "f"));
            __classPrivateFieldSet(this, _Menu_childMenu, lib_std_1.Option.wrap(childMenu), "f");
        }
    }, _Menu_onPointerLeave = function _Menu_onPointerLeave(_item, itemElement, event) {
        if (__classPrivateFieldGet(this, _Menu_instances, "m", _Menu_isChild).call(this, event.relatedTarget)) {
            return;
        }
        itemElement.classList.remove("selected");
        __classPrivateFieldGet(this, _Menu_instances, "m", _Menu_closeChildMenu).call(this);
    }, _Menu_onPointerUp = function _Menu_onPointerUp(item, _itemElement, event) {
        event.preventDefault();
        if (__classPrivateFieldGet(this, _Menu_childMenu, "f").isEmpty()) {
            this.root.terminate();
            item.trigger();
        }
    }, _Menu_changeSelected = function _Menu_changeSelected(element) {
        var _b;
        if (element === void 0) { element = null; }
        (_b = __classPrivateFieldGet(this, _Menu_element, "f").querySelector(".selected")) === null || _b === void 0 ? void 0 : _b.classList.remove("selected");
        element === null || element === void 0 ? void 0 : element.classList.add("selected");
    }, _Menu_isChild = function _Menu_isChild(node) {
        if (__classPrivateFieldGet(this, _Menu_childMenu, "f").isEmpty()) {
            return false;
        }
        var childMenu = __classPrivateFieldGet(this, _Menu_childMenu, "f").unwrap();
        var target = node;
        while (null !== target) {
            if (target === __classPrivateFieldGet(this, _Menu_element, "f")) {
                return false;
            }
            if (target === __classPrivateFieldGet(childMenu, _Menu_element, "f")) {
                return true;
            }
            target = target.parentNode;
        }
        return false;
    }, _Menu_closeChildMenu = function _Menu_closeChildMenu() {
        if (__classPrivateFieldGet(this, _Menu_childMenu, "f").isEmpty()) {
            return;
        }
        __classPrivateFieldGet(this, _Menu_element, "f").focus();
        __classPrivateFieldGet(this, _Menu_childMenu, "f").unwrap().terminate();
        __classPrivateFieldSet(this, _Menu_childMenu, lib_std_1.Option.None, "f");
    }, _Menu_createHtml = function _Menu_createHtml() {
        var _this = this;
        var scrollUp = <div className="scroll up"><Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.RoundUp}/></div>;
        var scrollDown = <div className="scroll down"><Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.RoundDown}/></div>;
        var container = <div className="container">{__classPrivateFieldGet(this, _Menu_item, "f").collectChildren()
                .filter(function (item) { return !item.hidden; })
                .map(function (item) {
                item.open();
                var hasChildren = item.hasChildren;
                var selectable = item.selectable;
                var itemElement = (<div className="item">
                            {(function () {
                        if (item.data === undefined) {
                            return (0, lib_std_1.panic)("");
                        }
                        else if (item.data.type === "header") {
                            return <exports.HeaderMenuDataElement data={item.data}/>;
                        }
                        else if (item.data.type === "default") {
                            return <exports.DefaultMenuDataElement data={item.data}/>;
                        }
                        else if (item.data.type === "input-value") {
                            return <exports.ValueSliderMenuDataElement data={item.data} lifecycle={_this}/>;
                        }
                    })()}
                        </div>);
                if (selectable) {
                    itemElement.classList.add("selectable");
                }
                if (hasChildren) {
                    itemElement.classList.add("has-children");
                }
                itemElement.onpointerenter = function () { return __classPrivateFieldGet(_this, _Menu_instances, "m", _Menu_onPointerEnter).call(_this, item, itemElement); };
                itemElement.onpointerleave = function (event) { return __classPrivateFieldGet(_this, _Menu_instances, "m", _Menu_onPointerLeave).call(_this, item, itemElement, event); };
                itemElement.onpointerup = function (event) {
                    if (Date.now() - __classPrivateFieldGet(_this, _Menu_openTime, "f") < _a.MIN_TIME_MS) {
                        return;
                    }
                    __classPrivateFieldGet(_this, _Menu_instances, "m", _Menu_onPointerUp).call(_this, item, itemElement, event);
                };
                return (<lib_jsx_1.Frag>
                            {item.separatorBefore && <hr />}
                            {itemElement}
                        </lib_jsx_1.Frag>);
            })}
        </div>;
        var element = (<nav className={className} tabIndex={-1} data-close-on-blur={true} data-menu-group-id={__classPrivateFieldGet(this, _Menu_groupId, "f")}>
                {scrollUp}
                {container}
                {scrollDown}
            </nav>);
        return { element: element, scrollUp: scrollUp, container: container, scrollDown: scrollDown };
    }, _Menu_setupScrolling = function _Menu_setupScrolling() {
        var _this = this;
        var scroll = function (direction) { return __classPrivateFieldGet(_this, _Menu_container, "f").scrollTop += direction * __classPrivateFieldGet(_this, _Menu_instances, "m", _Menu_computeEmInPixels).call(_this) / 3; };
        this.element.classList.add("overflowing");
        __classPrivateFieldGet(this, _Menu_terminator, "f").own(lib_dom_1.Events.subscribe(this.element, "wheel", function (event) {
            event.preventDefault();
            scroll(Math.sign(event.deltaY) * __classPrivateFieldGet(_this, _Menu_instances, "m", _Menu_computeEmInPixels).call(_this) * 1.5);
        }, { passive: false }));
        var setup = function (button, direction) {
            var scrolling = new lib_std_1.Terminator();
            button.onpointerenter = function () {
                if (!__classPrivateFieldGet(_this, _Menu_instances, "m", _Menu_canScroll).call(_this, direction)) {
                    return;
                }
                scrolling.own(lib_dom_1.AnimationFrame.add(function () {
                    if (__classPrivateFieldGet(_this, _Menu_instances, "m", _Menu_canScroll).call(_this, direction)) {
                        scroll(direction);
                    }
                    else {
                        scrolling.terminate();
                    }
                }));
                button.onpointerleave = function () { return scrolling.terminate(); };
            };
        };
        setup(__classPrivateFieldGet(this, _Menu_scrollUp, "f"), -1);
        setup(__classPrivateFieldGet(this, _Menu_scrollDown, "f"), 1);
    }, _Menu_canScroll = function _Menu_canScroll(direction) {
        return (0 > direction && __classPrivateFieldGet(this, _Menu_container, "f").scrollTop > 0)
            || (0 < direction && __classPrivateFieldGet(this, _Menu_container, "f").scrollTop < __classPrivateFieldGet(this, _Menu_container, "f").scrollHeight - __classPrivateFieldGet(this, _Menu_container, "f").clientHeight);
    }, _Menu_computeEmInPixels = function _Menu_computeEmInPixels() { return parseInt(getComputedStyle(__classPrivateFieldGet(this, _Menu_element, "f")).fontSize); };
    Menu.Padding = 4; // this is the invisible increase of the hitarea to have seamless connection to the source element
    Menu.MIN_TIME_MS = 250; // if the menu is placed under the pointer, we avoid an accidental click
    return Menu;
}());
exports.Menu = Menu;
