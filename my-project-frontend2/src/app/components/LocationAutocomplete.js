'use client';

import { useState, useEffect, useRef } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';

export default function LocationAutocomplete({ onSelectLocation }) {
  const [inputValue, setInputValue] = useState('');
  const { suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      types: ['(cities)'], // Limiter la recherche aux villes
      componentRestrictions: { country: 'fr' } // Limite à la France
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

    // Appeler la fonction onSelectLocation passée en prop
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

  // Fonction pour charger le script Google Maps s'il n'est pas déjà chargé
  const loadGoogleMapsScript = () => {
    if (typeof window !== 'undefined' && !window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log('Google Maps script loaded successfully');
      };
    }
  };

  useEffect(() => {
    if (!window.google) {
      loadGoogleMapsScript(); // Charger le script Google Maps à l'initialisation uniquement s'il n'est pas déjà chargé
    }
  }, []);

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
