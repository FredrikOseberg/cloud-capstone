import React, { Fragment } from "react";

import ChatBotMessage from "../ChatBotMessage/ChatBotMessage";
import { ConditionallyRender } from "react-util-kit";

const ChatBotMessageWithWidget = ({
  passDownProps,
  messages,
  setState,
  adjacentMessage,
  scrollIntoView,
  state,
  widgetRegistry
}) => {
  return (
    <Fragment>
      <ChatBotMessage
        {...passDownProps}
        messages={messages}
        setState={setState}
        adjacentMessage={adjacentMessage}
      />
      <ConditionallyRender
        ifTrue={!passDownProps.loading}
        show={widgetRegistry.getWidget(passDownProps.widget, {
          ...state,
          scrollIntoView
        })}
      />
    </Fragment>
  );
};

export default ChatBotMessageWithWidget;
