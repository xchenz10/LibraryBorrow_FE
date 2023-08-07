import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ClientRent() {
  const params = new URLSearchParams(window.location.search);
  const pupilId = params.get('p_id');
  const [rentedBooks, setRentedBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const getRent = async () => {
    try {
      const response = await axios.get(`http://16.170.226.98/django/api/v1/dash-client-rent?p_id=${pupilId}`);
      if (response.status === 200) {
        const books = Object.values(response.data.msg);
        setRentedBooks(books);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getRent();
  }, [pupilId]);

  const handleBookSelection = (bookId) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  const handleReturnBooks = async () => {
    try {
      const payload = {
        books: selectedBooks.map((bookId) => ({ book_id: String(bookId) })),
      };
      await axios.put(`http://16.170.226.98/django/api/v1/dash-client-rent?p_id=${pupilId}`, payload);
      getRent();
      setSelectedBooks([]);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div style={{ direction: 'rtl', fontSize: '18px', fontWeight: '500' }}>
      <h2>Rented Books</h2>
      <ul>
        {rentedBooks.map((book) => (
          <li key={book.book_id}>
            <input
              type='checkbox'
              value={book.book_id}
              checked={selectedBooks.includes(book.book_id)}
              onChange={() => handleBookSelection(book.book_id)}
            />
            <label>{book.book_name}</label>
          </li>
        ))}
      </ul>
      <button onClick={handleReturnBooks} disabled={selectedBooks.length === 0}>
        Return Selected Books
      </button>
    </div>
  );
}

export default ClientRent;
