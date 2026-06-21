import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { PrivateRoute } from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Reception from './pages/Reception'
import Admin from './pages/Admin'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<PrivateRoute allowedRoles={["admin"]}> <Dashboard /></PrivateRoute> }/>
        <Route path='/reception' element={<Reception />}/>
        <Route path='/admin' element={<PrivateRoute allowedRoles={["admin"]}><Admin /></PrivateRoute>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
