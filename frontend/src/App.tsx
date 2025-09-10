import React, { useState } from 'react';
import { useCountries } from './hooks/useCountries';
import SearchBar from './components/Search/SearchBar';
import CountryCard from './components/Country/CountryCard';
import CountryList from './components/Country/CountryList';
import WorldMap from './components/WorldMap';
import MapStats from './components/Map/MapStats';
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

  const [activeTab, setActiveTab] = useState<'countries' | 'map'>('countries');
  const [notification, setNotification] = useState<{ message: string; type: string }>({ message: '', type: '' });

  const showNotification = (message: string, type: string = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleAddToVisited = async (country: Country) => {
    if (isInList('wishlist', country.country_code)) {
      showNotification(`${country.name} já está na lista de desejos. Remova de lá primeiro.`, 'error');
      return;
    }
    const result = await addToVisited(country);
    if (result.success) {
      showNotification(`${country.name} adicionado aos países visitados!`, 'success');
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleAddToWishlist = async (country: Country) => {
    if (isInList('visited', country.country_code)) {
      showNotification(`${country.name} já está na lista de visitados. Remova de lá primeiro.`, 'error');
      return;
    }

    const result = await addToWishlist(country);
    if (result.success) {
      showNotification(`${country.name} adicionado à lista de desejos!`, 'success');
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleRemoveFromVisited = async (countryCode: string) => {
    const result = await removeFromVisited(countryCode);
    if (result.success) {
      showNotification('País removido da lista de visitados', 'success');
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleRemoveFromWishlist = async (countryCode: string) => {
    const result = await removeFromWishlist(countryCode);
    if (result.success) {
      showNotification('País removido da lista de desejos', 'success');
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
    <div className="min-h-screen bg-primary-black py-8 font-sans">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-primary-white">
          <span className="text-primary-white">🌍</span> 
          <span className="bg-gradient-to-r from-primary-orange to-yellow-500 bg-clip-text text-transparent ml-2">
            Gerenciador de Países
          </span>
        </h1>
        <div className="flex mb-6 border-b border-primary-darkgray">
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'countries' ? 'tab-active text-primary-orange' : 'text-primary-lightgray'}`}
            onClick={() => setActiveTab('countries')}
          >
            Lista de Países
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'map' ? 'tab-active text-primary-orange' : 'text-primary-lightgray'}`}
            onClick={() => setActiveTab('map')}
          >
            Mapa Mundial
          </button>
        </div>

        {notification.message && (
          <div className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-md z-50 ${notification.type === 'error' ? 'bg-red-800 text-primary-white' : 'bg-primary-orange text-primary-white'}`}>
            {notification.message}
          </div>
        )}

        {activeTab === 'countries' ? (
          <>
            <SearchBar onSearch={handleSearch} loading={loading} />

            {error && (
              <div className="bg-red-800 border border-red-600 text-primary-white px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="bg-gradient-to-br from-primary-darkgray to-black rounded-lg shadow-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-3 text-primary-white">Resultados da Busca</h2>
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
                title="Países Visitados"
                onRemove={handleRemoveFromVisited}
                listType="visited"
              />

              <CountryList
                countries={wishlistCountries}
                title="Lista de Desejos"
                onRemove={handleRemoveFromWishlist}
                listType="wishlist"
              />
            </div>
          </>
        ) : (
          <div>
            <MapStats 
              visited={visitedCountries.length} 
              wishlist={wishlistCountries.length} 
              total={visitedCountries.length + wishlistCountries.length} 
            />
            <WorldMap 
              visitedCountries={visitedCountries.map(c => c.country_code.toUpperCase())}
              wishlistCountries={wishlistCountries.map(c => c.country_code.toUpperCase())}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;