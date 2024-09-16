'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import './clientReservations.css'; // Import du fichier CSS

export default function ClientReservations({ params }) {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { id } = params;

  useEffect(() => {
    if (!id) return;

    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/rentals/user/${id}`);
        setReservations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
        setError('Failed to fetch reservations');
      }
    };

    fetchReservations();
  }, [id]);

  return (
    <div className="reservations-container">
      <h1 className="reservations-title">Mes Réservations</h1>
      {message && <p className="reservations-message">{message}</p>}
      {error && <p className="reservations-error">{error}</p>}
      {reservations.length > 0 ? (
        <ul className="reservations-list">
          {reservations.map((reservation) => (
            <li key={reservation._id} className="reservation-item">
              <div className="reservation-card">
                <h2 className="reservation-moto">Moto: {reservation.motoAdId ? reservation.motoAdId.title : 'Non spécifiée'}</h2>
                <p className="reservation-dates">Du {new Date(reservation.startDate).toLocaleDateString()} au {new Date(reservation.endDate).toLocaleDateString()}</p>
                <p className="reservation-amount">Montant: {reservation.amount} €</p>
                <p className="reservation-deposit">Caution: {reservation.deposit} €</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-reservations">Aucune réservation trouvée.</p>
      )}
    </div>
  );
}
