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
        <div className='w-full bg-[#FBF7F2] p-4 rounded-2xl shadow-xl'>
            <div className='flex items-center justify-between sm:flex flex-wrap'>
                <div className='flex flex-col '>
                    <p className='text-sx text-[#C9A86A] font-mono'>Wedding Pass</p>
                    <h1 className='text-3xl font-serif font-light'>Recepção</h1>
                </div>
                <div className='flex space-x-6 items-center'>
                    {role === "admin" && (
                        <Link to="/dashboard">Dashboard</Link>
                    )}
                    <Link to="/reception" >Recepção</Link>

                    {role === "admin" && (
                        <Link to="/admin">Admin</Link>
                    )}


                    <button className='flex items-center justify-center text-xs bg-[#3D2E26] rounded-full text-white px-4 py-2 gap-2 cursor-pointer' onClick={() => logout()}>   <LogOut size={18} />
                        Sair
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header