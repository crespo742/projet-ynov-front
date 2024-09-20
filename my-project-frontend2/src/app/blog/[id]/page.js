"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './article.css'; // Crée un fichier CSS spécifique si nécessaire

export default function ArticlePage({ params }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = params; // On récupère l'id de l'article depuis l'URL

  useEffect(() => {
    // Simuler la récupération d'un article via l'API
    const fetchArticle = async () => {
      try {
        // Simuler un appel API pour récupérer les détails de l'article
        const mockArticles = [
          {
            id: 1,
            title: "Comment choisir la moto parfaite pour vos aventures",
            content: "Rouler à moto est une passion, mais choisir la moto parfaite est une étape clé pour profiter pleinement de chaque trajet. Tout d'abord, il est essentiel de définir votre style de conduite. Les motos sportives sont idéales pour ceux qui aiment la vitesse, tandis que les motos de tourisme offrent confort et durabilité pour les longs trajets. Les motos tout-terrain, quant à elles, sont parfaites pour l'aventure hors route. N'oubliez pas de prendre en compte votre budget, ainsi que les coûts d'entretien et d'assurance. Enfin, assurez-vous que la moto est adaptée à votre taille et à votre niveau d'expérience. Une moto bien choisie est la clé de nombreux kilomètres de plaisir !",
            date: "2024-09-10",
            author: "Jean Dupont",
          },
          {
            id: 2,
            title: "L'échange de motos : Une tendance en pleine croissance",
            content: "Le concept d'échanger sa moto avec un autre passionné est en pleine expansion. Ce système permet non seulement de découvrir de nouvelles machines sans se ruiner, mais aussi de rencontrer d'autres amateurs de moto partageant la même passion. Avant de vous lancer, il est important de comprendre les bases : choisissez une plateforme de confiance, assurez-vous que la moto échangée est en bon état, et définissez clairement les règles de l'échange. Ce mode de consommation collaboratif permet d'économiser de l'argent et de faire de belles découvertes.",
            date: "2024-08-22",
            author: "Marie Curie",
          },
          {
            id: 3,
            title: "Les meilleures routes de France à parcourir à moto",
            content: "La France regorge de routes splendides qui n'attendent que d'être explorées à moto. Parmi elles, la Route des Grandes Alpes est un incontournable pour les amateurs de virages et de panoramas à couper le souffle. Plus au sud, la Route Napoléon offre des paysages tout aussi impressionnants, avec des villages pittoresques à visiter en chemin. Enfin, pour les amoureux de la mer, la côte Atlantique offre des vues sur l'océan à couper le souffle. Que vous soyez amateur de montagne, de campagne ou de littoral, la France a de quoi satisfaire tous les motards.",
            date: "2024-07-15",
            author: "Lucie Martin",
          },
          {
            id: 4,
            title: "Les accessoires indispensables pour chaque motard",
            content: "Rouler à moto est plus que de la simple conduite. C'est une expérience complète qui nécessite le bon équipement pour garantir votre sécurité, améliorer votre confort et rendre vos trajets plus agréables. Voici une liste des accessoires que chaque motard devrait avoir : un casque homologué, des gants, une veste renforcée, des bottes et un système de communication Bluetooth. Investir dans un bon équipement peut non seulement sauver des vies, mais aussi transformer votre expérience de conduite.",
            date: "2024-09-20",
            author: "Paul Moreau",
          },
          {
            id: 5,
            title: "Les motos électriques : L’avenir du deux-roues ?",
            content: "Les motos électriques sont de plus en plus populaires à travers le monde. Elles offrent une solution écologique tout en garantissant une expérience de conduite silencieuse et fluide. Les avantages sont nombreux : réduction des émissions de CO2, maintenance minimale, coût de l'énergie plus faible, et des accélérations fulgurantes grâce à un couple instantané. Cependant, elles posent encore quelques défis, notamment en termes d'autonomie et d'infrastructure de recharge. Malgré ces obstacles, les motos électriques représentent l'avenir du deux-roues.",
            date: "2024-08-18",
            author: "Alice Bernard",
          },
          {
            id: 6,
            title: "Les motos tout-terrain : Guide pour débutants",
            content: "Le tout-terrain est une discipline passionnante qui permet de sortir des sentiers battus et de vivre des aventures en pleine nature. Choisir une moto adaptée est essentiel. Les modèles de motocross sont parfaits pour des circuits courts et intenses, tandis que les enduros sont plus polyvalentes pour traverser différents types de terrain. En plus de la moto, l'équipement est tout aussi important : des bottes renforcées, des genouillères, un casque intégral et un gilet pare-pierre sont indispensables pour rouler en toute sécurité.",
            date: "2024-10-01",
            author: "Maxime Durand",
          },
          {
            id: 7,
            title: "Les motos classiques : Une mode éternelle",
            content: "Le charme des motos classiques n'a jamais disparu. Ces modèles représentent un retour aux sources, avec des designs épurés et une mécanique simple. Les marques comme Triumph ou Royal Enfield proposent des motos au look vintage, mais avec des performances modernes. Pour beaucoup, rouler en moto classique est plus qu'une expérience de conduite : c'est un art de vivre. Ces motos ne sont pas seulement des objets de collection, elles sont faites pour rouler et offrir une expérience unique.",
            date: "2024-11-12",
            author: "Camille Duval",
          },
          {
            id: 8,
            title: "Moto et voyage : Préparez-vous pour un road trip inoubliable",
            content: "Un road trip à moto est une aventure inoubliable, mais cela demande une préparation minutieuse. Assurez-vous que votre moto est en parfait état avant de partir. Vérifiez les niveaux d'huile, la pression des pneus et emportez avec vous les outils essentiels. Le choix de la destination est également important. Que vous préfériez les routes de montagne sinueuses ou les vastes étendues désertiques, planifiez bien vos étapes et laissez-vous surprendre par la route.",
            date: "2024-12-01",
            author: "Nicolas Martin",
          },
        ];

        const foundArticle = mockArticles.find((article) => article.id === parseInt(id));
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError("Article non trouvé.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article:", error);
        setError("Erreur lors de la récupération de l'article");
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <p>Chargement de l&#39;article...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="article-container">
      {article && (
        <>
          <h1>{article.title}</h1>
          <p className="article-meta">Par {article.author} | {new Date(article.date).toLocaleDateString()}</p>
          <div className="article-content">
            <p>{article.content}</p>
          </div>
        </>
      )}
    </div>
  );
}
