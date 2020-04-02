import React from "react";
import "./App.css";

import ChatBot from "./components/ChatBot/ChatBot";
import { ActionProvider } from "./components/domain/actions/ActionProvider";
import MessageParser from "./components/domain/parser/MessageParser";

import config from "./config/config";

import { ReactComponent as CommentIcon } from "./assets/icons/comment-alt-lines.svg";

function App() {
  return (
    <div className="App">
      <div className="chatbot-container">
        <ChatBot
          ActionProvider={ActionProvider}
          MessageParser={MessageParser}
          config={config}
        />
        <button className="chatbot-btn">
          <CommentIcon className="chatbot-btn-icon" />
        </button>
      </div>
    </div>
  );
}

export default App;
