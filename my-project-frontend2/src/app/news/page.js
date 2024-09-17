"use client";

import React, { useState, useEffect } from 'react';
import './news.css'; // Importer le fichier CSS spécifique à cette page

export default function Actualites() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Simuler un appel API pour récupérer les actualités
    const fetchNews = async () => {
      try {
        // Remplacer ceci par un appel réel à votre API
        const mockNews = [
          {
            id: 1,
            title: "Trade Your Bike lance une nouvelle fonctionnalité de messagerie sécurisée",
            content: "Nous sommes ravis d'annoncer le lancement d'une nouvelle fonctionnalité de messagerie sécurisée sur notre plateforme, permettant une communication plus facile et plus sûre entre les utilisateurs.",
            date: "2024-08-15"
          },
          {
            id: 2,
            title: "Partenariat avec Moto Expo 2024",
            content: "Trade Your Bike est fier d'être partenaire officiel de Moto Expo 2024, le plus grand salon de la moto en Europe. Rejoignez-nous pour des offres exclusives et des événements en direct.",
            date: "2024-07-30"
          },
          {
            id: 3,
            title: "Nouveaux conseils de sécurité ajoutés à la plateforme",
            content: "Nous avons mis à jour notre section Conseils de sécurité avec de nouvelles recommandations pour vous aider à rouler en toute sécurité.",
            date: "2024-07-10"
          },
          {
            id: 4,
            title: "Améliorations des fonctionnalités de recherche",
            content: "Nous avons amélioré les fonctionnalités de recherche sur notre site pour vous aider à trouver plus facilement les motos disponibles dans votre région.",
            date: "2024-06-25"
          }
        ];
        setNews(mockNews);
      } catch (error) {
        console.error('Erreur lors de la récupération des actualités:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="actualites-container">
      <h1>Actualités</h1>
      <p>Restez à jour avec les dernières nouvelles et mises à jour de Trade Your Bike.</p>

      <div className="news-list">
        {news.map((article) => (
          <div key={article.id} className="news-card">
            <h2>{article.title}</h2>
            <p className="news-date">{new Date(article.date).toLocaleDateString()}</p>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
