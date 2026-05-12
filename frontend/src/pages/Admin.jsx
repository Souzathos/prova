import React, { useEffect, useState } from 'react'
import GuestCard from '../components/GuestCard'

function Admin() { 
    const [guests, setGuests] = useState([])
    const [editingId, setEditingId] = useState(null)

    const [form, setForm] = useState({
        name: "",
        email: "",
        cpf: "",
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

            if(!form.name || !form.cpf) {
                throw new Error('Nome e CPF são obrigatorios')
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
            throw new Error('Erro ao salvar convidado', err)
        }
    }


    function edit(g) {
        setEditingId(g.id) 
        setForm({
            name: g.name || "",
            email: g.email || "",
            cpf: g.cpf || "",
            phone: g.phone || "",
            table_number: g.table_number || ""
        })
    }
    function resetForm() {
        setEditingId(null)
        setForm({
            name: "",
            cpf: "",
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

        <div  className='space-y-4 mt-6'>
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
            <button onClick={() => save(editingId)} className={`w-full rounded-2xl shadow p-3 ${editingId ? "bg-yellow-500" : "bg-rose-400"} cursor-pointer`}>
                {editingId ? "Editar Convidado" : "Registrar convidado"}
            </button>

            {editingId && (
                <button onClick={resetForm} className='w-full rounded-2xl shadow bg-rose-500 py-3'>Cancelar</button>
            )}

            <div className=''>
                {guests.map(g =>  (
                <GuestCard key={g.id} guest={g}>
                    <button onClick={() => edit(g)}
                    className='bg-yellow-500 rounded shadow px-3 py-1 mb-2 font-bold text-white'>
                        Editar
                    </button>

                    <button className='bg-rose-700 rounded shadow px-3 py-1 text-white font-bold' onClick={() => remove(g.id)}>Excluir</button>
                </GuestCard>
            ))}
            </div>
             
        </div>
    </div>

   
  )
}

export default Admin