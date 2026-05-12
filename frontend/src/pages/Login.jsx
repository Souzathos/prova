import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    async function handleLogin() {
        try  {
            const response = await fetch('http://localhost:3000/user/login', {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {'Content-Type': 'application/json'}
            })
            const data = await response.json()

            if(data.user.role === "admin") {
                window.location.href = "/dashboard"
            } else {
                window;location.href = "/reception"
            }

        } catch(e) {
            setError('erro ao fazer login', e)            
        }
    }


  return (
    <div className='min-h-screen bg-rose-100 p-4'>
        <div className='flex flex-col items-center justify-center'>
           <div className='text-center w-80 shadow bg-white/80 rounded-2xl p-4 space-y-2'>
             <h1>
                Wedding Pass 
            </h1>
            <p className='text-xs mb-4'>Acesso Administração</p>
            
            {error && (
                <p className='text-rose-500 text-xs mb-4 font-semibold'>Erro ao fazer login</p>
            )}
            <input  placeholder='E-mail'
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-200 border border-gray-700 rounded p-2 shadow w-full' />

            <input type='password' placeholder='Senha'
            onChange={(e) => setPassword(e.target.value)}
            className='bg-gray-200 border border-gray-700 rounded p-2 shadow w-full' />

            <button onClick={handleLogin} className='w-full bg-rose-200 cursor-pointer p-2 rounded-2xl border border-rose-500'>Entrar</button>
           </div>
        </div>
    </div>
  )
}

export default Login