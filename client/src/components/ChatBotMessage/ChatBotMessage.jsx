import React, { useEffect, useState } from "react";
import { ConditionallyRender } from "react-util-kit";
import classnames from "classnames";

import { ReactComponent as FlightIcon } from "../../assets/icons/plane-alt.svg";
import { ReactComponent as DotsIcon } from "../../assets/icons/dots.svg";

import "./ChatBotMessage.css";

const ChatBotMessage = ({
  message,
  withAvatar,
  loading,
  terminateLoading,
  messages,
  setState,
  delay,
  adjacentMessage,
  id
}) => {
  const [show, toggleShow] = useState(false);
  useEffect(() => {
    const disableLoading = (messages, setState) => {
      let defaultDisableTime = 750;
      if (delay) defaultDisableTime += delay;
      setTimeout(() => {
        const message = messages.find(message => message.id === id);
        message.loading = false;

        setState(state => ({ ...state, messages: messages }));
      }, defaultDisableTime);
    };

    if (terminateLoading) {
      disableLoading(messages, setState);
    }
  }, [delay, id, messages, setState, terminateLoading]);

  useEffect(() => {
    if (delay) {
      setTimeout(() => toggleShow(true), delay);
    } else {
      toggleShow(true);
    }
  }, [delay]);

  const chatMessageClasses = classnames("chat-bot-message", {
    "chat-bot-adjacent-message": adjacentMessage
  });

  return (
    <ConditionallyRender
      ifTrue={show}
      show={
        <div className="chat-bot-message-container">
          <ConditionallyRender
            ifTrue={withAvatar}
            show={
              <div className="chat-bot-avatar">
                <div className="chat-bot-avatar-container">
                  <FlightIcon className="chat-bot-avatar-icon" />
                </div>
              </div>
            }
          />

          <div className={chatMessageClasses}>
            <ConditionallyRender
              ifTrue={loading}
              show={<DotsIcon className="chat-bot-loading-icon" />}
              elseShow={<span>{message}</span>}
            />
            <ConditionallyRender
              ifTrue={withAvatar}
              show={<div className="chat-bot-message-arrow"></div>}
            />
          </div>
        </div>
      }
    />
  );
};

export default ChatBotMessage;
