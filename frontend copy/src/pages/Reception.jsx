import React, { useEffect, useRef, useState } from 'react'
import GuestCard from '../components/GuestCard'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { Search } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'

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
        <div ref={ref} className='bg-[#F5EDE2] min-h-screen p-4 '>
            <Header page={"Recepção"} />
            <Hero guests={guests} funcao={handlePrint} title="Convidados" />

            <input placeholder='Buscar Convidados' className='w-full bg-white/80 rounded-2xl  p-4 mt-30 mb-4 shadow-lg' value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className='flex flex-col justify-between text-center '>

            </div>

            {loading && (<p>Carregando dashboard...</p>)}

            {filtered.map((g) => (
                <GuestCard key={g.id} guest={g}
                ref={ref}
                ><button disabled={g.checked_in}
                    onClick={() => checkin(g.id)}
                    className={`${g.checked_in ?  "bg-[#7f9b7c] text-white cursor-default"
                      : "bg-[#d4b06d] hover:opacity-90 text-[#3d2a21]"} p-2 rounded-2xl mt-2 cursor-pointer`}><p className='font-semibold'>{g.checked_in ? "Checkin Realizado" : "Realizar Checkin"}</p>
                    </button>
                </GuestCard>
            ))}
        </div>
    )
}

export default Reception