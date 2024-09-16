'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ConversationPage({ params }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  const { id } = params;

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');
      const user = JSON.parse(localStorage.getItem('user'));
      setCurrentUserName(user.name);

      const response = await axios.get(`http://localhost:3001/api/messages/${id}`, {
        headers: { 'x-auth-token': token }
      });
      const fetchedMessages = response.data;

      // Marquer les messages comme lus
      fetchedMessages.forEach(async (message) => {
        if (!message.isRead && message.recipient._id === user.id) {
          await axios.put(`http://localhost:3001/api/messages/mark-as-read/${message._id}`, {}, {
            headers: { 'x-auth-token': token }
          });
        }
      });

      setMessages(fetchedMessages);
    } catch (error) {
      setError('Failed to fetch messages');
    }
  };

  useEffect(() => {
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
      fetchMessages(); // Fetch the updated conversation after sending the message
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
            <p>
              <strong>{message.sender._id === JSON.parse(localStorage.getItem('user')).id ? currentUserName : message.sender.name}:</strong> {message.content}
            </p>
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
