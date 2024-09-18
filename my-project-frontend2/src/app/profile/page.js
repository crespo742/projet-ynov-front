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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
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
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads/${adId}`, {
        headers: { 'x-auth-token': token },
      });
      // Recharger la page après suppression
      router.refresh(); 
    } catch (error) {
      setError('Failed to delete ad');
    }
  };

  const handleLogout = () => {
    // Effacer le localStorage et rediriger vers la page de base
    localStorage.clear();
    router.push('/');

    // Attendre un court instant avant d'actualiser la page
    setTimeout(() => {
      window.location.reload();
    }, 100); // Délai de 100 ms pour permettre la redirection
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

      {/* Bouton de déconnexion */}
      <button onClick={handleLogout}>Déconnecter</button>

      <h3>Vos annonces publiées</h3>
      <Link href={`/add-moto`}>
              <button>Ajouter une annonce</button>
            </Link>
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
