import { useState, useEffect } from 'react';
import { Country } from '../services/api';

export interface CountryData {
  [key: string]: {
    visited: boolean;
    wantToVisit: boolean;
    name?: string;
  };
}

export function useWorldMap(visitedCountries: Country[], wishlistCountries: Country[]) {
  const [countries, setCountries] = useState<CountryData>({});
 
  useEffect(() => {
    const updatedCountries: CountryData = {};    
    
    visitedCountries.forEach(country => {
      const countryCode = country.country_code.toUpperCase();
      updatedCountries[countryCode] = {
        visited: true,
        wantToVisit: false,
        name: country.name
      };
    });
    
   
    wishlistCountries.forEach(country => {
      const countryCode = country.country_code.toUpperCase();
      
      if (!updatedCountries[countryCode]) {
        updatedCountries[countryCode] = {
          visited: false,
          wantToVisit: true,
          name: country.name
        };
      }
    });
    
    setCountries(updatedCountries);
  }, [visitedCountries, wishlistCountries]);

  useEffect(() => {
    localStorage.setItem('worldMapData', JSON.stringify(countries));
  }, [countries]);

  const updateCountry = (countryCode: string, visited: boolean, wantToVisit: boolean, name?: string) => {
    setCountries(prev => ({
      ...prev,
      [countryCode]: { 
        visited, 
        wantToVisit,
        name: name || prev[countryCode]?.name 
      }
    }));
  };

  const getCountryStatus = (countryCode: string) => {
    return countries[countryCode] || { visited: false, wantToVisit: false };
  };

  const getStats = () => {
    const visitedCount = Object.values(countries).filter(c => c.visited).length;
    const wishlistCount = Object.values(countries).filter(c => c.wantToVisit).length;
    
    return {
      visited: visitedCount,
      wishlist: wishlistCount,
      total: Object.keys(countries).length
    };
  };

  return {
    countries,
    updateCountry,
    getCountryStatus,
    getStats
  };
}