import React, { useContext, useState } from 'react';
import { validateToken } from '../client';
import { useNavigate } from 'react-router-dom';
import { appContext } from '../App';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';



function CreatePupil() {
  const {userLogged} = useContext(appContext)
  const [personal_id, setPersonal_id] = useState('')
  const [full_name, setFull_name] = useState('')
  const [grade, setGrade] = useState('')
  const [error, setError] = useState(false)
  const [msg, setMsg] = useState('')
  const [addAnother, setAddAnother] = useState(false);
  const nav = useNavigate()
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const isAuthenticated = validateToken(token);

      const data = { personal_id: personal_id,
        full_name: full_name,
        grade: grade,};
      
        const config = { headers: {'Content-Type': 'application/json',
          Authorization: `Token ${token}`,},};

    if (isAuthenticated)
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/v1/create-pupil",
         data, config);
        if (res.status === 200)
        if (addAnother) {
          window.location.reload();
        } else {
          nav('/');
        }
      } catch (error) {
        setError(true)
        setMsg(error.response.data.msg);
      }
    
      
   }
  return (<>
  {userLogged && (
    <div className='create-container'>
    <h2 className='create-title'>פרטי התלמיד</h2>
    <form className='create-form' onSubmit={handleSubmit}>
      {error && <span className='create-message'>{msg && msg}</span>}<br/>
      <input className='create-input' type="number" placeholder="תעודת זהות" 
      value={personal_id} onChange={(event)=>{setPersonal_id(event.target.value)}}/><br/><br/>
      <input className='create-input' type="text" placeholder="שם מלא"
      value={full_name} onChange={(event)=>{setFull_name(event.target.value)}}/><br/><br/>
      <div>
      <label>אנא בחר/י כיתה:</label><br/>
      <FormControl className='grade'>
        <InputLabel id="demo-controlled-open-select-label" style={{paddingRight:'19px'}}>
          לחץ
        </InputLabel>
        <Select labelId="demo-controlled-open-select-label"
         id="demo-controlled-open-select" open={open} onClose={handleClose}
         onOpen={handleOpen} value={grade} label="כיתה" onChange={handleChange}>
          <MenuItem value=""><em>אנא בחר/י כיתה</em></MenuItem>
          <MenuItem value={"א"}>א</MenuItem>
          <MenuItem value={"ב"}>ב</MenuItem>
          <MenuItem value={"ג"}>ג</MenuItem>
          <MenuItem value={"ד"}>ד</MenuItem>
          <MenuItem value={"ה"}>ה</MenuItem>
          <MenuItem value={"ו"}>ו</MenuItem>
        </Select>
      </FormControl>
    </div><br/><br/>
      <div className='c-button-group'>
          <input className='create-button' type="submit" value="שמור"/><br/><br/>
          <input className='create-button2' type="submit" value="שמור והוסף תלמיד נוסף"
            onClick={()=>{setAddAnother(true)}}/><br/>
      </div>
    </form>
  </div>
  )}
  {!userLogged && (
    <div className='create-container' style={{alignItems: 'center'}}>
      על מנת להוסיף תלמיד עליך להתחבר
    </div>
  )}
  </>)
}

export default CreatePupil;
