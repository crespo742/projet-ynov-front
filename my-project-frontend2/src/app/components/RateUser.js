'use client';

import { useState } from 'react';
import axios from 'axios';

export default function RateUser({ userId }) {
  const [rating, setRating] = useState(0); // Note sélectionnée
  const [message, setMessage] = useState('');

  // Fonction pour gérer la soumission de la note
  const submitRating = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/rate/${userId}`, {
        rating
      }, {
        headers: { 'x-auth-token': token }
      });
      setMessage(`Votre note a été enregistrée : ${response.data.rating}`);
    } catch (error) {
      setMessage('Erreur lors de l\'enregistrement de la note.');
    }
  };

  return (
    <div>
      <h3>Noter cet utilisateur</h3>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            style={{ cursor: 'pointer', fontSize: '2rem', color: value <= rating ? '#FFD700' : '#E0E0E0' }}
            onClick={() => setRating(value)}
          >
            ★
          </span>
        ))}
      </div>
      <button onClick={submitRating}>Envoyer la note</button>
      {message && <p>{message}</p>}
    </div>
  );
}
