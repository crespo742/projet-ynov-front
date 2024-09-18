"use client";

import React from 'react';
import './terms-and-conditions.css'; // Importer le fichier CSS spécifique à cette page

export default function TermsAndConditions() {
  return (
    <div className="terms-container">
      <h1>Termes et Conditions d&#39;Utilisation de Trade Your Bike</h1>

      <section className="terms-section">
        <h2>1. Introduction</h2>
        <p>
          Bienvenue sur **Trade Your Bike**. En accédant ou en utilisant notre site web et nos services, vous acceptez de respecter et d&#39;être lié par les termes et conditions suivants. Si vous n&#39;acceptez pas ces termes, veuillez ne pas utiliser notre site.
        </p>
      </section>

      <section className="terms-section">
        <h2>2. Utilisation Acceptable</h2>
        <p>
          Vous acceptez d&#39;utiliser notre site de manière légale et respectueuse. Vous ne devez pas utiliser notre site pour :
        </p>
        <ul>
          <li>Publier du contenu illégal, nuisible, menaçant, abusif, harcelant, diffamatoire ou obscène.</li>
          <li>Violer les droits de propriété intellectuelle de tiers.</li>
          <li>Distribuer des virus ou tout autre code informatique malveillant.</li>
          <li>Collecter ou stocker des données personnelles d&#39;autres utilisateurs sans leur consentement.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>3. Comptes Utilisateurs</h2>
        <p>
          Pour accéder à certaines fonctionnalités de notre site, vous devrez créer un compte. Vous êtes responsable de la sécurité de votre compte et de toutes les activités qui s&#39;y déroulent. Vous vous engagez à fournir des informations exactes et à jour et à nous informer immédiatement de toute utilisation non autorisée de votre compte.
        </p>
      </section>

      <section className="terms-section">
        <h2>4. Conditions de Paiement</h2>
        <p>
          Toutes les transactions effectuées sur **Trade Your Bike** sont sécurisées et traitées via des prestataires de services de paiement tiers. Vous acceptez de fournir des informations de paiement exactes et de mettre à jour ces informations en cas de changement. Les frais applicables et les modalités de paiement seront précisés au moment de l&#39;achat.
        </p>
      </section>

      <section className="terms-section">
        <h2>5. Annulation et Remboursements</h2>
        <p>
          Vous pouvez annuler une réservation conformément à notre politique d&#39;annulation, disponible sur notre site. Les remboursements seront traités en fonction de cette politique. Veuillez noter que certaines réservations peuvent être non remboursables ou soumises à des frais d&#39;annulation.
        </p>
      </section>

      <section className="terms-section">
        <h2>6. Propriété Intellectuelle</h2>
        <p>
          Tout le contenu présent sur **Trade Your Bike**, y compris les textes, graphiques, logos, images et logiciels, est protégé par les lois sur la propriété intellectuelle et appartient à **Trade Your Bike** ou à ses concédants de licence. Vous n&#39;êtes pas autorisé à copier, distribuer, modifier ou utiliser ce contenu sans notre autorisation écrite expresse.
        </p>
      </section>

      <section className="terms-section">
        <h2>7. Limitation de Responsabilité</h2>
        <p>
          Nous ne serons pas responsables des dommages directs, indirects, spéciaux ou consécutifs résultant de votre utilisation de notre site ou de nos services. Nous ne garantissons pas que notre site sera exempt d&#39;erreurs ou de virus. Vous utilisez notre site à vos propres risques.
        </p>
      </section>

      <section className="terms-section">
        <h2>8. Modifications des Termes</h2>
        <p>
          Nous nous réservons le droit de modifier ces termes et conditions à tout moment. Toute modification sera publiée sur cette page et, le cas échéant, vous en serez informé par e-mail. En continuant à utiliser notre site après la publication des modifications, vous acceptez d&#39;être lié par les termes modifiés.
        </p>
      </section>

      <section className="terms-section">
        <h2>9. Droit Applicable et Juridiction</h2>
        <p>
          Ces termes et conditions sont régis par les lois de [votre pays]. Tout litige résultant de l&#39;utilisation de notre site sera soumis à la juridiction exclusive des tribunaux de [votre ville/pays].
        </p>
      </section>

      <section className="terms-section">
        <h2>10. Nous Contacter</h2>
        <p>
          Si vous avez des questions ou des préoccupations concernant ces termes et conditions, veuillez nous contacter à l&#39;adresse suivante : <a href="mailto:support@tradeyourbike.com">support@tradeyourbike.com</a>.
        </p>
      </section>

      <p className="update-date">Dernière mise à jour : 19/07/2024</p>
    </div>
  );
}
