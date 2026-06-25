import React, { use, useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import Hero from '../components/Hero'
import Header from '../components/Header'
import GuestCard from '../components/GuestCard'
import { listGuests, registerGuest, updateGuest, deleteGuest, undoCheckinGuest } from '../services/guestService'

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
    const [sucess, setSucess] = useState('')

    const ref = useRef()
    const handlePrint = useReactToPrint({
        contentRef: ref
    })

    async function load() {
        try {
            setLoading(true)
            const data = await listGuests()
            setGuests(data)
        } finally {
            setLoading(false)
        }
    }

    async function save(id) {
        try {
            if (editingId) {
                if (!confirm('Deseja Atualizar o convidado?')) return
                await updateGuest(editingId, form)
                load()
                setSucess('Convidado atualizado com sucesso!')
                setEditingId(null)
                resetForm()
            } else {
                if (!form.name || !form.email || !form.phone || !form.table_number) throw new Error('Formulário incompleto.')
                await registerGuest(form)
                setSucess('Convidado registrado com sucesso!')
                load()
                resetForm()
            }
        } catch (e) {
            setError(e.message)
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
            await deleteGuest(id)
            setSucess('Convidado deletado com sucesso!')
            load()
        } catch (e) {
            setError(e.message)
        }
    }

    async function undoCheckin(id) {
        try {
            if (!confirm('Deseja desfazer o check-in?')) return
            await undoCheckinGuest(id)
            setSucess('Check-in desfeito com sucesso!')
            load()
        } catch (e) {
            setError(e.message)
        }
    }

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if(!error) return
        const t = setTimeout(() => setError(null), 3000)
        return () => clearTimeout(t)
    }, [error])

    useEffect(() => {
        if(!sucess) return
        const t = setTimeout(() => setSucess(null), 3000)
        return () => clearTimeout(t)
    }, [sucess])

    return (
        <div className='min-h-screen bg-[var(--cream)] p-4'>
            <Header page="admin" />
            <Hero page="admin" guests={guests} funcao={handlePrint} />

            <div className='w-full p-2 flex flex-col md:flex-row gap-3 items-center md:items-start'>
                <div className='bg-[var(--ivory)] p-2 shadow rounded-2xl w-full md:w-1/2'>
                    <p>Novo usuário</p>
                    <h2>Cadastro</h2>

                    {error && (<p className='text-[var(--danger)] text-xs text-center'>{error}</p>)}
                    {sucess && (<p className='text-[var(--light-green)] text-xs text-center'>{sucess}</p>)}

                    <input type="text" placeholder='Nome Completo' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className='w-full p-2  border-b border-b-[var(--warm-gold)] mt-5' />
                    <input type="text" placeholder='E-mail' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className='w-full p-2  border-b border-b-[var(--warm-gold)] mt-5' />
                    <input type="text" placeholder='Telefome' value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className='w-full p-2  border-b border-b-[var(--warm-gold)] mt-5' />
                    <input type="text" placeholder='Número da mesa' value={form.table_number} onChange={(e) => setForm({ ...form, table_number: Number(e.target.value) })}
                        className='w-full p-2  border-b border-b-[var(--warm-gold)] mt-5' />

                    <div className='flex space-x-2'>
                    <button onClick={() => save()} className={`${editingId ? 'bg-[var(--warning)] w-1/2' : "bg-[var(--dark-brown)] border border-[var(--warm-gold)] text-[var(--ivory)] w-full"} mt-5 rounded-full p-2 text-lg cursor-pointer`}>{editingId ? 'Atualizar' : 'Cadastrar'}</button>

                    {editingId && (
                        <button onClick={() => resetForm()} className='bg-transparent border border-[var(--warm-gold)] p-2 rounded-full shadow w-1/2 mt-5'>Cancelar</button>
                    )}
                    </div>
                </div>

                <div className='flex flex-col w-full md:w-1/2 gap-3'  ref={ref}>
                    {guests.map((g) => (
                        <GuestCard key={g.id}
                        guests={g}>
                            <button onClick={() => edit(g)} className='bg-[var(--warm-gold)] text-white font-semibold px-4 py-2 rounded-full cursor-pointer whitespace-nowrap'>Editar</button>
                            <button onClick={() => remove(g.id)} className='bg-[var(--danger)] text-white font-semibold px-4 py-2 rounded-full cursor-pointer whitespace-nowrap'>Excluir</button>
                            {g.checked_in && (
                                <button onClick={() => undoCheckin(g.id)} className='bg-[var(--warning)] text-white font-semibold px-4 py-2 rounded-full cursor-pointer whitespace-nowrap'>Desfazer Check-in</button>
                            )}
                        </GuestCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Admin