import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import Header from '../components/Header'
import Hero from '../components/Hero'
import GuestCard from '../components/GuestCard'
import { listGuests, checkinGuest } from '../services/guestService'

function Reception() {
    const [loading, setLoading] = useState(null)
    const [guests, setGuests] = useState([])
    const [feedback, setFeedback] = useState(null)
    const [search, setSearch] = useState('')
    const [table, setTable] = useState('')
    const [ordem, setOrdem] = useState('nome')

    const ref = useRef()
    const handlePrint = useReactToPrint({
        contentRef: ref
    })

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

    async function handleCheckin(id) {
        try {
            const data = await checkinGuest(id)
            setFeedback({ type: 'success', message: data.message || 'Check-in realizado!' })
            load()
        } catch (e) {
            setFeedback({ type: 'error', message: e.message === 'Failed to fetch' ? 'Servidor indisponível. Tente novamente mais tarde.' : e.message })
        }
    }

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if (!feedback) return
        const t = setTimeout(() => setFeedback(null), 3000)
        return () => clearTimeout(t)
    }, [feedback])

    const filtered = guests.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
        .filter((g) => table ? g.table_number?.table_number === Number(table) : true)
        .sort((a, b) => {
            if (ordem === "mesa") return a.table_number?.table_number - b.table_number?.table_number
            if (ordem === "status") return a.checked_in - b.checked_in
            return a.name.localeCompare(b.name)
        })

    return (
        <div className='min-h-screen p-3 bg-[var(--cream)]'>
            <Header page="Recepção" />
            <Hero page="Recepção" guests={guests} funcao={handlePrint} />

            {feedback && (
                <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-semibold max-w-[90vw] text-center ${
                    feedback.type === 'success' ? 'bg-[var(--success)]' : 'bg-[var(--danger)]'
                }`}>
                    {feedback.message}
                </div>
            )}

            <div className='flex flex-col gap-2 mt-4'>
                <input type="text" placeholder='Buscar convidados...' value={search} onChange={(e) => setSearch(e.target.value)}
                    className='w-full p-4 shadow rounded-2xl bg-[var(--ivory)] text-lg' />
                <div className='flex gap-2'>
                    <input type="text" placeholder='Mesa...' className='w-full p-4 shadow rounded-2xl bg-[var(--ivory)] text-lg' value={table} onChange={(e) => setTable(e.target.value)} />
                    <select value={ordem} onChange={(e) => setOrdem(e.target.value)} className='rounded-2xl bg-[var(--ivory)] p-4 text-lg'>
                        <option value="mesa">Mesa</option>
                        <option value="name">Nome</option>
                        <option value="status">Status</option>
                    </select>
                </div>
            </div>

            <div ref={ref} className='gap-3 flex flex-col mt-6'>
                {filtered.map((g) => (
                    <GuestCard key={g.id} guests={g}>
                        <button
                            onClick={() => handleCheckin(g.id)}
                            disabled={g.checked_in}
                            className={`w-full py-4 rounded-2xl text-lg font-bold cursor-pointer transition-colors ${
                                g.checked_in
                                    ? "bg-[var(--success)] text-white cursor-default"
                                    : "bg-[var(--warm-gold)] text-white active:brightness-90"
                            }`}
                        >
                            {g.checked_in ? "Check-in realizado" : "Realizar check-in"}
                        </button>
                    </GuestCard>
                ))}
            </div>
        </div>
    )
}

export default Reception
