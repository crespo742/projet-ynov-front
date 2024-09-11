'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import FilterComponent from './components/FilterComponent';

export default function Home() {
  const [motoAds, setMotoAds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMotoAds = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/moto-ads');
        setMotoAds(response.data);
      } catch (error) {
        setError('Failed to fetch moto ads');
      }
    };

    fetchMotoAds();
  }, []);

  return (
    <div>
      <h1>All Moto Ads</h1>

      <FilterComponent setMotoAds={setMotoAds} />

      <Link href={'/chat'}>
        <p>lien vers le chat</p>
      </Link>

      {error && <p>{error}</p>}
      <ul>
        {motoAds.map((ad) => (
          <li key={ad._id}>
            <Link href={`/${ad._id}`}>
              <div style={{ cursor: 'pointer', border: '1px solid black', padding: '10px', margin: '10px 0' }}>
                <h2>{ad.title}</h2>
                {ad.image && ad.image.length > 0 && (
                  <img
                    src={ad.image[0]}
                    alt={ad.title}
                    style={{ maxWidth: '100%', height: '300px', marginBottom: '10px' }}
                  />
                )}
                <p>{ad.description}</p>
                <p>PricePerDay: ${ad.pricePerDay}</p>
                <p>Brand: {ad.brand}</p>
                <p>Model: {ad.model}</p>
                <p>Year: {ad.year}</p>
                <p>Mileage: {ad.mileage} km</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
