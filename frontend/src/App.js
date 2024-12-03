import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, CssBaseline } from '@mui/material';
import { BookCategory, FilterSwitch, ErrorAlert, LoadingSpinner } from './components';

const App = () => {
  const [books, setBooks] = useState({ Adults: [], Children: [] });
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Function to fetch books data from backend API
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/books?filter=${filter}`, {
        headers: {
          'x-api-key': API_KEY
        },
      },);
      setBooks(response.data);
      setError('');
    } catch (error) {
      setError(`Failed to fetch books. Please try again later.`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [filter]);

  return (
    <div>
      <CssBaseline />
      
      <Container maxWidth="md" className="container">
        <Paper elevation={3} className="paper">
          <Typography variant="h4" gutterBottom>Book Categories</Typography>
          
          {/* Filter Switch */}
          <FilterSwitch filter={filter} setFilter={setFilter} />
          
          {/* Display error if there is one */}
          {error && <ErrorAlert message={error} reloadBooks={fetchBooks} />}
          
          {/* Show loading indicator while fetching data */}
          {loading ? <LoadingSpinner /> :  
            !error && 
            (Object.entries(books).map(([category, bookList]) => (
              <BookCategory key={category} category={category} bookList={bookList} />
            )))
          }
        </Paper>
      </Container>
    </div>
  );
};

export default App;
