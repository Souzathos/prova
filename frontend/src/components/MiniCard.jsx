import React from 'react'

function MiniCard({ title, value, border}) {
  return (
    <div className='bg-[#f7f3ef] text-[#3d2a21] p-5 sm:p-6 rounded-sm shadow-lg border-l-4' style={{
      borderColor: border,
    }}>

      <p className='uppercase tracking-[3px] text-xs text-[#8a7465] mb-3'>
        {title}
      </p>

      <h2 className='text-4xl md:text-5xl font-serif wrap-break-word'>
        {value}
      </h2>
    </div>
  )
}

export default MiniCard