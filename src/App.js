import { useState, createContext, useEffect } from 'react';
import './App.css';
import SiteRoutes from './SiteRoutes';
import Navbar from './components/Nvbr';
import { validateToken } from "./client";
import './CSS/Nvbr.css'
import './CSS/Login.css'
import './CSS/SignUpForm.css'
import './CSS/CreatePupil.css'
import './CSS/Home.css'
import './CSS/RentForm.css'
import './CSS/Spinner.css'
import './CSS/Dashboard.css'

export const appContext = createContext(null)

function App() {

    const [userLogged, setUserLogged] = useState(false)
    const [userName, setUserName] = useState("")
  
    useEffect(() => {
      validateToken().then((response) => {
        
        if (response) {      
          setUserLogged(true)
          setUserName(response.user)
        }
      });
    }, []);
  

  return (<>
    <appContext.Provider value={{ userLogged, setUserLogged, userName ,
       setUserName }}>
      <Navbar/>
      <SiteRoutes/>
    </appContext.Provider>
  </>)
}

export default App;
