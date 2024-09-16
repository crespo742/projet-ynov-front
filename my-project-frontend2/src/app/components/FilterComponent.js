// src/components/FilterComponent.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import LocationAutocomplete from './LocationAutocomplete'; // Importer le composant d'autocomplétion

export default function FilterComponent({ setMotoAds }) {
  const [filters, setFilters] = useState({
    brand: '',
    year: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    location: '', // Localisation
  });

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const fetchFilteredAds = async () => {
    try {
      const { brand, year, minPrice, maxPrice, search, location } = filters;
      const response = await axios.get('http://localhost:3001/api/moto-ads/filter', {
        params: { brand, year, minPrice, maxPrice, search, location }, // Ajout de la localisation dans les filtres
      });
      setMotoAds(response.data);
    } catch (error) {
      console.error('Failed to fetch filtered ads:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleInputChange}
        placeholder="Search by title"
      />
      <input
        type="text"
        name="brand"
        value={filters.brand}
        onChange={handleInputChange}
        placeholder="Filter by brand"
      />
      <input
        type="number"
        name="year"
        value={filters.year}
        onChange={handleInputChange}
        placeholder="Filter by year"
      />
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleInputChange}
        placeholder="Min price"
      />
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleInputChange}
        placeholder="Max price"
      />

      {/* Filtre de localisation */}
      <LocationAutocomplete onSelectLocation={(location) => setFilters({ ...filters, location })} />

      <button onClick={fetchFilteredAds}>Apply Filters</button>
    </div>
  );
}
