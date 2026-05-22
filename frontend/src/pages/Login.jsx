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
        <div className="min-h-screen bg-[#c9a48d] flex items-center justify-center p-6">
      
      {/* CARD PRINCIPAL */}
      <div className="w-full max-w-6xl bg-[#f5ebe4] rounded-sm overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        
        {/* IMAGEM */}
        <div className="relative hidden lg:block">
          
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop"
            alt="Wedding"
            className="w-full h-full object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-[#c79d84]/30"></div>

          {/* detalhes decorativos */}
          <div className="absolute inset-0 border border-white/30 m-8 rounded-full"></div>

          <div className="absolute top-10 left-10 w-32 h-32 border border-white/40 rounded-full"></div>

          <div className="absolute bottom-10 right-10 w-40 h-40 border border-white/40 rounded-full"></div>
        </div>

        {/* LOGIN */}
        <div className="flex items-center justify-center px-8 py-16 bg-[#f5ebe4]">
          
          <div className="w-full max-w-md">
            
            <p className="text-[#c9a48d] uppercase tracking-[4px] text-sm mb-3">
              Acesso restrito
            </p>

            <h1 className="text-6xl font-serif text-[#5a463b] mb-2">
              Wedding Pass
            </h1>

            <p className="text-[#9b7d6d] mb-10">
              Celebre cada momento
            </p>
              
              {/* EMAIL */}
              <div>
                <label className="block text-xs uppercase tracking-[3px] text-[#b1907d] mb-2">
                  E-mail
                </label>

                <input
                  type="email"
                  placeholder="noiva@weddingpass.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full
                    border-b
                    border-[#d8c4b8]
                    bg-transparent
                    py-3
                    outline-none
                    text-[#5a463b]
                    placeholder:text-[#bca79a]
                    focus:border-[#c8a15d]
                    transition
                  "
                />
              </div>

              {/* SENHA */}
              <div>
                <label className="block text-xs uppercase tracking-[3px] text-[#b1907d] mb-2">
                  Senha
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full
                    border-b
                    border-[#d8c4b8]
                
                    bg-transparent
                    py-3
                    outline-none
                    text-[#5a463b]
                    placeholder:text-[#bca79a]
                    focus:border-[#c8a15d]
                    transition
                  "
                />
              </div>

              {/* ERRO */}
              {error && (
                <p className="text-red-500 text-sm">
                  {error}
                </p>
              )}

              {/* BOTÃO */}
              <button
                onClick={handleLogin}
                className="
                  cursor-pointer
                  w-full
                  bg-[#c8a15d]
                  hover:bg-[#b88f4c]
                  transition
                  text-white
                  py-4
                  rounded-full
                  tracking-[2px]
                  uppercase
                  font-semibold
                  mt-6
                "
              >
                Entrar no painel
              </button>

              {/* DIVISOR */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-[#dbc9bf]"></div>

                <span className="text-[#b89b8a] text-sm uppercase">
                  ou
                </span>

                <div className="flex-1 h-px bg-[#dbc9bf]"></div>
              </div>

              {/* BOTÃO SECUNDÁRIO */}
              <button
                type="button"
                onClick={() => (window.location.href = "/register")}
                className="
                  w-full
                  border
                  border-[#d7c2b5]
                  text-[#8f7466]
                  py-4
                  rounded-full
                  uppercase
                  tracking-[2px]
                  hover:bg-[#efe2d9]
                  transition
                "
              >
                Criar novo usuário
              </button>

          </div>
        </div>
      </div>
    </div>
    )
}

export default Login