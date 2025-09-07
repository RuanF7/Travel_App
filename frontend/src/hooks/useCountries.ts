import { useState, useEffect } from 'react';
import {
  searchCountries as apiSearchCountries,
  getVisitedCountries as apiGetVisitedCountries,
  getWishlistCountries as apiGetWishlistCountries,
  addToVisited as apiAddToVisited,
  addToWishlist as apiAddToWishlist,
  removeFromVisited as apiRemoveFromVisited,
  removeFromWishlist as apiRemoveFromWishlist,
  Country
} from '../services/api';

export const useCountries = () => {
  const [searchResults, setSearchResults] = useState<Country[]>([]);
  const [visitedCountries, setVisitedCountries] = useState<Country[]>([]);
  const [wishlistCountries, setWishlistCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (name: string) => {
    if (!name) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await apiSearchCountries(name);
      setSearchResults(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error searching countries');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const loadSavedCountries = async () => {
    try {
      const [visitedResponse, wishlistResponse] = await Promise.all([
        apiGetVisitedCountries(),
        apiGetWishlistCountries(),
      ]);
      setVisitedCountries(visitedResponse.data);
      setWishlistCountries(wishlistResponse.data);
    } catch (err: any) {
      setError('Error loading saved countries');
    }
  };

  const addToVisited = async (country: Country) => {
    try {
      await apiAddToVisited(country);
      await loadSavedCountries();
      return { success: true };
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Error adding to visited' 
      };
    }
  };

  const addToWishlist = async (country: Country) => {
    try {
      await apiAddToWishlist(country);
      await loadSavedCountries();
      return { success: true };
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Error adding to wishlist' 
      };
    }
  };

  const removeFromVisited = async (countryCode: string) => {
    try {
      await apiRemoveFromVisited(countryCode);
      setVisitedCountries(prev => 
        prev.filter(country => country.country_code !== countryCode)
      );
      return { success: true };
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Error removing from visited' 
      };
    }
  };

  const removeFromWishlist = async (countryCode: string) => {
    try {
      await apiRemoveFromWishlist(countryCode);
      setWishlistCountries(prev => 
        prev.filter(country => country.country_code !== countryCode)
      );
      return { success: true };
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Error removing from wishlist' 
      };
    }
  };

  useEffect(() => {
    loadSavedCountries();
  }, []);

  return {
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
  };
};