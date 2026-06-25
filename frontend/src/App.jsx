import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Reception from './pages/Reception'
import { PrivateRoute } from './components/PrivateRoute'
import Admin from './pages/Admin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/reception' element={<Reception />} />
          <Route path="/admin" element={<PrivateRoute allowedRoles={["admin"]}><Admin /></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
