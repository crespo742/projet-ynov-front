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
    const token = localStorage.getItem('x-auth-token');

    // Vérifier si l'utilisateur est connecté, sinon rediriger vers la page de login
    if (!token) {
      router.push('/login');
      return; // On arrête l'exécution de l'effet
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
          headers: { 'x-auth-token': token },
        });
        setProfile(response.data);
      } catch (error) {
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, [router]);

  const handleDelete = async (adId) => {
    try {
      const token = localStorage.getItem('x-auth-token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads/${adId}`, {
        headers: { 'x-auth-token': token },
      });
      window.location.reload(); 
    } catch (error) {
      setError('Failed to delete ad');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');

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
      <h2>Telephone: {profile.phone ? profile.phone : 'pas de numero de telephone'}</h2>

      {/* Lien vers la page de modification du profil */}
      <Link href={`/profile/${profile.user._id}`}>
        <button>Modifier le profil</button>
      </Link>

      {/* Bouton de déconnexion */}
      <button onClick={handleLogout}>Déconnecter</button>

      <h3>Vos annonces publiées</h3>
      <Link href={`/add-moto`}>
        <button>Ajouter une annonce</button>
      </Link>
      <ul>
        {profile.motoAds.map((ad) => (
          <li key={ad._id}>
            <Link href={`/${ad._id}`}>
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
