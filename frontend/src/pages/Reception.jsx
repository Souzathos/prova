import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import Header from '../components/Header'
import Hero from '../components/Hero'
import GuestCard from '../components/GuestCard'

function Reception() {
    const [loading, setLoading] = useState(null)
    const [guests, setGuests] = useState([])
    const [error, setError] = useState(null)
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

    async function checkin(id){
        try {
            const res = await fetch(`http://localhost:3000/guest/checkin/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            load()
        } catch(e) {
            setError(e)
            console.log('Erro ao fazer checkin')
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

    const filtered = guests.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
    .filter((g) => table ? g.table_number?.table_number === Number(table) : true)
    .sort((a,b) => {
        if(ordem === "mesa") return a.table_number?.table_number - b.table_number?.table_number
        if(ordem === "status") return a.checked_in - b.checked_in
        return a.name.localeCompare(b.name)
    })
  return (
    
    <div className='min-h-screen p-4 bg-[var(--cream)]'>
        <Header page="Recepção"/>
        <Hero page="Recepção" guests={guests} funcao={handlePrint} />
        
        <div className='flex flex-col gap-2 mt-30 md:mt-0'>
        <input type="text" placeholder='Buscar convidados...' value={search} onChange={(e) => setSearch(e.target.value)}
        className='w-full p-4 shadow rounded-2xl bg-[var(--ivory)]'/>
        <div className='flex gap-4'>
        <input type="text" placeholder='Buscar mesa...'  className='w-full p-4 shadow rounded-2xl bg-[var(--ivory)]' value={table} onChange={(e) => setTable(e.target.value)}/>
        <select value={ordem} onChange={(e) => setOrdem(e.target.value)}  className='rounded-2xl bg-[var(--ivory)] p-4'>
            <option value="mesa">Mesa</option>
            <option value="name">Nome</option>
            <option value="status">Status</option>
        </select>
        </div>

        </div>

        
        <div ref={ref} className='gap-2 flex flex-col mt-10'>
            {filtered.map((g) => (
                <GuestCard key={g.id}
                guests={g}
                ><button onClick={() => checkin(g.id)} className={`${g.checked_in ? "bg-[var(--success)] text-white font-semibold" : "bg-[var(--warning)] text-white font-semibold)"} px-4 py-2 rounded-full`}>{g.checked_in ? "Check-in realizado" : "Realizar check-in"}</button></GuestCard>
            ))}
        </div>        </div>
  )
}

export default Reception