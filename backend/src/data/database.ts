import sqlite3 from 'sqlite3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = path.join(__dirname, process.env.DB_PATH || '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    console.error('Database path:', dbPath);
  } else {
    console.log('Connected to the SQLite database at', dbPath);    
    
    db.run(`
      CREATE TABLE IF NOT EXISTS visited_countries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        country_code TEXT UNIQUE,
        name TEXT,
        flag TEXT,
        capital TEXT,
        region TEXT,
        population INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);    
   
    db.run(`
      CREATE TABLE IF NOT EXISTS wishlist_countries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        country_code TEXT UNIQUE,
        name TEXT,
        flag TEXT,
        capital TEXT,
        region TEXT,
        population INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

export default db;
