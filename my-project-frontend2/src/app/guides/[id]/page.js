"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './guideDetails.css'; // Crée un fichier CSS spécifique pour le guide

export default function GuidePage({ params }) {
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = params; // On récupère l'id du guide depuis l'URL

  useEffect(() => {
    // Simuler la récupération d'un guide via l'API
    const fetchGuide = async () => {
      try {
        // Simuler un appel API pour récupérer les détails du guide
        const mockGuides = [
          {
            id: 1,
            title: "Comment publier une annonce pour votre moto",
            content: `Publier une annonce pour louer votre moto sur Trade Your Bike est un processus simple. 
            Commencez par vous connecter à votre compte, puis allez dans la section "Publier une annonce". Remplissez les détails essentiels, 
            comme la marque, le modèle, l'année et le prix de location par jour. 
            Assurez-vous d'inclure des photos de qualité de votre moto et une description détaillée pour attirer les locataires potentiels. 
            Enfin, choisissez les dates de disponibilité et publiez l'annonce. 
            Votre moto sera maintenant visible par les utilisateurs de la plateforme !`,
            date: "2024-09-15",
            author: "Jean Dupont",
          },
          {
            id: 2,
            title: "Réserver une moto : Étape par étape",
            content: `Réserver une moto sur Trade Your Bike est un jeu d'enfant ! 
            Tout d'abord, parcourez les annonces disponibles et choisissez celle qui vous plaît. 
            Vérifiez les dates de disponibilité et lisez attentivement la description. Une fois prêt, cliquez sur "Réserver", 
            sélectionnez les dates de location et procédez au paiement. Vous recevrez une confirmation par e-mail une fois la réservation validée. 
            Assurez-vous de contacter le propriétaire pour organiser la remise des clés et profiter de votre balade !`,
            date: "2024-08-20",
            author: "Marie Curie",
          },
          {
            id: 3,
            title: "Gestion des paiements et des cautions",
            content: `Le paiement sur Trade Your Bike est sécurisé et simple. 
            Une fois que vous avez choisi votre moto et validé les dates, vous serez redirigé vers une page de paiement. 
            Vous pouvez payer via carte bancaire, et une caution sera prélevée en fonction des conditions définies par le propriétaire de la moto. 
            La caution est une garantie qui sera restituée après la période de location, sous réserve que la moto soit retournée en bon état. 
            Le processus est entièrement transparent pour assurer la tranquillité d'esprit du locataire et du propriétaire.`,
            date: "2024-08-22",
            author: "Paul Martin",
          },
          {
            id: 4,
            title: "Conseils pour une location en toute sécurité",
            content: `Louer une moto en toute sécurité nécessite de suivre quelques conseils pratiques. 
            Tout d'abord, vérifiez toujours l'état de la moto avant de partir. Demandez au propriétaire des détails sur son entretien, 
            et assurez-vous que les pneus, freins, et feux fonctionnent correctement. 
            Ensuite, lisez attentivement les conditions de location, notamment en ce qui concerne la caution et les éventuels frais supplémentaires. 
            N'oubliez pas de toujours porter un équipement de sécurité complet : casque homologué, gants et vêtements adaptés. 
            En respectant ces consignes, vous profiterez d'une location sans soucis !`,
            date: "2024-07-30",
            author: "Alice Bernard",
          },
        ];

        const foundGuide = mockGuides.find((guide) => guide.id === parseInt(id));
        if (foundGuide) {
          setGuide(foundGuide);
        } else {
          setError("Guide non trouvé.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération du guide:", error);
        setError("Erreur lors de la récupération du guide");
        setLoading(false);
      }
    };

    fetchGuide();
  }, [id]);

  if (loading) {
    return <p>Chargement du guide...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="guide-container">
      {guide && (
        <>
          <h1>{guide.title}</h1>
          <p className="guide-meta">Par {guide.author} | {new Date(guide.date).toLocaleDateString()}</p>
          <div className="guide-content">
            <p>{guide.content}</p>
          </div>
        </>
      )}
    </div>
  );
}
