'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './login.css'; // Import du fichier CSS spécifique à cette page

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        email,
        password,
      });
      localStorage.clear();
      localStorage.setItem('x-auth-token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('Login successful!');
      const user = JSON.parse(localStorage.getItem('user'));

      // Redirection et rafraîchissement de la page
      if (user.isAdmin || user.isModo) {
        router.push('/admin/users');
      } else {
        router.push('/');
      }
      
      // Attendre un court instant avant d'actualiser la page
      setTimeout(() => {
        window.location.reload();
      }, 100); // Délai de 100 ms pour permettre la redirection

    } catch (error) {
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Heureux de vous revoir !</h1>
      <p className="login-subtitle">Accédez à votre compte pour continuer à profiter de la location et de l'échange de motos.</p>
      <div className="login-box">
        <h2>Connectez-vous à votre compte</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="form-button">Se connecter</button>
        </form>
        <p className="login-message">{message}</p>
      </div>
    </div>
  );
}
