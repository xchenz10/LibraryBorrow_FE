import React, { useEffect, useState, useContext } from 'react';
import { appContext } from '../App';
import { validateToken } from '../client';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import PupilModal from '../components/PupilModal';


function Home() {
  const { userLogged } = useContext(appContext);
  const [pupils, setPupils] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate()

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        const isAuthenticated = await validateToken(token);
        console.log('Is Authenticated:', isAuthenticated);
        if (isAuthenticated) {
          console.log('Token is authenticated');
            const res = await axios.get("http://127.0.0.1:8000/api/v1/", {
              headers: {
                Authorization: `Token ${token}`,
              },})
        console.log(res.data)
        setPupils(res.data)   
        } else {
          console.log('Token is not authenticated')
        }
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }}
    if (userLogged) {
      checkToken();
    } else {
      setLoading(false)
    }
  }, [userLogged])
  if (loading) {return <div>Loading...</div>}

  return (<>
  {!userLogged && (nav('/intro'))}<br/>

    <div>
    </div>
    {userLogged && (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px",
       justifyContent: 'center', alignItems: 'center'}}>
        {pupils.map((pupil)=>{return(<>
          <PupilModal p_name={pupil.full_name} p_id={pupil.personal_id}
           p_grade={pupil.grade}/>
        </>
        )})}
      </div>
      )}
    </>)
  }

export default Home;
