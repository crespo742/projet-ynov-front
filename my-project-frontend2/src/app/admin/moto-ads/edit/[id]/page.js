'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LocationAutocomplete from '../../../../components/LocationAutocomplete'; // Importer le composant

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
    location: '' // Location handled through autocomplete
  });

  const router = useRouter();

  // Récupérer l'annonce moto à partir de l'ID
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get(`http://localhost:3001/api/moto-ads/${id}`, {
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
      } catch (error) {
        console.error('Failed to fetch ad', error);
      }
    };
    fetchAd();
  }, [id]);

  // Gérer le changement de formulaire
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mettre à jour la localisation
  const handleLocationSelect = (location) => {
    setFormData({ ...formData, location });
  };

  // Soumettre la modification
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('x-auth-token');
      await axios.put(`http://localhost:3001/api/admin/moto-ads/${id}`, formData, {
        headers: { 'x-auth-token': token }
      });
      alert('Ad updated successfully');
      router.push('/admin/moto-ads'); // Redirection vers la liste des annonces
    } catch (error) {
      console.error('Failed to update ad', error);
      alert('Failed to update ad');
    }
  };

  return (
    <div>
      <h1>Edit Moto Ad</h1>
      {ad ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
            />
          </div>
          <div>
            <label>Price Per Day (€):</label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleInputChange}
              placeholder="Price per day"
              required
            />
          </div>
          <div>
            <label>Brand:</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              placeholder="Brand"
              required
            />
          </div>
          <div>
            <label>Model:</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="Model"
              required
            />
          </div>
          <div>
            <label>Year:</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              placeholder="Year"
              required
            />
          </div>
          <div>
            <label>Mileage (km):</label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleInputChange}
              placeholder="Mileage"
              required
            />
          </div>

          {/* Utiliser le composant LocationAutocomplete pour la localisation */}
          <div>
            <label>Location:</label>
            <LocationAutocomplete onSelectLocation={handleLocationSelect} />
          </div>

          <button type="submit">Update Ad</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
