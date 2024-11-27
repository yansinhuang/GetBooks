const express = require('express');
const { getBooks } = require('./services');
const logger = require('./logger');

const router = express.Router();

// Endpoint to fetch and categorize books
router.get('/books', async (req, res) => {
  try {
    const { filter } = req.query;
    logger.info(`Received request to fetch books with filter: ${filter || 'none'}`);

    // Validate filter value
    const validFilters = ['hardcover'];
    if (filter && !validFilters.includes(filter.toLowerCase())) {
        logger.warn(`Invalid filter provided: ${filter}`);
        return res.status(400).json({ error: `Invalid filter provided. Valid options are: ${validFilters.join()}` });
    }
    const books = await getBooks(filter);
    logger.info('Books fetched and categorized successfully.');
    res.json(books);
  } catch (error) {
    logger.error(`Error handling /books request: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
