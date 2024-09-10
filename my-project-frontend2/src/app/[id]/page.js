'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function MotoAdPage({ params }) {
  const [motoAd, setMotoAd] = useState(null);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [message, setMessage] = useState('');
  const [unavailableDates, setUnavailableDates] = useState([]); // State pour les dates indisponibles
  const { id } = params;

  // Récupérer les informations de l'annonce de moto
  useEffect(() => {
    if (id) {
      const fetchMotoAd = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/moto-ads/${id}`);
          setMotoAd(response.data);
          // Récupérer les dates réservées et les stocker
          const reservedDates = response.data.reservedDates.map((date) => ({
            start: new Date(date.startDate),
            end: new Date(date.endDate),
          }));
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
        'http://localhost:3001/api/payment/create-rental-checkout-session',
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
      <p>Price: ${motoAd.pricePerDay} per day</p>
      <p>Brand: {motoAd.brand}</p>
      <p>Model: {motoAd.model}</p>
      <p>Year: {motoAd.year}</p>
      <p>Mileage: {motoAd.mileage} km</p>
      <p>Seller: {motoAd.user.name}</p>
      <p>Contact: {motoAd.user.email}</p>

      <label>Start Date:</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        excludeDateIntervals={unavailableDates} // Exclure les plages de dates réservées
      />
      <br />
      <label>End Date:</label>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        excludeDateIntervals={unavailableDates} // Exclure les plages de dates réservées
      />
      <br />
      <button onClick={handleRent}>Louer</button>
      {message && <p>{message}</p>}

      <Link href={`/chat/${motoAd.user._id}`}>
        <button>Send Message</button>
      </Link>
    </div>
  );
}
