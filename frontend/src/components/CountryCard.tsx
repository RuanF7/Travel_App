import React from 'react';
import { Country } from '../services/api';

interface CountryCardProps {
  country: Country;
  onAddToVisited: (country: Country) => void;
  onAddToWishlist: (country: Country) => void;
  isInList: (listType: 'visited' | 'wishlist', countryCode: string) => boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onAddToVisited,
  onAddToWishlist,
  isInList
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-3">
        <img 
          src={country.flag} 
          alt={`Flag of ${country.name}`} 
          className="w-12 h-8 object-cover mr-3"
        />
        <h3 className="text-xl font-semibold">{country.name}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div>
          <span className="font-medium">Capital:</span> {country.capital || 'N/A'}
        </div>
        <div>
          <span className="font-medium">Region:</span> {country.region}
        </div>
        <div>
          <span className="font-medium">Population:</span> {country.population?.toLocaleString()}
        </div>
        <div>
          <span className="font-medium">Code:</span> {country.country_code}
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onAddToVisited(country)}
          disabled={isInList('visited', country.country_code)}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50"
        >
          {isInList('visited', country.country_code) ? 'Ja Visitei' : 'Marcar como Visitado'}
        </button>
        <button
          onClick={() => onAddToWishlist(country)}
          disabled={isInList('wishlist', country.country_code)}
          className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 disabled:opacity-50"
        >
          {isInList('wishlist', country.country_code) ? 'Na Lista de Desejos' : 'Adicionar à Lista de Desejos'}
        </button>
      </div>
    </div>
  );
};

export default CountryCard;