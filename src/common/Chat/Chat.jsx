import { useState, useEffect } from "react";
import { CreateMessage, GetMessages } from "../../services/apicalls";

export const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    GetMessages().then(setMessages);
  }, []);

  const handleSend = () => {
    CreateMessage(username, newMessage).then(() => {
      setNewMessage("");
      GetMessages().then(setMessages);
    });
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.username}</strong>: {message.text}
          </div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
};