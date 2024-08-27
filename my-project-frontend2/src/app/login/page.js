'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  
  // const user = JSON.parse(localStorage.getItem('user'));
  // if (user.isAdmin || user.isModo) {
  //   router.push('/admin/users');
  // } else {
  //   router.push('/');
  // }
  // c'est une bonne idée mais si il y a rien, il sera bloquer et ne pourras pas se connecter

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        email,
        password,
      });
      localStorage.setItem('x-auth-token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('Login successful!');
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.isAdmin || user.isModo) {
        router.push('/admin/users');
      } else {
        router.push('/');
      }
    } catch (error) {
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
