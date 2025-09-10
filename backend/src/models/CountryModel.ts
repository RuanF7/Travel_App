import db from '../data/database';
import { Country } from './Country';

export class CountryModel {
  constructor(private tableName: string) {}

  async findAll(): Promise<Country[]> {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${this.tableName} ORDER BY created_at DESC`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as Country[]);
      });
    });
  }

  async findByCode(countryCode: string): Promise<Country | null> {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM ${this.tableName} WHERE country_code = ?`,
        [countryCode],
        (err, row) => {
          if (err) reject(err);
          else resolve((row as Country) || null);
        }
      );
    });
  }

  async create(countryData: Omit<Country, 'id' | 'created_at'>): Promise<number> {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO ${this.tableName} 
        (country_code, name, flag, capital, region, population) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          countryData.country_code,
          countryData.name,
          countryData.flag,
          countryData.capital,
          countryData.region,
          countryData.population
        ],
        function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  }

  async delete(countryCode: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM ${this.tableName} WHERE country_code = ?`,
        [countryCode],
        function (err) {
          if (err) reject(err);
          else resolve(this.changes > 0);
        }
      );
    });
  }
}
