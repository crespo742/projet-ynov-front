"use client";

import React, { useEffect, useState } from 'react';
import './blog.css'; // Importer le fichier CSS spécifique à cette page
import Link from 'next/link';

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un appel API pour récupérer les articles de blog
    const fetchArticles = async () => {
      try {
        // Remplacer ceci par un appel réel à votre API
        const mockArticles = [
          {
            id: 1,
            title: "Comment choisir la moto parfaite pour vos aventures",
            excerpt: "Découvrez les critères essentiels pour sélectionner la moto idéale qui correspond à votre style et vos besoins.",
            date: "2024-09-10",
            author: "Jean Dupont",
          },
          {
            id: 2,
            title: "L'échange de motos : Une tendance en pleine croissance",
            excerpt: "Explorez comment l'échange de motos révolutionne le marché et ce que vous devez savoir avant de vous lancer.",
            date: "2024-08-22",
            author: "Marie Curie",
          },
          {
            id: 3,
            title: "Les meilleures routes de France à parcourir à moto",
            excerpt: "Un guide complet des plus belles routes à travers la France pour une aventure à moto inoubliable.",
            date: "2024-07-15",
            author: "Lucie Martin",
          },
        ];
        setArticles(mockArticles);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="blog-container">
      <h1>Blog de Trade Your Bike</h1>
      <p>Découvrez nos derniers articles sur la moto, l&#39;échange, et la location. Restez informé des nouvelles tendances et des conseils d&#39;experts.</p>

      {loading ? (
        <p>Chargement des articles...</p>
      ) : (
        <div className="articles-list">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <h2>{article.title}</h2>
              <p className="article-excerpt">{article.excerpt}</p>
              <p className="article-meta">Par {article.author} | {new Date(article.date).toLocaleDateString()}</p>
              <Link href={`/blog/${article.id}`}>
                <button className="read-more-button">Lire la suite</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
