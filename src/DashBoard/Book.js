import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function Book() {
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get('book_id')
  const bookName = params.get('book_name');
  const bookGrade = params.get('book_grade');
  const bookStorage = params.get('book_storage');
  const bookValue = params.get('book_value');
  const nav = useNavigate();

  const [editedName, setEditedName] = useState('');
  const [editedGrade, setEditedGrade] = useState('');
  const [editedStorage, setEditedStorage] = useState('');
  const [editedValue, setEditedValue] = useState('');

  useEffect(() => {
    if (bookName) setEditedName(bookName);
    if (bookGrade) setEditedGrade(bookGrade);
    if (bookStorage) setEditedStorage(bookStorage);
    if (bookValue) setEditedValue(bookValue);
  }, [bookName, bookGrade, bookStorage, bookValue]);

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleGradeChange = (event) => {
    setEditedGrade(event.target.value);
  };

  const handleStorageChange = (event) => {
    setEditedStorage(event.target.value);
  };

  const handleValueChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBook = {
      book_id: bookId,
      book_name: editedName,
      book_grade: editedGrade,
      book_storage: editedStorage,
      book_value: editedValue,
    };

    axios
      .put(`http://16.170.226.98/django/api/v1/books2`, updatedBook)
      .then((response) => {
        console.log(response.data);
        nav(`/dashboard/stock/book?book_id=${bookId}&book_name=${editedName}&book_grade=${editedGrade}&book_storage=${editedStorage}&book_value=${editedValue}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error.response.msg);
      });
  };

  return (
    <>
      <div className="book-container">
        <div className="book-form-container">
          <h2>טופס עריכת ספרים למספר פריט: {bookId}</h2>
          
          <br />
          <div>
            <label>פריט:</label>
            <input type="text" value={editedName} onChange={handleNameChange} />
          </div>
          <div>
            <label>כיתה:</label>
            <input type="text" value={editedGrade}
              onChange={handleGradeChange} style={{width: '200px'}}/>
          </div>
          <div>
            <label>מלאי:</label>
            <input type="text" value={editedStorage}
              onChange={handleStorageChange} style={{ width: '200px' }}/>
          </div>
          <div>
            <label>מחיר:</label>
            <input type="text" value={editedValue}
              onChange={handleValueChange} style={{ width: '200px' }}/>
          </div>
          <div>
            <Button variant="success" onClick={handleSubmit}>
              שמור שינויים
            </Button>
            <Button variant="secondary" onClick={()=>{nav('/dashboard')}}>
              חזור
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Book;
