import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import RentForm from './RentForm';
import { appContext } from '../App';
import Intro from './Intro';


function Pupil() {
  const { userLogged } = useContext(appContext);
  const [rent, setRent] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getPupilRent = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const pupilId = params.get('p_id');
        if (pupilId) {
          const res = await axios.get(`http://16.170.226.98/django/api/v1/has-rent?p_id=${pupilId}`);
          setRent(res.data.msg);
        } else {
          console.log('no rent');
        }
        setLoading(false);
      } catch (error) {
        if (error.response) {
          console.error('Response data:', error.response.data);
        } 
        setLoading(false);
      }
    };
    getPupilRent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (<>
    {userLogged && (
    
      <div style={{ textAlign: 'right', direction: 'rtl' }}>
      {rent.length > 0 ? (
        <table>
          <p>הזמנה</p>
          <tbody>
            {rent.map((rentItem) => (
              <tr key={rentItem.id}>
                <td>
                <p>הזמנה בוצעה בתאריך: {new Date(rentItem.start_date).toLocaleDateString()}</p>
                  <p>יש להחזיר את הספרים עד: {new Date(rentItem.end_date).toLocaleDateString()}</p>
                  <p>ספרים שהוזמנו:</p>
                  <ul>
                    {Object.keys(rentItem)
                      .filter((key) => key.startsWith('book_') && rentItem[key])
                      .map((key) => (
                        <li key={key}>{rentItem[key].book_name}</li>
                      ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
          <RentForm/>
      )}
    </div>
    )}
    {!userLogged &&(
      <Intro/>
    )}
    
    </>);
}

export default Pupil;
