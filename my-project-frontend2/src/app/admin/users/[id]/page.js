'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function UserDetailPage({ params }) {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const userId = params.id;

  useEffect(() => {
    const fetchCurrentUser = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      setCurrentUser(user);
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${userId}`, {
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
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/set-moderator/${userId}`, {}, {
        headers: { 'x-auth-token': token }
      });
      setMessage('User is now a moderator');
      router.push('/admin/users');  // Redirection après succès
    } catch (error) {
      setMessage('Failed to set moderator');
    }
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${userId}`, {
        headers: { 'x-auth-token': token }
      });
      setMessage('User deleted successfully');
      router.push('/admin/users');  // Redirection après succès
    } catch (error) {
      setMessage('Failed to delete user');
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

      {/* Le bouton "Set as Moderator" est accessible uniquement par les administrateurs */}
      {currentUser.isAdmin && !user.isModo && (
        <button onClick={handleSetModerator}>Set as Moderator</button>
      )}

      {/* Le bouton "Delete User" est accessible aux administrateurs et modérateurs */}
      {(currentUser.isAdmin || currentUser.isModo) && (
        <button onClick={handleDeleteUser} style={{ color: 'red', marginTop: '10px' }}>
          Delete User
        </button>
      )}

      <p>{message}</p>
    </div>
  );
}
