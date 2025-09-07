import express from 'express';
import {
  searchCountries,
  getVisitedCountries,
  getWishlistCountries,
  addToVisited,
  addToWishlist,
  removeFromVisited,
  removeFromWishlist,
} from '../controllers/countryController';

const router = express.Router();

/**
 * @swagger
 * /api/countries/search:
 *   get:
 *     summary: Search countries by name
 *     tags: [Countries]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Country name to search for
 *     responses:
 *       200:
 *         description: List of countries matching the search
 *       400:
 *         description: Missing name parameter
 *       404:
 *         description: No countries found
 *       500:
 *         description: Server error
 */
router.get('/search', searchCountries);

/**
 * @swagger
 * /api/countries/visited:
 *   get:
 *     summary: Get all visited countries
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: List of visited countries
 *       500:
 *         description: Server error
 */
router.get('/visited', getVisitedCountries);

/**
 * @swagger
 * /api/countries/wishlist:
 *   get:
 *     summary: Get all wishlist countries
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: List of wishlist countries
 *       500:
 *         description: Server error
 */
router.get('/wishlist', getWishlistCountries);

/**
 * @swagger
 * /api/countries/visited:
 *   post:
 *     summary: Add country to visited list
 *     tags: [Countries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country_code
 *               - name
 *               - flag
 *             properties:
 *               country_code:
 *                 type: string
 *               name:
 *                 type: string
 *               flag:
 *                 type: string
 *     responses:
 *       201:
 *         description: Country added to visited list
 *       400:
 *         description: Invalid data
 *       409:
 *         description: Country already in visited list
 *       500:
 *         description: Server error
 */
router.post('/visited', addToVisited);

/**
 * @swagger
 * /api/countries/wishlist:
 *   post:
 *     summary: Add country to wishlist
 *     tags: [Countries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country_code
 *               - name
 *               - flag
 *             properties:
 *               country_code:
 *                 type: string
 *               name:
 *                 type: string
 *               flag:
 *                 type: string
 *     responses:
 *       201:
 *         description: Country added to wishlist
 *       400:
 *         description: Invalid data
 *       409:
 *         description: Country already in wishlist
 *       500:
 *         description: Server error
 */
router.post('/wishlist', addToWishlist);

/**
 * @swagger
 * /api/countries/visited/{countryCode}:
 *   delete:
 *     summary: Remove country from visited list
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: countryCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Country code to remove
 *     responses:
 *       200:
 *         description: Country removed from visited list
 *       404:
 *         description: Country not found in visited list
 *       500:
 *         description: Server error
 */
router.delete('/visited/:countryCode', removeFromVisited);

/**
 * @swagger
 * /api/countries/wishlist/{countryCode}:
 *   delete:
 *     summary: Remove country from wishlist
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: countryCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Country code to remove
 *     responses:
 *       200:
 *         description: Country removed from wishlist
 *       404:
 *         description: Country not found in wishlist
 *       500:
 *         description: Server error
 */
router.delete('/wishlist/:countryCode', removeFromWishlist);

export default router;