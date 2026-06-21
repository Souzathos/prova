import React from 'react'
import { Link } from 'react-router-dom'
import {LogOut } from 'lucide-react'

function Header({page}) {
    const role = localStorage.getItem('role') 

    function logout() {
        localStorage.clear()
        window.location.href = "/"
    }
  return (
    <div className='w-full bg-[var(--ivory)] p-4 rounded-2xl shadow-xl'>
        <div className='flex items-center justify-between sm:flex flex-wrap'>
            <div className='flex flex-col'>
                    <p className='text-sx text-[var(--warm-gold)] font-mono'>Wedding Pass</p>
                    <h1 className='text-3xl font-serif font-light'>Recepção</h1>
            </div>

            <div className='flex space-x-6 items-center'>
                {role === "admin" && (
                    <Link to="/dashboard">Dashboard</Link>
                )}

                <Link to="/reception">Recepção</Link>

                {role === "admin" && (
                    <Link to="/Admin">Administração</Link>
                )}
            </div>

            <button className='flex items-center justify-center cursor-pointer gap-2 px-4 py-2 rounded-full bg-[var(--dark-brown)] text-white' onClick={logout}>
                <LogOut size={18} />Sair
            </button>
        </div>

    </div>
  )
}

export default Header