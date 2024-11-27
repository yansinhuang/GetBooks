import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, FormControlLabel, IconButton, CssBaseline, Alert, CircularProgress } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { Container, Paper, Typography, Grid2 } from '@mui/material';

const App = () => {
  const [books, setBooks] = useState({ Adults: [], Children: [] });
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Function to fetch books data from the API
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

  const reloadBooks = () => {
    fetchBooks();
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
          <div className="switchContainer">
            <FormControlLabel
              control={
                <Switch
                  checked={filter === 'hardcover'}
                  onChange={() => setFilter(filter === 'hardcover' ? '' : 'hardcover')}
                  name="hardcoverFilter"
                />
              }
              label="Hardcover Only"
            />
          </div>

          {/* Display error if there is one */}
          {error && (
            <Alert
              severity="error"
              className="errorAlert"
            >
              {error}
              <IconButton
                onClick={reloadBooks}
                color="inherit"
                className="reloadButton"
              >
                <ReplayIcon />
              </IconButton>
            </Alert>
          )}

          {/* Show loading indicator while fetching data */}
          {loading ? (
            <div className="loadingContainer">
              <CircularProgress />
            </div>
          ) : (
            <>
              {/* Only display books if there is no error */}
              {!error && (
                <>
                  {/* Display books grouped by category */}
                  {Object.entries(books).map(([category, bookList]) => (
                    <div key={category} className="categoryContainer">
                      <Typography variant="h6" gutterBottom>{category}</Typography>
                      <Grid2 container spacing={2}>
                        {bookList.length > 0 ? (
                          bookList.map((book, index) => (
                            <Grid2 item xs={12} sm={6} md={4} key={index}>
                              <Paper elevation={2} className="bookPaper">
                                <Typography variant="body1" component="span">{book.Name}</Typography>{' '}
                                <span className={`bookType ${book.Type === 'Hardcover' ? 'hardcover' : ''}`}>
                                  {book.Type}
                                </span>
                              </Paper>
                            </Grid2>
                          ))
                        ) : (
                          <Grid2 item xs={12}>
                            <Typography variant="body2">No books available.</Typography>
                          </Grid2>
                        )}
                      </Grid2>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default App;
