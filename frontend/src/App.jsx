import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Reception from './pages/Reception'
import PrivateRoutes from './components/PrivateRoutes'
import Admin from './pages/Admin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reception' element={<Reception />}/>
        <Route path='/admin' element={<PrivateRoutes allowedRoles={["admin"]}><Admin /></PrivateRoutes>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
