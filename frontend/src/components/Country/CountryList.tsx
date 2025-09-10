import React from 'react';
import { Country } from '../../services/api';
import CountryItem from './CountryItem';

interface CountryListProps {
  countries: Country[];
  title: string;
  onRemove: (countryCode: string) => void;
  listType: 'visited' | 'wishlist';
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  title,
  onRemove,
  listType
}) => {
  if (countries.length === 0) {
    return (
      <div className="bg-primary-darkgray rounded-lg shadow-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-primary-white">{title}</h2>
        <p className="text-primary-lightgray">Nenhum país nesta lista ainda.</p>
      </div>
    );
  }

  return (
    <div className="bg-primary-darkgray rounded-lg shadow-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-3 text-primary-white">
        {title} ({countries.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <CountryItem 
            key={country.country_code} 
            country={country} 
            onRemove={onRemove} 
            title={title} 
          />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
