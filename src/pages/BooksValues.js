import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Table from 'react-bootstrap/Table';


function BooksValues() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    
    const getBooks = async () => {
        try{
            const res = await axios.get(`http://16.170.226.98/django/api/v1/book-value`)
            if (res.status === 200)
            setBooks(res.data.data)
            console.log(res.data.data)
        }catch (error) {
            console.log(error)
        }
        
    }


    getBooks()
}, [])
  
  
    return (<>
    <div>
    <Table striped="columns" style={{direction: 'rtl'}}>
      <thead>
        <tr>
          <th>שם הספר</th>
          <th>כיתה</th>
          <th>ת.ז הספר</th>
          <th>מחיר</th>
        </tr>
      </thead>
      <tbody>
                {books.map((book)=>{return(
                    <tr key={book.book_id}>
                        <td style={{border: 'orange solid 1px'}}>{book.book_name}</td>
                        <td style={{border: 'orange solid 1px'}}>{book.book_grade}</td>
                        <td style={{border: 'orange solid 1px'}}>{book.book_id}</td>
                        <td style={{border: 'orange solid 1px'}}>{book.value}</td>
                </tr>
                )})}
            </tbody>
    </Table>
    </div>
        </>)
}

export default BooksValues