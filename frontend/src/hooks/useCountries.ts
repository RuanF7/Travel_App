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
    if (!name.trim()) return setSearchResults([]);
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiSearchCountries(name);
      setSearchResults(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao buscar países');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const loadSavedCountries = async () => {
    try {
      const [{ data: visited }, { data: wishlist }] = await Promise.all([
        apiGetVisitedCountries(),
        apiGetWishlistCountries(),
      ]);
      setVisitedCountries(visited);
      setWishlistCountries(wishlist);
    } catch {
      setError('Erro ao carregar países salvos');
    }
  };
  
  const addToVisited = async (country: Country) => {
    try {
      await apiAddToVisited(country);
      setVisitedCountries(prev => [...prev, country]);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Erro ao adicionar' };
    }
  };

  const addToWishlist = async (country: Country) => {
    try {
      await apiAddToWishlist(country);
      setWishlistCountries(prev => [...prev, country]);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Erro ao adicionar' };
    }
  };

  const removeFromVisited = async (countryCode: string) => {
    try {
      await apiRemoveFromVisited(countryCode);
      setVisitedCountries(prev => prev.filter(c => c.country_code !== countryCode));
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Erro ao remover' };
    }
  };

  const removeFromWishlist = async (countryCode: string) => {
    try {
      await apiRemoveFromWishlist(countryCode);
      setWishlistCountries(prev => prev.filter(c => c.country_code !== countryCode));
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Erro ao remover' };
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
