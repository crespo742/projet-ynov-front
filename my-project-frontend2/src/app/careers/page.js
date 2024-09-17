"use client";

import React from 'react';
import './careers.css'; // Importer le fichier CSS spécifique à cette page

export default function Careers() {
  return (
    <div className="careers-container">
      <h1>Rejoignez l'Aventure de Trade Your Bike</h1>

      <section className="careers-section">
        <h2>Pourquoi Travailler Avec Nous ?</h2>
        <p>
          Chez **Trade Your Bike**, nous ne nous contentons pas de construire une plateforme de location et d'échange de motos. Nous créons une communauté mondiale de passionnés de motos qui partagent une vision commune : rendre chaque trajet plus accessible et plus excitant. En rejoignant notre équipe, vous participerez à cette aventure excitante et contribuerez à façonner l'avenir de la mobilité à deux roues.
        </p>
      </section>

      <section className="careers-section">
        <h2>Notre Culture</h2>
        <p>
          Nous croyons en l'innovation, l'intégrité et l'esprit d'équipe. Notre culture est fondée sur la passion pour la moto et l'engagement envers nos utilisateurs. Chez Trade Your Bike, nous valorisons la diversité, l'inclusion et l'apprentissage continu. Nous encourageons chacun à être curieux, créatif et à apporter ses idées pour faire avancer notre mission.
        </p>
      </section>

      <section className="careers-section">
        <h2>Postes Disponibles</h2>
        <ul>
          <li>
            <h3>Développeur Front-End (React)</h3>
            <p>
              Rejoignez notre équipe de développement pour créer des expériences utilisateur incroyables avec les dernières technologies web.
              <br />
              <strong>Lieu :</strong> Paris, France
              <br />
              <strong>Type :</strong> Temps plein
            </p>
          </li>
          <li>
            <h3>Responsable Marketing Digital</h3>
            <p>
              Dirigez nos efforts de marketing numérique et aidez-nous à atteindre de nouveaux clients et à renforcer notre communauté.
              <br />
              <strong>Lieu :</strong> Télétravail
              <br />
              <strong>Type :</strong> Temps plein
            </p>
          </li>
          <li>
            <h3>Ingénieur DevOps</h3>
            <p>
              Aidez-nous à améliorer notre infrastructure et nos processus de développement pour garantir une expérience utilisateur fluide.
              <br />
              <strong>Lieu :</strong> Lyon, France
              <br />
              <strong>Type :</strong> Temps plein
            </p>
          </li>
        </ul>
        <p>
          Nous sommes toujours à la recherche de nouveaux talents ! Même si vous ne voyez pas un poste qui correspond à vos compétences, n'hésitez pas à nous envoyer votre CV à <a href="mailto:careers@tradeyourbike.com">careers@tradeyourbike.com</a>.
        </p>
      </section>

      <section className="careers-section">
        <h2>Les Avantages de Travailler Avec Nous</h2>
        <ul>
          <li>🏍️ Un environnement de travail flexible et stimulant</li>
          <li>🌍 Opportunités de travailler à distance et de voyager</li>
          <li>💼 Programmes de développement professionnel continus</li>
          <li>🏅 Réductions exclusives sur la location et l'achat de motos</li>
        </ul>
      </section>

      <section className="careers-section">
        <h2>Comment Postuler</h2>
        <p>
          Si vous êtes passionné par la moto et que vous souhaitez rejoindre une équipe dynamique et innovante, envoyez-nous votre CV et une lettre de motivation à <a href="mailto:careers@tradeyourbike.com">careers@tradeyourbike.com</a>. Nous serions ravis de discuter de la façon dont vous pouvez contribuer à notre mission.
        </p>
      </section>
    </div>
  );
}
