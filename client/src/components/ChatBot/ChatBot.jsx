import React, { useState } from "react";

import Chat from "../Chat/Chat";
import WidgetRegistry from "../WidgetRegistry/WidgetRegistry";
import { createChatBotMessage } from "../Chat/chatUtils";

const ChatBot = ({ ActionProvider, MessageParser, config }) => {
  const [state, setState] = useState({
    botName: config.botName,
    messages: [...config.initialMessages],
    ...config.state,
    actionProvider: ActionProvider
  });

  const actionProvider = new ActionProvider(createChatBotMessage, setState);
  const widgetRegistry = new WidgetRegistry(setState, actionProvider);
  const messageParser = new MessageParser(actionProvider);

  config.widgets.forEach(widget => widgetRegistry.addWidget(widget));

  return (
    <Chat
      state={state}
      setState={setState}
      widgetRegistry={widgetRegistry}
      messageParser={messageParser}
    />
  );
};

export default ChatBot;
