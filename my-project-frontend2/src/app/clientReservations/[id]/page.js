'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Importer Link de Next.js
import './clientReservations.css'; // Import du fichier CSS
import { useRouter } from 'next/navigation';

export default function ClientReservations({ params }) {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
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
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rentals/user/${id}`);
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
              {/* Utiliser Link pour rendre l'élément cliquable */}
              <Link href={`/${reservation.motoAdId ? reservation.motoAdId._id : ''}`} passHref>
                <div className="reservation-card">
                  <h2 className="reservation-moto">Moto: {reservation.motoAdId ? reservation.motoAdId.title : 'Non spécifiée'}</h2>
                  <p className="reservation-dates">Du {new Date(reservation.startDate).toLocaleDateString()} au {new Date(reservation.endDate).toLocaleDateString()}</p>
                  <p className="reservation-amount">Montant: {reservation.amount} €</p>
                  <p className="reservation-deposit">Caution: {reservation.deposit} €</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-reservations">Aucune réservation trouvée.</p>
      )}
    </div>
  );
}
