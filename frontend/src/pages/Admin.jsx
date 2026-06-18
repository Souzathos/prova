import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import Header from '../components/Header'
import Hero from '../components/Hero'
import GuestCard from '../components/GuestCard'

function Admin() {
    const [guests, setGuests] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        name: "",
        email: "",
        cpf: "",
        phone: "",
        table_number: ""
    })

    const ref = useRef()
    const handlePrint = useReactToPrint({
        contentRef: ref
    })

    async function load() {
        try {
            setLoading(true)
            const res = await fetch('http://localhost:3000/guest/list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            setGuests(data)
        } finally {
            setLoading(false)
        }
    }

    async function save(id) {
        try {
            if(!form) {
                throw new Error('Formulário incompleto.')
            }

            if(editingId) {
                const res = await fetch(`http://localhost:3000/guest/update/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(form),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })
                if(!res.ok) throw new Error('Erro ao editar convidado')
            } else {
                const res = await fetch(`http://localhost:3000/guest/register`, {
                    method: 'POST',
                    body: JSON.stringify(form),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
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
            cpf: g.cpf || "",
            phone: g.phone || "",
            table_number: g.table_number || ""
        })
    }

    function resetForm() {
        setEditingId(null)
        setForm({
            name: "",
            email: "",
            cpf: "",
            phone: "",
            table_number: ""
        })
    }

    async function remove(id) {
        if(!confirm('Deseja mesmo excluir?')) return
        const data = await fetch(`http://localhost:3000/guest/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        load()
    }

    useEffect(() => {
        load()
    }, [])
  return (
    <div className='p-4 min-h-screen bg-[var(--cream)]'>
        <Header page="Painel Administrativo" />
        <Hero guests={guests} funcao={handlePrint} title="Administrativo"/>

        <div className='flex flex-col justify-between gap-10 mt-35 md:flex-row'>
            <div className='gap-2 mt-5 bg-white rounded-2xl shadow p-6 md:w-1/2'>
                <h3 className='text-xs text-[var(--warning)] tracking-widest'>NOVO CONVIDADO</h3>
                <h2 className='text-4xl font-serif mb-10'>Cadastro</h2>
                {error && (<p className='text-sm text-[var(--danger)] text-center'>{error.message}</p> )}

                <input type="text" placeholder='Nome Completo' value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                className='w-full text-[var(--dark-brown)] bg-white/80 cursor-pointer mb-10 border-b border-b-[var(--warm-gold)] py-4' />

                  <input type="email" placeholder='E-mail' value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                className='w-full text-[var(--dark-brown)] bg-white/80 cursor-pointer mb-10 border-b border-b-[var(--warm-gold)] py-4' />

                  <input type="text" placeholder='CPF' value={form.cpf} onChange={(e) => setForm({...form, cpf: e.target.value})}
                className='w-full text-[var(--dark-brown)] bg-white/80 cursor-pointer mb-10 border-b border-b-[var(--warm-gold)] py-4' />

                  <input type="text" placeholder='Telefone' value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                className='w-full text-[var(--dark-brown)] bg-white/80 cursor-pointer mb-10 border-b border-b-[var(--warm-gold)] py-4' />

                  <input type="text" placeholder='Número da mesa' value={form.table_number} onChange={(e) => setForm({...form, table_number: Number(e.target.value)})}
                className='w-full text-[var(--dark-brown)] bg-white/80 cursor-pointer mb-10 border-b border-b-[var(--warm-gold)] py-4' />
                
                <div className='flex gap-5'>
                    <button onClick={() => save(editingId)} className={`w-full cursor-pointer rounded-full mt-2 shadow p-4 font-semibold ${editingId ? "bg-[var(--warning)]/90 hover:bg-[var(--warning)] text-[var(--dark-brown)] transition"
                    : "bg-[var(--dark-brown)]/90 text-white hover:bg-[var(--dark-brown)] transition"
                    } cursor-pointer`}>{editingId ? "Atualizar" : "Cadastrar"}</button>

                    {editingId && (
                        <button onClick={resetForm} className='w-full rounded-full shadow bg-white hover:bg-white/80 p-4 mt-2 cursor-pointer border border-[var(--warm-gold)] text-[var(--dark-brown)] font-semibold'>Cancelar</button>

                    )}
                </div>
            </div>

            <div ref={ref} className='flex flex-col gap-2 mt-4 w-full'>
                    <div>
                        {guests.map(g => (
                            <GuestCard key={g.id} guest={g}>
                                <button onClick={() => edit(g)}
                                className='bg-[var(--warm-gold)]/90 hover:bg-[var(--warm-gold)] rounded-full cursor-pointer shadow px-5 py-2 mb-2 mt-2 font-semibold text-[var(--dark-brown)] transition'>
                                    Editar
                                </button>
                                <button className='bg-[var(--danger)]/80 hover:bg-[var(--danger)] cursor-pointer rounded-full shadow px-5 py-2 font-semibold text-white' onClick={() => remove(g.id)}>Excluir</button>
                            </GuestCard>
                        ))}
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Admin