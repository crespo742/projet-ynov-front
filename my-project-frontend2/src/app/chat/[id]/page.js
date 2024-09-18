'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './conversationPage.css'; // Importer le fichier CSS spécifique à cette page

export default function ConversationPage({ params }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  const { id } = params;
  const messagesEndRef = useRef(null); // Référence pour la fin de la liste de messages

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');
      const user = JSON.parse(localStorage.getItem('user'));
      setCurrentUserName(user.name);

      // Récupérer les messages
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages/${id}`, {
        headers: { 'x-auth-token': token }
      });
      const fetchedMessages = response.data;

      // Trier les messages par date (le plus récent en bas)
      const sortedMessages = fetchedMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setMessages(sortedMessages);

      // Marquer tous les messages non lus comme lus
      const unreadMessageIds = fetchedMessages
        .filter(message => !message.isRead && message.recipient._id === user.id)
        .map(message => message._id);
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages/mark-as-read`, { messageIds: unreadMessageIds }, {
        headers: { 'x-auth-token': token }
      });

      scrollToBottom(); // Scroller vers le bas après le chargement des messages
    } catch (error) {
      setError('Failed to fetch messages');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchMessages();
  }, [id]);

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages/send`, {
        recipient: id,
        content: newMessage,
      }, {
        headers: { 'x-auth-token': token }
      });
      setNewMessage('');
      fetchMessages(); // Recharger les messages après l'envoi
    } catch (error) {
      setError('Failed to send message');
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroller vers le bas quand les messages sont mis à jour
  }, [messages]);

  return (
    <div className="conversation-container">
      <h1>Conversation</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="message-list">
        {messages.map((message) => (
          <div key={message._id} className="message-item">
            <p className={message.sender._id === JSON.parse(localStorage.getItem('user')).id ? 'sent-message' : 'received-message'}>
              {message.sender._id === JSON.parse(localStorage.getItem('user')).id 
                ? <><span>{message.content}</span> : <strong>{currentUserName}</strong></> // Afficher "message : nom" pour les messages envoyés par l'utilisateur actuel
                : <><strong>{message.sender.name}</strong>: {message.content}</>} {/* Afficher "nom : message" pour les messages reçus */}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Référence pour scroller vers le bas */}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez un message"
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">Envoyer</button>
      </div>
    </div>
  );
}
