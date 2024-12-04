const { categorizeAndSortBooks } = require('../src/utils');

describe('Categorize and Sort Books', () => {
  const mockData = [
    { name: 'Jane', age: 19, books: [{ name: 'Hamlet', type: 'Hardcover' }, { name: 'Wuthering Heights', type: 'Paperback' }] },
    { name: 'Max', age: 14, books: [{ name: 'The Hobbit', type: 'Ebook' }] },
    { name: 'Charlotte', age: 25, books: [{ name: 'React: The Ultimate Guide', type: 'Hardcover' }] },
    { name: 'Will', age: 17, books: [{ name: 'Great Expectations', type: 'Hardcover' }] },
    { name: 'Alice', age: 18, books: [{ name: '1984', type: 'Paperback' }, { name: 'Brave New World', type: 'Hardcover' }] },
  ];

  describe('Given a list of book owners with their books', () => {
    it('should categorize books by owner age group and sort them alphabetically', () => {
      const result = categorizeAndSortBooks(mockData);
      expect(result).toEqual({
        Adults: [
          { Name: '1984', Type: 'Paperback' },
          { Name: 'Brave New World', Type: 'Hardcover' },
          { Name: 'Hamlet', Type: 'Hardcover' },
          { Name: 'React: The Ultimate Guide', Type: 'Hardcover' },
          { Name: 'Wuthering Heights', Type: 'Paperback' },
        ],
        Children: [
          { Name: 'Great Expectations', Type: 'Hardcover' },
          { Name: 'The Hobbit', Type: 'Ebook' },
        ],
      });
    });

    it('should only include hardcover books when a "hardcover" filter is applied', () => {
      const result = categorizeAndSortBooks(mockData, 'hardcover');
      expect(result).toEqual({
        Adults: [
          { Name: 'Brave New World', Type: 'Hardcover' },
          { Name: 'Hamlet', Type: 'Hardcover' },
          { Name: 'React: The Ultimate Guide', Type: 'Hardcover' },
        ],
        Children: [{ Name: 'Great Expectations', Type: 'Hardcover' }],
      });
    });

    it('should return empty categories when no books are provided', () => {
      const result = categorizeAndSortBooks([]);
      expect(result).toEqual({
        Adults: [],
        Children: [],
      });
    });

    it('should handle cases where some owners have no books', () => {
      const mockDataWithNoBooks = [
        { name: 'Jane', age: 23, books: [] },
        { name: 'Max', age: 14, books: [{ name: 'The Hobbit', type: 'Ebook' }] },
      ];
      const result = categorizeAndSortBooks(mockDataWithNoBooks);
      expect(result).toEqual({
        Adults: [],
        Children: [{ Name: 'The Hobbit', Type: 'Ebook' }],
      });
    });

    it('should handle duplicate book names correctly', () => {
      const mockDataWithDuplicates = [
        { name: 'Alice', age: 19, books: [{ name: 'Hamlet', type: 'Paperback' }, { name: 'Hamlet', type: 'Hardcover' }] },
        { name: 'Bob', age: 21, books: [{ name: 'Hamlet', type: 'Paperback' }] },
      ];
      const result = categorizeAndSortBooks(mockDataWithDuplicates);
      expect(result).toEqual({
        Adults: [
          { Name: 'Hamlet', Type: 'Paperback' },
          { Name: 'Hamlet', Type: 'Hardcover' },
          { Name: 'Hamlet', Type: 'Paperback' },
        ],
        Children: [],
      });
    });
  });

  describe('Error Handling', () => {
    describe('When the data format is invalid', () => {
      it('should throw an error if data is not an array', () => {
        const invalidData = { name: 'Jane', age: 23, books: [] };
        expect(() => categorizeAndSortBooks(invalidData)).toThrow('Invalid data format: Expected an array.');
      });

      it('should throw an error if owner name is not a string', () => {
        const invalidData = [{ name: 123, age: 23, books: [{ name: 'Hamlet', type: 'Hardcover' }] }];
        expect(() => categorizeAndSortBooks(invalidData)).toThrow('Invalid owner name.');
      });

      it('should throw an error if owner age is not a number', () => {
        const invalidData = [{ name: 'Jane', age: '23', books: [{ name: 'Hamlet', type: 'Hardcover' }] }];
        expect(() => categorizeAndSortBooks(invalidData)).toThrow('Invalid owner age.');
      });

      it('should throw an error if books is not an array', () => {
        const invalidData = [{ name: 'Jane', age: 23, books: {} }];
        expect(() => categorizeAndSortBooks(invalidData)).toThrow('Invalid books: Expected an array of books.');
      });

      it('should throw an error if book name is not a string', () => {
        const invalidData = [{ name: 'Jane', age: 23, books: [{ name: 123, type: 'Hardcover' }] }];
        expect(() => categorizeAndSortBooks(invalidData)).toThrow('Invalid book name.');
      });

      it('should throw an error if book type is not a string', () => {
        const invalidData = [{ name: 'Jane', age: 23, books: [{ name: 'Hamlet', type: 123 }] }];
        expect(() => categorizeAndSortBooks(invalidData)).toThrow('Invalid book type.');
      });
    });
  });
});
