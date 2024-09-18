'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Utilisation de Link pour la navigation
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function MotoAdPage({ params }) {
  const [motoAd, setMotoAd] = useState(null);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [message, setMessage] = useState('');
  const [unavailableDates, setUnavailableDates] = useState([]);
  const { id } = params;
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour vérifier si l'utilisateur est connecté

  // Récupérer les informations de l'annonce de moto
  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');

    if (token) {
      setIsLoggedIn(true); // Si un token est trouvé, l'utilisateur est connecté
    } else {
      setIsLoggedIn(false); // Sinon, l'utilisateur n'est pas connecté
    }

    if (id) {
      const fetchMotoAd = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads/${id}`);
          setMotoAd(response.data);

          // Récupérer les dates réservées et les stocker
          const reservedDates = response.data.reservedDates.flatMap((date) => {
            const dates = [];
            let currentDate = new Date(date.startDate);
            const endDate = new Date(date.endDate);

            while (currentDate <= endDate) {
              dates.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates;
          });

          setUnavailableDates(reservedDates);
        } catch (error) {
          setError('Failed to fetch the ad');
        }
      };

      fetchMotoAd();
    }
  }, [id]);

  const handleRent = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payment/create-rental-checkout-session`,
        {
          motoAdId: id,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        }
      );

      // Redirige vers la page de paiement Stripe
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      setMessage('Ces dates sont déjà réservées.');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!motoAd) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{motoAd.title}</h1>
      {motoAd.image && motoAd.image.length > 0 && (
        <img src={motoAd.image[0]} alt={motoAd.title} style={{ maxWidth: '400px', maxHeight: '300px' }} />
      )}
      <p>{motoAd.description}</p>
      <p>Price: {motoAd.pricePerDay} € / jour</p>
      <p>Brand: {motoAd.brand}</p>
      <p>Model: {motoAd.model}</p>
      <p>Year: {motoAd.year}</p>
      <p>Mileage: {motoAd.mileage} km</p>
      <p>Seller: {motoAd.user.name}</p>
      <p>Contact: {motoAd.user.email}</p>
      <p>Location: {motoAd.location}</p>

      {/* <label>Start Date:</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        excludeDates={unavailableDates} // Exclure les dates réservées
        minDate={new Date()} // Exclure les jours passés
      />
      <br />
      <label>End Date:</label>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        excludeDates={unavailableDates} // Exclure les dates réservées
        minDate={new Date()} // Exclure les jours passés
      />
      <br />
      <button onClick={handleRent}>Louer</button>
      {message && <p>{message}</p>} */}

      {/* Ajout de la vérification lors de la sélection d'une date */}
      <label>Start Date:</label>
      <DatePicker
        selected={startDate}
        onFocus={() => {
          const token = localStorage.getItem('x-auth-token');
          if (!token) {
            window.location.href = '/login'; // Redirige vers la page de login si l'utilisateur n'est pas connecté
          }
        }}
        onChange={(date) => setStartDate(date)}
        excludeDates={unavailableDates} // Exclure les dates réservées
        minDate={new Date()} // Exclure les jours passés
      />
      <br />
      <label>End Date:</label>
      <DatePicker
        selected={endDate}
        onFocus={() => {
          const token = localStorage.getItem('x-auth-token');
          if (!token) {
            window.location.href = '/login'; // Redirige vers la page de login si l'utilisateur n'est pas connecté
          }
        }}
        onChange={(date) => setEndDate(date)}
        excludeDates={unavailableDates} // Exclure les dates réservées
        minDate={new Date()} // Exclure les jours passés
      />
      <br />
      <button
        onClick={() => {
          const token = localStorage.getItem('x-auth-token');
          if (!token) {
            window.location.href = '/login'; // Redirige vers la page de login si l'utilisateur n'est pas connecté
          } else {
            handleRent(); // Continue l'opération si l'utilisateur est connecté
          }
        }}
      >
        Louer
      </button>
      {message && <p>{message}</p>}

      {/* Vérification si l'utilisateur est connecté avant de proposer le lien pour envoyer un message */}
      {isLoggedIn ? (
        <Link href={`/chat/${motoAd.user._id}`}>
          <button>Send Message</button>
        </Link>
      ) : (
        <Link href="/login">
          <button>Login to Send Message</button>
        </Link>
      )}
    </div>
  );
}
