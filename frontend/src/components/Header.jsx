import React from 'react'
import { Link } from 'react-router-dom'

function Header({page}) {
    const role = localStorage.getItem('role')
    
    function logOut() {
        localStorage.clear()
        window.location.href = "/"
    }
  return (
    <div className='w-full bg-[var(--ivory)] p-4 shadow flex justify-between sm:flex-wrap'>
        <div className='flex flex-col items-center '>
            <h2>Wedding Pass</h2>
            <p>{page}</p>
        </div>
        
        <div className='space-x-2 items-center mt-2'>
            {role === "admin" && (
                <Link to="/admin">Admin</Link>
            )}
            <Link to="/reception" >Recepção</Link>
        </div>

        <button className='rounded-full px-8 cursor-pointer py-2 bg-[var(--dark-brown)] text-[var(--ivory)]' onClick={logOut}> Sair</button>
    </div>
  )
}

export default Header