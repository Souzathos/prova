import { BarChart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Bar, Tooltip, XAxis, YAxis } from 'recharts'
import Header from '../components/Header'

function Dashboard() {
    const [guests, setGuests] = useState([])
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

    const total = guests.length
    const confirmed = guests.filter(g => g.checked_in).length
    const pending = total - confirmed

  return (
    <div className='min-h-screen bg-rose-100 p-4'>
        <Header page="Dashboard"/>
        <BarChart
      style={{
        width: '100%',
        maxWidth: '800px',
        maxHeight: '80vh',
        aspectRatio: 1.618,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis width="auto" label={{ value: 'Mass [kg]', position: 'insideLeft', dx: 0, dy: 20, angle: -90 }} />
      <Bar dataKey="massKg" unit="kg" />
      <Tooltip />

    </BarChart></div>
  )
}

export default Dashboard