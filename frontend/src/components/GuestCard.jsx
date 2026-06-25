import React from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'

function GuestCard({ guests, children }) {

    return (
        <div className='bg-[var(--ivory)] border border-[var(--cream)] rounded-2xl p-4'>
            <div className='flex flex-col space-x-4 xl:flex-row justify-between items-center'>
                <div className='flex flex-col sm:flex-row items-center '>
                    <div className='flex flex-col'>
                        <div className='flex items-center space-x-4 gap-3'>

                            <div className='rounded-full min-w-14 w-14 h-14 bg-[var(--cream)]'>
                            </div>

                            <div className='space-x-4'>
                                <p>{guests.name}</p>
                            </div>
                        </div>

                        <div className='flex space-x-4 items-center'>
                            <Mail size={14} />
                            <p>{guests.email}</p>
                        </div>

                        <div className='flex space-x-4 items-center mb-5'>
                            <MapPin size={14} />
                            <p className={`${guests.table_number?.guests?.length >= guests.table_number?.max_length ? "text-[var(--danger)]" : "text-[var(--warm-gold)]"}`}>{guests.table_number?.table_number} - {guests.table_number?.guests?.length ?? 0}/{guests.table_number?.max_length}</p>

                            <Phone size={14} />
                            |



                            <p>{guests.phone}</p>
                        </div>
                        {guests.checked_in ? (
                            <span className='bg-[var(--light-green)] text-white font-bold text-center rounded-full text-xs p-1 mb-5'>Check-in Realizado - {guests.checked_at}</span>
                        ) : <span className='bg-[var(--warning)] text-white font-bold text-center rounded-full text-xs p-1 mb-5'>Pendente </span>}
                    </div>
                </div>

                <div className='flex gap-2 items-center'>

                    {children}
                </div>
            </div>
        </div>
    )
}

export default GuestCard