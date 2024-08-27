'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get('http://localhost:3001/api/users/users', {
          headers: { 'x-auth-token': token }
        });
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Link href={`/admin/users/${user._id}`}>
              <div style={{ cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '10px 0' }}>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Moderator: {user.isModo ? 'Yes' : 'No'}</p>
                <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
