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
          {
            id: 4,
            title: "Les accessoires indispensables pour chaque motard",
            excerpt: "Découvrez les équipements essentiels pour assurer votre sécurité et améliorer votre confort sur la route.",
            date: "2024-09-20",
            author: "Paul Moreau",
          },
          {
            id: 5,
            title: "Les motos électriques : L’avenir du deux-roues ?",
            excerpt: "Avec l'essor des véhicules électriques. Explorez comment cette technologie transforme le marché du deux-roues.",
            date: "2024-08-18",
            author: "Alice Bernard",
          },
          {
            id: 6,
            title: "Les motos tout-terrain : Guide pour débutants",
            excerpt: "Envie de vous lancer dans l’aventure tout-terrain ? Voici un guide pour choisir votre moto et explorer les pistes en toute sécurité.",
            date: "2024-10-01",
            author: "Maxime Durand",
          },
          {
            id: 7,
            title: "Les motos classiques : Une mode éternelle",
            excerpt: "Pourquoi les motos vintage et classiques reviennent-elles à la mode ? Retour sur l'histoire et le renouveau des motos classiques.",
            date: "2024-11-12",
            author: "Camille Duval",
          },
          {
            id: 8,
            title: "Moto et voyage : Préparez-vous pour un road trip inoubliable",
            excerpt: "Rien ne vaut la sensation de liberté sur la route. Voici nos meilleurs conseils pour planifier votre prochain road trip à moto.",
            date: "2024-12-01",
            author: "Nicolas Martin",
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
