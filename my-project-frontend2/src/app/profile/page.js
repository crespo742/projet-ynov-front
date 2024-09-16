'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get('http://localhost:3001/api/users/profile', {
          headers: { 'x-auth-token': token },
        });
        setProfile(response.data);
      } catch (error) {
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const handleDelete = async (adId) => {
    try {
      const token = localStorage.getItem('x-auth-token');
      await axios.delete(`http://localhost:3001/api/moto-ads/${adId}`, {
        headers: { 'x-auth-token': token },
      });
      // Recharger la page après suppression
      router.refresh(); 
    } catch (error) {
      setError('Failed to delete ad');
    }
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profil Utilisateur</h1>
      {error && <p>{error}</p>}
      <h2>Nom: {profile.user.name}</h2>
      <h2>Email: {profile.user.email}</h2>

      <h3>Vos annonces publiées</h3>
      <ul>
        {profile.motoAds.map((ad) => (
          <li key={ad._id}>
            <Link href={`/edit-ad/${ad._id}`}>
              <div style={{ cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '10px 0' }}>
                <h4>{ad.title}</h4>
                <p>Prix par jour: {ad.pricePerDay}€</p>
                <p>Marque: {ad.brand}</p>
                <p>Modèle: {ad.model}</p>
                <p>Année: {ad.year}</p>
                <p>Kilométrage: {ad.mileage} km</p>
                <p>Location: {ad.location}</p>
              </div>
            </Link>
            <button onClick={() => handleDelete(ad._id)}>Supprimer</button>
            <Link href={`/edit-ad/${ad._id}`}>
              <button>Modifier</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
