'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './MotoAdPage.css';

export default function MotoAdPage({ params }) {
  const [motoAd, setMotoAd] = useState(null);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [message, setMessage] = useState('');
  const [unavailableDates, setUnavailableDates] = useState([]);
  const { id } = params;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRentButton, setShowRentButton] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setIsLoggedIn(true);
      setCurrentUserId(JSON.parse(user).id);
    } else {
      setIsLoggedIn(false);
    }

    if (id) {
      const fetchMotoAd = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads/${id}`);
          setMotoAd(response.data);

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

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null); // Reset end date when selecting a new start date
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setShowRentButton(true); // Show the rent button only when valid dates are selected
  };

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
    <div className="moto-ad-container">
      <h1 className="moto-title">{motoAd.title}</h1>
      <div className="moto-ad-images">
        {motoAd.image && motoAd.image.length > 0 && (
          <div className="image-grid">
            {motoAd.image.slice(0, 3).map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`${motoAd.title} - ${index + 1}`}
                className="moto-image"
              />
            ))}
          </div>
        )}
      </div>

      <div className="moto-ad-details">
        <p className="moto-location-year">{motoAd.location} • {motoAd.year} • {motoAd.mileage} km</p>
        <p className="moto-price">{motoAd.pricePerDay} € / jour</p>

        <section className="secure-payment">
          <h2 className="section-title">Paiement sécurisé</h2>
          <p className="secure-payment-desc">Réservez ce véhicule avec paiement sécurisé pour plus de tranquillité.</p>
        </section>

        <section className="moto-criteria">
          <h2 className="section-title">Critères</h2>
          <ul className="criteria-list">
            <li>Marque: {motoAd.brand}</li>
            <li>Modèle: {motoAd.model}</li>
            <li>Year: {motoAd.year}</li>
            <li>Mileage: {motoAd.mileage}</li>
          </ul>
        </section>

        <section className="moto-description">
          <h2 className="section-title">Description</h2>
          <p>{motoAd.description}</p>
        </section>

        <div className="date-picker-section">
          <label>Date de début:</label>
          <DatePicker
            selected={startDate}
            onFocus={() => {
              const token = localStorage.getItem('x-auth-token');
              if (!token) {
                window.location.href = '/login';
              }
            }}
            onChange={handleStartDateChange}
            excludeDates={unavailableDates}
            minDate={new Date()}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <br />
          <label>Date de fin:</label>
          <DatePicker
            selected={endDate}
            onFocus={() => {
              const token = localStorage.getItem('x-auth-token');
              if (!token) {
                window.location.href = '/login';
              }
            }}
            onChange={handleEndDateChange}
            excludeDates={unavailableDates}
            minDate={startDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
          />
        </div>

        <p>{motoAd.description}</p>
        <p>Price: {motoAd.pricePerDay} € / jour</p>
        <p>Brand: {motoAd.brand}</p>
        <p>Model: {motoAd.model}</p>
        <p>Year: {motoAd.year}</p>
        <p>Mileage: {motoAd.mileage} km</p>
        {/* Lien vers le profil de l'utilisateur qui a posté l'annonce */}
        <p>Seller: <Link href={`/user/${motoAd.user._id}`}>{motoAd.user.name}</Link></p>
        <p>Contact: {motoAd.user.email}</p>
        <p>Location: {motoAd.location}</p>

        {/* Empêcher l'utilisateur de louer sa propre moto */}
        {
          isLoggedIn && currentUserId !== motoAd.user._id ? (
            <>
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
              <button className="rent-button" onClick={handleRent}>Louer</button>
              <br />
              <Link href={`/chat/${motoAd.user._id}`}>
                <button className="send-message-button">Envoyer un message</button>
              </Link>
            </>
          ) : !isLoggedIn ? (
            <Link href="/login">
              <button className="login-button">Se connecter pour envoyer un message</button>
            </Link>
          ) : null
        }

        {message && <p>{message}</p>}
      </div >
    </div >
  );
}
