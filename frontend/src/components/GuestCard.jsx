import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

function GuestCard({ guest, children }) {
  return (
    <div className='bg-[var(--ivory)] border border-[var(--cream)] rounded-2xl p-4 shadow transition mb-4'>
      <div className='flex flex-col xl:flex-row justify-between xl:items-center gap-2'>
        <div className='flex flex-col sm:flex-row w-full sm:items-start gap-4 min-w-0'>
          <div className='bg-[var(--cream)] min-w-14 w-14 h-14 rounded-full shadow-inner'>

          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <p>{guest.name}</p>

              <div className='flex items-center text-sm space-x-1 text-[var(--warm-gold)]'>
                <MapPin size={14} />
                {/* a relação retorna o objeto TableConfig; o número da mesa é table_number, não number */}
                <p>{guest.table_number?.table_number}</p>
              </div>
            </div>

            <div className='flex space-x-2 items-center'>
              <Mail size={14} />
              <p>{guest.email}</p>

              <Phone size={14}/>
              <p>{guest.phone}</p>
            </div>

            <div className='mt-3'>
              {guest.checked_in ? (
                <span className='items-center gap-2 bg-[var(--light-green)] text-[var(--ivory)] p-2 text-xs rounded-full shadow'>Check-in realizado</span>
              ) : (
                <span className='items-center gap-2 bg-[var(--warning)] text-[var(--ivory)] p-2 text-xs rounded-full shadow'>Pendente</span>
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