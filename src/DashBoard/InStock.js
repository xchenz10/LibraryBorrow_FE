import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Table, Button, Col, Container, Form, Row, ModalBody } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function InStock() {
  const SuperUser = JSON.parse(localStorage.getItem("isSuperUser"))
  const isSuperUser = SuperUser ?? false
  const [stock, setStock] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
  const [show_add, setShow_add] = useState(false)
  const handleClose_add = () => {
    setShow_add(false)
    window.location.reload()
  }
  const handleShow_add = () => setShow_add(true)

  const [show_delete, setShow_delete] = useState(false)
  const handleClose_delete = () => {
    setShow_delete(false)
    window.location.reload()
  }
  const handleShow_delete = () => setShow_delete(true)

  const [bookId, setBookId] = useState('')
  const [bookName, setBookName] = useState('')
  const [bookGrade, setBookGrade] = useState('')
  const [bookValue, setBookValue] = useState('')
  const [bookStorage, setBookStorage] = useState('')

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get(`http://16.170.226.98/django/api/v1/books2`)
        if (res.status === 200)
          setStock(res.data.data)
        console.log(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    getBooks()
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredStock = stock.filter((book) => {
    return book.book_name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleAddBook = (e) => {
    e.preventDefault()

    const data = {
      book_id: bookId,
      book_name: bookName,
      book_grade: bookGrade,
      book_value: bookValue,
      book_storage: bookStorage,
    }

    addBook(data);
  }

  const addBook = async (data) => {
    try {
      const res = await axios.post('http://16.170.226.98/django/api/v1/books2', data)
      if (res.status === 200) {
        console.log(res.data)
        handleClose_add()
      }
    } catch (error) {
      console.log(error.response.msg)
    }
  }
  
  const handleDeleteBook = async (bookId) => {
    try {
      const res = await axios.get(`http://16.170.226.98/django/api/v1/books2`);
      const books = res.data.data;
      const bookToDelete = books.find((book) => book.book_id === bookId);
      
      if (bookToDelete) {
        await axios.delete(`http://16.170.226.98/django/api/v1/books2`, { data: { book_id: bookId } });
        console.log('Book deleted successfully');
        window.location.reload()
      } else {
        console.log('Book does not exist');
      }
    } catch (error) {
      console.log('Error deleting book:', error.response.data);
    }
  }
  
  return (<>
      {isSuperUser ? (<>
  <Button variant='danger' className='delete-all-books-btn' aria-label="delete"
  onClick={handleShow_delete}>
    <Modal style={{fontWeight: 'bold', direction: 'rtl'}}
     show={show_delete} onHide={handleClose_delete}>
      <Modal.Header>
        <Modal.Title>לחץ אישור למחיקת כל הספרים</Modal.Title>
        </Modal.Header>
        <Modal.Body>בלחיצה על הכפתור כל הספרים יימחקו לצמיתות</Modal.Body>
        <Modal.Footer>
          <Button variant='danger'>אישור</Button>
          <Button variant='secondary' onClick={handleClose_add}>ביטול</Button>
        </Modal.Footer>
        </Modal>
        <DeleteIcon/>מחק הכל
    </Button>
          <div style={{width: '310px', paddingBottom: '5px'}}>
            <Container className="mt-5">
              <Row><Col sm={4}>
                  <Form style={{ width: '290px', gap: '5px' }} className="d-flex">
                    <Form.Control type="search" placeholder="חפש ספר" className="me-2"
                      aria-label="Search" value={searchTerm} onChange={handleSearchChange}/>
                    <Button>חפש</Button>
                  </Form>
                </Col></Row>
            </Container>
          <Button variant="primary" onClick={handleShow_add}>הוסף ספר</Button>
          <Modal style={{ direction: 'rtl' }} show={show_add} onHide={handleClose_add}>
              <Modal.Header>
                <Modal.Title>מלא את הפרטים הבאים</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleAddBook}>
                  <Form.Group controlId="bookId">
                    <Form.Label>ת.ז הספר</Form.Label>
                    <Form.Control type="text" value={bookId}
                    onChange={(e) => setBookId(e.target.value)} required/>
                  </Form.Group>
                  <Form.Group controlId="bookName">
                    <Form.Label>שם הספר</Form.Label>
                    <Form.Control type="text" value={bookName}
                      onChange={(e) => setBookName(e.target.value)} required/>
                  </Form.Group>
                  <Form.Group controlId="bookGrade">
                    <Form.Label>כיתה</Form.Label>
                    <Form.Control type="text" value={bookGrade}
                      onChange={(e) => setBookGrade(e.target.value)} required/>
                  </Form.Group>
                  <Form.Group controlId="bookValue">
                    <Form.Label>ערך הספר</Form.Label>
                    <Form.Control
                      type="text" value={bookValue}
                       onChange={(e) => setBookValue(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="bookStorage">
                    <Form.Label>מלאי</Form.Label>
                    <Form.Control type="text" value={bookStorage}
                      onChange={(e) => setBookStorage(e.target.value)}/>
                  </Form.Group>
                  <Modal.Footer>
                    <Button variant="primary" type="submit"  onClick={handleAddBook}>
                      הוסף
                    </Button>
                    <Button variant="secondary" onClick={handleClose_add}>
                      ביטול
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
          <div>
            <Table striped bordered responsive style={{ direction: 'rtl' }}>
              <thead>
                <tr>
                  <th>שם הספר</th>
                  <th>כיתה</th>
                  <th>ת.ז הספר</th>
                  <th>מלאי</th>
                </tr>
              </thead>
              <tbody>
                {filteredStock.map((s) => {
                  return (
                    <tr key={s.book_id}>
                      <td style={{width: '500px'}}>
                        <Link to={`/dashboard/stock/book?book_id=${s.book_id}&book_name=${s.book_name}&book_grade=${s.book_grade}&book_storage=${s.storage}&book_value=${s.value}`}>
                          {s.book_name}
                        </Link>
                        <IconButton onClick={() => handleDeleteBook(s.book_id)}
                         style={{ float: 'left' }} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                        </td>
                      <td>{s.book_grade}</td>
                      <td>{s.book_id}</td>
                      <td>{s.storage}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </>
      ) : ""}
    </>)
}

export default InStock
