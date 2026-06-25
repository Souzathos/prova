import React, { useEffect, useState } from 'react'
import { login } from '../services/authService'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    async function handleLogin() {
        try {
            const data = await login(email, password)
            localStorage.setItem('role', data.safe.role)
            localStorage.setItem('token', data.token)
            
            if(data.safe.role === `admin`) {
                window.location.href = "/admin"
            } else {
                window.location.href = "/reception"
            }
        } catch(e) {
            setError(e.message || 'Erro ao fazer login')
        }

    }

    useEffect(() => {
        if(!error) return
        const t = setTimeout(() => setError(null), 3000)
        return () => clearTimeout(t)
    })

  return (
    <div className='min-h-screen flex justify-center items-center p-4 bg-[var(--cream)]'>
        <div className='flex w-full rounded shadow bg-[var(--ivory)]'>
            <div className='w-1/2 rounded hidden md:block'>
                    <img src="https://images.pexels.com/photos/28998608/pexels-photo-28998608.jpeg" alt="" />
            </div>
            <div className='flex flex-col p-4 w-full md:w-1/2 mt-10'>
                <div className='flex flex-col mt-10'>
                    <p className='text-[var(--dark-brown)] text-xl font-serif'>Acesso restrito</p>
                    <h2 className='text-[var(--warm-gold)] text-7xl font-serif'>Senac Wedding</h2>
                    <p className='text-[var(--dark-brown)] text-lg mt-2'>Bem-vindo(a)!</p>
                </div>

                <label className='p-2 text-[var(--warm-gold)] text-lg mt-20 semibold font-serif' >E-mail</label>
                <input type="text" placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} 
                className='w-full p-2 border-b border-b-[var(--warm-gold)] mt-2'/>

                <label className='p-2 text-[var(--warm-gold)] text-lg  semibold font-serif' >Senha</label>
                <input type='password' placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)} 
                className='w-full p-2 border-b border-b-[var(--warm-gold)] mt-2'/>


                {error && (<p className='text-[var(--danger)] text-sm'>{error}</p>)}
                <button className='p-4 w-full shadow rounded-full bg-[var(--warm-gold)] mt-20 text-white text-lg cursor-pointer'
                onClick={handleLogin}>Entrar</button>
            </div>
        </div>
    </div>
  )
}

export default Login
