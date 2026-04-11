import { useState } from 'react'
import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Home from './pages/Home'
import { useContext } from 'react'
import { Authcontext } from '../context/Authcontext'

function App() {
  const {authuser}=useContext(Authcontext)
  return (
    <div className='bg-gray-500'>
     <Routes>
      <Route path='/login' element={!authuser?<Login/>:<Home/>} />
      <Route path='/' element={authuser?<Home/>:<Login/>} />
      <Route path='/profile' element={authuser?<Profile/>:<Login/>} />
     </Routes>
    </div>
  )
}

export default App
