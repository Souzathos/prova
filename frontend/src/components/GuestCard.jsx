import React from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'

function GuestCard({ guests, children }) {
    const count = guests.table_number?.guest_count ?? 0
    const max = guests.table_number?.max_length ?? 0
    const isFull = max > 0 && count >= max

    return (
        <div className='bg-[var(--ivory)] border border-[var(--cream)] rounded-2xl p-4'>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3'>
                    <div className='rounded-full min-w-12 w-12 h-12 bg-[var(--cream)]' />
                    <p className='font-semibold text-lg'>{guests.name}</p>
                </div>

                <div className='flex items-center gap-2 text-sm text-gray-600'>
                    <Mail size={14} />
                    <p className='truncate'>{guests.email}</p>
                </div>

                <div className='flex flex-wrap items-center gap-3 text-sm text-gray-600'>
                    <div className='flex items-center gap-1'>
                        <MapPin size={14} />
                        <span>Mesa {guests.table_number?.table_number}</span>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isFull
                            ? 'bg-red-100 text-red-600'
                            : 'bg-green-100 text-green-700'
                    }`}>
                        {count}/{max}
                    </span>

                    <div className='flex items-center gap-1'>
                        <Phone size={14} />
                        <span>{guests.phone}</span>
                    </div>
                </div>

                {guests.checked_in ? (
                    <span className='bg-[var(--light-green)] text-white font-bold text-center rounded-full text-sm p-2'>
                        Check-in realizado - {new Date(guests.checked_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                ) : (
                    <span className='bg-[var(--warning)] text-white font-bold text-center rounded-full text-sm p-2'>
                        Pendente
                    </span>
                )}

                {children}
            </div>
        </div>
    )
}

export default GuestCard
