import React from 'react'

function MiniCard({ title, value, variant = "default" }) {
  const styles = {
    default: "bg-white",
    green: "bg-white/70 border-l-[#6F8F6F]",
    yellow: "bg-yellow-100"
  }

  const textColor = {
    default: "text-gray-800",
    green: "text-green-700",
    yellow: "text-yellow-700"
  }

  return (
    <div className={`${styles[variant]} rounded-xl shadow p-4`}>
      <p className='text-gray-700 text-xs'>{title}</p>
      <h2 className={`${textColor[variant]} text-xl font-bold`}>{value}</h2>
    </div>
  )
}

export default MiniCard