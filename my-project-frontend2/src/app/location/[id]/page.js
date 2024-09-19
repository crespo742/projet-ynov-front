"use client"; // Nécessaire pour utiliser les hooks React

import { useState, useEffect } from 'react';
import axios from 'axios';
import './userReservations.css'; // Import du fichier CSS
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link pour redirection

export default function UserReservations({ params }) {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [refundAmounts, setRefundAmounts] = useState({}); // Associer chaque réservation avec son propre montant de remboursement
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');

    // Vérifier si l'utilisateur est connecté, sinon rediriger vers la page de login
    if (!token) {
      router.push('/login');
      return; // On arrête l'exécution de l'effet
    }
  }, [router]);

  useEffect(() => {
    if (!id) return;

    const fetchReservations = async () => {
      const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké dans localStorage

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rentals/owner/${id}`, {
          headers: {
            'x-auth-token': token, // Envoyer le token pour authentification
          },
        });
        setReservations(response.data);
        console.log('response.data', response.data); // Affiche les données reçues
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
        setError('Échec de la récupération des réservations');
      }
    };

    fetchReservations();
  }, [id]);

  const handleRefund = async (sessionId, maxRefund) => {
    const token = localStorage.getItem('token'); // Récupérer le token JWT

    try {
      const amountToRefund = refundAmounts[sessionId]; // On récupère le montant correspondant à cette sessionId

      if (!amountToRefund || amountToRefund > maxRefund || amountToRefund <= 0) {
        setMessage(`Le montant doit être inférieur ou égal à ${maxRefund} € et supérieur à 0 €.`);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payment/refund-deposit`,
        {
          sessionId,
          refundAmount: amountToRefund,
        },
        {
          headers: {
            'x-auth-token': token, // Envoi du token JWT
          }
        }
      );

      setMessage('Remboursement effectué avec succès.');
    } catch (error) {
      console.error('Erreur lors du remboursement:', error.response?.data || error.message);
      setMessage('Erreur lors du remboursement.');
    }
  };

  const handleRefundAmountChange = (e, sessionId) => {
    const value = e.target.value;
    setRefundAmounts(prev => ({
      ...prev,
      [sessionId]: value, // Associer le montant de remboursement à la sessionId spécifique
    }));
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
                <p className="reservation-amount"><strong>Montant total payé:</strong> {reservation.amount + reservation.deposit} €</p>
                <p className="reservation-deposit"><strong>Caution:</strong> {reservation.deposit} €</p>
                {reservation.paymentIntentId && (
                  <div className="reservation-actions">
                    <button className="action-button cancel" onClick={() => cancelPayment(reservation.paymentIntentId)}>Annuler la caution</button>

                    {/* Bouton pour envoyer un message à l'utilisateur qui a réservé */}
                    {reservation.userId && (
                      <Link href={`/chat/${reservation.userId}`}>
                        <button className="action-button capture">Envoyer un message</button>
                      </Link>
                    )}
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
