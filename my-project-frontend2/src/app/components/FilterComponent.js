// src/components/FilterComponent.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import LocationAutocomplete from './LocationAutocomplete';
import './FilterComponent.css'; // Import du fichier CSS

export default function FilterComponent({ setMotoAds }) {
  const [filters, setFilters] = useState({
    brand: '',
    year: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    location: '',
  });

  const [resetLocation, setResetLocation] = useState(false); 

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const fetchFilteredAds = async () => {
    try {
      const { brand, year, minPrice, maxPrice, search, location } = filters;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads/filter`, {
        params: { brand, year, minPrice, maxPrice, search, location },
      });
      setMotoAds(response.data);
    } catch (error) {
      console.error('Failed to fetch filtered ads:', error);
    }
  };

  const fetchAllMotoAds = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads`);
      setMotoAds(response.data);
    } catch (error) {
      console.error('Failed to fetch all moto ads:', error);
    }
  };

  const resetFilters = () => {
    setFilters({
      brand: '',
      year: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      location: '',
    });
    setResetLocation(true); 
    fetchAllMotoAds();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchFilteredAds();
    }
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleInputChange}
        placeholder="Rechercher par titre"
        onKeyDown={handleKeyPress}
        className="filter-input"
      />
      <input
        type="text"
        name="brand"
        value={filters.brand}
        onChange={handleInputChange}
        placeholder="Filtrer par marque"
        onKeyDown={handleKeyPress}
        className="filter-input"
      />
      <input
        type="number"
        name="year"
        value={filters.year}
        onChange={handleInputChange}
        placeholder="Filtrer par année"
        onKeyDown={handleKeyPress}
        className="filter-input"
      />
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleInputChange}
        placeholder="Prix min"
        onKeyDown={handleKeyPress}
        className="filter-input"
      />
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleInputChange}
        placeholder="Prix max"
        onKeyDown={handleKeyPress}
        className="filter-input"
      />

      <LocationAutocomplete
        onSelectLocation={(location) => setFilters({ ...filters, location })}
        resetLocation={resetLocation}
      />
      <div>
        <button onClick={fetchFilteredAds} className="filter-button">Appliquer les filtres</button>
        <button onClick={resetFilters} className="filter-button reset-button">Réinitialiser les filtres</button>
      </div>

    </div>
  );
}
