import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { appContext } from '../App';


function ContactForm() {
const { userLogged } = useContext(appContext)
const [p_id, setP_id] = useState('')
const [c_msg, setC_msg] = useState('')
const [error, setError] = useState(false)
const [message, setMessage] = useState('')
const nav = useNavigate()


const handleSubmit = async (e) => {
  e.preventDefault()

  const data = {
      p_id: p_id ,
      c_msg: c_msg
    };
    try {
        const res = await axios.post('http://16.170.226.98/django/api/v1/contact-msg', data)
  
      if (res.status === 200) {
      nav("/success-msg")

      }
    } catch (error) {
      setError(true)
      setMessage(error.response.data.msg)
      return false
    }}


return (<>
{userLogged && (

    <div className="container">
    <div className="form-container">
    <h2>טופס ליצירת קשר</h2><br/>
    <form onSubmit={handleSubmit}>
    {error && <span className="error-message">{message}</span>}
        <div>
        <input placeholder='שם מלא' type="text"/>
        </div>
      <div>
        <input placeholder='תעודת זהות' type="text" value={p_id} onChange={(e) => setP_id(e.target.value)} />
      </div>
      <div>
        <textarea style={{height: '150px', width:'250px', borderRadius: '5px'}}
          placeholder='פרט את בעייתך כאן' type="text"
           value={c_msg} onChange={(e) => setC_msg(e.target.value)} />
      </div>
      <button type="submit">שלח כאן</button>
    </form>
    </div>
  </div>
)}
  
  </>);
};
export default ContactForm