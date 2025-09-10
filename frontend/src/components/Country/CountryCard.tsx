import React from 'react';
import { Country } from '../../services/api';
import AddButton from './AddButton';

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
  const visited = isInList('visited', country.country_code);
  const wishlist = isInList('wishlist', country.country_code);

  return (
    <div className="country-card bg-primary-darkgray rounded-lg shadow-lg p-4 mb-4 border-l-4 border-transparent">
      <div className="flex items-center mb-3">
        <img 
          src={country.flag} 
          alt={`Flag of ${country.name}`} 
          className="w-12 h-8 object-cover mr-3 shadow-md"
        />
        <h3 className="text-xl font-semibold text-primary-white">{country.name}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-primary-lightgray">
        <div><span className="font-medium text-primary-orange">Capital:</span> {country.capital || 'N/A'}</div>
        <div><span className="font-medium text-primary-orange">Region:</span> {country.region}</div>
        <div><span className="font-medium text-primary-orange">Population:</span> {country.population?.toLocaleString()}</div>
        <div><span className="font-medium text-primary-orange">Code:</span> {country.country_code}</div>
      </div>
      
      <div className="flex space-x-2">
        <AddButton
          onClick={() => onAddToVisited(country)}
          disabled={visited}
          label={visited ? 'Já Visitei' : 'Marcar como Visitado'}
          variant="filled"
        />
        <AddButton
          onClick={() => onAddToWishlist(country)}
          disabled={wishlist}
          label={wishlist ? 'Na Lista de Desejos' : 'Adicionar à Lista de Desejos'}
          variant="outline"
        />
      </div>
    </div>
  );
};

export default CountryCard;
