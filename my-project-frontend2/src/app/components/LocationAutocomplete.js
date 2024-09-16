// src/components/LocationAutocomplete.js
'use client';

import { useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';

export default function LocationAutocomplete({ onSelectLocation }) {
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
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        value={inputValue}
        onChange={handleInput}
        placeholder="Enter a city"
      />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  );
}
