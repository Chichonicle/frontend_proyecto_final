import React, { useEffect, useState } from 'react';
import { CreateMessage, GetMessages } from '../../services/apicalls';
import './Chat.css';
import { userData } from '../userSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const rdxUser = useSelector(userData);
  const token = rdxUser.credentials.token;
  const { salasId, seriesId } = useParams();

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await GetMessages(token);
      if (Array.isArray(response.data)) {
        setMessages(response.data);
      } else {
        setMessages([]);
      }
    };
  
    fetchMessages();
  }, []);
  
  const sendMessage = async (event) => {
    event.preventDefault();
  
    if (message) {
      const body = {
        user_id: rdxUser.id,
        salas_id: salasId,
        series_id: seriesId,
        message: message
      };

      try {
        const response = await CreateMessage(token, body.salas_id, body.series_id, body.message);
        if (response.data.success) {
          const newMessage = response.data.data;
          setMessages([...messages, newMessage]);
          setMessage('');
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="chatDesign">
    <div className="chat-container">
      <ul className="chat-messages">
      {messages.map((message, i) => (
        <li key={i}>{message.message}</li>
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