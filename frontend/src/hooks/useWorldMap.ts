import { useState, useEffect } from 'react';
import { Country } from '../services/api';

export interface CountryData {
  visited: boolean;
  wantToVisit: boolean;
  name?: string;
}

export function useWorldMap(visitedCountries: Country[], wishlistCountries: Country[]) {
  const [countries, setCountries] = useState<Record<string, CountryData>>({});

  useEffect(() => {
    const updated: Record<string, CountryData> = {};

    visitedCountries.forEach(c => {
      updated[c.country_code.toUpperCase()] = { visited: true, wantToVisit: false, name: c.name };
    });

    wishlistCountries.forEach(c => {
      const code = c.country_code.toUpperCase();
      updated[code] = updated[code] || { visited: false, wantToVisit: true, name: c.name };
    });

    setCountries(updated);
  }, [visitedCountries, wishlistCountries]);

  const updateCountry = (countryCode: string, visited: boolean, wantToVisit: boolean, name?: string) => {
    setCountries(prev => ({
      ...prev,
      [countryCode.toUpperCase()]: { visited, wantToVisit, name: name || prev[countryCode]?.name }
    }));
  };

  const getCountryStatus = (countryCode: string) => countries[countryCode.toUpperCase()] || { visited: false, wantToVisit: false };

  const getStats = () => {
    const visited = Object.values(countries).filter(c => c.visited).length;
    const wishlist = Object.values(countries).filter(c => c.wantToVisit).length;
    return { visited, wishlist, total: visited + wishlist };
  };

  return { countries, updateCountry, getCountryStatus, getStats };
}
