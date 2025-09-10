import { z } from 'zod';

export const countrySchema = z.object({
  country_code: z.string()
    .min(2, { message: 'Country code must have at least 2 characters' })
    .max(3, { message: 'Country code must have at most 3 characters' })
    .regex(/^[A-Z]+$/, { message: 'Country code must be uppercase letters only' }),
  
  name: z.string()
    .min(1, { message: 'Country name is required' })
    .max(100, { message: 'Country name must not exceed 100 characters' }),
  
  flag: z.string()
    .url({ message: 'Flag must be a valid URL' }),
  
  capital: z.string()
    .max(100, { message: 'Capital name must not exceed 100 characters' })
    .optional(),
  
  region: z.string()
    .max(100, { message: 'Region name must not exceed 100 characters' })
    .optional(),
  
  population: z.number()
    .int({ message: 'Population must be an integer number' })
    .nonnegative({ message: 'Population cannot be negative' })
    .optional(),
});

export type CountryData = z.infer<typeof countrySchema>;
