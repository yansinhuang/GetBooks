const { categorizeAndSortBooks } = require('../src/utils');

describe('categorizeAndSortBooks', () => {
  const mockData = [
    { name: 'Jane', age: 19, books: [{ name: 'Hamlet', type: 'Hardcover' }, { name: 'Wuthering Heights', type: 'Paperback' }] },
    { name: 'Max', age: 14, books: [{ name: 'The Hobbit', type: 'Ebook' }] },
    { name: 'Charlotte', age: 25, books: [{ name: 'React: The Ultimate Guide', type: 'Hardcover' }] },
    { name: 'Will', age: 17, books: [{ name: 'Great Expectations', type: 'Hardcover' }] },
    { name: 'Alice', age: 18, books: [{ name: '1984', type: 'Paperback' }, { name: 'Brave New World', type: 'Hardcover' }] },
  ];

  it('categorizes and sorts books correctly without filter', () => {
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

  it('categorizes and sorts books correctly with filter for hardcover', () => {
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

  it('handles an empty book list', () => {
    const result = categorizeAndSortBooks([]);
    expect(result).toEqual({
      Adults: [],
      Children: [],
    });
  });

  it('handles no books for some owners', () => {
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


  it('correctly handles duplicate book names', () => {
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

describe('categorizeAndSortBooks - Error Handling', () => {
  
  it('throws error when data is not an array', () => {
    const invalidData = { name: 'Jane', age: 23, books: [] };
    expect(() => categorizeAndSortBooks(invalidData)).toThrow('Invalid data format: Expected an array.');
  });

  it('throws error when owner name is not a string', () => {
    const invalidData = [
      { name: 123, age: 23, books: [{ name: 'Hamlet', type: 'Hardcover' }] }
    ];
    expect(() => categorizeAndSortBooks(invalidData)).toThrow('Invalid owner name.');
  });

  it('throws error when owner age is not a number', () => {
    const invalidData = [
      { name: 'Jane', age: '23', books: [{ name: 'Hamlet', type: 'Hardcover' }] }
    ];
    expect(() => categorizeAndSortBooks(invalidData)).toThrow('Invalid owner age.');
  });

  it('throws error when books is not an array', () => {
    const invalidData = [
      { name: 'Jane', age: 23, books: {} }
    ];
    expect(() => categorizeAndSortBooks(invalidData)).toThrow('Invalid books: Expected an array of books.');
  });

  it('throws error when book name is not a string', () => {
    const invalidData = [
      { name: 'Jane', age: 23, books: [{ name: 123, type: 'Hardcover' }] }
    ];
    expect(() => categorizeAndSortBooks(invalidData)).toThrow('Invalid book name.');
  });

  it('throws error when book type is not a string', () => {
    const invalidData = [
      { name: 'Jane', age: 23, books: [{ name: 'Hamlet', type: 123 }] }
    ];
    expect(() => categorizeAndSortBooks(invalidData)).toThrow('Invalid book type.');
  });

});

