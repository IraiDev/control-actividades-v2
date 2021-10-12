import React from 'react'
import TBodyTimes from './TBodyTimes'

function TableTimes() {
  return (
    <>
      <div className="grid grid-cols-3 text-center text-green-400 font-bold border-b-2 border-green-300">
        <div className="col-span-1 p-2 border-r-2 border-green-300">Tiempo Estimado</div>
        <div className="col-span-1 p-2">Tiempo Trabajado</div>
        <div className="col-span-1 p-2 border-l-2 border-green-300">Hoy</div>
      </div>
      <TBodyTimes />
    </>
  )
}

export default TableTimes
