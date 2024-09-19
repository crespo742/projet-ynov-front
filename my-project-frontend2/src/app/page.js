'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import FilterComponent from './components/FilterComponent';
import './Home.css'; // Import du fichier CSS pour un style similaire à l'exemple donné.

export default function Home() {
  const [motoAds, setMotoAds] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMotoAds = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads`);
        setMotoAds(response.data);
      } catch (error) {
        setError('Failed to fetch moto ads');
      }
    };

    fetchMotoAds();

    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      setUser(JSON.parse(currentUser)); // Définir l'utilisateur en tant qu'objet parsé
    }
  }, []);

  return (
    <div className="home-container">
      <h1 className="page-title">Toutes nos motos à louer</h1>

      {/* Section des filtres */}
      <div className="filters-container">
        <FilterComponent setMotoAds={setMotoAds} />
      </div>

      {/* Section des annonces */}
      <div className="ads-grid">
        {error && <p>{error}</p>}
        {motoAds.map((ad) => (
          <div key={ad._id} className="ad-card">
            <Link href={`/${ad._id}`}>
              <div className="ad-content">
                {ad.image && ad.image.length > 0 && (
                  <img
                    src={ad.image[0]}
                    alt={ad.title}
                    className="ad-image"
                  />
                )}
                <h2 className="ad-title">{ad.title}</h2>
                <p className="ad-price">{ad.pricePerDay} € / jour</p>
                <button className="ad-button">Réserver ce véhicule</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
