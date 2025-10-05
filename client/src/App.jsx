import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage() {}

  return (
    <div>
      <div></div>
      <form>
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
