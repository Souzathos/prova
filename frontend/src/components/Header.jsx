import { LogOut } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Header({ page }) {
    const role = localStorage.getItem('role')

    function logout() {
        localStorage.clear()
        window.location.href = "/"
    }
    return (
        <div className='w-full bg-rose-100 p-3  rounded-2xl shadow-xl'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <h1 className='text-xl font-serif font-semibold text-gray-700 mr-2'>Wedding Pass <span>|</span></h1>
                  
                    <p className='text-sm text-gray-700'>{page}</p>
                </div>

                <div className='flex space-x-4'>
                    {role === "admin" && (
                        <Link className='text-gray-500 font-semibold' to="/dashboard">Dashboard</Link>
                    )}

                    <Link className='text-gray-500 font-semibold' to='/reception'>Recepção</Link>

                    {role === "admin" && (
                        <Link className='text-gray-500 font-semibold' to="/admin">Admin</Link>
                    )}
                </div>

                <LogOut onClick={logout} className='text-rose-500 text-sm cursor-pointer' />

            </div>

            


        </div>
    )
}

export default Header