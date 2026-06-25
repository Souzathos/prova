import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import MiniCard from './MiniCard'

function Hero({ guests, page, funcao }) {

  const ref = useRef()
  const handlePrint = useReactToPrint({
    contentRef: ref
  })

  const total = guests.length
  const confirmed = guests.filter((g) => g.checked_in).length
  const pending = total - confirmed
  return (
    <div className='min-h-80 bg-[var(--dark-brown)] p-6 rounded-2xl mt-10 mb-10'>
      <div className='flex justify-between items-center '>
        <div className='space-y-2 mb-5'>
          <h3 className='text-[var(--warm-gold)] text-md tracking-widest font-serif'>Gerenciamento de convidados</h3>
          <h2 className='text-[var(--ivory)] text-4xl font-serif'>Página de <span className='text-[var(--warm-gold)]'>{page}</span></h2>
          <p className='text-[var(--ivory)] tracking-wider'>Acompanhe check-ins, visualize convidados e administre seu sistema em tempo real</p>
        </div>
        <div>
          <button onClick={handlePrint} className='mt-5 rounded-full bg-transparent border border-[var(--warm-gold)] cursor-pointer text-white p-4'>Exportar Relatório</button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
        <MiniCard title="total" value={total} description="Total de convidados" />
        <MiniCard title="confirmados" value={confirmed} description="Confirmados RSVP" border='var(--border-confirmed)' />
        <MiniCard title="pendentes" value={pending} description="Convidados pendentes" border='var(--border-pending)' />
      </div>
    </div>
  )
}

export default Hero