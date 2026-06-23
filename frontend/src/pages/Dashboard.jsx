import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { useReactToPrint } from 'react-to-print'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts'


function Dashboard() {
    const [guests, setGuests] = useState([])
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

    useEffect(() => {
        load()
        
    }, [])

    if(loading) {
        return (
            <div>
                Carregando dashboard...
            </div>
        )
    }

    const total = guests.length
    const confirmed = guests.filter((g) => g.checked_in).length
    const pending = total - confirmed

      const chartData = [
    { name: "Total", value: total, fill: "var(--border-total)" },
    { name: "Confirmados", value: confirmed, fill: "var(--success)" },
    { name: "Pendentes", value: pending, fill: "var(--border-pending)" }
  ]
  return (
    <div className='p-4 min-h-screen bg-[var(--cream)] overflow-hidden' ref={ref}>
        <Header page="Dashboard"/>
        <Hero guests={guests} title="dashboard" funcao={handlePrint} />

        <div className='flex flex-col md:flex-col p-3 bg-[var(--ivory)] mt-10 shadow rounded-2xl '>
            <div className='flex flex-col mt-5 space-y-3'>
                <p className='text-[var(--warm-gold)] text-xs tracking-widest uppercase'>Visão Geral</p>
                <h2 className='text-3xl font-serif text-[var(--dark-brown)]'>Distribuição RSVP</h2>
            </div>

            <div className='h-64 w-full mt-10'>
                <ResponsiveContainer height="100%" width="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke='var(--strokeX)'/>

                        <YAxis stroke='var(--strokeY)'/>

                        <Tooltip contentStyle={{
                            border: '12px',
                            borderRadius: '12px',
                            backgroundColor: '#ffff'
                        }}/>

                        <Bar dataKey="value" radius={[4,4,0,0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}

export default Dashboard