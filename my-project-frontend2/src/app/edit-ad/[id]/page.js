'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LocationAutocomplete from '../../components/LocationAutocomplete'; // Import du composant d'autocomplétion

export default function EditMotoAd({ params }) {
  const { id } = params;
  const [ad, setAd] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pricePerDay: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    location: ''
  });

  const router = useRouter();

  useEffect(() => {
    const fetchAd = async () => {
      const token = localStorage.getItem('x-auth-token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setAd(response.data);
      setFormData({
        title: response.data.title,
        description: response.data.description,
        pricePerDay: response.data.pricePerDay,
        brand: response.data.brand,
        model: response.data.model,
        year: response.data.year,
        mileage: response.data.mileage,
        location: response.data.location
      });
    };
    fetchAd();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('x-auth-token');
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads/${id}`, formData, {
        headers: { 'x-auth-token': token }
      });
      router.push('/profile'); // Redirige vers le profil après la mise à jour
    } catch (error) {
      console.error('Failed to update ad', error);
    }
  };

  const handleLocationSelect = (location) => {
    setFormData({ ...formData, location }); // Mettre à jour la localisation sélectionnée
  };

  return (
    <div>
      <h1>Edit Moto Ad</h1>
      {ad ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
            required
          />
          <br />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description"
            required
          />
          <br />
          <input
            type="number"
            value={formData.pricePerDay}
            onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
            placeholder="Price per day"
            required
          />
          <br />
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            placeholder="Brand"
            required
          />
          <br />
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            placeholder="Model"
            required
          />
          <br />
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            placeholder="Year"
            required
          />
          <br />
          <input
            type="number"
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
            placeholder="Mileage"
            required
          />
          <br />

          {/* Champ de localisation avec l'autocomplétion */}
          <LocationAutocomplete onSelectLocation={handleLocationSelect} />

          <br />
          <button type="submit">Update Ad</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
