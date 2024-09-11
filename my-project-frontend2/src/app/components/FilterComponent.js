'use client';

import { useState } from 'react';
import axios from 'axios';

export default function FilterComponent({ setMotoAds }) {
  const [filters, setFilters] = useState({
    brand: '',
    year: '',
    minPrice: '',
    maxPrice: '',
    search: '',
  });

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const fetchFilteredAds = async () => {
    try {
      const { brand, year, minPrice, maxPrice, search } = filters;
      const response = await axios.get('http://localhost:3001/api/moto-ads/filter', {
        params: { brand, year, minPrice, maxPrice, search },
      });
      setMotoAds(response.data);  // Met à jour les annonces filtrées dans le parent
    } catch (error) {
      console.error('Failed to fetch filtered ads:', error);
    }
  };

  // Gère l'événement "Enter" pour déclencher les filtres
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchFilteredAds();
    }
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}  // Déclenche le filtre avec la touche Entrée
        placeholder="Search by title"
      />
      <input
        type="text"
        name="brand"
        value={filters.brand}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Filter by brand"
      />
      <input
        type="number"
        name="year"
        value={filters.year}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Filter by year"
      />
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Min price"
      />
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Max price"
      />
      <button onClick={fetchFilteredAds}>Apply Filters</button>
    </div>
  );
}
