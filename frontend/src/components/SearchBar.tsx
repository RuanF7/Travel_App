import React, { useState, useEffect } from 'react';
import { searchCountries, Country } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (term: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearch.trim().length > 0) {
      searchCountries(debouncedSearch)
        .then(res => {
          setSuggestions(res.data);
        })
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSuggestions([]);
  };

  const handleSelectSuggestion = (country: Country) => {
    setSearchTerm(country.name);
    onSearch(country.name);
    setSuggestions([]);
  };

  return (
    <div className="mb-6 relative">
      <form onSubmit={handleSubmit}>
        <div className="flex shadow-lg rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar um país..."
            className="flex-1 px-4 py-3 bg-primary-darkgray text-primary-white border-none focus:outline-none focus:ring-2 focus:ring-primary-orange placeholder-primary-lightgray"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-primary-orange to-orange-600 text-primary-white font-medium hover:from-orange-600 hover:to-primary-orange disabled:opacity-50 transition-all duration-300"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Buscando...
              </span>
            ) : (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                Buscar
              </span>
            )}
          </button>
        </div>
      </form>
      
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-primary-darkgray border border-primary-orange rounded-md mt-1 w-full max-h-60 overflow-y-auto shadow-xl">
          {suggestions.map((country) => (
            <li
              key={country.country_code}
              onClick={() => handleSelectSuggestion(country)}
              className="px-4 py-3 cursor-pointer hover:bg-primary-black transition-colors border-b border-primary-darkgray last:border-b-0"
            >
              <div className="flex items-center">
                <img src={country.flag} alt={country.name} className="w-6 h-4 mr-3 object-cover shadow-sm" />
                <span className="text-primary-white">{country.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;