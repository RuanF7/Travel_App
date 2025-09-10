import { VisitedCountryModel, WishlistCountryModel } from '../models';
import { Country } from '../models/Country';

export class CountryService {
  static async getVisitedCountries() {
    return await VisitedCountryModel.findAll();
  }

  static async getWishlistCountries() {
    return await WishlistCountryModel.findAll();
  }

  static async addToVisited(country: Omit<Country, 'id' | 'created_at'>) {
    return await VisitedCountryModel.create(country);
  }

  static async addToWishlist(country: Omit<Country, 'id' | 'created_at'>) {
    return await WishlistCountryModel.create(country);
  }

  static async removeFromVisited(countryCode: string) {
    return await VisitedCountryModel.delete(countryCode);
  }

  static async removeFromWishlist(countryCode: string) {
    return await WishlistCountryModel.delete(countryCode);
  }
}
