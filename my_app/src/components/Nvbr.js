import React, { useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { appContext } from '../App';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

function Navbar() {
  const { userLogged, userName, setUserLogged } = useContext(appContext)
  const location = useLocation()
  const path = location.pathname
  const nav = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)}
  const handleClose = () => {setAnchorEl(null)}



  return (<>
      <nav className='navbar'>
        <Link to="/">Site-Name</Link>
        <ul>
          {!userLogged && (<>
            <div className='hello'>שלום אורח/ת</div>
              <li className={path === "/" ? "active" : ""}>
                <Link to="/">Home</Link>
              </li>
              <li className={path === "/login" ? "active" : ""}>
                <Link to="/login">Log in</Link>
              </li>
              <li className={path === "/signup" ? "active" : ""}>
                <Link to="/sign-up">Sign Up</Link>
              </li>
            </>)}
          {userLogged && (<>
              <div className='hello'>שלום {userName}</div>
              <li className={path === "/" ? "active" : ""}>
                <Link to="/">דף הבית</Link>
              </li>
              <li>
              <Button style={{backgroundColor: '-moz-initial',
               color: '#9c801a', fontSize: '15px'}}
               id="fade-button"
               aria-controls={open ? 'fade-menu' : undefined}
               aria-haspopup="true" aria-expanded={open ? 'true' : undefined}
               onClick={handleClick}>איזור אישי</Button>
              <Menu id="fade-menu" MenuListProps={{'aria-labelledby': 'fade-button',}}
                anchorEl={anchorEl}open={open} onClose={handleClose}
                TransitionComponent={Fade}>
                <MenuItem onClick={()=>{nav('/edit-profile')}}>הפרופיל שלי</MenuItem>
                <MenuItem onClick={handleClose}>התלמידים שלי </MenuItem>
                <MenuItem onClick={handleClose}>צור קשר</MenuItem>
                <MenuItem onClick={handleClose}>אודות</MenuItem>
              </Menu>
              </li>
              <li className={path === "/login" ? "active" : ""}>
                <a style={{ direction: 'rtl' }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    setUserLogged(false)
                    nav("/login")}}>התנתק</a>
              </li>
            </>)}
        </ul>
      </nav>
    </>)
}

export default Navbar;
