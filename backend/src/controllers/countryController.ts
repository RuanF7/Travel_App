import { Request, Response } from 'express';
import { countrySchema } from '../utils/validation';
import { fetchCountryData } from '../services/apiService';
import { CountryService } from '../services/countryService';
import { asyncHandler } from '../utils/asyncHandler';

export const searchCountries = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name || typeof name !== 'string') {
    res.status(400).json({ error: 'Name parameter is required' });
    return;
  }

  const countries = await fetchCountryData(name);
  res.json(countries);
});

export const getVisitedCountries = asyncHandler(async (_req: Request, res: Response) => {
  const countries = await CountryService.getVisitedCountries();
  res.json(countries);
});

export const getWishlistCountries = asyncHandler(async (_req: Request, res: Response) => {
  const countries = await CountryService.getWishlistCountries();
  res.json(countries);
});

export const addToVisited = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = countrySchema.parse(req.body);

  try {
    const id = await CountryService.addToVisited(validatedData);
    res.status(201).json({ id, message: 'Country added to visited list' });
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(409).json({ message: 'Country already in visited list' });
      return;
    }
    throw error;
  }
});

export const addToWishlist = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = countrySchema.parse(req.body);

  try {
    const id = await CountryService.addToWishlist(validatedData);
    res.status(201).json({ id, message: 'Country added to wishlist' });
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(409).json({ message: 'Country already in wishlist' });
      return;
    }
    throw error;
  }
});

export const removeFromVisited = asyncHandler(async (req: Request, res: Response) => {
  const { countryCode } = req.params;
  const deleted = await CountryService.removeFromVisited(countryCode);

  if (!deleted) {
    res.status(404).json({ message: 'Country not found in visited list' });
    return;
  }
  res.json({ message: 'Country removed from visited list' });
});

export const removeFromWishlist = asyncHandler(async (req: Request, res: Response) => {
  const { countryCode } = req.params;
  const deleted = await CountryService.removeFromWishlist(countryCode);

  if (!deleted) {
    res.status(404).json({ message: 'Country not found in wishlist' });
    return;
  }
  res.json({ message: 'Country removed from wishlist' });
});
