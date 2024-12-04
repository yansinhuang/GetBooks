const axios = require('axios');
const axiosRetry = require('axios-retry').default;
const { categorizeAndSortBooks } = require('./utils');
require('dotenv').config();

// Retry to avoid rate limit
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

// Fetch and process books
async function getBooks(filter) {
  try {
    const response = await axios.get(process.env.API_URL);
    const data = response.data;
    return categorizeAndSortBooks(data, filter);

  } catch (error) {
    throw new Error('Error fetching or processing books: ' + error.message);
  }
}

module.exports = { getBooks };
