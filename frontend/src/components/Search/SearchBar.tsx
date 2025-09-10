import React, { useState, useEffect } from 'react';
import { Country, searchCountries } from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';
import SearchInput from './SearchInput';
import SearchSuggestions from './SearchSuggestions';

interface SearchBarProps {
  onSearch: (term: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      searchCountries(debouncedSearch)
        .then(res => setSuggestions(res.data))
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);

  const handleSelectSuggestion = (country: Country) => {
    setSearchTerm(country.name);
    onSearch(country.name);
    setSuggestions([]);
  };

  const handleSubmit = () => {
    onSearch(searchTerm);
    setSuggestions([]);
  };

  return (
    <div className="mb-6 relative">
      <SearchInput value={searchTerm} onChange={setSearchTerm} onSubmit={handleSubmit} loading={loading} />
      <SearchSuggestions suggestions={suggestions} onSelect={handleSelectSuggestion} />
    </div>
  );
};

export default SearchBar;
