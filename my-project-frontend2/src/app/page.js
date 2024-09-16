'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import FilterComponent from './components/FilterComponent';

export default function Home() {
  const [motoAds, setMotoAds] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    // Récupérer les annonces de motos
    const fetchMotoAds = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/moto-ads');
        setMotoAds(response.data);
      } catch (error) {
        setError('Failed to fetch moto ads');
      }
    };

    fetchMotoAds();

    // Récupérer les informations de l'utilisateur connecté
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      setUser(JSON.parse(currentUser)); // Définir l'utilisateur en tant qu'objet parsé
    }
  }, []);

  useEffect(() => {
    const fetchUnreadMessagesCount = async () => {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get('http://localhost:3001/api/messages/unread-count', {
          headers: { 'x-auth-token': token },
        });
        setUnreadMessagesCount(response.data.unreadCount);
      } catch (error) {
        console.error('Failed to fetch unread messages count:', error);
      }
    };

    fetchUnreadMessagesCount();
  }, []);

  return (
    <div>
      <h1>All Moto Ads</h1>

      {/* Bouton pour accéder à la page de chat */}
      <FilterComponent setMotoAds={setMotoAds} />

      <Link href={'/chat'}>
        <p>Messagerie {unreadMessagesCount > 0 && `(${unreadMessagesCount} non lu(s))`}</p>
      </Link>

      {/* Afficher le bouton "Mes Réservations" uniquement si l'utilisateur est connecté */}
      {user && (
        <Link href={`/reservation/${user.id}`}>
          <button style={{ margin: '20px', padding: '10px' }}>Mes Réservations</button>
        </Link>
      )}

      {error && <p>{error}</p>}
      <ul>
        {motoAds.map((ad) => (
          <li key={ad._id}>
            <Link href={`/${ad._id}`}>
              <div style={{ cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '10px 0' }}>
                <h2>{ad.title}</h2>
                {ad.image && ad.image.length > 0 && (
                  <img
                    src={ad.image[0]}
                    alt={ad.title}
                    style={{ maxWidth: '100%', height: '300px', marginBottom: '10px' }}
                  />
                )}
                <p>{ad.description}</p>
                <p>PricePerDay: {ad.pricePerDay} €</p>
                <p>Brand: {ad.brand}</p>
                <p>Model: {ad.model}</p>
                <p>Year: {ad.year}</p>
                <p>Mileage: {ad.mileage} km</p>
                <p>Location: {ad.location}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
