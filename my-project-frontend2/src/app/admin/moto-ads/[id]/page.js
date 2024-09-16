'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function MotoAdDetail({ params }) {
  const { id } = params; // Récupération de l'ID de l'annonce à partir des paramètres
  const [ad, setAd] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMotoAd = async () => {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get(`http://localhost:3001/api/moto-ads/${id}`, {
          headers: { 'x-auth-token': token }
        });
        setAd(response.data);
      } catch (error) {
        setError('Failed to fetch moto ad');
      }
    };

    fetchMotoAd();
  }, [id]);

  console.log('test', ad);
  

  return (
    <div>
      <h1>Moto Ad Details</h1>
      {error && <p>{error}</p>}
      {ad ? (
        <div>
          <h2>{ad.title}</h2>
          {ad.image && ad.image.length > 0 && (
            <img
              src={ad.image[0]}
              alt={ad.title}
              style={{ maxWidth: '100%', height: '400px', marginBottom: '20px' }}
            />
          )}
          <p><strong>Description:</strong> {ad.description}</p>
          <p><strong>Price per day:</strong> {ad.pricePerDay} €</p>
          <p><strong>Brand:</strong> {ad.brand}</p>
          <p><strong>Model:</strong> {ad.model}</p>
          <p><strong>Year:</strong> {ad.year}</p>
          <p><strong>Mileage:</strong> {ad.mileage} km</p>
          <p><strong>Location:</strong> {ad.location}</p>
          <p><strong>Posted by:</strong> {ad.user?.name || 'Unknown'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
