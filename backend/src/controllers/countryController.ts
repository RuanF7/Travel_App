import { Request, Response } from 'express';
import db from '../models/database';
import { countrySchema, CountryData } from '../utils/validation';
import axios from 'axios';

const REST_COUNTRIES_API = 'https://restcountries.com/v3.1';

export const searchCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.query;
    if (!name || typeof name !== 'string') {
      res.status(400).json({ error: 'Name parameter is required' });
      return;
    }

    const response = await axios.get(`${REST_COUNTRIES_API}/name/${name}`);
    const countries = response.data.map((country: any) => ({
      country_code: country.cca2,
      name: country.name.common,
      flag: country.flags.svg,
      capital: country.capital ? country.capital[0] : 'N/A',
      region: country.region,
      population: country.population,
    }));

    res.json(countries);
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: 'No countries found' });
    } else {
      res.status(500).json({ message: 'Error fetching countries' });
    }
  }
};

/**
 * Get all visited countries
 */

export const getVisitedCountries = (req: Request, res: Response): void => {
  db.all('SELECT * FROM visited_countries ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching visited countries' });
      return;
    }
    res.json(rows);
  });
};

/**
 * Get all wishlist countries
 */
export const getWishlistCountries = (req: Request, res: Response): void => {
  db.all('SELECT * FROM wishlist_countries ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching wishlist countries' });
      return;
    }
    res.json(rows);
  });
};

/**
 * Add country to visited list
 */
export const addToVisited = (req: Request, res: Response): void => {
  try {
    const validatedData = countrySchema.parse(req.body);
    
    db.run(
      'INSERT INTO visited_countries (country_code, name, flag) VALUES (?, ?, ?)',
      [validatedData.country_code, validatedData.name, validatedData.flag],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            res.status(409).json({ message: 'Country already in visited list' });
            return;
          }
          res.status(500).json({ message: 'Error adding country to visited list' });
          return;
        }
        res.status(201).json({ 
          id: this.lastID, 
          message: 'Country added to visited list' 
        });
      }
    );
  } catch (error: any) {
    res.status(400).json({ message: 'Invalid data', errors: error.errors });
  }
};

/**
 * Add country to wishlist
 */
export const addToWishlist = (req: Request, res: Response): void => {
  try {
    const validatedData = countrySchema.parse(req.body);
    
    db.run(
      'INSERT INTO wishlist_countries (country_code, name, flag) VALUES (?, ?, ?)',
      [validatedData.country_code, validatedData.name, validatedData.flag],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            res.status(409).json({ message: 'Country already in wishlist' });
            return;
          }
          res.status(500).json({ message: 'Error adding country to wishlist' });
          return;
        }
        res.status(201).json({ 
          id: this.lastID, 
          message: 'Country added to wishlist' 
        });
      }
    );
  } catch (error: any) {
    res.status(400).json({ message: 'Invalid data', errors: error.errors });
  }
};

/**
 * Remove country from visited list
 */
export const removeFromVisited = (req: Request, res: Response): void => {
  const { countryCode } = req.params;
  
  db.run(
    'DELETE FROM visited_countries WHERE country_code = ?',
    [countryCode],
    function(err) {
      if (err) {
        res.status(500).json({ message: 'Error removing country from visited list' });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ message: 'Country not found in visited list' });
        return;
      }
      res.json({ message: 'Country removed from visited list' });
    }
  );
};

/**
 * Remove country from wishlist
 */
export const removeFromWishlist = (req: Request, res: Response): void => {
  const { countryCode } = req.params;
  
  db.run(
    'DELETE FROM wishlist_countries WHERE country_code = ?',
    [countryCode],
    function(err) {
      if (err) {
        res.status(500).json({ message: 'Error removing country from wishlist' });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ message: 'Country not found in wishlist' });
        return;
      }
      res.json({ message: 'Country removed from wishlist' });
    }
  );
};