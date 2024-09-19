// src/components/LocationAutocomplete.js
'use client';

import { useState, useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import './FilterComponent.css'; // Import du fichier CSS

export default function LocationAutocomplete({ onSelectLocation, resetLocation }) {
  const [inputValue, setInputValue] = useState('');
  const { suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      types: ['(cities)'],
      componentRestrictions: { country: 'fr' },
    },
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
    setInputValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false);
    setInputValue(description);
    clearSuggestions();
    onSelectLocation(description);
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)} className="autocomplete-suggestion">
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  useEffect(() => {
    if (resetLocation) {
      setInputValue(''); // Clear the input field
      setValue(''); // Reset the internal value of the autocomplete
    }
  }, [resetLocation]);

  return (
    <div ref={ref} className="autocomplete-container">
      <input
        value={inputValue}
        onChange={handleInput}
        placeholder="Enter a city"
        className="filter-input" // Appliquer le style des inputs
      />
      {status === 'OK' && <ul className="autocomplete-suggestions">{renderSuggestions()}</ul>}
    </div>
  );
}
