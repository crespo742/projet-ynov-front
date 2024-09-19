'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LocationAutocomplete from '../../components/LocationAutocomplete';
import './EditMotoAd.css'; // Utiliser le même fichier CSS que la page de création

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

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

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

      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('pricePerDay', formData.pricePerDay);
      form.append('brand', formData.brand);
      form.append('model', formData.model);
      form.append('year', formData.year);
      form.append('mileage', formData.mileage);
      form.append('location', formData.location);

      if (image1) form.append('image1', image1);
      if (image2) form.append('image2', image2);
      if (image3) form.append('image3', image3);

      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads/${id}`, form, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });

      router.push('/profile'); // Redirige vers la page de profil après la mise à jour
    } catch (error) {
      console.error('Failed to update ad', error);
    }
  };

  const handleLocationSelect = (location) => {
    setFormData({ ...formData, location });
  };

  const handleImageChange = (index, event) => {
    if (index === 0) setImage1(event.target.files[0]);
    if (index === 1) setImage2(event.target.files[0]);
    if (index === 2) setImage3(event.target.files[0]);
  };

  const handleImageClick = (index) => {
    document.getElementById(`image-input-${index}`).click(); // Simuler un clic sur l'input file
  };

  return (
    <div className="add-moto-container">
      <h1 className="page-title">Modifier l'annonce de moto</h1>
      {ad ? (
        <form onSubmit={handleSubmit} className="add-moto-form">
          <label>Titre:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            required
          />

          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="textarea-field"
            required
          />

          <label>Prix par jour (€):</label>
          <input
            type="number"
            value={formData.pricePerDay}
            onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
            className="input-field"
            required
          />

          <label>Marque:</label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="input-field"
            required
          />

          <label>Modèle:</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="input-field"
            required
          />

          <label>Année:</label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="input-field"
            required
          />

          <label>Kilométrage:</label>
          <input
            type="number"
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
            className="input-field"
            required
          />

          <div className="image-upload-section">
            <label>Images:</label>
            <div className="image-inputs">
              {[image1, image2, image3].map((image, index) => (
                <div
                  key={index}
                  className="image-upload-wrapper"
                  onClick={() => handleImageClick(index)}
                >
                  <input
                    type="file"
                    id={`image-input-${index}`}
                    name={`image${index + 1}`}
                    onChange={(e) => handleImageChange(index, e)}
                    accept="image/*"
                    className="input-file"
                  />
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Aperçu image ${index + 1}`}
                      className="image-preview"
                    />
                  ) : (
                    <div className="placeholder">Ajouter une image</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <label>Localisation:</label>
          <div className="location-autocomplete">
            <LocationAutocomplete onSelectLocation={handleLocationSelect} />
          </div>

          <button type="submit" className="submit-button">Mettre à jour l'annonce</button>
        </form>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
