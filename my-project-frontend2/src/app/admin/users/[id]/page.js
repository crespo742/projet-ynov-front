'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function UserDetailPage({ params }) {
  const [user, setUser] = useState(null);  // L'utilisateur dont on affiche les détails
  const [currentUser, setCurrentUser] = useState(null);  // L'utilisateur actuellement connecté
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const userId = params.id;

  useEffect(() => {
    // Récupérer les détails de l'utilisateur actuel (connecté)
    const fetchCurrentUser = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      setCurrentUser(user);
    };

    // Récupérer les détails de l'utilisateur dont on affiche les informations
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get(`http://localhost:3001/api/users/${userId}`, {
          headers: { 'x-auth-token': token }
        });
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch user details');
      }
    };

    fetchCurrentUser();
    fetchUser();
  }, [userId]);

  const handleSetModerator = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');
      await axios.put(`http://localhost:3001/api/users/set-moderator/${userId}`, {}, {
        headers: { 'x-auth-token': token }
      });
      setMessage('User is now a moderator');
      router.push('/admin/users');  // Redirection après succès
    } catch (error) {
      setMessage('Failed to set moderator');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!user || !currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Moderator: {user.isModo ? 'Yes' : 'No'}</p>
      <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>

      {/* Vérifier si l'utilisateur connecté est admin */}
      {currentUser.isAdmin ? (
        <>
          {user.isModo ? (
            <p>This user is already a moderator.</p>
          ) : (
            <button onClick={handleSetModerator}>Set as Moderator</button>
          )}
        </>
      ) : (
        <p>You don't have the rights to change this user's attributes!</p>
      )}

      <p>{message}</p>
    </div>
  );
}
