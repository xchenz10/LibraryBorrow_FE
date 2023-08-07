import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { appContext } from '../App';

function Intro() {
  const { userLogged } = useContext(appContext)
  const nav = useNavigate()

  return (<>
  {!userLogged && (
    <div className='create-container' style={{alignItems: 'center'}}>
        ברוכים הבאים לפרוייקט השאלת הספרים.
        על מנת לבצע השאלה, לחצו המשך
        <br/>
        <br/>
        <Button style={{width: '100px', fontSize: '15px',
         alignItems: 'center', border:'white, solid', borderRadius:'12px'}} variant="contained"
          color="success" onClick={()=>{nav('/login')}}>
          המשך
        </Button>
    </div>
  )}
    
    </>)
}

export default Intro