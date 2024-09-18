// src/components/FilterComponent.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import LocationAutocomplete from './LocationAutocomplete';

export default function FilterComponent({ setMotoAds }) {
  const [filters, setFilters] = useState({
    brand: '',
    year: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    location: '',
  });
  
  const [resetLocation, setResetLocation] = useState(false); // State to reset the location input

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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moto-ads`); // Appel pour récupérer toutes les annonces
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
    setResetLocation(true); // Trigger reset for the location field

    fetchAllMotoAds(); // Récupérer toutes les annonces après réinitialisation des filtres
  };

  // Fonction pour gérer l'appui sur "Entrée"
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Empêche le comportement par défaut du formulaire
      fetchFilteredAds();  // Applique les filtres
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
        onKeyDown={handleKeyPress} // Ajoute le listener sur "Entrée"
      />
      <input
        type="text"
        name="brand"
        value={filters.brand}
        onChange={handleInputChange}
        placeholder="Filter by brand"
        onKeyDown={handleKeyPress} // Ajoute le listener sur "Entrée"
      />
      <input
        type="number"
        name="year"
        value={filters.year}
        onChange={handleInputChange}
        placeholder="Filter by year"
        onKeyDown={handleKeyPress} // Ajoute le listener sur "Entrée"
      />
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleInputChange}
        placeholder="Min price"
        onKeyDown={handleKeyPress} // Ajoute le listener sur "Entrée"
      />
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleInputChange}
        placeholder="Max price"
        onKeyDown={handleKeyPress} // Ajoute le listener sur "Entrée"
      />

      <LocationAutocomplete
        onSelectLocation={(location) => setFilters({ ...filters, location })}
        resetLocation={resetLocation} // Pass the resetLocation state to the component
      />

      <button onClick={fetchFilteredAds}>Apply Filters</button>
      <button onClick={resetFilters} style={{ marginLeft: '10px' }}>Reset Filters</button>
    </div>
  );
}
