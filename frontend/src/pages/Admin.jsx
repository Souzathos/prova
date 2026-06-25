import { listGuests, registerGuest, updateGuest, deleteGuest, undoCheckinGuest } from '../services/guestService'
import React, { use, useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import Hero from '../components/Hero'
import Header from '../components/Header'
import GuestCard from '../components/GuestCard'

function Admin() {
    const [guests, setGuests] = useState([])
    const [feedback, setFeedback] = useState(null)
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

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if (!feedback) return
        const t = setTimeout(() => setFeedback(null), 3000)
        return () => clearTimeout(t)
    }, [feedback])

    async function load() {
        try {
            setLoading(true)
            const data = await listGuests()
            setGuests(data)
        } catch (e) {
            setFeedback({ type: 'error', message: e.message === 'Failed to fetch' ? 'Servidor indisponível. Tente novamente mais tarde.' : e.message })
        } finally {
            setLoading(false)
        }
    }

    async function save() {
        try {
            const payload = { ...form, table_number: Number(form.table_number) }

            if (editingId) {
                if (!confirm('Deseja Atualizar o convidado?')) return
                const data = await updateGuest(editingId, payload)
                setFeedback({ type: 'success', message: data.message || 'Convidado atualizado!' })
                setEditingId(null)
            } else {
                const data = await registerGuest(payload)
                setFeedback({ type: 'success', message: data.message || 'Convidado cadastrado!' })
            }
            load()
            resetForm()
        } catch (e) {
            setFeedback({ type: 'error', message: e.message === 'Failed to fetch' ? 'Servidor indisponível. Tente novamente mais tarde.' : e.message })
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
            const data = await deleteGuest(id)
            setFeedback({ type: 'success', message: data.message || 'Convidado excluído!' })
            load()
        } catch (e) {
            setFeedback({ type: 'error', message: e.message === 'Failed to fetch' ? 'Servidor indisponível. Tente novamente mais tarde.' : e.message })
        }
    }

    async function undoCheckin(id) {
        try {
            if (!confirm('Deseja desfazer o check-in?')) return
            const data = await undoCheckinGuest(id)
            setFeedback({ type: 'success', message: data.message || 'Check-in desfeito!' })
            load()
        } catch (e) {
            setFeedback({ type: 'error', message: e.message === 'Failed to fetch' ? 'Servidor indisponível. Tente novamente mais tarde.' : e.message })
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

            {feedback && (
                <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-semibold max-w-[90vw] text-center ${
                    feedback.type === 'success' ? 'bg-[var(--success)]' : 'bg-[var(--danger)]'
                }`}>
                    {feedback.message}
                </div>
            )}

            <div className='w-full p-2 flex flex-col md:flex-row'>
                <div className='bg-[var(--ivory)] p-4 shadow rounded-2xl w-full md:w-1/2'>
                    <p>Novo usuário</p>
                    <h2>Cadastro</h2>

                    {error && (<p className='text-[var(--danger)] text-xs text-center'>{error}</p>)}
                    {sucess && (<p className='text-[var(--light-green)] text-xs text-center'>{sucess}</p>)}

                    <input type="text" placeholder='Nome Completo' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className='w-full p-2 border-b border-b-[var(--warm-gold)] mt-5' />
                    <input type="text" placeholder='E-mail' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className='w-full p-2 border-b border-b-[var(--warm-gold)] mt-5' />
                    <input type="text" placeholder='Telefone' value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className='w-full p-2 border-b border-b-[var(--warm-gold)] mt-5' />
                    <input type="text" placeholder='Número da mesa' value={form.table_number} onChange={(e) => setForm({ ...form, table_number: Number(e.target.value) })}
                        className='w-full p-2 border-b border-b-[var(--warm-gold)] mt-5' />

                    <div className='flex gap-2 mt-5'>
                        <button onClick={() => save()} className={`w-full py-3 rounded-xl text-lg font-bold cursor-pointer ${editingId ? 'bg-[var(--warning)] text-white' : "bg-[var(--dark-brown)] border border-[var(--warm-gold)] text-[var(--ivory)]"}`}>
                            {editingId ? 'Atualizar' : 'Cadastrar'}
                        </button>
                        {editingId && (
                            <button onClick={resetForm} className='py-3 px-6 rounded-xl text-lg cursor-pointer bg-gray-300 text-gray-700'>
                                Cancelar
                            </button>
                        )}
                    </div>
                </div>


                    {editingId && (
                        <button onClick={() => resetForm()} className='bg-transparent border border-[var(--warm-gold)] p-2 rounded-full shadow w-1/2 mt-5'>Cancelar</button>
                    )}
                    </div>
                </div>

                <div className='flex flex-col w-full md:w-1/2 gap-3'  ref={ref}>
                    {guests.map((g) => (
                        <GuestCard key={g.id}
                        guests={g}>
                            <button onClick={() => edit(g)}>Editar</button>
                            <button onClick={() => remove(g.id)}>Excluir</button>
                            {g.checked_in && (
                                <button onClick={() => undoCheckin(g.id)}>Desfazer Check-in</button>
                            )}
                        </GuestCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Admin
