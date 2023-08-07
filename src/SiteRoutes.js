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
import BooksValues from './pages/BooksValues'
import DashBords from './DashBoard/DashBords'
import AllRents from './DashBoard/AllRents'
import InStock from './DashBoard/InStock'
import ContactForm from './components/ContactForm'
import SuccessRenMsg from './components/SuccessRenMsg'
import Book from './DashBoard/Book'
import ClientRent from './DashBoard/ClientRent'



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
            <Route path='/success-rent-msg' element={<SuccessRenMsg/>}/>
            <Route path='/rent' element={<RentForm/>}/>
            <Route path='/book-prices' element={<BooksValues/>}/>
            <Route path='/dashboard' element={<DashBords/>}/>
            <Route path='/dashboard/rents' element={<AllRents/>}/>
            <Route path='/dashboard/stock' element={<InStock/>}/>
            <Route path='/dashboard/stock/book' element={<Book/>}/>
            <Route path='/make-contact' element={<ContactForm/>}/>
            <Route path='/client-rent' element={<ClientRent/>}/>
        </Routes>
  </>)
}

export default SiteRoutes