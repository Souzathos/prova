import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { useState } from 'react'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect } from 'react'
import GuestCard from '../components/GuestCard'

function Reception() {
    const [guests, setGuests] = useState([])
    const [search, setSearch] = useState('')
    const [mesa, setMesa] = useState('')        // busca por número da mesa
    const [ordem, setOrdem] = useState('nome')  // ordenação: nome | status | mesa
    const [loading, setLoading] = useState(null)

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

    useEffect(() => {
        load()
    }, [])

    // filtra por nome e por mesa, depois ordena pelo critério escolhido (nome, status ou mesa)
    const filtered = guests
        .filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
        .filter((g) => mesa ? g.table_number?.table_number === Number(mesa) : true)
        .sort((a, b) => {
            if (ordem === 'mesa') return a.table_number?.table_number - b.table_number?.table_number
            if (ordem === 'status') return a.checked_in - b.checked_in   // pendentes (false) antes dos confirmados (true)
            return a.name.localeCompare(b.name)
        })

    async function checkin(id) {
        try {
            const res = await fetch(`http://localhost:3000/guest/checkin/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            load()
        } catch {
            alert('Check-in já realizado')
        }
    }


    const total = guests.length
    const confirmed = guests.filter((g) => g.checked_in).length
    const pending = total - confirmed
  return (
    <div ref={ref} className='p-4 min-h-screen bg-[var(--cream)]'>
        <Header page="Recepção" />

        <Hero title="Recepção" funcao={handlePrint} guests={guests}/>

        <input type="text" placeholder='Buscar convidado...' className='w-full bg-[var(--ivory)] p-4 border rounded-full mt-10 border-gray-400 shadow-lg mb-5' value={search} onChange={(e) => setSearch(e.target.value)}/>

        {/* busca por mesa + ordenação (nome, status ou mesa) */}
        <div className='flex gap-3 mb-5'>
            <input type="number" placeholder='Filtrar por mesa' className='flex-1 bg-[var(--ivory)] p-4 border rounded-full border-gray-400 shadow-lg' value={mesa} onChange={(e) => setMesa(e.target.value)}/>

            <select className='bg-[var(--ivory)] p-4 border rounded-full border-gray-400 shadow-lg' value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                <option value="nome">Ordenar por nome</option>
                <option value="mesa">Ordenar por mesa</option>
                <option value="status">Ordenar por status</option>
            </select>
        </div>

        {loading && (
            <p>Carregando convidados...</p>
        )}
 
        <div className='flex flex-col gap-3'>

        {filtered.map((g) => (
            <GuestCard key={g.id} guest={g}>
                <button disabled={g.checked_in}
                onClick={() => checkin(g.id)}
                className={`${g.checked_in ? "bg-[var(--success)] text-white cursor-default" : "bg-[var(--warning)] hover:opacity-90 text-white"} py-1 px-4 rounded-2xl mt-2 cursor-pointer`}>
                    <p className='font-semibold'>{g.checked_in ? "Checkin Realizado" : "Realizar Checkin "}</p>

                </button>
            </GuestCard>
        ))}
                </div>

    </div>
  )
}

export default Reception