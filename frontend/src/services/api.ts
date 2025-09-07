import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface Country {
  country_code: string;
  name: string;
  flag: string;
  capital?: string;
  population?: number;
  region?: string;
  created_at?: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const searchCountries = (name: string) => {
  return api.get(`/countries/search?name=${name}`);
};

export const getVisitedCountries = () => {
  return api.get('/countries/visited');
};

export const getWishlistCountries = () => {
  return api.get('/countries/wishlist');
};

export const addToVisited = (country: Country) => {
  return api.post('/countries/visited', country);
};

export const addToWishlist = (country: Country) => {
  return api.post('/countries/wishlist', country);
};

export const removeFromVisited = (countryCode: string) => {
  return api.delete(`/countries/visited/${countryCode}`);
};

export const removeFromWishlist = (countryCode: string) => {
  return api.delete(`/countries/wishlist/${countryCode}`);
};

export default api;