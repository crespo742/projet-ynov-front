'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserReservations({ params }) {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { id } = params; // Récupère l'ID de l'utilisateur depuis les props de la page

  useEffect(() => {
    if (!id) return; // Ne fait rien si l'ID est undefined

    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/rentals/owner/${id}`);
        setReservations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
        setError('Failed to fetch reservations');
      }
    };

    fetchReservations();
  }, [id]);

  // Fonction pour capturer le paiement de la caution
  const capturePayment = async (paymentIntentId) => {
    try {
      console.log('Tentative de capture pour:', paymentIntentId); 
      const response = await axios.post('http://localhost:3001/api/rentals/capture-payment', { paymentIntentId });
      setMessage('Paiement capturé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la capture du paiement:', error.response?.data || error.message);
      setMessage('Erreur lors de la capture du paiement.');
    }
  };

  // Fonction pour annuler l'autorisation de paiement de la caution
  const cancelPayment = async (paymentIntentId) => {
    try {
      console.log('Tentative d\'annulation pour:', paymentIntentId); 
      const response = await axios.post('http://localhost:3001/api/rentals/cancel-payment', { paymentIntentId });
      setMessage('Autorisation annulée avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'annulation de l\'autorisation:', error.response?.data || error.message);
      setMessage('Erreur lors de l\'annulation de l\'autorisation.');
    }
  };

  // Fonction pour rembourser la caution
  const refundDeposit = async (paymentSessionId, deposit) => {
    try {
      console.log('Tentative de remboursement pour la caution:', paymentSessionId);
      const response = await axios.post('http://localhost:3001/api/payments/refund-deposit', {
        paymentSessionId,
        deposit,
      });
      setMessage('Caution remboursée avec succès.');
    } catch (error) {
      console.error('Erreur lors du remboursement de la caution:', error.response?.data || error.message);
      setMessage('Erreur lors du remboursement de la caution.');
    }
  };

  return (
    <div>
      <h1>Mes Réservations</h1>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id}>
              <h2>Moto: {reservation.motoAdId ? reservation.motoAdId.title : 'Non spécifiée'}</h2>
              <p>Du {new Date(reservation.startDate).toLocaleDateString()} au {new Date(reservation.endDate).toLocaleDateString()}</p>
              <p>Montant: {reservation.amount} €</p>
              <p>Caution: {reservation.deposit} €</p>
              {reservation.paymentIntentId && (
                <>
                  <button onClick={() => cancelPayment(reservation.paymentIntentId)}>Annuler la caution</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune réservation trouvée.</p>
      )}
    </div>
  );
}
