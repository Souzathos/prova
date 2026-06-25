import React, { useEffect, useState } from 'react'
import { login } from '../services/authService'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [feedback, setFeedback] = useState(null)

    async function handleLogin() {
        try {
            const data = await login(email, password)
            localStorage.setItem('role', data.safe.role)
            localStorage.setItem('token', data.token)

            if (data.safe.role === "admin") {
                window.location.href = "/admin"
            } else {
                window.location.href = "/reception"
            }
        } catch (e) {
            setFeedback({ type: 'error', message: e.message === 'Failed to fetch' ? 'Servidor indisponível. Tente novamente mais tarde.' : e.message })
        }
    }

    useEffect(() => {
        if (!feedback) return
        const t = setTimeout(() => setFeedback(null), 3000)
        return () => clearTimeout(t)
    }, [feedback])

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
                        className='w-full p-2 border-b border-b-[var(--warm-gold)] mt-2' />

                    <label className='p-2 text-[var(--warm-gold)] text-lg  semibold font-serif' >Senha</label>
                    <input type='password' placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-2 border-b border-b-[var(--warm-gold)] mt-2' />

                    {feedback && (
                        <p className={`mt-4 text-sm font-semibold text-center p-2 rounded-lg ${
                            feedback.type === 'error' ? 'text-[var(--danger)] bg-red-50' : 'text-[var(--success)] bg-green-50'
                        }`}>{feedback.message}</p>
                    )}
                    <button className='p-4 w-full shadow rounded-full bg-[var(--warm-gold)] mt-20 text-white text-lg cursor-pointer'
                        onClick={handleLogin}>Entrar</button>
                </div>
            </div>
        </div>
    )
}

export default Login
