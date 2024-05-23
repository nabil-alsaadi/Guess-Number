import React, { useState, useEffect } from "react";
import { default as socket } from "../config/webSocketConfig";

function ChatComponent() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("new-user");
    });

    socket.on("message", ({ sender, text }) => {
      setChat([...chat, { sender, text }]);
    });

    socket.on("user-details", (nick: any) => {
      if (!name) setName(nick[0]);
    });

    return () => {
      socket.off();
    };
  }, [chat]);

  const submit = (e: any) => {
    e.preventDefault();

    if (message !== "") {
      socket.emit("message", { sender: name, text: message });
      setChat([...chat, { sender: name, text: message }]);
      setMessage("");
    } else {
      alert('Enter a message')
    }
  };

  return (
    <div className="col-12 col-md-6">
      <div className="card-title">📝 Chat </div>
      <div className="card-box">
        <div className="message-box" id="msg">
          {chat.map((item, index) => (
            <div key={index} className="chat-message">
              {item.sender != null ? (
                <div className="message-flex-container">
                  <div className="sender-name">{item.sender}:</div>
                  <div className="user-msg">{item.text}</div>
                </div>
              ) : (
                <p className="">{item}</p>
              )}
            </div>
          ))}
        </div>

        <form className="chat-container">
          <input
            type="text"
            className="pr-3 pr-md-3"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />

          <button className="btn btn-primary" onClick={(e) => submit(e)}>
            Start
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatComponent;
