import React from 'react';
import { Typography, Grid2, Paper } from '@mui/material';

const BookCategory = ({ category, bookList }) => (
  <div className="categoryContainer">
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
);

export default BookCategory;
