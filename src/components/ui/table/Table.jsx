import React, { useContext } from 'react'
import { ActivityContext } from '../../../context/ActivityContext'
import TBody from './TBody'
import THead from './THead'

function Table({ toggleValue }) {
  const { states: ActState } = useContext(ActivityContext)

  return (
    <div className="min-w-table">
      <THead />
      <div className="max-h-3/4 overflow-custom">
        {
          ActState.infoTimes.length > 0 ?
            ActState.infoTimes.map((item, index) => {
              return <TBody key={index} project={item.proy} user={item.usuarios} toggleValue={toggleValue} />
            })
            : <p className="text-center">No hay datos para mostrar</p>
        }
      </div>
    </div>
  )
}

export default Table
