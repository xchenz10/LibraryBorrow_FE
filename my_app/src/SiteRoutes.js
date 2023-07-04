import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUpForm from './components/SignUpForm'
import CreatePupil from './components/CreatePupil'
import Intro from './components/Intro'
import Pupil from './components/Pupil'
import EditProfile from './components/EditProfile'
import SuccessMsg from './components/SuccessMsg'
import RentForm from './components/RentForm'



function SiteRoutes() {
  return (<>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/intro' element={<Intro/>}></Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/sign-up' element={<SignUpForm/>}/>
            <Route path='/create-pupil' element={<CreatePupil/>}/>
            <Route path='/pupil' element={<Pupil/>}/>
            <Route path='/edit-profile' element={<EditProfile/>}/>
            <Route path='/success-msg' element={<SuccessMsg/>}/>
            <Route path='/rent' element={<RentForm/>}/>
        </Routes>
  </>)
}

export default SiteRoutes