'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddMoto() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('x-auth-token'); // Assure-toi que l'utilisateur est connecté et a un token
      await axios.post(
        'http://localhost:3001/api/moto-ads/create',
        {
          title,
          description,
          price,
          brand,
          model,
          year,
          mileage,
        },
        {
          headers: {
            'x-auth-token': token,
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
      <form onSubmit={handleSubmit}>
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
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
        <button type="submit">Create Ad</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
