import { z } from 'zod';

export const countrySchema = z.object({
  country_code: z.string().min(2, { message: 'Country code must be at least 2 characters long' }).max(3, { message: 'Country code must be at most 3 characters long' }),
  name: z.string().min(1, { message: 'Name is required' }),
  flag: z.url({ message: 'Flag must be a valid URL' }),
});

export type CountryData  = z.infer<typeof countrySchema>;