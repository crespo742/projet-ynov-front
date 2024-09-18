'use client';
import React from 'react';
import './homepage.css'; // Import du fichier CSS spécifique à cette page

export default function HomePage() {
  return (
    <div className="homepage-container">
      {/* Header avec image de fond et texte */}
      <header className="hero-header">
        <div className="hero-overlay">
          <h1 className="hero-title">La plus grande communauté de passionnés de motos</h1>
          <p className="hero-subtitle">Louez et échangez des motos en toute simplicité</p>
          <button className="hero-button">Découvrir</button>
        </div>
      </header>

      {/* Nouvelle section de contenu */}
      <section className="info-section">
        <h2 className="info-title">Louez des motos et échangez-les comme jamais auparavant</h2>
        <div className="info-content">
          <div className="info-item">
            <h3>Mettez votre moto en location</h3>
            <p>Créez une annonce pour votre moto et laissez les passionnés la louer. Profitez d&#39;une assurance complète et d&#39;une gestion facile. Gagnez de l&#39;argent tout en partageant votre passion pour les motos.</p>
            <button className="info-button">En savoir plus</button>
          </div>
          <div className="info-item">
            <h3>Trouvez la moto de vos rêves</h3>
            <p>Explorez notre large gamme de motos à louer. Trouvez celle qui correspond à vos envies et partez à l&#39;aventure. La moto parfaite pour chaque occasion vous attend dès maintenant.</p>
            <button className="info-button">Louer une moto</button>
          </div>
          <div className="info-item">
            <h3>Échangez vos motos</h3>
            <p>Échangez votre moto avec celle d&#39;un autre passionné. Vivez une nouvelle expérience de conduite à chaque échange. Découvrez de nouvelles sensations en essayant différentes motos excitantes.</p>
            <button className="info-button">Découvrir</button>
          </div>
          <div className="info-item">
            <h3>Système de paiement sécurisé</h3>
            <p>Effectuez vos paiements en toute sécurité grâce à notre système intégré. Transactions sans soucis garanties avec les dernières technologies de sécurité avancées.</p>
            <button className="info-button">Plus d&#39;infos</button>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="testimonial-section">
        <div className="testimonial-content">
          <div className="testimonial-image">
            <img src="/img1.jpg" alt="Témoignage" />
          </div>
          <div className="testimonial-text">
            <h3>Témoignages de nos utilisateurs</h3>
            <p>Découvrez ce que nos utilisateurs pensent de notre service. Des histoires de passion et de nouvelles aventures partagées par des motards comme vous. Chaque témoignage reflète une expérience unique de location et d&#39;échange de motos, mettant en avant la satisfaction et la confiance que notre communauté accorde à notre plateforme.</p>
          </div>
        </div>
      </section>

      {/* Section Galerie */}
      <section className="gallery-section">
        <div className="gallery-content">
          <div className="gallery-text">
            <h3>Notre galerie de motos</h3>
            <p>Parcourez les motos disponibles à la location. Trouvez celle qui correspond à vos besoins et à vos envies d&#39;aventure. Notre galerie propose une vaste sélection de motos, des plus classiques aux plus modernes, toutes prêtes à être louées et à vous emmener sur de nouvelles routes. Découvrez dès maintenant la diversité de notre offre et choisissez la moto qui vous fera vibrer.</p>
          </div>
          <div className="gallery-image">
            <img src="/img2.jpg" alt="Galerie de motos" />
          </div>
        </div>
      </section>

      {/* Section d'appel à l'action */}
      <section className="cta-section">
        <p className="cta-text">Des milliers de passionnés nous font confiance pour leurs locations et échanges de motos. Rejoignez notre communauté aujourd&#39;hui.</p>
        <img src="/logo.png" alt="Icône moto" className="cta-icon" />
      </section>

      {/* Section finale avec boutons d'inscription et de connexion */}
      <section className="final-section">
        <p className="final-text">Créez votre compte et commencez à explorer les possibilités de location et d&#39;échange de motos. Une aventure vous attend.</p>
        <div className="final-buttons">
          <button className="register-button">Inscription</button>
          <button className="login-button">Connexion</button>
        </div>
      </section>
    </div>
  );
}
