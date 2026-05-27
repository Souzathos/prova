import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import MiniCard from './MiniCard'

function Hero() {
    const [guests, setGuests] = useState([])
    const [loading, setLoading] = useState()
    const ref = useRef()

    const handlePrint = useReactToPrint({
        contentRef: ref
    })

    async function handleData() {
        try {
            setLoading(true)
            const data = await fetch("http://localhost:3000/guest/list", {
                headers: {
                    "ContentType": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const res = await data.json()
            console.log(res)
            setGuests(res)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleData()
    }, [])

    const total = guests.length
    const confirmed = guests.filter(g => g.checked_in).length
    const pending = total - confirmed

    return (
        <div className='h-70 bg-[#3D2E26] p-4 rounded-2xl mt-6 relative'>
            <div className='flex justify-between items-center '>

                <div className='p-4 space-y-2'>
                    <p className='text-lg text-[#C9A86A]'>Reception control</p>
                    <h1 className='text-5xl font-serif text-white'>Entrada dos <span className='text-[#C9A86A] font-serif'>Convidados</span></h1>
                    <p className='text-lg text-white/80'>Gerencie check-ins, acompanhe confirmações e organize a recepção em tempo real</p>
                </div>
                <div className='flex gap-4 items-center p-4 mt-4'>
                    <button onClick={handlePrint} className='text-white text-lg border border-[#C9A86A] rounded-full p-4 cursor-pointer'>Exportar Lista</button>
                </div>
            </div>

            <div className="absolute left-1/2 -bottom-40 md:-bottom-24 -translate-x-1/2 w-[95%] grid grid-cols-1 md:grid-cols-3 gap-4 px-2 sm:px-4" >

                <MiniCard
                    title="Total"
                    value={total}
                    
                />

                <MiniCard
                    title="Confirmados"
                    value={confirmed}
                    border="#6F8F6F"
                />

                <MiniCard
                    title="Pendentes"
                    value={pending}
                    border="#C9A86A"
                />
            </div>
        </div>
    )
}

export default Hero