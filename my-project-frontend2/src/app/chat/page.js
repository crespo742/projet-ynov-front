'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './ConversationsPage.css'; // Importer le fichier CSS

export default function ConversationsPage() {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');

    if (!token) {
      router.push('/login');
      return;
    }

    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUserId(parsedUser.id);
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (currentUserId) {
          const token = localStorage.getItem('x-auth-token');
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages/conversations`, {
            headers: { 'x-auth-token': token },
          });

          const data = response.data || [];
          const sortedConversations = data.sort((a, b) => {
            const dateA = new Date(a.latestMessage.timestamp).getTime();
            const dateB = new Date(b.latestMessage.timestamp).getTime();
            return dateB - dateA;
          });

          setConversations(sortedConversations);
        }
      } catch (error) {
        setError('Failed to fetch conversations');
      }
    };

    fetchConversations();
  }, [currentUserId]);

  if (!currentUserId) {
    return <p>Loading...</p>;
  }

  return (
    <div className="conversations-container">
      <h1 className="conversations-title">Vos Conversations</h1>
      {error && <p className="error-message">{error}</p>}
      <ul className="conversations-list">
        {conversations.map((conversation, index) => {
          const otherParticipant = conversation.participants.find(participant => participant._id !== currentUserId);

          return (
            <li key={index} className="conversation-item">
              <Link href={`/chat/${otherParticipant._id}`}>
                <div className="conversation-card">
                  <p className="conversation-with">Avec : {otherParticipant.name}</p>
                  <p className="latest-message">
                    {conversation.latestMessage.content}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
