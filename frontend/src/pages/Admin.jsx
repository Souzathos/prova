import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import Hero from '../components/Hero'
import Header from '../components/Header'

function Admin() {
    const [guests, setGuests] = useState([])
    const [error, setError] = useState(null)
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(null)
    const [form, setForm] = useState({
        name: "",
        email: "",
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
            const res = await fetch(`http://localhost:3000/guest/list`, {
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
            if (!form.name || !form.email || !form.phone || !form.table_number) throw new Error('Formulário incompleto.')

            if (editingId) {
                if (!confirm('Deseja Atualizar o convidado?')) return
                const res = await fetch(`http://localhost:3000/guest/update/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                })
                if (!res.ok) throw new Error('Erro ao editar convidado')
                load()
                setEditingId(null)
                resetForm()
            } else {
                const res = await fetch('http://localhost:3000/guest/register', {
                    method: 'POST',
                    body: JSON.stringify(form),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'applcation/json'
                    }
                })
                if (!res.ok) throw new Error('Erro ao criar convidado')
                load()
                resetForm()
            }
        } catch (e) {
            setError('Erro ao salvar convidado', e)
        }
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

    function edit(g) {
        setEditingId(g.id)
        setForm({
            name: g.name || "",
            email: g.email || "",
            phone: g.phone || "",
            table_number: Number(g.table_number?.table_number) || ""
        })
    }

    async function remove(id) {
        try {
            if (!confirm('Deseja excluir o convidado?')) return
            const res = await fetch(`http://localhost:3000/guest/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
        } catch (e) {
            setError('Erro ao editar convidado', e)
        }
    }

    async function undoCheckin(id) {
        try {
            if (!confirm('Deseja desfazer o check-in?')) return
            const res = await fetch(`http://localhost:3000/guest/remove-checkin/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            load()
        } catch (e) {
            setError('Erro ao desfazer checkin', e)
        }
    }


    return (
        <div className='min-h-screen bg-[var(--cream)] p-4'>
            <Header page="admin" />
            <Hero page="admin" guests={guests} funcao={handlePrint} />

            <div className='w-full p-2 flex flex-col md:flex-row'>
                <div className='bg-[var(--ivory)] p-2 shadow rounded-2xl w-1/2'>
                    <p>Novo usuário</p>
                    <h2>Cadastro</h2>

                    <input type="text" placeholder='Nome Completo' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className='w-full p-2  border-b border-b-[var(--warm-gold)] mt-5' />
                    <input type="text" placeholder='E-mail' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className='w-full p-2  border-b border-b-[var(--warm-gold)] mt-5' />
                    <input type="text" placeholder='Telefome' value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className='w-full p-2  border-b border-b-[var(--warm-gold)] mt-5' />
                    <input type="text" placeholder='Número da mesa' value={form.table_number} onChange={(e) => setForm({ ...form, table_number: Number(e.target.value) })}
                        className='w-full p-2  border-b border-b-[var(--warm-gold)] mt-5' />

                    <button onClick={() => save()} className={`${editingId ? 'bg-[var(--warning)] ' : "bg-[var(--dark-brown)] border border-[var(--warm-gold)] text-[var(--ivory)]"}`}>{editingId ? 'Atualizar' : 'Cadastrar'}</button>
                </div>

                <div>

                </div>
            </div>
        </div>
    )
}

export default Admin