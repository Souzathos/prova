
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
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

  useEffect(() => {
    load()
    const interval = setInterval(load, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!guests) {
    return (
      <div>
        Carregando dashboard...
      </div>
    )
  }

  const total = guests.length
  const confirmed = guests.filter(g => g.checked_in).length
  const pending = total - confirmed

  const chartData = [
    { name: "Total", value: total },
    { name: "Confirmados", value: confirmed },
    { name: "Pendentes", value: pending }
  ]

  return (
    <div className='min-h-screen bg-rose-100 p-4'>
      <Header page="Dashboard" />

        <div className='grid grid-cols-3 p-4 text-center space-x-2'>
          <Card title="Total" value={total} />
          <Card title="Confirmados" value={confirmed} variant='green' />
          <Card title="Pendentes" value={pending} variant='yellow' />
        </div>

        <div>
          <p className='text-gray-700 mt-4'>Visão Geral</p>
          <div className='h-64'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke='black' />
                <YAxis stroke='black'/>
                <Tooltip contentStyle={{
                  border: "1px solid black",
                  borderRadius: "12px",
                  backgroundColor: "white"
                }}/>
                <Bar dataKey="value" fill='pink'/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

    </div>
  )
}

function Card({ title, value, variant = "default" }) {
  const styles = {
    default: "bg-white",
    green: "bg-green-100",
    yellow: "bg-yellow-100"
  }

  const textColor = {
    default: "text-gray-800",
    green: "text-green-700",
    yellow: "text-yellow-700"
  }

  return (
    <div className={`${styles[variant]} rounded-xl shadow p-4`}>
      <p className='text-gray-700 text-xs'>{title}</p>
      <h2 className={`${textColor[variant]} text-xl font-bold`}>{value}</h2>
    </div>
  )
}

export default Dashboard