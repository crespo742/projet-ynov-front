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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/login`, {
        email,
        password,
      });
      localStorage.clear();
      localStorage.setItem('x-auth-token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('test', user);

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
      <p className="login-subtitle">Accédez à votre compte pour continuer à profiter de la location et de l&#39;échange de motos.</p>
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
        {/* Ajouter un lien pour s'inscrire */}
        <p className="register-link">
          Vous n&#39;avez pas de compte ?{' '}
          <a href="/register" className="register-link-text">Cliquez ici pour vous inscrire</a>
        </p>
      </div>
    </div>
  );
}
