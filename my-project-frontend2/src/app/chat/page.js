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
        setConversations(response.data);
      } catch (error) {
        setError('Failed to fetch conversations');
      }
    };

    fetchConversations();
  }, []);

  return (
    <div>
      <h1>Your Conversations</h1>
      {error && <p>{error}</p>}
      <ul>
        {conversations.map((conversation, index) => (
          <li key={index}>
            <Link href={`/chat/${conversation.participants[0]._id === localStorage.getItem('user').id ? conversation.participants[1] : conversation.participants[0]}`}>
              <div style={{ cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '10px 0' }}>
                <p>Conversation with: {conversation.participants[0]._id === localStorage.getItem('user').id ? conversation.participants[1].name : conversation.participants[0].name}</p>
                <p>Last message: {conversation.latestMessage.content}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
