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
        placeholder="Search by title"
        onKeyDown={handleKeyPress}
        className="filter-input"
      />
      <input
        type="text"
        name="brand"
        value={filters.brand}
        onChange={handleInputChange}
        placeholder="Filter by brand"
        onKeyDown={handleKeyPress}
        className="filter-input"
      />
      <input
        type="number"
        name="year"
        value={filters.year}
        onChange={handleInputChange}
        placeholder="Filter by year"
        onKeyDown={handleKeyPress}
        className="filter-input"
      />
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleInputChange}
        placeholder="Min price"
        onKeyDown={handleKeyPress}
        className="filter-input"
      />
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleInputChange}
        placeholder="Max price"
        onKeyDown={handleKeyPress}
        className="filter-input"
      />

      <LocationAutocomplete
        onSelectLocation={(location) => setFilters({ ...filters, location })}
        resetLocation={resetLocation}
      />
    <div>
            <button onClick={fetchFilteredAds} className="filter-button">Apply Filters</button>
      <button onClick={resetFilters} className="filter-button reset-button">Reset Filters</button>
    </div>

    </div>
  );
}
