import React, { useState, useRef, useEffect } from "react";

import UserChatMessage from "../UserChatMessage/UserChatMessage";
import ChatBotMessage from "../ChatBotMessage/ChatBotMessage";
import ChatBotMessageWithWidget from "../ChatBotMessageWithWidget/ChatBotMessageWithWidget";

import { botMessage, createChatMessage } from "./chatUtils";

import { ReactComponent as ChatIcon } from "../../assets/icons/paper-plane.svg";

import "./Chat.css";

const Chat = ({ state, setState, widgetRegistry, messageParser }) => {
  const { messages } = state;
  const chatContainerRef = useRef(null);

  const [input, setInputValue] = useState("");

  const scrollIntoView = () => {
    setTimeout(() => {
      chatContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }, 0);
  };

  useEffect(() => {
    scrollIntoView();
  });

  const renderMessages = () => {
    return messages.map((messageObject, index, arr) => {
      if (!botMessage(messageObject))
        return (
          <UserChatMessage
            message={messageObject.message}
            key={messageObject.id}
          />
        );

      const chatBotMessageProps = {
        passDownProps: { ...messageObject },
        setState,
        state,
        widgetRegistry,
        messages
      };

      if (messageObject.widget) {
        return (
          <ChatBotMessageWithWidget
            scrollIntoView={scrollIntoView}
            {...chatBotMessageProps}
            key={messageObject.id}
          />
        );
      }

      return (
        <ChatBotMessage
          key={messageObject.id}
          withAvatar={true}
          {...chatBotMessageProps.passDownProps}
          messages={messages}
          setState={setState}
        />
      );
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setState(state => ({
      ...state,
      messages: [...state.messages, createChatMessage(input, "user")]
    }));

    messageParser.parse(input);

    scrollIntoView();
    setInputValue("");
  };

  return (
    <div className="chat-container">
      <div className="chat">
        <div className="chat-header">Conversation with {state.botName}</div>

        <div className="chat-message-container">
          {renderMessages()}
          <div style={{ paddingBottom: "15px" }} ref={chatContainerRef} />
        </div>

        <div className="chat-input-container">
          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              className="chat-input"
              placeholder="Skriv meldingen din her"
              value={input}
              onChange={e => setInputValue(e.target.value)}
            />
            <button className="chat-btn-send">
              <ChatIcon className="chat-btn-send-icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
