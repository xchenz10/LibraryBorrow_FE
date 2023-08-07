import React, { useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { appContext } from '../App';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const { userLogged, userName, setUserLogged } = useContext(appContext)
  const location = useLocation()
  const path = location.pathname
  const nav = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)}
  const handleClose = () => {setAnchorEl(null)}
  const SuperUser = JSON.parse(localStorage.getItem("isSuperUser"));
  const isSuerUser = SuperUser ?? false ; 

  return (<>
      <nav className='navbar'>
        <Link to="/">השאלת ספרים</Link>
        <ul>
          {!userLogged && (<>
            <div className='hello'>שלום אורח/ת</div>
              <li className={path === "/login" ? "active" : ""}>
                <Link to="/login">התחבר/י</Link>
              </li>
              <li className={path === "/signup" ? "active" : ""}>
                <Link to="/sign-up">צור/י משתמש</Link>
              </li>
            </>)}
          {userLogged && (<>
              <div className='hello'>שלום {userName}</div>
              <li className={path === "/" ? "active" : ""}>
                <Link to="/">דף הבית</Link>
              </li>
              {isSuerUser ? (
                 <li className={path === "/" ? "active" : ""}>
                 <Link to="/dashboard">Dashboard</Link>
               </li>
              ) : ""}
              <li>
              <NavDropdown style={{direction:'ltr'}} title="איזור אישי " id="basic-nav-dropdown">
              <div className='drop-down'>
                  <NavDropdown.Item className='nav-dropdown-item' href="#action/3.1"
                  onClick={()=>{nav('/make-contact')}}>
                    צור קשר
                    <ContactSupportIcon style={{marginRight: '59px'}}/>
                  </NavDropdown.Item>
                  <NavDropdown.Item className='nav-dropdown-item' 
                  onClick={()=>{nav('/create-pupil')}}>
                    הוסף תלמיד
                    <PersonAddIcon style={{ marginRight: '38px'}}/>
                  </NavDropdown.Item>
                  <NavDropdown.Item className='nav-dropdown-item' 
                    onClick={()=>{nav('/edit-profile')}}>
                    הפרופיל שלי
                    <AccountCircleIcon style={{ marginRight: '30px'}}/>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item  className={path === "/login" ? "active" : ""}
                    style={{direction:'rtl'}} onClick={() => {
                    localStorage.removeItem("token")
                    setUserLogged(false)
                    localStorage.removeItem("isSuperUser")
                    nav("/login")}}>
                      התנתק
                      <LogoutIcon style={{ marginRight: '80px'}}/>
                  </NavDropdown.Item>
                </div>
            </NavDropdown>
              </li>
            </>)}
        </ul>
      </nav>
    </>)
}

export default Navbar;
