"use client";

import React, { useState, useEffect } from 'react';
import './safety-tips.css'; // Importer le fichier CSS spécifique à cette page

export default function ConseilsSecurite() {
  const [conseils, setConseils] = useState([]);

  useEffect(() => {
    // Simuler un appel API pour récupérer les conseils de sécurité
    const fetchConseils = async () => {
      try {
        // Remplacer ceci par un appel réel à votre API
        const mockConseils = [
          {
            id: 1,
            title: "Vérifiez les documents du véhicule",
            content: "Assurez-vous que tous les documents de la moto, tels que la carte grise et l'assurance, sont à jour et en règle.",
          },
          {
            id: 2,
            title: "Inspectez la moto avant de partir",
            content: "Faites une vérification complète de l'état de la moto, y compris les freins, les pneus, les feux et les niveaux de fluide.",
          },
          {
            id: 3,
            title: "Préférez les paiements sécurisés",
            content: "Utilisez toujours la plateforme de paiement sécurisée de Trade Your Bike pour toutes les transactions financières.",
          },
          {
            id: 4,
            title: "Communiquez via la plateforme",
            content: "Gardez toutes les communications sur la plateforme pour éviter les fraudes et garantir une assistance en cas de problème.",
          },
          {
            id: 5,
            title: "Respectez les règles locales de conduite",
            content: "Assurez-vous de connaître et de respecter les lois et réglementations locales en matière de conduite et de location de véhicules.",
          },
        ];
        setConseils(mockConseils);
      } catch (error) {
        console.error('Erreur lors de la récupération des conseils de sécurité:', error);
      }
    };

    fetchConseils();
  }, []);

  return (
    <div className="conseils-container">
      <h1>Conseils de sécurité</h1>
      <p>Suivez ces conseils pour assurer votre sécurité et celle des autres lors de l'utilisation de Trade Your Bike.</p>

      <div className="conseils-list">
        {conseils.map((conseil) => (
          <div key={conseil.id} className="conseil-card">
            <h2>{conseil.title}</h2>
            <p>{conseil.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
