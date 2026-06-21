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
        const interval = setInterval(load, 5000)
        return () => clearInterval(interval)
    }, [])

    if(!guests) {
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

    <div className=' bg-[var(--ivory)] rounded-2xl shadow-lg p-6 mt-10 md:mt-10 '>
        <div className=''>
            <div className='flex sm:flex-row sm:justify-between sm:items-center gap-4 mb-8'>
                <div className='flex flex-col'>
                    <p className='uppercase text-xs text-[var(--warning)] mb-2'> Visão Geral</p>
                    <h2 className='text-2xl mb:text-3xl font-serif text-[var(--dark-brown)]'>
                        Distribuição RSVP
                    </h2>
                </div>
            </div>

            <span className='text-2xl md:text-3xl font-serif text-[var(--dark-brown)] '>
                Atualização automática
            </span>
        </div>

        <div className='h-64 sm:h-72 md:h-80 w-full'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <XAxis dataKey="name"
                    stroke="var(--strokeX)"/>

                    <YAxis stroke="var(--strokeY)"/>

                    <Tooltip 
                        contentStyle={{
                            backgroundColor: "#ffff",
                            border: "1px solid #eaded6",
                            borderRadius: "12px"
                        }}
                    />

                    <Bar dataKey="value" radius={[4,4,0,0]}>
                        {chartData.map((entry, index) => (
                            <Cell key={index} fill={entry.fill}/>
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
            </div>

    </div>
  )
}

export default Dashboard