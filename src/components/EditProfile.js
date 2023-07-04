import React, { useState } from 'react';
import axios from 'axios';
import SuccessMsg from './SuccessMsg';
import { validateToken } from '../client';
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const nav = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault()

    const token = localStorage.getItem('token')
    const isAuthenticated = validateToken(token)

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      address: address,
    }
    const config = { headers: {'Content-Type': 'application/json',
          Authorization: `Token ${token}`,},}
    if (isAuthenticated)
    try {
      const response = await axios.put('http://127.0.0.1:8000/api/v1/edit-profile',
       data, config);

      if (response.status === 200) {
        setMessage(response.data.message);
        setIsSuccess(true);
      }
    } catch (error) {
      setMessage(error.data);
      setError(true)
    }
  };

  return (<>
    <div className='container'>
      <div className='form-container'>
        <h2>טופס עריכת פרופיל</h2>
        <form onSubmit={handleSubmit}>
            <div>
             {error && <span className='create-message'>{message && message}</span>}<br/>
            </div>
          <div>
            <label>שם פרטי:</label>
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>שם משפחה:</label>
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>Email:</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Address:</label>
            <input
              type='text'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type='submit'>Save Changes</button>
        </form>
      </div>
    </div>
    { isSuccess && (nav('/success-msg'))}
</>)
}

export default EditProfile;
