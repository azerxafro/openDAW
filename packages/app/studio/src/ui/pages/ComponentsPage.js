"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentsPage = void 0;
var ComponentsPage_sass_inline_1 = require("./ComponentsPage.sass?inline");
var Checkbox_tsx_1 = require("@/ui/components/Checkbox.tsx");
var lib_std_1 = require("@opendaw/lib-std");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var RadioGroup_tsx_1 = require("@/ui/components/RadioGroup.tsx");
var Button_tsx_1 = require("@/ui/components/Button.tsx");
var studio_core_1 = require("@opendaw/studio-core");
var MenuButton_tsx_1 = require("@/ui/components/MenuButton.tsx");
var FloatingTextInput_tsx_1 = require("@/ui/components/FloatingTextInput.tsx");
var Dialog_tsx_1 = require("@/ui/components/Dialog.tsx");
var Scroller_tsx_1 = require("@/ui/components/Scroller.tsx");
var ScrollModel_ts_1 = require("@/ui/components/ScrollModel.ts");
var TimeCodeInput_tsx_1 = require("@/ui/components/TimeCodeInput.tsx");
var NumberInput_tsx_1 = require("@/ui/components/NumberInput.tsx");
var VUMeterDesign_tsx_1 = require("@/ui/meter/VUMeterDesign.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var lib_dsp_1 = require("@opendaw/lib-dsp");
var studio_boxes_1 = require("@opendaw/studio-boxes");
var lib_box_1 = require("@opendaw/lib-box");
var BoxDebugView_1 = require("../components/BoxDebugView");
var ProgressBar_tsx_1 = require("@/ui/components/ProgressBar.tsx");
var TextInput_1 = require("../components/TextInput");
var SearchInput_1 = require("../components/SearchInput");
var lib_dom_1 = require("@opendaw/lib-dom");
var className = lib_dom_1.Html.adoptStyleSheet(ComponentsPage_sass_inline_1.default, "ComponentsPage");
var ComponentsPage = function (_a) {
    var lifecycle = _a.lifecycle;
    var checkbox = new lib_std_1.DefaultObservableValue(false);
    var radioGroup = new lib_std_1.DefaultObservableValue(0);
    var boxGraph = new lib_box_1.BoxGraph(lib_std_1.Option.None);
    boxGraph.beginTransaction();
    var rootBox = studio_boxes_1.RootBox.create(boxGraph, lib_std_1.UUID.generate(), function (box) { return box.created.setValue(new Date().toISOString()); });
    var timelineBox = studio_boxes_1.TimelineBox.create(boxGraph, lib_std_1.UUID.generate(), function (_box) {
    });
    rootBox.timeline.refer(timelineBox.root);
    boxGraph.endTransaction();
    return (<div className={className}>
            <div>
                <h1>Components</h1>
                <div>
                    <label>Button</label>
                    <Button_tsx_1.Button lifecycle={lifecycle} onClick={function () { }} appearance={{ activeColor: studio_enums_1.Colors.bright }}>
                        <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Play}/>
                    </Button_tsx_1.Button>
                    <label>Button (framed)</label>
                    <Button_tsx_1.Button lifecycle={lifecycle} onClick={function () { }} appearance={{ activeColor: studio_enums_1.Colors.bright, framed: true }}>
                        <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Play}/>
                    </Button_tsx_1.Button>
                    <label>ProgressBar</label>
                    <ProgressBar_tsx_1.ProgressBar lifecycle={lifecycle} progress={new lib_std_1.DefaultObservableValue(0.5)}/>
                    <label>Checkbox</label>
                    <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={checkbox} appearance={{ activeColor: studio_enums_1.Colors.green, framed: false }}>
                        <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                    </Checkbox_tsx_1.Checkbox>
                    <label>Checkbox (framed)</label>
                    <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={checkbox} appearance={{ activeColor: studio_enums_1.Colors.yellow, framed: true }}>
                        <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/>
                    </Checkbox_tsx_1.Checkbox>
                    <label>RadioGroup</label>
                    <RadioGroup_tsx_1.RadioGroup lifecycle={lifecycle} model={radioGroup} elements={[
            { value: 0, element: <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Flask}/> },
            { value: 1, element: <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Waveform}/> },
            { value: 2, element: <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Dial}/> }
        ]}/>
                    <label>RadioGroup (framed)</label>
                    <RadioGroup_tsx_1.RadioGroup lifecycle={lifecycle} model={radioGroup} elements={[
            { value: 0, element: <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Flask}/> },
            { value: 1, element: <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Waveform}/> },
            { value: 2, element: <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Dial}/> }
        ]} appearance={{ activeColor: studio_enums_1.Colors.yellow, framed: true }}/>
                    <label>Time-Code Input (Zero-Based)</label>
                    <TimeCodeInput_tsx_1.TimeCodeInput lifecycle={lifecycle} model={new lib_std_1.DefaultObservableValue(0)}/>
                    <label>Time-Code Input (One-Based)</label>
                    <TimeCodeInput_tsx_1.TimeCodeInput lifecycle={lifecycle} model={new lib_std_1.DefaultObservableValue(0)} oneBased/>
                    <label>Time-Code Input (One-Based, 3/4)</label>
                    <TimeCodeInput_tsx_1.TimeCodeInput lifecycle={lifecycle} signature={[3, 4]} model={new lib_std_1.DefaultObservableValue(0)} oneBased/>
                    <label>Time-Code Input (One-Based, 3/4) disabled</label>
                    <TimeCodeInput_tsx_1.TimeCodeInput lifecycle={lifecycle} signature={[3, 4]} model={new lib_std_1.DefaultObservableValue(0)} className="disabled" oneBased/>
                    <label>IntegerInput Input</label>
                    <NumberInput_tsx_1.NumberInput lifecycle={lifecycle} model={new lib_std_1.DefaultObservableValue(0)}/>
                    <label>IntegerInput Input (disabled)</label>
                    <NumberInput_tsx_1.NumberInput lifecycle={lifecycle} model={new lib_std_1.DefaultObservableValue(0)} className="disabled"/>
                    <label>TextInput</label>
                    <TextInput_1.TextInput lifecycle={lifecycle} model={new lib_std_1.DefaultObservableValue("Text")}/>
                    <label>SearchField</label>
                    <SearchInput_1.SearchInput lifecycle={lifecycle} model={new lib_std_1.DefaultObservableValue("")}/>
                    <label>Scroller</label>
                    <div style={{
            width: "128px",
            height: "128px",
            position: "relative",
            backgroundColor: "rgba(255, 255, 255, 0.1)"
        }}>
                        <Scroller_tsx_1.Scroller lifecycle={lifecycle} model={(function () {
            var model = new ScrollModel_ts_1.ScrollModel();
            model.visibleSize = 128;
            model.contentSize = 128 * 2;
            model.trackSize = 128;
            return model;
        })()} orientation={Scroller_tsx_1.Orientation.vertical} floating/>
                        <Scroller_tsx_1.Scroller lifecycle={lifecycle} model={(function () {
            var model = new ScrollModel_ts_1.ScrollModel();
            model.visibleSize = 128;
            model.contentSize = 128 * 2;
            model.trackSize = 128;
            return model;
        })()} orientation={Scroller_tsx_1.Orientation.horizontal} floating/>
                    </div>
                    <label>Meters</label>
                    <div>
                        <VUMeterDesign_tsx_1.VUMeterDesign.Default model={new lib_std_1.DefaultObservableValue((0, lib_dsp_1.dbToGain)(-6))}/>
                        <VUMeterDesign_tsx_1.VUMeterDesign.Modern model={new lib_std_1.DefaultObservableValue((0, lib_dsp_1.dbToGain)(-6))}/>
                    </div>
                </div>
            </div>
            <div>
                <h1>Debug</h1>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <BoxDebugView_1.BoxDebugView box={timelineBox}/>
                    <BoxDebugView_1.BoxDebugView box={rootBox}/>
                </div>
            </div>
            <div>
                <h1>Menu / Dropdown</h1>
                <div>
                    <label>MenuButton</label>
                    <MenuButton_tsx_1.MenuButton root={TestMenuItem} appearance={{
            color: studio_enums_1.Colors.yellow,
            activeColor: studio_enums_1.Colors.green,
            tooltip: "Open Test-Menu",
            framed: false
        }}>
                        <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Add}/>
                    </MenuButton_tsx_1.MenuButton>
                    <label>MenuButton (framed)</label>
                    <MenuButton_tsx_1.MenuButton root={TestMenuItem} appearance={{
            color: studio_enums_1.Colors.yellow,
            activeColor: studio_enums_1.Colors.green,
            tooltip: "Open Test-Menu",
            framed: true
        }}><Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Add}/></MenuButton_tsx_1.MenuButton>
                    <label>MenuButton (label)</label>
                    <MenuButton_tsx_1.MenuButton root={TestMenuItem} appearance={{
            activeColor: studio_enums_1.Colors.bright,
            tooltip: "Open Test-Menu"
        }}>
                        <label>select<Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Dropdown}/></label>
                    </MenuButton_tsx_1.MenuButton>
                    <label>MenuButton (label, framed)</label>
                    <MenuButton_tsx_1.MenuButton root={TestMenuItem} appearance={{
            activeColor: studio_enums_1.Colors.gray,
            tooltip: "Open Test-Menu",
            framed: true
        }}>
                        <label>
                            <span>select</span>
                            <Icon_tsx_1.Icon symbol={studio_enums_1.IconSymbol.Dropdown}/>
                        </label>
                    </MenuButton_tsx_1.MenuButton>
                    <label>MenuButton (tiny triangle)</label>
                    <MenuButton_tsx_1.MenuButton root={TestMenuItem} appearance={{
            activeColor: studio_enums_1.Colors.gray,
            tooltip: "Open Test-Menu",
            tinyTriangle: true
        }}>
                        <label><span>select</span></label>
                    </MenuButton_tsx_1.MenuButton>
                </div>
            </div>
            <div>
                <h1>Flying</h1>
                <div>
                    <label>TextInput</label>
                    <FloatingTextInput_tsx_1.FloatingTextInput />
                    <label>TextInput (with unit)</label>
                    <FloatingTextInput_tsx_1.FloatingTextInput unit="db"/>
                    <label>TextInput (with value & unit)</label>
                    <FloatingTextInput_tsx_1.FloatingTextInput value={50} unit="%"/>
                    <label>Dialog (simple)</label>
                    <Button_tsx_1.Button lifecycle={lifecycle} onClick={function () {
            var dialog = (<Dialog_tsx_1.Dialog headline="Dialog Headline" icon={studio_enums_1.IconSymbol.Effects}>
                                <p>This is the message of the dialog</p>
                            </Dialog_tsx_1.Dialog>);
            document.body.appendChild(dialog);
            dialog.showModal();
        }}>Open</Button_tsx_1.Button>
                    <label>Dialog (with buttons, cancelable)</label>
                    <Button_tsx_1.Button lifecycle={lifecycle} onClick={function () {
            var dialog = (<Dialog_tsx_1.Dialog headline="Dialog Headline" icon={studio_enums_1.IconSymbol.Effects} cancelable={true} buttons={[
                    { primary: false, onClick: function (handler) { return handler.close(); }, text: "Cancel" },
                    { primary: true, onClick: function (handler) { return handler.close(); }, text: "Ok" }
                ]}>
                                <p>This is the message of the dialog</p>
                            </Dialog_tsx_1.Dialog>);
            document.body.appendChild(dialog);
            dialog.showModal();
        }}>Open</Button_tsx_1.Button>
                    <label>Dialog (Error)</label>
                    <Button_tsx_1.Button lifecycle={lifecycle} onClick={function () { return (0, lib_std_1.panic)("I have thrown an error"); }}>Throw</Button_tsx_1.Button>
                </div>
            </div>
        </div>);
};
exports.ComponentsPage = ComponentsPage;
var TestMenuItem = studio_core_1.MenuItem.root()
    .addMenuItem(studio_core_1.MenuItem.default({ label: "Menu Item 1" }), studio_core_1.MenuItem.default({ label: "Menu Item 2" }), studio_core_1.MenuItem.default({ label: "Menu Item 3" }), studio_core_1.MenuItem.default({ label: "Menu Item 4" }), studio_core_1.MenuItem.default({ label: "Menu Item 5" })
    .addMenuItem(studio_core_1.MenuItem.default({ label: "Menu Item 1" }), studio_core_1.MenuItem.default({ label: "Menu Item 2" }), studio_core_1.MenuItem.default({ label: "Menu Item 3" }), studio_core_1.MenuItem.default({ label: "Menu Item 4" }), studio_core_1.MenuItem.default({ label: "Menu Item 5" })
    .addMenuItem(studio_core_1.MenuItem.default({ label: "Menu Item 1" }), studio_core_1.MenuItem.default({ label: "Menu Item 2" }), studio_core_1.MenuItem.default({ label: "Menu Item 3" }), studio_core_1.MenuItem.default({ label: "Menu Item 4" }), studio_core_1.MenuItem.default({ label: "Menu Item 5" })
    .setRuntimeChildrenProcedure(function (parent) {
    for (var i = 0; i < 250; i++) {
        parent.addMenuItem(studio_core_1.MenuItem.default({ label: "#".concat(i + 1) }));
    }
}))));
