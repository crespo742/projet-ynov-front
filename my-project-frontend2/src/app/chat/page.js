'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ConversationsPage() {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get('http://localhost:3001/api/messages/conversations', {
          headers: { 'x-auth-token': token }
        });

        // Vérifie que la réponse contient des données valides
        const data = response.data || [];

        // Trie les conversations par date de dernier message (timestamp) en ordre décroissant
        const sortedConversations = data.sort((a, b) => {
          const dateA = new Date(a.latestMessage.timestamp).getTime();
          const dateB = new Date(b.latestMessage.timestamp).getTime();
          return dateB - dateA; // Tri par ordre décroissant (le plus récent en premier)
        });

        setConversations(sortedConversations);
      } catch (error) {
        setError('Failed to fetch conversations');
      }
    };

    fetchConversations();
  }, []);

  const currentUserId = JSON.parse(localStorage.getItem('user')).id;

  return (
    <div>
      <h1>Your Conversations</h1>
      {error && <p>{error}</p>}
      <ul>
        {conversations.map((conversation, index) => {
          const otherParticipant = conversation.participants.find(participant => participant._id !== currentUserId);

          return (
            <li key={index}>
              <Link href={`/chat/${otherParticipant._id}`}>
                <div style={{ cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '10px 0' }}>
                  <p>Conversation with: {otherParticipant.name}</p>
                  <p>Last message: {conversation.latestMessage.content}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
