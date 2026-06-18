import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

function GuestCard({ guest, children }) {
  return (
    <div className='bg-[var(--ivory)] border border-[var(--cream)] rounded-2xl p-4 shadow-sm hover:shadow-md transition mb-4'>
      <div className='flex flex-col justify-between gap-5 xl:flex-row xl:items-center'>
        <div className='flex flex-col sm:flex-row sm:items-start gap-4 w-full min-w-0'>
          <div className='min-w-14 w-14 h-14 rounded-full bg-[#e8d7d7] flex items-center justify-center text-[var(--dark-brown)] font-serif text-lg shadow-inner' >

          </div>

          <div className='flex flex-col gap-3 w-full min-w-0'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-2 lg:just'>
              <h2 className='text-lg font-semibold text-[--dark-brown] wrap-break-word'>{guest.name}</h2>

              <div className='flex items-center gap-1 text-[var(--warm-gold)]'>
                <MapPin size={14}></MapPin>
                <p>Mesa {guest.table_number}</p>
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <Mail size={14}></Mail>
              <p>{guest.email}</p>

              <Phone size={14}></Phone>
              <p>{guest.phone}</p>
            </div>
            <div>
              {guest.checked_in ? (
                <span className='items-center gap-2 bg-[var(--light-green)] text-[var(--ivory)] text-xs p-2 rounded-full'>√ Check-in Realizado</span>
              ): (
                <span className='items-center gap-2 bg-[var(--warning)]/80 text-[var(--ivory)] text-sm p-2 rounded-full'>Pendente</span>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default GuestCard