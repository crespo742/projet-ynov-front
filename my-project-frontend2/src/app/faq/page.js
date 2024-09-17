'use client';

import { useState, useRef } from 'react';
import './faq.css'; // Import du fichier CSS

const faqData = [
  {
    category: 'Général',
    questions: [
      {
        question: 'Comment puis-je créer un compte sur le site de location de motos ?',
        answer: 'Pour créer un compte, cliquez sur "Inscription" en haut de la page et remplissez le formulaire avec vos informations personnelles.',
      },
      {
        question: 'Quels types de motos puis-je louer sur ce site ?',
        answer: 'Vous pouvez louer une variété de motos, allant des scooters aux motos de sport en passant par les motos de tourisme.',
      },
      {
        question: 'Est-il possible de louer plusieurs motos à la fois ?',
        answer: 'Oui, vous pouvez louer plusieurs motos à la fois, mais chaque location doit être effectuée séparément.',
      },
      {
        question: 'Puis-je modifier mon profil après la création du compte ?',
        answer: 'Oui, vous pouvez modifier vos informations personnelles à tout moment depuis la section "Mon profil".',
      },
    ],
  },
  {
    category: 'Paiements',
    questions: [
      {
        question: 'Quels sont les moyens de paiement acceptés ?',
        answer: 'Nous acceptons les cartes de crédit, PayPal et les virements bancaires.',
      },
      {
        question: 'Comment puis-je obtenir un remboursement ?',
        answer: 'Pour obtenir un remboursement, contactez notre support client dans les 14 jours suivant la location.',
      },
      {
        question: 'Le paiement est-il sécurisé ?',
        answer: 'Oui, tous les paiements sont sécurisés grâce à un cryptage SSL de haute qualité.',
      },
      {
        question: 'Puis-je utiliser un code de réduction ?',
        answer: 'Oui, vous pouvez entrer un code de réduction valide lors du paiement pour bénéficier de remises spéciales.',
      },
    ],
  },
  {
    category: 'Réservations',
    questions: [
      {
        question: 'Comment réserver une moto ?',
        answer: 'Pour réserver une moto, connectez-vous à votre compte, choisissez une moto disponible et suivez les instructions pour effectuer la réservation.',
      },
      {
        question: 'Puis-je annuler ma réservation ?',
        answer: 'Oui, vous pouvez annuler votre réservation jusqu\'à 24 heures avant la date de début prévue.',
      },
      {
        question: 'Y a-t-il des frais d’annulation ?',
        answer: 'Des frais d’annulation peuvent s’appliquer si vous annulez moins de 24 heures avant la date de début prévue.',
      },
      {
        question: 'Comment puis-je modifier ma réservation ?',
        answer: 'Pour modifier une réservation, contactez notre service client ou utilisez la fonctionnalité de modification dans votre compte.',
      },
    ],
  },
  {
    category: 'Messages',
    questions: [
      {
        question: 'Comment puis-je envoyer un message au propriétaire de la moto ?',
        answer: 'Une fois que vous avez réservé une moto, vous pouvez envoyer un message au propriétaire via notre système de messagerie interne.',
      },
      {
        question: 'Où puis-je voir mes messages non lus ?',
        answer: 'Vous pouvez voir vos messages non lus dans la section "Messagerie" de votre compte.',
      },
      {
        question: 'Puis-je bloquer un utilisateur ?',
        answer: 'Oui, si vous recevez des messages inappropriés, vous pouvez bloquer un utilisateur et signaler le problème à notre support.',
      },
      {
        question: 'Comment répondre à un message ?',
        answer: 'Pour répondre à un message, allez dans la section "Messagerie", cliquez sur le message et tapez votre réponse.',
      },
    ],
  },
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterFAQs(selectedCategory, term);

    // Afficher les suggestions basées sur le terme de recherche
    const newSuggestions = faqData.flatMap(item =>
      item.questions
        .filter(q => q.question.toLowerCase().includes(term))
        .map(q => ({ category: item.category, question: q.question }))
    );
    setSuggestions(newSuggestions);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterFAQs(category, searchTerm);
  };

  const filterFAQs = (category, term) => {
    const filtered = faqData
      .filter((item) =>
        category === 'Toutes' || item.category === category
      )
      .map((item) => ({
        ...item,
        questions: item.questions.filter((q) =>
          q.question.toLowerCase().includes(term)
        ),
      }))
      .filter((item) => item.questions.length > 0);
    setFilteredFAQs(filtered);
  };

  const handleSuggestionClick = (question) => {
    const faqItem = document.getElementById(question);
    if (faqItem) {
      faqItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSearchTerm(''); // Clear l'input après le clic
      setSuggestions([]);
    }
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Foire Aux Questions (FAQ)</h1>
      <div className="faq-search-bar">
        <input
          type="text"
          placeholder="Rechercher une question..."
          value={searchTerm}
          onChange={handleSearch}
          ref={searchRef}
          className="faq-search-input"
        />
        {suggestions.length > 0 && (
          <ul className="faq-suggestions">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="faq-suggestion-item"
                onClick={() => handleSuggestionClick(suggestion.question)}
              >
                {suggestion.question}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="faq-categories">
        <button
          className={`faq-category-button ${selectedCategory === 'Toutes' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('Toutes')}
        >
          Toutes
        </button>
        {faqData.map((item) => (
          <button
            key={item.category}
            className={`faq-category-button ${selectedCategory === item.category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(item.category)}
          >
            {item.category}
          </button>
        ))}
      </div>
      <div className="faq-content">
        {filteredFAQs.map((item) => (
          <div key={item.category} className="faq-category-section">
            <h2 className="faq-category-title">{item.category}</h2>
            {item.questions.map((q) => (
              <div key={q.question} className="faq-item" id={q.question}>
                <details>
                  <summary className="faq-question">{q.question}</summary>
                  <p className="faq-answer">{q.answer}</p>
                </details>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
