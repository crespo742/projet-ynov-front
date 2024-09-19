'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LocationAutocomplete from '../components/LocationAutocomplete';
import './AddMoto.css';

export default function AddMoto() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([null, null, null]); // Pour les 3 images
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');

    if (!token) {
      router.push('/login');
      return;
    }
  }, [router]);

  // Fonction pour gérer les changements d'image
  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0];
    setImages(newImages);
  };

  const handleImageClick = (index) => {
    document.getElementById(`image-input-${index}`).click(); // Simuler le clic sur l'input file
  };

  // Validation pour n'accepter que des chiffres dans les champs Year, Mileage et PricePerDay
  const handleNumericChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Vérifier que la valeur contient uniquement des chiffres
      setter(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('x-auth-token');

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('pricePerDay', pricePerDay);
      formData.append('brand', brand);
      formData.append('model', model);
      formData.append('year', year);
      formData.append('mileage', mileage);
      formData.append('location', location);

      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads/create`,
        formData,
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('Annonce créée avec succès !');
      router.push('/');
    } catch (error) {
      setMessage('Échec de la création de l\'annonce. Veuillez réessayer.');
    }
  };

  return (
    <div className="add-moto-container">
      <h1 className="page-title">Ajouter une nouvelle annonce de moto</h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit} className="add-moto-form">
        <label>Titre:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-field"
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="textarea-field"
        />

        <label>Prix par jour (€):</label>
        <input
          type="text"
          value={pricePerDay}
          onChange={handleNumericChange(setPricePerDay)} // Utilisation de la validation pour chiffres uniquement
          required
          className="input-field"
        />

        <label>Marque:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
          className="input-field"
        />

        <label>Modèle:</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
          className="input-field"
        />

        <label>Année:</label>
        <input
          type="text"
          value={year}
          onChange={handleNumericChange(setYear)} // Validation pour chiffres uniquement
          required
          className="input-field"
        />

        <label>Kilométrage:</label>
        <input
          type="text"
          value={mileage}
          onChange={handleNumericChange(setMileage)} // Validation pour chiffres uniquement
          required
          className="input-field"
        />

        <div className="image-upload-section">
          <label>Images:</label>
          <div className="image-inputs">
            {[0, 1, 2].map((index) => (
              <div key={index} className="image-upload-wrapper" onClick={() => handleImageClick(index)}>
                <input
                  type="file"
                  id={`image-input-${index}`}
                  name={`image${index + 1}`}
                  onChange={(e) => handleImageChange(index, e)}
                  accept="image/*"
                  className="input-file"
                />
                {images[index] ? (
                  <img
                    src={URL.createObjectURL(images[index])}
                    alt={`Image preview ${index + 1}`}
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
          <LocationAutocomplete onSelectLocation={setLocation} />
        </div>

        <button type="submit" className="submit-button">Créer l'annonce</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
