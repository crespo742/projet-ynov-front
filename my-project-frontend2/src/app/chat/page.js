'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ConversationsPage() {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null); // Stocker l'ID utilisateur
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');

    // Vérifier si l'utilisateur est connecté, sinon rediriger vers la page de login
    if (!token) {
      router.push('/login');
      return; // On arrête l'exécution de l'effet
    }

    // Vérifier si l'environnement est côté client avant d'accéder à localStorage
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUserId(parsedUser.id); // Définir l'ID utilisateur
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // Vérifier si l'ID utilisateur est disponible
        if (currentUserId) {
          const token = localStorage.getItem('x-auth-token');
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages/conversations`, {
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
        }
      } catch (error) {
        setError('Failed to fetch conversations');
      }
    };

    fetchConversations();
  }, [currentUserId]); // Exécuter l'effet uniquement après que currentUserId soit défini

  if (!currentUserId) {
    return <p>Loading...</p>; // Afficher un message de chargement tant que l'utilisateur n'est pas défini
  }

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
