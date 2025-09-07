import React, { useState } from 'react';
import { useCountries } from './hooks/useCountries';
import SearchBar from './components/SearchBar';
import CountryCard from './components/CountryCard';
import CountryList from './components/CountryList';
import { Country } from './services/api';

function App() {
  const {
    searchResults,
    visitedCountries,
    wishlistCountries,
    loading,
    error,
    handleSearch,
    addToVisited,
    addToWishlist,
    removeFromVisited,
    removeFromWishlist,
  } = useCountries();

  const [notification, setNotification] = useState<{ message: string; type: string }>({ message: '', type: '' });

  const showNotification = (message: string, type: string = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleAddToVisited = async (country: Country) => {
    const result = await addToVisited(country);
    if (result.success) {
      showNotification(`${country.name} added to visited countries!`, 'success');
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleAddToWishlist = async (country: Country) => {
    const result = await addToWishlist(country);
    if (result.success) {
      showNotification(`${country.name} added to wishlist!`, 'success');
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleRemoveFromVisited = async (countryCode: string) => {
    const result = await removeFromVisited(countryCode);
    if (result.success) {
      showNotification('Country removed from visited list', 'success');
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleRemoveFromWishlist = async (countryCode: string) => {
    const result = await removeFromWishlist(countryCode);
    if (result.success) {
      showNotification('Country removed from wishlist', 'success');
    } else {
      showNotification(result.message, 'error');
    }
  };

  const isInList = (listType: 'visited' | 'wishlist', countryCode: string) => {
    if (listType === 'visited') {
      return visitedCountries.some(country => country.country_code === countryCode);
    }
    return wishlistCountries.some(country => country.country_code === countryCode);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">🌍 Countries Manager</h1>
        
        {notification.message && (
          <div className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-md ${
            notification.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {notification.message}
          </div>
        )}
        
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {searchResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-xl font-semibold mb-3">Search Results</h2>
            <div className="grid grid-cols-1 gap-4">
              {searchResults.map(country => (
                <CountryCard
                  key={country.country_code}
                  country={country}
                  onAddToVisited={handleAddToVisited}
                  onAddToWishlist={handleAddToWishlist}
                  isInList={isInList}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CountryList
            countries={visitedCountries}
            title="Visited Countries"
            onRemove={handleRemoveFromVisited}
            listType="visited"
          />
          
          <CountryList
            countries={wishlistCountries}
            title="Wishlist Countries"
            onRemove={handleRemoveFromWishlist}
            listType="wishlist"
          />
        </div>
      </div>
    </div>
  );
}

export default App;