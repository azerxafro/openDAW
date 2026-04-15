"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericModuleView = void 0;
var GenericModuleView_sass_inline_1 = require("./GenericModuleView.sass?inline");
var lib_std_1 = require("@opendaw/lib-std");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var studio_adapters_1 = require("@opendaw/studio-adapters");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var MenuButton_tsx_1 = require("@/ui/components/MenuButton.tsx");
var studio_core_1 = require("@opendaw/studio-core");
var ConnectorView_tsx_1 = require("@/ui/modular/ConnectorView.tsx");
var lib_box_1 = require("@opendaw/lib-box");
var Checkbox_tsx_1 = require("@/ui/components/Checkbox.tsx");
var ParameterLabel_tsx_1 = require("@/ui/components/ParameterLabel.tsx");
var RelativeUnitValueDragging_tsx_1 = require("@/ui/wrapper/RelativeUnitValueDragging.tsx");
var AutomationControl_1 = require("@/ui/components/AutomationControl");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var lib_dom_1 = require("@opendaw/lib-dom");
var studio_enums_1 = require("@opendaw/studio-enums");
var className = lib_dom_1.Html.adoptStyleSheet(GenericModuleView_sass_inline_1.default, "GenericModuleView");
var GenericModuleView = function (_a) {
    var lifecycle = _a.lifecycle, environment = _a.environment, adapter = _a.adapter;
    var selection = environment.selection, project = environment.project;
    var editing = project.editing, midiLearning = project.midiLearning;
    var _b = adapter.attributes, x = _b.x, y = _b.y, label = _b.label, collapsed = _b.collapsed;
    var nameValue = lib_jsx_1.Inject.value(label.getValue());
    lifecycle.own(label.subscribe(function (owner) { return nameValue.value = owner.getValue(); }));
    var headerPinInput = (<div className="header-pin"/>);
    var headerPinOutput = (<div className="header-pin"/>);
    var header = <header data-movable>
        {headerPinInput}
        <label>{nameValue}</label>
        <MenuButton_tsx_1.MenuButton root={studio_core_1.MenuItem.root()
            .setRuntimeChildrenProcedure(function (parent) { return parent
            .addMenuItem(studio_core_1.MenuItem.default({ label: "Collapse", checked: collapsed.getValue() })
            .setTriggerProcedure(function () { return editing.modify(function () { return collapsed.toggle(); }); }))
            .addMenuItem(studio_core_1.MenuItem.default({ label: "Delete" })
            .setTriggerProcedure(function () { return editing.modify(function () {
            selection.selected().slice().filter(function (adapter) { return adapter.attributes.removable.getValue(); })
                .forEach(function (adapter) { return adapter.box.delete(); });
        }); })); })} appearance={{ activeColor: studio_enums_1.Colors.dark }}>
            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Menu}/>
        </MenuButton_tsx_1.MenuButton>
        {headerPinOutput}
    </header>;
    lifecycle.own(lib_dom_1.Events.subscribe(header, "pointerdown", function (event) {
        if (!event.shiftKey && selection.count() === 1) {
            selection.deselectAll();
        }
        selection.select(adapter);
    }, { capture: true }));
    var element = <div className={className}/>;
    (0, lib_jsx_1.appendChildren)(element, <lib_jsx_1.Frag>
            {header}
            <div className="surface">
                {(function () {
            var inputs = adapter.inputs;
            var outputs = adapter.outputs;
            var elements = [];
            var createView = function (connector) {
                return elements.push(<ConnectorView_tsx_1.ConnectorView lifecycle={lifecycle} environment={environment} moduleAdapter={adapter} connectorAdapter={connector} parent={element} headerPin={connector.direction === studio_adapters_1.Direction.Input ? headerPinInput : headerPinOutput}/>);
            };
            var n = Math.max(inputs.length, outputs.length);
            for (var i = 0; i < n; i++) {
                (0, lib_std_1.ifDefined)(inputs.at(i), createView);
                (0, lib_std_1.ifDefined)(outputs.at(i), createView);
            }
            return elements;
        })()}
            </div>
            <div className="surface">
                {adapter.parameters.parameters().map(function (parameterAdapter) {
            switch (parameterAdapter.type) {
                case lib_box_1.PrimitiveType.Int32:
                case lib_box_1.PrimitiveType.Float32:
                    var label_1 = <label_1>{parameterAdapter.name}:</label_1>;
                    lifecycle.own(studio_core_1.ContextMenu.subscribe(label_1, function (collector) {
                        var _a;
                        var elements = adapter.modular.device.elements();
                        var element = (_a = elements.find(function (element) { return element.parameterAdapter === parameterAdapter; })) !== null && _a !== void 0 ? _a : null;
                        if (element === null) {
                            collector.addItems(studio_core_1.MenuItem.default({ label: "Create Knob" })
                                .setTriggerProcedure(function () {
                                editing.modify(function () {
                                    return studio_boxes_1.DeviceInterfaceKnobBox.create(environment.project.boxGraph, lib_std_1.UUID.generate(), function (box) {
                                        box.index.setValue(0);
                                        box.parameter.targetVertex = lib_std_1.Option.wrap(parameterAdapter.field);
                                        box.userInterface.refer(adapter.modular.device.box.userInterface.elements);
                                    });
                                });
                            }));
                        }
                        else {
                            collector.addItems(studio_core_1.MenuItem.default({ label: "Remove Knob" })
                                .setTriggerProcedure(function () { return editing.modify(function () { return element.box.delete(); }); }));
                        }
                    }));
                    return (<lib_jsx_1.Frag>
                                    {label_1}
                                    <AutomationControl_1.AutomationControl lifecycle={lifecycle} editing={editing} midiLearning={midiLearning} tracks={adapter.modular.device.deviceHost().audioUnitBoxAdapter().tracks} parameter={parameterAdapter}>
                                        <RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging lifecycle={lifecycle} editing={editing} parameter={parameterAdapter}>
                                            <ParameterLabel_tsx_1.ParameterLabel lifecycle={lifecycle} parameter={parameterAdapter}/>
                                        </RelativeUnitValueDragging_tsx_1.RelativeUnitValueDragging>
                                    </AutomationControl_1.AutomationControl>
                                </lib_jsx_1.Frag>);
                case lib_box_1.PrimitiveType.Boolean:
                    return (<Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={parameterAdapter} appearance={{ activeColor: studio_enums_1.Colors.blue }} style={{ fontSize: "0.75em", placeSelf: "start", marginLeft: "1px" }}>
                                    <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                                    <span style={{ fontSize: "0.75em", marginLeft: "0.5em" }}>Enabled</span>
                                </Checkbox_tsx_1.Checkbox>);
            }
        })}
            </div>
        </lib_jsx_1.Frag>);
    var updatePosition = function () { return element.style.transform =
        "translate(".concat(x.getValue(), "px, ").concat(y.getValue(), "px)"); };
    lifecycle.ownAll(x.subscribe(updatePosition), y.subscribe(updatePosition));
    updatePosition();
    var updateCollapse = function () { return element.classList.toggle("collapse", collapsed.getValue()); };
    lifecycle.own(collapsed.subscribe(updateCollapse));
    updateCollapse();
    return element;
};
exports.GenericModuleView = GenericModuleView;
