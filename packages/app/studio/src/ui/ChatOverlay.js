"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatOverlay = void 0;
var ChatOverlay_sass_inline_1 = require("./ChatOverlay.sass?inline");
var lib_jsx_1 = require("@opendaw/lib-jsx");
var lib_std_1 = require("@opendaw/lib-std");
var lib_dom_1 = require("@opendaw/lib-dom");
var Icon_tsx_1 = require("@/ui/components/Icon.tsx");
var Checkbox_tsx_1 = require("@/ui/components/Checkbox.tsx");
var Button_tsx_1 = require("@/ui/components/Button.tsx");
var Icon_tsx_2 = require("@/ui/components/Icon.tsx");
var studio_enums_1 = require("@opendaw/studio-enums");
var ChatOverlayBackground_tsx_1 = require("@/ui/ChatOverlayBackground.tsx");
var className = lib_dom_1.Html.adoptStyleSheet(ChatOverlay_sass_inline_1.default, "ChatOverlay");
var formatTime = function (timestamp) {
    var date = new Date(timestamp);
    return "".concat(date.getHours().toString().padStart(2, "0"), ":").concat(date.getMinutes().toString().padStart(2, "0"));
};
var renderMessage = function (message) { return (<div className="message">
        <div className="header">
            <span className="dot" style={{ backgroundColor: message.color }}/>
            <span className="name">{message.name}</span>
            <span className="time">{formatTime(message.timestamp)}</span>
        </div>
        <div className="text" style={{ borderLeftColor: message.color }}>{message.text}</div>
    </div>); };
var ChatOverlay = function (_a) {
    var lifecycle = _a.lifecycle, service = _a.service;
    var sendOnEnter = lifecycle.own(new lib_std_1.DefaultObservableValue(true));
    var closeAfterSend = lifecycle.own(new lib_std_1.DefaultObservableValue(false));
    var tabIcon = lifecycle.own(new lib_std_1.DefaultObservableValue(studio_enums_1.IconSymbol.ChatEmpty));
    var messagesContainer = (<div className="messages"/>);
    var textArea = (<textarea placeholder="Type a message..." maxLength={300} rows={1}/>);
    var isOpen = function () { return element.classList.contains("open"); };
    var updateTabIcon = function () {
        tabIcon.setValue(hasUnread ? studio_enums_1.IconSymbol.ChatMessage : studio_enums_1.IconSymbol.ChatEmpty);
    };
    var hasUnread = false;
    var markUnread = function () {
        if (!isOpen()) {
            hasUnread = true;
            updateTabIcon();
        }
    };
    var clearUnread = function () {
        hasUnread = false;
        updateTabIcon();
    };
    var element = (<div className={className}>
            <div className="chat-tab" onInit={function (tab) {
            lifecycle.own(lib_dom_1.Events.subscribe(tab, "click", function () {
                var opening = !isOpen();
                element.classList.toggle("open");
                if (opening) {
                    clearUnread();
                }
            }));
        }}>
                <Icon_tsx_1.IconCartridge lifecycle={lifecycle} symbol={tabIcon}/>
            </div>
            <div className="chat-window">
                {messagesContainer}
                <div className="input-area">
                    {textArea}
                    <Button_tsx_1.Button lifecycle={lifecycle} appearance={{ framed: true, landscape: true }} onClick={function () { return send(); }}>
                        <Icon_tsx_2.Icon symbol={studio_enums_1.IconSymbol.Play}/>
                    </Button_tsx_1.Button>
                </div>
                <div className="options">
                    <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={sendOnEnter}>
                        <Icon_tsx_2.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/> Send on Enter
                    </Checkbox_tsx_1.Checkbox>
                    <Checkbox_tsx_1.Checkbox lifecycle={lifecycle} model={closeAfterSend}>
                        <Icon_tsx_2.Icon symbol={studio_enums_1.IconSymbol.Checkbox}/> Close after send
                    </Checkbox_tsx_1.Checkbox>
                </div>
            </div>
        </div>);
    element.prepend(<ChatOverlayBackground_tsx_1.ChatOverlayBackground lifecycle={lifecycle} element={element}/>);
    var send = function () {
        service.chatService.ifSome(function (chatService) {
            chatService.sendMessage(textArea.value);
            textArea.value = "";
            if (closeAfterSend.getValue()) {
                setTimeout(function () { return element.classList.remove("open"); }, 1000);
            }
        });
    };
    lifecycle.own(lib_dom_1.Events.subscribe(textArea, "keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey && sendOnEnter.getValue()) {
            event.preventDefault();
            send();
        }
    }));
    var scrollToBottom = function () { return messagesContainer.scrollTop = messagesContainer.scrollHeight; };
    var scrollSubscription = lib_std_1.Terminable.Empty;
    lifecycle.own(lib_dom_1.Events.subscribe(textArea, "transitionend", function () { return scrollSubscription.terminate(); }));
    lifecycle.own(sendOnEnter.catchupAndSubscribe(function (owner) {
        textArea.classList.toggle("single-line", owner.getValue());
        scrollSubscription.terminate();
        scrollSubscription = lib_dom_1.AnimationFrame.add(scrollToBottom);
    }));
    var serviceLifecycle = lifecycle.own(new lib_std_1.Terminator());
    lifecycle.own(service.chatService.catchupAndSubscribe(function (option) {
        serviceLifecycle.terminate();
        lib_dom_1.Html.empty(messagesContainer);
        hasUnread = false;
        if (option.nonEmpty()) {
            var chatService = option.unwrap();
            element.classList.remove("hidden");
            var messages = chatService.messages();
            messages.forEach(function (message) { return (0, lib_jsx_1.appendChildren)(messagesContainer, renderMessage(message)); });
            if (messages.length > 0) {
                markUnread();
            }
            scrollToBottom();
            serviceLifecycle.own(chatService.subscribe({
                onMessageAdded: function (message) {
                    (0, lib_jsx_1.appendChildren)(messagesContainer, renderMessage(message));
                    scrollToBottom();
                    markUnread();
                }
            }));
        }
        else {
            element.classList.add("hidden");
            element.classList.remove("open");
            updateTabIcon();
        }
    }));
    element.classList.add("hidden");
    return element;
};
exports.ChatOverlay = ChatOverlay;
