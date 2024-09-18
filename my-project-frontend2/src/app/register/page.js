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

    // Vérifier la force du mot de passe avec une regex
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Au moins 8 caractères et une majuscule
    if (!passwordRegex.test(password)) {
      setMessage('Le mot de passe doit comporter au moins 8 caractères et inclure une majuscule.');

      // Effacer le message après 4 secondes
      setTimeout(() => {
        setMessage('');
      }, 4000); // Le message disparaîtra après 4 secondes
      return; // Arrêter l'exécution si le mot de passe ne correspond pas au regex
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/register`, {
        name,
        email,
        password,
      });
      localStorage.clear();
      localStorage.setItem('x-auth-token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/');

      // Attendre un court instant avant d'actualiser la page
      setTimeout(() => {
        window.location.reload();
      }, 1); // Délai de 100 ms pour permettre la redirection
    } catch (error) {
      // Gestion des différentes erreurs
      if (error.response) {
        if (error.response.status === 400) { // 400 Conflict
          setMessage("Cet e-mail est déjà utilisé. Veuillez essayer de vous connecter.");
        } else {
          setMessage(error.response.data.message || 'Une erreur est survenue. Veuillez réessayer.');
        }
      } else {
        setMessage('Registration failed. Please try again.');
      }

      // Effacer le message d'erreur après 4 secondes
      setTimeout(() => {
        setMessage('');
      }, 4000); // Le message disparaîtra après 4 secondes
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Créer un nouveau compte</h1>
      <p className="login-subtitle">Rejoignez-nous et commencez à profiter de la location et de l&#39;échange de motos.</p>
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
          <button type="submit" className="form-button">S&#39;inscrire</button>
        </form>
        <p className="login-message">{message}</p>
        {/* Ajouter un lien pour se connecter */}
        <p className="login-link">
          Vous avez déjà un compte ?{' '}
          <a href="/login" className="login-link-text">Cliquez ici pour vous connecter</a>
        </p>
      </div>
    </div>
  );
}
