import React from 'react'

function MiniCard({title, value, border, description}) {
  return (
    <div className='bg-[var(--ivory)] p-4 shadow rounded border-l-8 mr-2' style={{
        borderColor: border
    }}>
        <p className='uppercase tracking-widest text-[var(--warm-gold)]'>{title}</p>
        <h2 className='text-4xl font-serif'>{value}</h2>
        <p>{description}</p>
    </div>
  )
}

export default MiniCard