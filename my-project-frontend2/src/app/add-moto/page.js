'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddMoto() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
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
      if (image) {
        formData.append('image', image);
      }

      await axios.post(
        'http://localhost:3001/api/moto-ads/create',
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
        <label>Image:</label>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
        <br />
        <button type="submit">Create Ad</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
