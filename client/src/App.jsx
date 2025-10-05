import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage(e) {
    e.preventDefault();
    if (text.trim() === "") return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setText("");
    const res = await fetch("http://localhost:5001/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
  }

  return (
    <div>
      <div>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Text..."
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
