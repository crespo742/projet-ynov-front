"use client";

import React from 'react';
import './privacy-policy.css'; // Importer le fichier CSS spécifique à cette page

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <h1>Politique de Confidentialité de Trade Your Bike</h1>

      <section className="privacy-section">
        <h2>1. Introduction</h2>
        <p>
          Bienvenue sur **Trade Your Bike**. Nous nous engageons à protéger et à respecter votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre site web et nos services.
        </p>
      </section>

      <section className="privacy-section">
        <h2>2. Informations que Nous Collectons</h2>
        <h3>2.1 Informations que Vous Nous Fournissez</h3>
        <p>
          Lorsque vous utilisez notre site, nous pouvons collecter les informations suivantes que vous nous fournissez directement :
        </p>
        <ul>
          <li>Votre nom et vos coordonnées (adresse e-mail, numéro de téléphone, adresse postale, etc.).</li>
          <li>Vos informations de compte (nom d'utilisateur, mot de passe, préférences).</li>
          <li>Les détails de vos transactions, y compris les informations de paiement.</li>
          <li>Tout contenu que vous publiez sur notre site (avis, commentaires, etc.).</li>
        </ul>

        <h3>2.2 Informations Collectées Automatiquement</h3>
        <p>
          Nous pouvons également collecter automatiquement certaines informations lorsque vous utilisez notre site, telles que :
        </p>
        <ul>
          <li>Votre adresse IP et les informations de localisation.</li>
          <li>Votre type de navigateur et système d'exploitation.</li>
          <li>Les pages que vous visitez et le temps passé sur notre site.</li>
          <li>Les informations sur les appareils que vous utilisez pour accéder à notre site.</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>3. Comment Nous Utilisons Vos Informations</h2>
        <p>Nous utilisons les informations que nous collectons pour :</p>
        <ul>
          <li>Fournir, exploiter et améliorer nos services.</li>
          <li>Gérer votre compte et traiter vos transactions.</li>
          <li>Répondre à vos demandes et communiquer avec vous.</li>
          <li>Vous envoyer des mises à jour et des offres promotionnelles (avec votre consentement).</li>
          <li>Analyser l'utilisation de notre site pour améliorer nos services.</li>
          <li>Protéger contre la fraude, les abus et les activités illégales.</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>4. Partage de Vos Informations</h2>
        <p>Nous pouvons partager vos informations dans les cas suivants :</p>
        <ul>
          <li>Avec des prestataires de services tiers qui nous aident à fournir nos services (par exemple, processeurs de paiement, services d'hébergement).</li>
          <li>Si la loi l'exige, ou si nous croyons de bonne foi qu'une telle action est nécessaire pour se conformer aux lois applicables.</li>
          <li>Dans le cadre d'une fusion, d'une acquisition ou d'une vente d'actifs, vos informations peuvent être transférées.</li>
          <li>Avec votre consentement ou selon vos instructions.</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>5. Sécurité de Vos Informations</h2>
        <p>
          Nous prenons des mesures de sécurité appropriées pour protéger vos informations contre l'accès, l'altération, la divulgation ou la destruction non autorisés. Ces mesures comprennent, sans s'y limiter, le chiffrement des données, les pare-feu et les contrôles d'accès stricts.
        </p>
      </section>

      <section className="privacy-section">
        <h2>6. Vos Droits</h2>
        <p>Vous avez le droit de :</p>
        <ul>
          <li>Accéder aux informations personnelles que nous détenons à votre sujet.</li>
          <li>Demander la correction de toute information personnelle inexacte.</li>
          <li>Demander la suppression de vos informations personnelles.</li>
          <li>Vous opposer au traitement de vos informations personnelles.</li>
          <li>Demander la limitation du traitement de vos informations personnelles.</li>
          <li>Retirer votre consentement à tout moment.</li>
        </ul>
        <p>
          Pour exercer ces droits, veuillez nous contacter à l'adresse <a href="mailto:privacy@tradeyourbike.com">privacy@tradeyourbike.com</a>.
        </p>
      </section>

      <section className="privacy-section">
        <h2>7. Conservation des Données</h2>
        <p>
          Nous conserverons vos informations personnelles aussi longtemps que nécessaire pour fournir nos services, résoudre les litiges, et respecter nos obligations légales. Lorsque vos informations ne seront plus nécessaires, nous les supprimerons en toute sécurité.
        </p>
      </section>

      <section className="privacy-section">
        <h2>8. Modifications de cette Politique</h2>
        <p>
          Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Toute modification sera publiée sur cette page et, si nécessaire, vous en serez informé par e-mail. Veuillez consulter cette page régulièrement pour rester informé de nos pratiques.
        </p>
      </section>

      <section className="privacy-section">
        <h2>9. Nous Contacter</h2>
        <p>
          Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou nos pratiques de confidentialité, veuillez nous contacter à l'adresse suivante : <a href="mailto:privacy@tradeyourbike.com">privacy@tradeyourbike.com</a>.
        </p>
      </section>

      <p className="update-date">Dernière mise à jour : 17/09/2024</p>
    </div>
  );
}
