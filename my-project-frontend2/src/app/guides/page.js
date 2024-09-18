"use client";

import React, { useState, useEffect } from 'react';
import './guides.css'; // Importer le fichier CSS spécifique à cette page
import Link from 'next/link';

export default function Guides() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un appel API pour récupérer les guides d'utilisation
    const fetchGuides = async () => {
      try {
        // Remplacer ceci par un appel réel à votre API
        const mockGuides = [
          {
            id: 1,
            title: "Comment publier une annonce pour votre moto",
            excerpt: "Apprenez à créer et publier une annonce pour louer votre moto sur Trade Your Bike.",
          },
          {
            id: 2,
            title: "Réserver une moto : Étape par étape",
            excerpt: "Découvrez comment rechercher, sélectionner et réserver une moto sur notre plateforme.",
          },
          {
            id: 3,
            title: "Gestion des paiements et des cautions",
            excerpt: "Comprenez comment fonctionnent les paiements et la gestion des cautions sur Trade Your Bike.",
          },
          {
            id: 4,
            title: "Conseils pour une location en toute sécurité",
            excerpt: "Suivez ces recommandations pour assurer une location sécurisée et réussie.",
          },
        ];
        setGuides(mockGuides);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des guides:', error);
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  return (
    <div className="guides-container">
      <h1>Guides d&#39;utilisation</h1>
      <p>Explorez nos guides d&#39;utilisation pour tirer le meilleur parti de votre expérience sur Trade Your Bike.</p>

      {loading ? (
        <p>Chargement des guides...</p>
      ) : (
        <div className="guides-list">
          {guides.map((guide) => (
            <div key={guide.id} className="guide-card">
              <h2>{guide.title}</h2>
              <p className="guide-excerpt">{guide.excerpt}</p>
              <Link href={`/guides/${guide.id}`}>
                <button className="read-more-button">Lire le guide</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
