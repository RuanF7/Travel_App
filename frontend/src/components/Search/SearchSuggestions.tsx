import React from 'react';
import { Country } from '../../services/api';

interface SearchSuggestionsProps {
  suggestions: Country[];
  onSelect: (country: Country) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, onSelect }) => {
  if (suggestions.length === 0) return null;

  return (
    <ul className="absolute z-10 bg-primary-darkgray border border-primary-orange rounded-md mt-1 w-full max-h-60 overflow-y-auto shadow-xl">
      {suggestions.map((country) => (
        <li
          key={country.country_code}
          onClick={() => onSelect(country)}
          className="px-4 py-3 cursor-pointer hover:bg-primary-black transition-colors border-b border-primary-darkgray last:border-b-0"
        >
          <div className="flex items-center">
            <img src={country.flag} alt={country.name} className="w-6 h-4 mr-3 object-cover shadow-sm" />
            <span className="text-primary-white">{country.name}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestions;
