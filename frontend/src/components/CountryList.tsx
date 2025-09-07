import React from 'react';
import { Country } from '../services/api';

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
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="text-gray-500">No countries in this list yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-3">{title} ({countries.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <div key={country.country_code} className="border rounded-lg p-3 relative">
            <div className="flex items-center mb-2">
              <img 
                src={country.flag} 
                alt={`Flag of ${country.name}`} 
                className="w-10 h-7 object-cover mr-2"
              />
              <h3 className="font-medium">{country.name}</h3>
            </div>
            <button
              onClick={() => onRemove(country.country_code)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title={`Remove from ${title}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="text-xs text-gray-500">
              Added: {country.created_at ? new Date(country.created_at).toLocaleDateString() : 'Unknown'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;