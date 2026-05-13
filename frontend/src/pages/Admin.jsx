import React, { useEffect, useState } from 'react'
import GuestCard from '../components/GuestCard'
import Header from '../components/Header'

function Admin() { 
    const [guests, setGuests] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        table_number: ""
    })


    async function load() {
        try {
            const res = await fetch("http://localhost:3000/guest/list", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json()
            setGuests(data)
        } catch(err) {
            console.log("Erro ao listar convidados", err)
        }
    }

    async function save(id) {
        try {

            if(!form.name || !form.email) {
                throw new Error('Nome e Email são obrigatorios')
            }

            if(editingId) {
                const res = await fetch(`http://localhost:3000/guest/update/${id}`, {
                method: "PUT",
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json',                    
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
                
            })
            if(!res.ok) throw new Error('Erro ao editar convidado')
            } else {
                const res = await fetch(`http://localhost:3000/guest/register`, {
                    method: "POST",
                    body: JSON.stringify(form),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(!res.ok) throw new Error('Erro ao criar convidado')
            }
            
            resetForm()
            load()
        } catch(err) {
            setError(err)
            throw new Error('Erro ao salvar convidado', err)
        }
    }


    function edit(g) {
        setEditingId(g.id) 
        setForm({
            name: g.name || "",
            email: g.email || "",
            phone: g.phone || "",
            table_number: g.table_number || ""
        })
    }
    function resetForm() {
        setEditingId(null)
        setForm({
            name: "",
            email: "",
            phone: "",
            table_number: ""
        })
    }

    async function remove(id) {
        if(!confirm('Deseja mesmo excluir? ')) return
        const data = await fetch(`http://localhost:3000/guest/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        } )
        load()
    }

    useEffect(() => {load()}, [])
  return (
    <div className='min-h-screen bg-rose-100 p-4'>

        <Header page="Painel administrativo"/>
        <div  className='gap-2 mt-6'>

            {error && (<p className='text-sm text-rose-500 text-center'>{error.message}</p>)}
            <input type="text" placeholder='Nome' value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
            className='w-full border border-gray-500 bg-white/80 cursor-pointer p-4 rounded-2xl shadow mb-4'/>

             <input type="email" placeholder='E-mail' value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
            className='w-full border border-gray-500 bg-white/80 cursor-pointer p-4 rounded-2xl shadow mb-4'/>


             <input type="text" placeholder='Telefone' value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
            className='w-full border border-gray-500 bg-white/80 cursor-pointer p-4 rounded-2xl shadow mb-4'/>

             <input type="text" placeholder='Número da mesa' value={form.table_number} onChange={(e) => setForm({...form, table_number: Number(e.target.value)})}
            className='w-full border border-gray-500 bg-white/80 cursor-pointer p-4 rounded-2xl shadow mb-4'/>
        </div>

        <div className='flex flex-col gap-2 mt-4'>
            <button onClick={() => save(editingId)} className={` w-full cursor-pointer rounded-2xl shadow p-3 font-semibold text-white ${editingId ? "bg-yellow-500 hover:bg-yellow-700 transition" : "bg-[#7dd607]   hover:bg-[#65af04] transition"} cursor-pointer`}>
                {editingId ? "Editar Convidado" : "Registrar convidado"}
            </button>

            {editingId && (
                <button onClick={resetForm} className='w-full rounded-2xl shadow bg-rose-500 hover:bg-rose-700 py-3 cursor-pointer text-white font-semibold'>Cancelar</button>
            )}

            <div className=''>
                {guests.map(g =>  (
                <GuestCard key={g.id} guest={g}>
                    <button onClick={() => edit(g)}
                    className='bg-yellow-500 hover:bg-yellow-700 rounded-2xl cursor-pointer shadow px-3 py-1 mb-2 mt-2 font-bold text-white'>
                        Editar
                    </button>

                    <button className='bg-rose-700 hover:bg-rose-500 cursor-pointer rounded-2xl shadow px-3 py-1 text-white font-bold' onClick={() => remove(g.id)}>Excluir</button>
                </GuestCard>
            ))}
            </div>
             
        </div>
    </div>

   
  )
}

export default Admin