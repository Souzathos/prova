import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Reception from './pages/Reception'
import PrivateRoutes from './components/PrivateRoutes'
import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reception' element={<Reception />}/>
        <Route path='/admin' element={<PrivateRoutes allowedRoles={["admin"]}><Admin /></PrivateRoutes>} />
        <Route path='/dashboard' element={<PrivateRoutes allowedRoles={["admin"]}><Dashboard /></PrivateRoutes>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
