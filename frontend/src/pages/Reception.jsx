import React, { useEffect, useState } from 'react'
import GuestCard from '../components/GuestCard'
import Header from '../components/Header'

function Reception() {
    const [guests, setGuests] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(null)


    async function load() {
        try {
            setLoading(true)
            const data = await fetch('http://localhost:3000/guest/list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }

            })
            const res = await data.json()
            setGuests(res)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    const filtered = guests.filter(g => g.name.toLowerCase().includes(search.toLowerCase()))

    async function checkin(id) {
        try {
            const res = await fetch(`http://localhost:3000/guest/checkin/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            
            const data = await res.json()
            load()
        } catch {
            alert('Checkin já realizado')
        }
    }

    const total = guests.length
    const confirmed = guests.filter(g => g.checked_in).length
    const pending = total - confirmed


    return (
        <div className='bg-rose-100 min-h-screen p-4'>
            <Header page={"Recepção"}/>
            <input placeholder='Buscar Convidados' className='w-full bg-white/80 rounded-2xl border border-gray-700 p-4 mt-4 shadow-lg' value={guests.name} onChange={(e) => setSearch(e.target.value)} />
            <div className='flex flex-col justify-between text-center '>
                <div className='bg-white hover:bg-gray-50 transition w-full rounded shadow mt-4 '>
                    <p className='font-semibold'>Total</p>
                    <p className='text-lg 
                font-bold'>{total}</p>
                </div>

                <div className='bg-green-500 hover:bg-green-600 transition w-full rounded shadow mt-2'>
                    <p className='text-lg text-white font-semibold'>Confirmados</p>
                    <p className='text-green-800 font-bold'>{confirmed}</p>
                </div>

                <div className='bg-rose-400 hover:bg-rose-500 transition w-full rounded shadow mt-2'>
                    <p className='text-lg text-white font-semibold'>Pendentes</p>
                    <p className='text-lg text-rose-800 font-bold'>{pending}</p>
                </div>
            </div>

            {loading && (<p>Carregando dashboard...</p>)}

            {filtered.map((g) => (
                <GuestCard key={g.id} guest={g}
                ><button disabled={g.checked_in}
                    onClick={() => checkin(g.id)}
                    className={`${g.checked_in ? "bg-green-500" : "bg-yellow-500 hover:bg-yellow-700 transition"} p-2 rounded-2xl mt-2 cursor-pointer`}><p className='font-semibold text-white'>{g.checked_in ? "Checkin Realizado" : "Realizar Checkin"}</p>
                    </button>
                    </GuestCard>
            ))}
        </div>
    )
}

export default Reception