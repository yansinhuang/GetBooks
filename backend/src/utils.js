// Categorize by owner's age and sort books alphabetically
function categorizeAndSortBooks(data, filter) {
  validateData(data);

  const categories = { Adults: [], Children: [] };

  // Categorize the books into Adults or Children
  data.forEach(({ age, books }) => {
    const category = age >= 18 ? 'Adults' : 'Children';

    books.forEach((book) => {
      if (!filter || book.type.toLowerCase() === filter.toLowerCase()) {
        const bookInfo = { Name: book.name, Type: book.type };
        categories[category].push(bookInfo);
      }
    });
  });

  // Sort books alphabetically within each category
  for (const category in categories) {
    categories[category].sort((a, b) => a.Name.localeCompare(b.Name));
  }

  return categories;
}

// Validates the response data structure from the API
function validateData(data) {
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format: Expected an array.');
    }
  
    // Validate each book owner object
    for (let owner of data) {
      if (!owner.name || typeof owner.name !== 'string') {
        throw new Error('Invalid owner name.');
      }
  
      if (typeof owner.age !== 'number') {
        throw new Error('Invalid owner age.');
      }
  
      if (!Array.isArray(owner.books)) {
        throw new Error('Invalid books: Expected an array of books.');
      }
  
      // Validate each book
      for (let book of owner.books) {
        if (!book.name || typeof book.name !== 'string') {
          throw new Error('Invalid book name.');
        }
        if (!book.type || typeof book.type !== 'string') {
          throw new Error('Invalid book type.');
        }
      }
    }
  
    return true;
  }
  
  
module.exports = { categorizeAndSortBooks };
  
  