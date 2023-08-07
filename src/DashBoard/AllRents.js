import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

function AllRents() {
  const [rents, setRents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const SuperUser = JSON.parse(localStorage.getItem("isSuperUser"));
  const isSuerUser = SuperUser ?? false ; 
  const nav = useNavigate()


  useEffect(() => {
    const getRents = async () => {
      try {
        const res = await axios.get('http://16.170.226.98/django/api/v1/rents');
        if (res.status === 200) {
          setRents(res.data.data);
          console.log(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRents();
  }, []);

  const totalPages = Math.ceil(rents.length / itemsPerPage);

  const indexOfLastRent = currentPage * itemsPerPage;
  const indexOfFirstRent = indexOfLastRent - itemsPerPage;
  const currentRents = rents.slice(indexOfFirstRent, indexOfLastRent);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (<>
    {isSuerUser ? (
      <div>
      <Pagination>
        {pageNumbers.map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
      </Pagination>
      <table className="table table-striped table-bordered" style={{ direction: 'rtl' }}>
        <thead>
          <tr>
            <th>שם התלמיד</th>
            <th>ת.ז התלמיד</th>
            <th>כיתה</th>
            <th>תאריך השכרה</th>
            <th>תאריך החזרה</th>
          </tr>
        </thead>
        <tbody>
          {currentRents.map((rent) => (
            <tr key={rent.client.personal_id}>
              <td><Link to={`/client-rent?p_id=${rent.client.personal_id}`}>
                {rent.client.full_name}
              </Link></td>
              <td>{rent.client.personal_id}</td>
              <td>{rent.client.grade}</td>
              <td>{new Date(rent.start_date).toLocaleDateString()}</td>
              <td>{new Date(rent.end_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    ) : "" }
    
    </>);
}

export default AllRents;
