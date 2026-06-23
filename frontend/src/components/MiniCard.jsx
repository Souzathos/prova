import React from 'react'

function MiniCard({title, value, border, description}) {
  return (
    <div className=' bg-[var(--ivory)] p-4 rounded shadow border-l-4' style={{
      borderColor: border
    }}>
        <p className='uppercase  tracking-widest text-[var(--warm-gold)] mb-3'>{title}</p>
        <h2 className=' text-[var(--dark-brown)] font-serif wrap-break-word text-5xl mb-2'>{value}</h2>
        <p className='text-[var(--warm-gold)] text-sm '>{description}</p>
    </div>
  )
}

export default MiniCard