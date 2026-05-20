import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    async function handleLogin() {
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()

            localStorage.setItem('token', data.token)
            localStorage.setItem('role', data.user.role)

            if (data.user.role === "admin") {
                window.location.href = "/dashboard"
            } else {
                window; location.href = "/reception"
            }

        } catch (e) {
            setError('erro ao fazer login', e)
        }
    }


    return (
        <div className='min-h-screen bg-amber-100'>
            <div className='flex h-full w-full'>
                <img src="../assets/images/img-login.jpg" alt="" />
                <div className='min-h-scren w-1/2'>
                    
                </div>
                <div className='min-h-screen w-1/2 bg-[#F5EDE2] flex flex-col p-6 items-start '>
                    <div className='flex flex-col mt-40 items-start gap-1 ml-15'>
                        <p className='text-2xl text-[#C9A86A]'>- Acesso restritivo - </p>
                        <h1 className='text-7xl font-serif'>Wedding Pass</h1>
                        <p className='text-lg text-[#C9A86A] '>Continue de onde voce parou</p>
                    </div>

                    <div className='flex flex-col mt-20 items-start gap-1 ml-15 w-220'>
                        
                    {error && (
                        <p className='flex justify-center text-rose-500 text-md mt-7 font-semibold w-full'>Erro ao fazer login</p>
                    )}
                        <p className='text-[#C9A86A] text-xl font-serif mb-4'>E-mail</p>
                        <input placeholder='example@email.com' className='border-b border-gray-600 p-4  rounded  w-full' onChange={(e) => setEmail(e.target.value)} />

                        <p className='text-[#C9A86A] text-xl font-serif mb-4 mt-8'>Senha</p>
                        <input type='password' placeholder='********' className='border-b border-gray-600 p-4  rounded shadow w-full' onChange={(e) => setPassword(e.target.value)} />

                        <button onClick={handleLogin}
                            className='bg-[#C9A86A] text-white p-6 w-full rounded-full text-2xl font-bold shadow mt-10 cursor-pointer'>Entrar no painel</button>
                        <div className='flex items-center w-full gap-4 mt-8'>
                            <hr className='flex-1 border-[#C9A86A]' />

                            <p className='text-[#C9A86A] font-serif'>Ou</p>

                            <hr className='flex-1 border-[#C9A86A]' />
                        </div>

                        <button onClick={handleLogin}
                            className='bg-[#F5EDE2] text-[#C9A86A] p-6 w-full border rounded-full text-2xl font-bold shadow mt-10 cursor-pointer'>Criar novo usuário</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login