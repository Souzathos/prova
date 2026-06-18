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

    const filtered = guests.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))

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

        <input type="text" placeholder='Buscar convidado...' className='w-full bg-white/80 p-4 border rounded-full mt-10 border-gray-400 shadow-lg mb-5' value={search} onChange={(e) => setSearch(e.target.value)}/>

        {loading && (
            <p>Carregando convidados...</p>
        )}

        {filtered.map((g) => (
            <GuestCard key={g.id} guest={g}>
                <button disabled={g.checked_in}
                onClick={() => checkin(g.id)}
                className={`${g.checked_in ? "bg-[var(--success)] text-white cursor-default" : "bg-[var(--warning)] hover:opacity-90 text-[var(--dark-brown)]"} p-2 rounded-2xl mt-2 cursor-pointer`}>
                    <p className='font-semibold'>{g.checked_in ? "Checkin Realizado" : "Realizar Checkin "}</p>

                </button>
            </GuestCard>
        ))}
    </div>
  )
}

export default Reception