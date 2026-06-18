import React from 'react'
import MiniCard from './MiniCard'

function Hero({guests, funcao, title}) {
    const total = guests.length
    const confirmed = guests.filter((g) => g.checked_in).length
    const pending = total - confirmed
  return (
    <div className='bg-(--dark-brown) rounded-2xl shadow-xl text-white p-6  mt-5 '>
        <div className='flex justify-between items-center mb-6'>
            <div className='space-y-2'>
                <p className='text-lg text-(--warning)'>Controle de recepção</p>
                <h1 className='text-5xl font-serif text-white'>Painel <span className='text-(--warning) font-serif'>{title}</span></h1>
                <p className='text-lg text-white/80'>Gerencie check-ins, acompanhe confirmações e organize a recepção em tempo real</p>
            </div>
            <div>
                <button onClick={funcao} className='text-white text-lg border border-(--warning) rounded-full p-4 cursor-pointer'>Exportar relatório</button>
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <MiniCard title="Total" value={total} description="Convidados Cadastrados" />
            <MiniCard title="Confirmados" value={confirmed} border="#6F8F6F" description="RSVP confirmado" />
            <MiniCard title="Pendentes" value={pending} border="var(--warning)" description="Aguardando resposta" />
        </div>
    </div>
  )
}

export default Hero