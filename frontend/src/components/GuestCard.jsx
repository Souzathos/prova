import { Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

function GuestCard({guest, children}) {
  return (
    <div className=''>
        <div className='flex flex-col bg-white/60 rounded-2xl p-2 mt-4 shadow'>
           <div className='flex items-center space-x-2'>
                <User size={14}></User>
                <p>{guest.name}</p>
            </div>
            <div className='flex items-center space-x-2'>
                <MapPin size={14}></MapPin>
                <p>{guest.table_number}</p>
            </div>
            <div className='flex  items-center space-x-2'>
                <Mail size={14}></Mail>
                <p>{guest.email}</p>
            </div>
            <div className='flex  items-center space-x-2'>
                <Phone size={14}></Phone>
                <p>{guest.phone}</p>
            </div>

            {children}
        </div>
    </div>
  )
}

export default GuestCard