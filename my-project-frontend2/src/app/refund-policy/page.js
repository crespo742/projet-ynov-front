"use client";

import React from "react";
import "./refund-policy.css"; // Importer le fichier CSS spécifique à cette page

export default function RefundPolicyPage() {
  return (
    <div className="refund-policy-container">
      <h1>Politique de remboursement</h1>
      <p>
        Chez Trade Your Bike, nous mettons tout en œuvre pour garantir votre
        satisfaction. Cependant, nous comprenons que des imprévus peuvent
        survenir. Cette politique de remboursement a pour but de vous informer
        de nos conditions de remboursement pour toutes les transactions
        réalisées sur notre plateforme.
      </p>

      <div className="section">
        <h2>1. Conditions générales de remboursement</h2>
        <p>
          Les remboursements peuvent être effectués sous certaines conditions,
          notamment :
        </p>
        <ul>
          <li>
            Si la moto louée ne correspond pas à l&#39;annonce (description
            inexacte, photos trompeuses).
          </li>
          <li>
            Si la location est annulée par le propriétaire avant la date de
            début de la réservation.
          </li>
          <li>
            En cas de force majeure (accident, problème mécanique grave).
          </li>
        </ul>
      </div>

      <div className="section">
        <h2>2. Procédure de remboursement</h2>
        <p>
          Pour demander un remboursement, veuillez suivre les étapes suivantes :
        </p>
        <ol>
          <li>
            Envoyez une demande écrite à notre service client via notre page de
            contact ou par email à support@tradeyourbike.com.
          </li>
          <li>
            Mentionnez votre numéro de réservation, les détails de la
            transaction, et la raison de votre demande de remboursement.
          </li>
          <li>
            Notre équipe examinera votre demande dans les 5 jours ouvrables.
          </li>
        </ol>
      </div>

      <div className="section">
        <h2>3. Délai de traitement des remboursements</h2>
        <p>
          Une fois votre demande approuvée, le remboursement sera traité dans un
          délai de 7 à 14 jours ouvrables. Le montant sera crédité sur le mode
          de paiement que vous avez utilisé lors de la transaction initiale.
        </p>
      </div>

      <div className="section">
        <h2>4. Exceptions et cas particuliers</h2>
        <p>
          Certains cas peuvent ne pas être éligibles à un remboursement
          complet :
        </p>
        <ul>
          <li>
            Si la location a été utilisée conformément à l&#39;accord sans
            problème.
          </li>
          <li>
            Si l&#39;annulation est faite par le locataire dans un délai inférieur à
            24 heures avant la location.
          </li>
          <li>
            Si des dommages ou des infractions ont été signalés pendant la
            location.
          </li>
        </ul>
      </div>

      <div className="section">
        <h2>5. Contactez-nous</h2>
        <p>
          Si vous avez des questions supplémentaires concernant notre politique
          de remboursement, n&#39;hésitez pas à <a href="/contact">nous contacter</a>. Notre équipe de support client est
          là pour vous aider.
        </p>
      </div>
    </div>
  );
}
