// Categorize by owner's age and sort books alphabetically
function categorizeAndSortBooks(data, filter) {
  validateData(data);

  const categories = { Adults: [], Children: [] };
  data.forEach(({ age, books }) => {
      const category = age >= 18 ? 'Adults' : 'Children';

      books.forEach((book) => {
          if (!filter || book.type.toLowerCase() === filter.toLowerCase()) {
              const bookInfo = { Name: book.name, Type: book.type };
              insertInSortedOrder(categories[category], bookInfo);
          }
      });
  });

  return categories;
}

// Binary search insertion point to maintain sorted order
function insertInSortedOrder(array, book) {
  let left = 0;
  let right = array.length;

  while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (array[mid].Name < book.Name) {
          left = mid + 1;
      } else {
          right = mid;
      }
  }

  array.splice(left, 0, book);
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
  
  