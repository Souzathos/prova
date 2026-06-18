import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)


    async function handleLogin() {
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {'Content-type': 'application/json'}
            })
            const data = await response.json()
            localStorage.setItem('role', data.user.role)
            localStorage.setItem('token', data.token)

            if(data.user.role === "admin") {
                window.location.href = "/dashboard"
            } else {
                window.location.href = "/reception"
            }
        } catch(e) {
            setError('erro ao fazer login', e)
        }
    }
  return (
    <div className='min-h-screen bg-[var(--ivory)] flex items-center justify-center p-6'>
            <div className='w-full max-w-6xl bg-[var(--cream)] rounded-sm overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2'>

                <div className='relative hidden lg:block'>
                    <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop" alt="Wedding"
                    className='w-full h-full object-cover' />
                </div>

                <div className='flex items-center justify-center px-8 py-16 bg-[var(--cream)]'>
                    <div className='w-full max-w-md'>
                            <p className='text-[var(--warning)] text-sm mb-3'>
                                Acesso Restrito
                            </p>
                            <h1 className='text-6xl font-serif text-[var(--dark-brown)] mb-2'>
                                Wedding Pass
                            </h1>

                            <p className='text-[var(--light-brown)] mb-10'>Celebre cada momento</p>

                            <div>
                               <label className='block text-xs text-[var(--blush)] mb-2'>E-mail</label> 

                               <input type="email" placeholder='example@email.com' value={email} 
                               onChange={(e) => setEmail(e.target.value)}
                               className='w-full border-b border-[value(--warm-gold)] bg-transparent py-3 outline-none text-[var(--dark-brown)] placeholder: text[var(--light-brown)] focus:border-[var(--warm-gold)] transition'/>
                            </div>

                            <div>
                                <label className='block text-xs  text-[var(--blush)] mt-2'>Senha</label>

                                <input type="password" placeholder='••••••••' value={password} onChange={(e) => setPassword(e.target.value)}
                                className='w-full border-b border-[value(--warm-gold)] bg-transparent py-3 outline-none text-[var(--dark-brown)] placeholder: text[var(--light-brown)] focus:border-[var(--warm-gold)] transition'/>
                            </div>

                            {error && (
                                <p className='text-[var(--danger)] text-sm'>{error}</p>
                            )}

                            <button onClick={handleLogin}   
                            className='cursor-pointer w-full bg-[var(--warm-gold)]/80 hover:bg-[var(--warm-gold)] transition py-4 rounded-full mt-6' >
                                Entrar
                            </button>
                    </div>
                </div>                

            </div>
    </div>
  )
}

export default Login