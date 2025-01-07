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

  const handleDelete = async (annonceId) => {
    try {
      const token = localStorage.getItem('x-auth-token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-Annonces/${annonceId}`, {
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
      <div className="profile-info">
        <h2 className="profile-detail">Nom: {profile.user.name}</h2>
        <h2 className="profile-detail">Email: {profile.user.email}</h2>
        <h2 className="profile-detail">Téléphone: {profile.user.telephone || 'Pas de numéro de téléphone'}</h2>
      </div>

      <div className="profile-actions">
        <Link href={`/profile/${profile.user._id}`}>
          <button className="edit-profile-button">Modifier le profil</button>
        </Link>

        <button onClick={handleLogout} className="logout-button">Déconnexion</button>
      </div>

      <h3 className="profile-subtitle">Vos annonces publiées</h3>
      <Link href={`/add-moto`}>
        <button className="add-annonce-button">Ajouter une annonce</button>
      </Link>

      <div className="annonce-list">
        {profile.motoAnnonces.map((annonce) => (
          <div key={annonce._id} className="annonce-card">
            <Link href={`/${annonce._id}`}>
              <div className="annonce-card-inner">
                {annonce.image && annonce.image.length > 0 ? (
                  <img
                    src={annonce.image[0]}
                    alt={annonce.title}
                    className="annonce-image"
                  />
                ) : (
                  <div className="no-image">Pas d&#39;image</div>
                )}
                <div className="annonce-info">
                  <h4 className="annonce-title">{annonce.title}</h4>
                  <p className="annonce-price">{annonce.pricePerDay}€/jour</p>
                </div>
              </div>
            </Link>
            <div className="annonce-actions">
              <button onClick={() => handleDelete(annonce._id)} className="delete-button">Supprimer</button>
              <Link href={`/edit-annonce/${annonce._id}`}>
                <button className="edit-button">Modifier</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
