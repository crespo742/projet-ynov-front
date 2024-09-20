"use client";

import React, { useState } from "react";
import "./helpCenter.css"; // Importer le fichier CSS spécifique
import Link from 'next/link'; // Importer Link pour redirection

export default function HelpCenter() {
  const [faqs] = useState([
    {
      id: 1,
      question: "Comment publier une annonce pour ma moto ?",
      answer: "Pour publier une annonce, cliquez sur 'Publier une annonce' en haut de la page, puis remplissez les informations requises sur votre moto."
    },
    {
      id: 2,
      question: "Comment réserver une moto sur Trade Your Bike ?",
      answer: "Parcourez les annonces disponibles, sélectionnez la moto qui vous intéresse, et suivez les instructions pour la réservation."
    },
    {
      id: 3,
      question: "Quels sont les moyens de paiement acceptés ?",
      answer: "Nous acceptons les paiements par carte bancaire via notre plateforme sécurisée Stripe."
    },
    {
      id: 4,
      question: "Comment contacter un propriétaire de moto ?",
      answer: "Vous pouvez utiliser notre messagerie sécurisée intégrée pour communiquer avec les propriétaires de moto."
    },
    {
      id: 5,
      question: "Puis-je annuler une réservation ?",
      answer: "Oui, vous pouvez annuler une réservation via votre tableau de bord dans les conditions définies par le propriétaire."
    },
  ]);

  return (
    <div className="help-center-container">
      <h1>Centre d&#39;Aide</h1>
      <p>
        Bienvenue au centre d&#39;aide de Trade Your Bike. Retrouvez ici toutes les réponses à vos questions concernant la location, l&#39;achat ou la publication d&#39;annonces.
      </p>

      <div className="help-section">
        <h2>Questions Fréquemment Posées</h2>
        <div className="faq-list">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="help-section contact">
        <h2>Besoin d&#39;aide supplémentaire ?</h2>
        <p>Si vous ne trouvez pas la réponse à votre question, n&#39;hésitez pas à nous contacter.</p>
        {/* Redirection vers la page contact */}
        <Link href="/contact">
          <button className="contact-button">Nous Contacter</button>
        </Link>
      </div>
    </div>
  );
}
