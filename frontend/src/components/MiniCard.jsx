import React from 'react'

function MiniCard({title, value, border, description}) {
  return (
    <div className='bg-[var(--ivory)] text-[var(--dark-brown)] p-5 sm:p-6 rounded-sm shadow-lg border-l-4' style={{
        borderColor: border,
    }}>
        <p className='uppercase text-sx text-[var(--warm-gold)] mb-3'>{title}</p>
        <h2 className='text-4xl md:text-5xl font-serif wrap-break-word mb-2'>
            {value}
        </h2>
        <p className='text-sm text-[var(--warm-gold)]'>{description}</p>
    </div>
  )
}

export default MiniCard