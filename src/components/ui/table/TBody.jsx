import React, { useContext } from 'react'
import { ActivityContext } from '../../../context/ActivityContext'

function TBody(props) {

  const { states: ActState } = useContext(ActivityContext)

  const {
    project,
    user,
    toggleValue
  } = props

  return (
    <div className={`grid grid-cols-${ActState.colCount} text-sm mt-2 text-right shadow-md rounded-md`}>
      <div className="p-2 text-sm bg-white rounded-l-lg text-center">
        {project}
      </div>
      {
        user.length > 0 &&
        user.map((item, index) => {
          return (
            <div key={index} className={`grid grid-cols-4 p-2 text-sm ${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}`}>
              <p>{toggleValue ? (item.tiempos.mc === '0,0' ? '-' : item.tiempos.mc) : (item.tiempos.mnc === '0,0' ? '-' : item.tiempos.mnc)}</p>
              <p>{toggleValue ? (item.tiempos.d5c === '0,0' ? '-' : item.tiempos.d5c) : (item.tiempos.d5nc === '0,0' ? '-' : item.tiempos.d5nc)}</p>
              <p>{toggleValue ? (item.tiempos.d3c === '0,0' ? '-' : item.tiempos.d3c) : (item.tiempos.d3nc === '0,0' ? '-' : item.tiempos.d3nc)}</p>
              <p>{toggleValue ? (item.tiempos.d1c === '0,0' ? '-' : item.tiempos.d1c) : (item.tiempos.d1nc === '0,0' ? '-' : item.tiempos.d1nc)}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default TBody
