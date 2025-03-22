import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookForm = ({ bookId, onSave }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: '',
    price: ''
  });

  useEffect(() => {
    if (bookId) {
      // Fetch book data if bookId is provided for updating
      axios
        .get(`https://localhost:5001/api/book/${bookId}`)
        .then((response) => {
          setBook(response.data);
        })
        .catch((error) => {
          console.error('Error fetching book for update:', error);
        });
    }
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = bookId ? 'put' : 'post';
    const url = bookId ? `https://localhost:5001/api/book/${bookId}` : 'https://localhost:5001/api/book';

    axios[method](url, book)
      .then((response) => {
        onSave(response.data);
      })
      .catch((error) => {
        console.error('Error saving book:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
        />
      </label>
      <button type="submit">{bookId ? 'Update' : 'Add'} Book</button>
    </form>
  );
};

export default BookForm;
