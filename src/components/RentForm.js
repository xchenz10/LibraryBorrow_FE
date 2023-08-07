import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function RentForm() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [grade, setGrade] = useState("")
  const [p_id, setP_id] = useState("")
  const [p_name, setP_name] = useState("")
  const [isRent, setIsRent] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    const getPupilRent = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const pupilId = params.get('p_id')
        const res = await axios.get(`http://16.170.226.98/django/api/v1/has-rent?p_id=${pupilId}`)
        if (res.status === 200)
          setIsRent(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPupilRent()
  }, [])

  useEffect(() => {
    const getPupilBooks = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const pupilId = params.get('p_id')
        const pupilGrade = params.get('p_grade')
        const pupilName = params.get('p_name')
        if (pupilId && pupilGrade) {
          const res = await axios.get(`http://16.170.226.98/django/api/v1//books1?p_id=${pupilId}&p_grade=${pupilGrade}&p_name=${pupilName}`)
          setBooks(res.data.data)
          setGrade(pupilGrade)
          setP_id(pupilId)
          setP_name(pupilName)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getPupilBooks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

  
    try {
      const params = new URLSearchParams(window.location.search)
      const pupilId = params.get('p_id')
  
      if (pupilId) {
        if (isRent.length > 0) {
          console.log('Books already rented')
          return;
        }
  
        const rentRes = await axios.post(`http://16.170.226.98/django/api/v1/mk-rent?p_id=${pupilId}`);
        if (rentRes.status === 200) {
          console.log(rentRes.data)

          const rentedBooks = books.map((book) =>
          `- ${book.book_name}`
          ).join("<br>")


           const sendEmailRes = await axios.post(`http://16.170.226.98/django/api/v1/send-email?p_id=${pupilId}`, {
           p_id: p_id, 
           message: rentedBooks
          })
          
          if (sendEmailRes.status === 200) {
            nav('/success-rent-msg')
          }
        }
      } else {
        console.log('Missing pupil ID')
      }
    } catch (error) {
      console.error(error.response.data)
      
    } finally {
      setLoading(false)
    }
  }
  
  return (<>
      <div style={{ direction: 'rtl' }}>
        {!loading && (
          <div>
          <h2>שם התלמיד: {p_name}</h2>
          <h2>רשימת הספרים לכיתה {grade}:</h2>
          </div>
        )}
        {loading ? (<>
          <h2 className='text-while-spining'>מבצע הזמנה, אנא המתן</h2>
          <div className='spinner-div'>
          <div className="loading-spinner" />
        </div>        </>) : (
          <ul>
            {books.map((book) => (
              <li>{book.book_name}</li>
            ))}
          </ul>
        )}
        {isRent.length === 0 && !loading && (
          <button type='submit' onClick={handleSubmit}>
            Rent Books
          </button>
        )}
      </div>
    </>)
}

export default RentForm;
