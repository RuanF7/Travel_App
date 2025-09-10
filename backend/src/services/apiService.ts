import axios from 'axios';

const REST_COUNTRIES_API = 'https://restcountries.com/v3.1';

export const fetchCountryData = async (name: string) => {
  try {
    const response = await axios.get(`${REST_COUNTRIES_API}/name/${name}`);
    return response.data.map((country: any) => ({
      country_code: country.cca2,
      name: country.name.common,
      flag: country.flags.svg,
      capital: country.capital ? country.capital[0] : 'N/A',
      region: country.region,
      population: country.population,
    }));
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('No countries found');
    }
    throw new Error('Error fetching countries');
  }
};