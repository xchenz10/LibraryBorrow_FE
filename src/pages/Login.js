import React, { useContext, useState } from "react";
import { getLoginToken, validateToken } from "../client";
import { appContext } from "../App";
import { useNavigate } from "react-router";


function Login() {
  const [un, setUn] = useState("")
  const [pw, setPw] = useState("")
  const [error, setError] = useState(false)
  const { setUserLogged, setUserName, userLogged } = useContext(appContext)
  const nav = useNavigate()

  const handleSubmit = async () => {
    const token = await getLoginToken(un, pw)
    if (token) {
      setUserLogged(true)
      const data = await validateToken()
      setUserName(data.user)
      nav("/")
    } else {
      setError(true)
    }
  };

  return (<>
  {!userLogged &&(
      <div className="login-container">
      <h2 className="login-title"> התחברות </h2>
      <input className="login-input" placeholder="שם משתמש"
        onChange={(e)=>{setUn(e.target.value)}}
      /><br/>
      
      <input
        className="login-input" type="password" placeholder="סיסמה"
        onChange={(e)=>{setPw(e.target.value)}}
      /><br/>

      <div className="button-group">
        <button className="login-button" onClick={handleSubmit}>
          לחץ להתחברות
        </button>
        <button className="signup-button" onClick={()=>{nav('/sign-up')}}>
          להרשמה
        </button>
      </div>
      <br />
      <br />
      {error && (
        <p className="error-message">
          שם משתמש או סיסמה אינם נכונים. נסה שנית
        </p>
      )}
    </div>

  )}
      
    </>
  );
}

export default Login;