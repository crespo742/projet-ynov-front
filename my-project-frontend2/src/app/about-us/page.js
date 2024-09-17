"use client";

import React from 'react';
import './about-us.css'; // Importer le fichier CSS spécifique à cette page

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <h1>À Propos de Nous</h1>
      
      <section className="about-section">
        <h2>Notre Histoire</h2>
        <p>
          L'histoire de **Trade Your Bike** commence en 2023, lorsque deux passionnés de moto, Killian et Matthias, décident de transformer leur passion commune en un projet ambitieux. Ils avaient constaté à quel point il était difficile pour les motards de trouver et de louer des motos adaptées à leurs besoins, surtout lorsqu'ils voyageaient dans de nouveaux endroits. Ils voulaient changer cela en créant une plateforme unique pour connecter les motards du monde entier.
        </p>
        <p>
          Après des mois de travail acharné, Trade Your Bike est né. Ce qui a commencé comme une petite communauté de motards partageant leurs expériences et leurs motos est rapidement devenu une plateforme de référence pour la location et l'échange de motos. Aujourd'hui, nous sommes fiers d'avoir des milliers d'utilisateurs actifs dans plus de 30 pays.
        </p>
      </section>

      <section className="about-section">
        <h2>Notre Mission</h2>
        <p>
          Chez Trade Your Bike, notre mission est simple : rendre la location et l'échange de motos aussi accessibles, fiables et agréables que possible. Nous croyons que chaque trajet doit être une aventure, que vous exploriez de nouveaux horizons ou que vous fassiez votre trajet quotidien. Nous travaillons sans relâche pour offrir à nos utilisateurs la meilleure expérience possible, en combinant technologie, sécurité, et passion.
        </p>
      </section>

      <section className="about-section">
        <h2>Nos Valeurs</h2>
        <ul>
          <li><strong>Passion :</strong> La moto est au cœur de tout ce que nous faisons.</li>
          <li><strong>Fiabilité :</strong> Nous nous engageons à fournir un service sur lequel vous pouvez compter.</li>
          <li><strong>Communauté :</strong> Nous croyons en une communauté mondiale de motards unie par le partage et l'entraide.</li>
          <li><strong>Innovation :</strong> Nous cherchons toujours de nouvelles façons d'améliorer notre plateforme et votre expérience.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Notre Équipe</h2>
        <p>
          Trade Your Bike est dirigé par une équipe de passionnés de moto, d'ingénieurs talentueux, et de spécialistes du service client. Ensemble, nous travaillons pour offrir la meilleure plateforme de location et d'échange de motos au monde.
        </p>
      </section>

      <section className="about-section">
        <h2>Rejoignez-nous</h2>
        <p>
          Que vous soyez un motard chevronné ou un novice enthousiaste, Trade Your Bike vous accueille à bras ouverts. Inscrivez-vous dès aujourd'hui et rejoignez notre communauté mondiale de passionnés de moto. Avec Trade Your Bike, chaque trajet devient une nouvelle histoire.
        </p>
      </section>
    </div>
  );
}
