// src/components/AiAssistant.js
import React, { useState } from "react";
import { appData } from "../data";

export default function AiAssistant() {
  const [messages, setMessages] = useState(appData.chatMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessages = [
      ...messages,
      { type: "user", message: input },
      { type: "bot", message: "Let me process that..." }
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>AI Assistant</h1>
        <p className="page-subtitle">Ask me anything about verification</p>
      </div>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.type}`}>
            {msg.message}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type your question..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
