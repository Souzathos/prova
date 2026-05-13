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
        <div className='w-full bg-[#ffe8e9] p-4 border border-rose-200 rounded-2xl shadow-xl'>
            <div className='flex justify-between sm:flex flex-wrap items-center'>
                <div className='flex items-center gap-2'>
                    <h1 className='text-sm font-serif font-semibold text-gray-700 sm:text-xl'>Wedding Pass <span>|</span></h1>
                  
                    <p className='text-sm text-gray-700'>{page}</p>
                </div>

                <div className='flex gap-10 items-center '>
                    {role === "admin" && (
                        <Link className='text-gray-500 font-semibold' to="/dashboard">Dashboard</Link>
                    )}

                    <Link className='text-gray-500 font-semibold' to='/reception'>Recepção</Link>

                    {role === "admin" && (
                        <Link className='text-gray-500 font-semibold' to="/admin">Admin</Link>
                    )}

                    <LogOut onClick={logout} className='text-rose-500 text-sm cursor-pointer' />
                </div>


            </div>

            


        </div>
    )
}

export default Header