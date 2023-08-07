import React, { useEffect, useState, useContext } from 'react';
import { appContext } from '../App';
import { validateToken } from '../client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PupilModal from '../components/PupilModal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Home() {
  const { userLogged } = useContext(appContext)
  const [pupils, setPupils] = useState([])
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token')
        const isAuthenticated = await validateToken(token)
        if (isAuthenticated) {
          const res = await axios.get("http://16.170.226.98/django/api/v1/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          setPupils(res.data)
        }
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    };

    if (userLogged) {
      checkToken();
    } else {
      setLoading(false)
      nav('/intro')
    }
  }, [userLogged, nav])

  if (loading) {
    return <div>Loading...</div>
  }

  return (<>
  
    {userLogged && (
      <>
        <div className='pupil-cards'>
          {pupils.map((pupil) => (
            <PupilModal key={pupil.personal_id} p_name={pupil.full_name} 
              p_id={pupil.personal_id}
              p_grade={pupil.grade}
              />))}
        </div>
        <div className='second-cards-container'>
        <Card
            className='second-cards'>
            <Card.Img className='image-card'
              variant="top" src="https://itu.cet.ac.il/wp-content/uploads/2019/06/stations_2-720x400.jpg"
            />
            <Card.Body>
              <Card.Title>האם נתקלתם בבעיה?</Card.Title>
              <Card.Text>
                בית הספר יחזור אליכם עם תשובה לבעייתכם עד 24 שעות
              </Card.Text>
              <Button variant="primary" onClick={() => nav('/make-contact')}>
              לחץ ליצירת קשר
              </Button>
            </Card.Body>
          </Card>
          <Card
            className='second-cards'>
            <Card.Img className='image-card'
              variant="top" src="https://previews.123rf.com/images/vvoennyy/vvoennyy1312/vvoennyy131200373/24613817-stack-of-old-used-books-isolated-on-white-background.jpg"
            />
            <Card.Body>
              <Card.Title>רשימת עלויות ספרים.</Card.Title>
              <Card.Text>
                במידה והינכם מחזירים ספר שאינו שמיש עוד.
              </Card.Text>
              <Button variant="primary" onClick={() => nav('/book-prices')}>
                לרשימת הספרים
              </Button>
            </Card.Body>
          </Card>
        </div>
      </>
    )}
  </>)
  }

export default Home;
