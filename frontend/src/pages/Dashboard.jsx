
import React, { useEffect, useRef, useState } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Header from '../components/Header'
import MiniCard from '../components/MiniCard'
import Hero from '../components/Hero'
import { useReactToPrint } from 'react-to-print'

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
    { name: "Total", value: total, fill: "#4a3428" },
    { name: "Confirmados", value: confirmed, fill: "#7f9b7c" },
    { name: "Pendentes", value: pending, fill: "#c9a063" }
  ]

  return (
    <div ref={ref} className='min-h-screen bg-[#F5EDE2] p-4'>

      <Header page="Dashboard" />

      <Hero guests={guests} funcao={handlePrint} title="Dashboard" />

      <div className='mt-10 md:mt-35 bg-[#f7f3ef] rounded-2xl shadow-sm p-4 md:p-6'>

        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8'>

          <div>
            <p className='uppercase tracking-[3px] text-xs text-[#b59683] mb-2'>
              Visão geral
            </p>

            <h2 className='text-2xl md:text-3xl font-serif text-[#4a3428]'>
              Distribuição RSVP
            </h2>
          </div>

          <span className='text-xs tracking-[3px] uppercase text-[#9f8878]'>
            Atualização automática
          </span>
        </div>

        <div className='h-64 sm:h-72 md:h-80 w-full '>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>

              <XAxis
                dataKey="name"
                stroke="#9f8878"
              />

              <YAxis
                stroke="#c7b7ad"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fffaf7",
                  border: "1px solid #eaded6",
                  borderRadius: "12px"
                }}
              />

              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
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