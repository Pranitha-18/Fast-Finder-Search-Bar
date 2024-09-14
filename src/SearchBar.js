import React, { useState } from 'react';
import countriesData from './data.json';  // Import the JSON data file
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [active, setActive] = useState(false);  // New state to toggle active class

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filteredCountries = countriesData.filter(country =>
        country.country.toLowerCase().includes(value.toLowerCase()) ||
        country.capital.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredCountries);
    } else {
      setSuggestions([]);
    }
  };

  // Handle search bar activation
  const handleSearchActivation = () => {
    setActive(true); // Activate the search bar when clicked
  };

  return (
    <div className={`search-container ${active ? 'active' : ''}`}>
      <button className="btn" onClick={handleSearchActivation}>🔍</button>  {/* Search Button */}
      <input
        type="text"
        className="input search-bar"
        placeholder="Search by country or capital..."
        value={query}
        onChange={handleInputChange}
        onClick={handleSearchActivation}  // Trigger search activation on input click
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => setQuery(item.country)}>
              {item.country} ({item.capital})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
