'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LocationAutocomplete from '../components/LocationAutocomplete'; // Import du composant

export default function AddMoto() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [location, setLocation] = useState(''); // Localisation
  const [images, setImages] = useState([null, null, null]); // Tableau pour 3 images
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');

    // Vérifier si l'utilisateur est connecté, sinon rediriger vers la page de login
    if (!token) {
      router.push('/login');
      return; // On arrête l'exécution de l'effet
    }
  }, [router]);

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0];
    setImages(newImages); // Mettez à jour l'image à l'index correct
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
      formData.append('location', location); // Ajouter la localisation

      // Ajouter les 3 images (si elles sont sélectionnées)
      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image); // Nom unique pour chaque image
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
      setMessage('Ad created successfully!');
      router.push('/');
    } catch (error) {
      setMessage('Failed to create ad. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add a New Moto Ad</h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <label>PricePerDay:</label>
        <input
          type="number"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          required
        />
        <br />
        <label>Brand:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <br />
        <label>Model:</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <br />
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <br />
        <label>Mileage:</label>
        <input
          type="number"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          required
        />
        <br />
        <label>Image 1:</label>
        <input
          type="file"
          name="images"
          onChange={(e) => handleImageChange(0, e)}
          accept="image/*"
        />
        <br />
        <label>Image 2:</label>
        <input
          type="file"
          name="images"
          onChange={(e) => handleImageChange(1, e)}
          accept="image/*"
        />
        <br />
        <label>Image 3:</label>
        <input
          type="file"
          name="images"
          onChange={(e) => handleImageChange(2, e)}
          accept="image/*"
        />
        <br />

        {/* Ajouter le champ d'autocomplétion de localisation */}
        <label>Location:</label>
        <LocationAutocomplete onSelectLocation={setLocation} />
        <br />

        <button type="submit">Create Ad</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
