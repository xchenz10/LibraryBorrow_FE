import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RentForm() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState("");
  const [p_id, setP_id] = useState("");
  const [p_name, setP_name] = useState("");
  const [hasRent, setHasRent] = useState(false); // New state variable
  const nav = useNavigate();

  useEffect(() => {
    const getPupilBooks = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const pupilId = params.get('p_id');
        const pupilGrade = params.get('p_grade');
        const pupilName = params.get('p_name');
        if (pupilId && pupilGrade) {
          const res = await axios.get(`http://127.0.0.1:8000/api/v1/books?p_id=${pupilId}&p_grade=${pupilGrade}&p_name=${pupilName}`);
          setBooks(res.data);
          setGrade(pupilGrade);
          setP_id(pupilId);
          setP_name(pupilName);
          setHasRent(res.data.length > 0); // Check if pupil has already rented books
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getPupilBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (hasRent) { // Check if pupil has already rented books
        console.log('Pupil has already made a rent');
        return; // Exit the function without submitting the form
      }

      const params = new URLSearchParams(window.location.search);
      const pupilId = params.get('p_id');

      if (pupilId) {
        const res = await axios.post(`http://127.0.0.1:8000/api/v1/mk-rent?p_id=${pupilId}`);
        console.log(res.data);
        nav('/success-msg');
      } else {
        console.log('Missing pupil ID');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ direction: 'rtl' }}>
        <h2>שם התלמיד: {p_name}</h2>
        <h2>רשימת הספרים לכיתה {grade}:</h2>
        {loading ? (
          <p>Loading books...</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book.book_id}>{book.book_name}</li>
            ))}
          </ul>
        )}
        {hasRent ? (
          <p>התלמיד כבר ביצע השאלה של ספרים.</p>
        ) : (
          <button type='submit' onClick={handleSubmit}>
            Rent Books
          </button>
        )}
      </div>
    </>
  );
}

export default RentForm;
