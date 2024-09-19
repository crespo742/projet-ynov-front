'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './ProfilePage.css'; // Import du fichier CSS mis à jour

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');

    if (!token) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
          headers: { 'x-auth-token': token },
        });
        setProfile(response.data);
      } catch (error) {
        setError('Échec de la récupération du profil');
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
      setError("Échec de la suppression de l'annonce");
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
    return <p>Chargement...</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profil Utilisateur</h1>
      {error && <p className="error-message">{error}</p>}
      <h2 className="profile-detail">Nom: {profile.user.name}</h2>
      <h2 className="profile-detail">Email: {profile.user.email}</h2>
      <h2 className="profile-detail">Telephone: {profile.phone ? profile.phone : 'pas de numero de telephone'}</h2>

      {/* Lien vers la page de modification du profil */}
      <Link href={`/profile/${profile.user._id}`}>
        <button>Modifier le profil</button>
      </Link>

      <button onClick={handleLogout} className="logout-button">Déconnexion</button>

      <h3 className="profile-subtitle">Vos annonces publiées</h3>
      <Link href={`/add-moto`}>
        <button className="add-ad-button">Ajouter une annonce</button>
      </Link>

      <div className="ad-list">
        {profile.motoAds.map((ad) => (
          <div key={ad._id} className="ad-card">
            <Link href={`/${ad._id}`}>
              <div className="ad-card-inner">
                {/* Vérifiez ici si le chemin de l'image est directement utilisable comme dans la page des réservations */}
                {ad.image && ad.image.length > 0 ? (
                  <img
                    src={ad.image[0]} // Utilisation directe de l'image comme sur la page de réservation
                    alt={ad.title}
                    className="ad-image"
                  />
                ) : (
                  <div className="no-image">Pas d&#39;image</div>
                )}
                <div className="ad-info">
                  <h4 className="ad-title">{ad.title}</h4>
                  <p className="ad-price">{ad.pricePerDay}€/jour</p>
                </div>
              </div>
            </Link>
            <div className="ad-actions">
              <button onClick={() => handleDelete(ad._id)} className="delete-button">Supprimer</button>
              <Link href={`/edit-ad/${ad._id}`}>
                <button className="edit-button">Modifier</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
