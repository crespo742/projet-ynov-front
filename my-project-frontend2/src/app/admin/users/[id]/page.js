'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function UserDetailPage({ params }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const userId = params.id;

  useEffect(() => {
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

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Moderator: {user.isModo ? 'Yes' : 'No'}</p>
      <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>

      {user.isModo ? (
        <p>This user is already a moderator.</p>
      ) : (
        <button onClick={handleSetModerator}>Set as Moderator</button>
      )}

      <p>{message}</p>
    </div>
  );
}
