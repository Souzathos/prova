import React, { useEffect, useRef, useState } from 'react'
import MiniCard from './MiniCard'

function Hero({ guests, funcao, title }) {

    const total = guests.length
    const confirmed = guests.filter(g => g.checked_in).length
    const pending = total - confirmed

    return (
        <div className='bg-[#3D2E26] relative rounded-2xl overflow-visible shadow-xl text-white mb-52 md:mb-40 lg:mb-32 pb-32 md:pb-24 mt-10'>
            <div className='flex justify-between items-center '>

                <div className='p-4 space-y-2'>
                    <p className='text-lg text-[#C9A86A]'>Reception control</p>
                    <h1 className='text-5xl font-serif text-white'>Painel de <span className='text-[#C9A86A] font-serif'>{title}</span></h1>
                    <p className='text-lg text-white/80'>Gerencie check-ins, acompanhe confirmações e organize a recepção em tempo real</p>
                </div>
                <div className='flex gap-4 items-center p-4 mt-4'>
                    <button onClick={funcao} className='text-white text-lg border border-[#C9A86A] rounded-full p-4 cursor-pointer'>Exportar Lista</button>
                </div>
            </div>

            <div className="absolute left-1/2 -bottom-80 md:-bottom-24 lg:-bottom-20 -translate-x-1/2 w-[95%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 sm:px-4">

                <MiniCard
                    title="Total"
                    value={total}
                    description="Convidados cadastrados"
                />

                <MiniCard
                    title="Confirmados"
                    value={confirmed}
                    border="#6F8F6F"
                    description="RSVP confirmado"
                />

                <MiniCard
                    title="Pendentes"
                    value={pending}
                    border="#C9A86A"
                    description="Aguardando resposta"
                />
            </div>
        </div>
    )
}

export default Hero