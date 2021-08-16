import React from 'react'

function PResp({ text = 'No hay tareas...', textColor = 'text-black' }) {
  return (
    <span className={`col-span-12 text-center ${textColor}`}>{text}</span>
  )
}

export default PResp
