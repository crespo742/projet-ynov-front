'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './register.css'; // Import du fichier CSS spécifique à cette page

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/register', {
        name,
        email,
        password,
      });
      localStorage.clear();
      localStorage.setItem('x-auth-token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('Registration successful!');
      router.push('/');
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Créer un nouveau compte</h1>
      <p className="login-subtitle">Rejoignez-nous et commencez à profiter de la location et de l'échange de motos.</p>
      <div className="login-box">
        <h2>Inscrivez-vous</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="form-button">S'inscrire</button>
        </form>
        <p className="login-message">{message}</p>
      </div>
    </div>
  );
}
