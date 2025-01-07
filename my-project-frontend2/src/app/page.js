'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import FilterComponent from './components/FilterComponent';
import './Home.css'; // Import du fichier CSS pour un style similaire à l'exemple donné.

export default function Home() {
  const [motoAnnonces, setMotoAnnonces] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMotoAnnonces = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-Annonces`);
        setMotoAnnonces(response.data);
      } catch (error) {
        console.log('dzdzdzdzd', error);
        
        setError('Failed to fetch moto Annonces');
      }
    };

    fetchMotoAnnonces();

    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      setUser(JSON.parse(currentUser)); // Définir l'utilisateur en tant qu'objet parsé
    }
  }, []);

  return (
    <div className="home-background"> {/* Nouveau conteneur pour l'image en fond */}
      <div className="home-container">
        <h1 className="page-title">Toutes nos motos à louer</h1>

        {/* Section des filtres */}
        <div className="filters-container">
          <FilterComponent setMotoAnnonces={setMotoAnnonces} />
        </div>

        {/* Section des annonces */}
        <div className="annonces-grid">
          {error && <p>{error}</p>}
          {motoAnnonces.map((annonce) => (
            <div key={annonce._id} className="annonce-card">
              <Link href={`/${annonce._id}`}>
                <div className="annonce-content">
                  {annonce.image && annonce.image.length > 0 && (
                    <img
                      src={annonce.image[0]}
                      alt={annonce.title}
                      className="annonce-image"
                    />
                  )}
                  <h2 className="annonce-title">{annonce.title}</h2>
                  <p className="annonce-price">{annonce.pricePerDay} € / jour</p>
                  <button className="annonce-button">Réserver ce véhicule</button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
