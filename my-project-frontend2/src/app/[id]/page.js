'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function MotoAdPage({ params }) {
  const [motoAd, setMotoAd] = useState(null);
  const [error, setError] = useState('');
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchMotoAd = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/moto-ads/${id}`);
          setMotoAd(response.data);
        } catch (error) {
          setError('Failed to fetch the ad');
        }
      };

      fetchMotoAd();
    }
  }, [id]);

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
      <p>Price: ${motoAd.price}</p>
      <p>Brand: {motoAd.brand}</p>
      <p>Model: {motoAd.model}</p>
      <p>Year: {motoAd.year}</p>
      <p>Mileage: {motoAd.mileage} km</p>
      <p>Seller: {motoAd.user.name}</p>
      <p>Contact: {motoAd.user.email}</p>

      <Link href={`/chat/${motoAd.user._id}`}>
        <button>Send Message</button>
      </Link>

    </div>
  );
}
