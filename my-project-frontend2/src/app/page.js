'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

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
      {error && <p>{error}</p>}
      <ul>
        {motoAds.map((ad) => (
          <li key={ad._id}>
            <h2>{ad.title}</h2>
            <p>{ad.description}</p>
            <p>Price: ${ad.price}</p>
            <p>Brand: {ad.brand}</p>
            <p>Model: {ad.model}</p>
            <p>Year: {ad.year}</p>
            <p>Mileage: {ad.mileage} km</p>
          </li>
        ))}
      </ul>
    </div>
  );
}