import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../client';
import { appContext } from '../App';
import { MDBBtn } from 'mdb-react-ui-kit';

function SignUpForm() {

  const { setUserLogged, setUserName, userLogged } = useContext(appContext)


  const [parent_id, setParentId] = useState('');
  const [address, setAddress] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('');

  const nav = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
        parent_id: parent_id , password: password,
        confirm_password: confirm_password,
        address: address, first_name: first_name,
        last_name: last_name, email: email,
      };
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/v1/sign-up", data);
    
        if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        setUserLogged(true);
        const data = await validateToken();
        setUserName(data.user);
        nav("/create-pupil");
        return res.data.token;

        }
      } catch (error) {
        setError(true)
        setMessage(error.response.data.message);
        return false
      }}


  return (<>
    {!userLogged && (
      <div className="container">
      <div className="form-container">
      <h2>מלא/י את הפרטים הבאים</h2><br/>
      <form onSubmit={handleSubmit}>
      {error && <span className="error-message">{message}</span>}
        <div>
          <input placeholder='תעודת זהות' type="text" value={parent_id} onChange={(e) => setParentId(e.target.value)} />
        </div>
        <div>
          <input placeholder='סיסמא' type="password" id="password" name="password"
           value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <input placeholder='אימות סיסמא' type="password" id="c_password" name="c_password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div>
          <input placeholder='שם פרטי' type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <input placeholder='שם משפחה' type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <input placeholder='אימייל' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <input placeholder='כתובת מלאה' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <button type="submit">לחץ כאן להרשמה</button>
      </form>
      </div>
    </div>
    )}
    {userLogged && (
      nav('/')
    )}
    
    </>);
};

export default SignUpForm;
