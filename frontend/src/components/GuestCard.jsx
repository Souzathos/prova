import { Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

function GuestCard({ guest, children }) {
    const initials = guest.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    return (
        <div className=' bg-[#f7f3ef] border border-[#eaded6] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition mb-4'>
            <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-5'>
                <div className='flex flex-col sm:flex-row sm:items-start gap-4 w-full min-w-0'>

                    <div className='min-w-14 w-14 h-14 rounded-full bg-[#e7d4c7] flex items-center justify-center  text-[#6a4b3c] font-serif text-lg shadow-inner'>
                        {initials}
                    </div>
                    <div className='flex flex-col gap-3 w-full min-w-0'>
                        <div className='flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-2 lg:just'>

                            <h2 className='text-lg font-semibold text-[#4a3428] wrap-break-word'>{guest.name}</h2>
                            <div className='flex items-center gap-1  text-[#9b7d6d]'>

                                <MapPin size={14}></MapPin>
                                <p>Mesa {guest.table_number}</p>

                            </div>
                        </div>

                        <div className='flex  items-center space-x-2'>
                            <Mail size={14}></Mail>
                            <p>{guest.email}</p>

                            <Phone size={14}></Phone>
                            <p>{guest.phone}</p>
                        </div>
                        <div>
                            {guest.checked_in ? (
                                <span className='inline-flex items-center gap-2 bg-[#dce8da] text-[#567253] text-xs py-1 px-3 rounded-full '>
                                    ✓ Check-in realizado
                                </span>
                            ) : (
                                <span className='inline-flex items-center gap-2 bg-[#F5EDE2] text-[#C99458] text-sm py-1 px-3 rounded-full'>Pendente</span>
                            )}

                        </div>
                    </div>
                </div>

                <div>
                    
                </div>
                {children}
            </div>

        </div>
    )
}

export default GuestCard