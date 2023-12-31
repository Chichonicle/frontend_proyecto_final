import React, { useEffect, useState } from "react";
import { CreateMessage, GetMessages, DeleteMessage, DeleteMessageByAdmin } from "../../services/apicalls";
import "./Chat.css";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const rdxUser = useSelector(userData);
  const token = rdxUser.credentials.token;
  const { salasId, seriesId } = useParams();
  const currentUserId = rdxUser.credentials.user.id;
  const isAdmin = rdxUser.credentials.user.role;

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await GetMessages(token, salasId);
      if (Array.isArray(response.data.data)) {
        setMessages(response.data.data);
      } else {
        setMessages([]);
      }
    };

    fetchMessages();
  }, [salasId]);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message && salasId) {
      try {
        const response = await CreateMessage(token, salasId, message);

        if (response.data.success) {
          const newMessage = response.data.data;
          setMessages((oldMessages) => [...oldMessages, newMessage]);
          setMessage("");
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteMessage = async (messageId, userId) => {
    try {
      let response;
      if (userId === currentUserId) {
        response = await DeleteMessage(token, messageId);
      } else if (isAdmin) {
        response = await DeleteMessageByAdmin(token, messageId);
      } else {
        throw new Error('No tienes permiso para eliminar este mensaje');
      }
  
      if (response.data.success) {
        setMessages((oldMessages) => oldMessages.filter(message => message.id !== messageId));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chatDesign">
      <div className="chat-container">
        <ul className="chat-messages">
        {messages.map((message, i) => (
  <li
    key={i}
    className={
      message.user_id === currentUserId
        ? "my-message"
        : "other-message"
    }
  >
    {message.user_id === currentUserId ? "Yo" : message.username}:{" "}
    {message.message}
    {message.user_id === currentUserId && (
      <div className="message-actions">
        <button className="edit-button">Editar</button>
        <button className="delete-button" onClick={() => deleteMessage(message.id)}>Borrar</button>
      </div>
    )}
    {isAdmin && message.user_id !== currentUserId && (
      <div className="message-actions">
        <button className="delete-button" onClick={() => deleteMessage(message.id)}>Borrar</button>
      </div>
    )}
  </li>
))}
        </ul>
        <form className="chat-form" onSubmit={sendMessage}>
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};