import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Intro() {
  const nav = useNavigate()

  return (<>
    <div className='create-container' style={{alignItems: 'center'}}>
        ברוכים הבאים,
        מיד נתחיל במספר צעדים פוטים.
        <br/>
        <br/>
        <Button style={{width: '100px', fontSize: '15px',
         alignItems: 'center', border:'white, solid', borderRadius:'12px'}} variant="contained"
          color="success" onClick={()=>{nav('/login')}}>
          המך
        </Button>
    </div>
    </>)
}

export default Intro