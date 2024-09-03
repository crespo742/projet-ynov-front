'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ConversationPage({ params }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const { id } = params;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get(`http://localhost:3001/api/messages/${id}`, {
          headers: { 'x-auth-token': token }
        });
        setMessages(response.data);
      } catch (error) {
        setError('Failed to fetch messages');
      }
    };

    fetchMessages();
  }, [id]);

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');
      await axios.post(`http://localhost:3001/api/messages/send`, {
        recipient: id,
        content: newMessage,
      }, {
        headers: { 'x-auth-token': token }
      });
      setNewMessage('');
      // Fetch the updated conversation after sending the message
      fetchMessages();
    } catch (error) {
      setError('Failed to send message');
    }
  };

  return (
    <div>
      <h1>Conversation</h1>
      {error && <p>{error}</p>}
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <p><strong>{message.sender._id === localStorage.getItem('user').id ? 'You' : 'Other'}:</strong> {message.content}</p>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
