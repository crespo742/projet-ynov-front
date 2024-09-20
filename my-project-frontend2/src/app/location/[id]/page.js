'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import './locationRentals.css'; // Nouveau fichier CSS adapté
import Link from 'next/link';

export default function UserRentals({ params }) {
  const [rentals, setRentals] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [refundAmounts, setRefundAmounts] = useState({});
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    const fetchRentals = async () => {
      const token = localStorage.getItem('x-auth-token');

      if (!token) {
        setError('Token non disponible. Veuillez vous connecter.');
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rentals/owner/${id}`, {
          headers: { 'x-auth-token': token },
        });

        const rentalsWithUserDetails = await Promise.all(
          response.data.map(async (rental) => {
            try {
              const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${rental.userId}`, {
                headers: { 'x-auth-token': token },
              });
              rental.userDetails = userResponse.data;
            } catch (error) {
              console.error('Erreur lors de la récupération de l\'utilisateur:', error);
              rental.userDetails = { name: 'Utilisateur inconnu' };
            }
            return rental;
          })
        );

        setRentals(rentalsWithUserDetails);
      } catch (error) {
        console.error('Erreur lors de la récupération des locations:', error);
        setError('Échec de la récupération des locations.');
      }
    };

    fetchRentals();
  }, [id]);

  const handleRefund = async (rentalId, sessionId, maxRefund) => {
    const token = localStorage.getItem('x-auth-token');

    try {
      const amountToRefund = refundAmounts[sessionId];

      if (!amountToRefund || amountToRefund > maxRefund || amountToRefund <= 0) {
        setMessage(`Le montant doit être inférieur ou égal à ${maxRefund} € et supérieur à 0 €.`);
        return;
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payment/refund-deposit`,
        { sessionId, refundAmount: amountToRefund },
        { headers: { 'x-auth-token': token } }
      );

      setMessage('Remboursement effectué avec succès.');
      deleteRental(rentalId); // Supprimer la location après remboursement

    } catch (error) {
      console.error('Erreur lors du remboursement:', error.response?.data || error.message);
      setMessage('Erreur lors du remboursement.');
    }
  };

  const handleRefundAmountChange = (e, sessionId) => {
    const value = e.target.value;
    setRefundAmounts((prev) => ({
      ...prev,
      [sessionId]: value,
    }));
  };

  const deleteRental = async (rentalId) => {
    const token = localStorage.getItem('x-auth-token');

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rentals/${rentalId}`, {
        headers: { 'x-auth-token': token },
      });
      setRentals((prevRentals) => prevRentals.filter((rental) => rental._id !== rentalId));
      setMessage('Location supprimée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression de la location:', error);
      setMessage('Erreur lors de la suppression de la location.');
    }
  };

  const handleQuickRefund = async (rentalId, sessionId) => {
    const token = localStorage.getItem('x-auth-token');

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payment/refund-deposit`,
        { sessionId, refundAmount: 1000 },
        { headers: { 'x-auth-token': token } }
      );

      setMessage('Remboursement automatique de 1000 € effectué.');
      deleteRental(rentalId); // Supprimer la location après remboursement

    } catch (error) {
      console.error('Erreur lors du remboursement automatique:', error.response?.data || error.message);
      setMessage('Erreur lors du remboursement automatique.');
    }
  };

  return (
    <div className="rentals-container">
      <h1 className="rentals-title">Mes Locations</h1>
      {message && <p className="rentals-message">{message}</p>}
      {error && <p className="rentals-error">{error}</p>}

      {rentals.length > 0 ? (
        <ul className="rentals-list">
          {rentals.map((rental) => (
            <li key={rental._id} className="rental-item">
              <div className="rental-card">
                <div className="rental-header">
                  <div className="rental-image-wrapper">
                    {rental.motoAdId && rental.motoAdId.image && (
                      <img
                        src={rental.motoAdId.image[0]}
                        alt={`${rental.motoAdId.title}`}
                        className="rental-moto-image"
                      />
                    )}
                  </div>
                  <div className="rental-details-wrapper">
                    <h2 className="rental-moto-title">{rental.motoAdId ? rental.motoAdId.title : 'Moto non spécifiée'}</h2>
                    <p className="rental-user">
                      <strong>Réservé par :</strong> {rental.userDetails ? rental.userDetails.name : 'Utilisateur inconnu'}
                    </p>
                    <p className="rental-dates">
                      Du <span>{new Date(rental.startDate).toLocaleDateString()}</span> au <span>{new Date(rental.endDate).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>

                <div className="rental-footer">
                  <p className="rental-amount"><strong>Montant location :</strong> {rental.amount} €</p>
                  <p className="rental-deposit"><strong>Caution :</strong> {rental.deposit} €</p>

                  <div className="rental-actions">
                    <input
                      type="number"
                      value={refundAmounts[rental.sessionId] || ''}
                      placeholder={`Montant à rendre en cas de problème`}
                      max={rental.deposit}
                      min="1"
                      onChange={(e) => handleRefundAmountChange(e, rental.sessionId)}
                      className="rental-refund-input"
                    />
                    <button
                      className="rental-refund-button-orange"
                      onClick={() => handleRefund(rental._id, rental.sessionId, rental.deposit)}
                    >
                      Rembourser
                    </button>
                    <button
                      className="rental-refund-button"
                      onClick={() => handleQuickRefund(rental._id, rental.sessionId)}
                    >
                      Véhicule rendu sans problème
                    </button>
                    {rental.userId && (
                      <Link href={`/chat/${rental.userId}`}>
                        <button className="rental-refund-button-message">Envoyer un message</button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-rentals">Aucune location trouvée.</p>
      )}
    </div>
  );
}
