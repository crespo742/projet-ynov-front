'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import './userReservations.css'; // Import du fichier CSS

export default function UserReservations({ params }) {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { id } = params;

  useEffect(() => {
    if (!id) return;

    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/rentals/owner/${id}`);
        setReservations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
        setError('Échec de la récupération des réservations');
      }
    };

    fetchReservations();
  }, [id]);

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
    <div className="reservations-wrapper">
      <div className="reservations-header">
        <h1 className="reservations-title">Mes Locations</h1>
        {message && <p className="reservations-message">{message}</p>}
        {error && <p className="reservations-error">{error}</p>}
      </div>

      {reservations.length > 0 ? (
        <div className="reservations-list">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="reservation-card">
              <div className="reservation-header">
                <h2 className="reservation-moto">{reservation.motoAdId ? reservation.motoAdId.title : 'Moto non spécifiée'}</h2>
              </div>
              <div className="reservation-details">
                <p className="reservation-dates">
                  Du <span>{new Date(reservation.startDate).toLocaleDateString()}</span> au <span>{new Date(reservation.endDate).toLocaleDateString()}</span>
                </p>
                <p className="reservation-amount"><strong>Montant:</strong> {reservation.amount} €</p>
                <p className="reservation-deposit"><strong>Caution:</strong> {reservation.deposit} €</p>
                {reservation.paymentIntentId && (
                  <div className="reservation-actions">
                    <button className="action-button cancel" onClick={() => cancelPayment(reservation.paymentIntentId)}>Annuler la caution</button>
                    <button className="action-button capture">Envoyer un message</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-reservations">Aucune location trouvée.</p>
      )}
    </div>
  );
}
