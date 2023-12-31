import React, { useEffect, useState } from "react";
import {
  CreateMessage,
  GetMessages,
  DeleteMessage,
  DeleteMessageByAdmin,
  UpdateMessage,
} from "../../services/apicalls";
import "./Chat.css";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingMessageText, setEditingMessageText] = useState("");
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

  const deleteMessage = async (messageId, messageUserId) => {
    try {
      let response;
      if (messageUserId === currentUserId) {
        response = await DeleteMessage(token, messageId);
      } else if (isAdmin) {
        response = await DeleteMessageByAdmin(token, messageId);
      } else {
        throw new Error("No tienes permiso para eliminar este mensaje");
      }

      if (response.data.success) {
        setMessages((oldMessages) =>
          oldMessages.filter((message) => message.id !== messageId)
        );
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startEditingMessage = (messageId, messageText) => {
    setEditingMessageId(messageId);
    setEditingMessageText(messageText);
  };

  const saveEditingMessage = async () => {
    try {
      const response = await UpdateMessage(
        token,
        editingMessageId,
        editingMessageText
      );

      if (response.data.success) {
        setMessages((oldMessages) =>
          oldMessages.map((message) =>
            message.id === editingMessageId
              ? { ...message, message: editingMessageText }
              : message
          )
        );
        setEditingMessageId(null);
        setEditingMessageText("");
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
              <div className="message-content">
                {message.user_id === currentUserId ? "Yo" : message.username}:{" "}
                {editingMessageId === message.id ? (
                  <input
                    value={editingMessageText}
                    onChange={(event) =>
                      setEditingMessageText(event.target.value)
                    }
                  />
                ) : (
                  message.message
                )}
              </div>
              {message.user_id === currentUserId && (
                <div className="message-actions">
                  {editingMessageId === message.id ? (
                    <button onClick={saveEditingMessage}>Guardar</button>
                  ) : (
                    <button
                      onClick={() =>
                        startEditingMessage(message.id, message.message)
                      }
                    >
                      Editar
                    </button>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => deleteMessage(message.id, message.user_id)}
                  >
                    Borrar
                  </button>
                </div>
              )}
              {isAdmin && message.user_id !== currentUserId && (
                <div className="message-actions">
                  <button
                    className="delete-button"
                    onClick={() => deleteMessage(message.id)}
                  >
                    Borrar
                  </button>
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
