import React, { useContext } from 'react'
import { ActivityContext } from '../../../context/ActivityContext'

function TBody(props) {

  const { states: ActState } = useContext(ActivityContext)

  const {
    project,
    user
  } = props

  return (
    <div className={`grid grid-cols-7 text-sm mt-2 text-right shadow-md rounded-md`}>
      <div className="p-2 text-sm bg-white rounded-l-lg text-center">
        {project}
      </div>
      {
        user.length > 0 &&
        user.map((item, index) => {
          return (
            <div key={index} className={`grid grid-cols-4 p-2 text-sm ${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}`}>
              <p>{item.tiempos.mc === '0,0' ? '-' : item.tiempos.mc}</p>
              <p>{item.tiempos.d5c === '0,0' ? '-' : item.tiempos.d5c}</p>
              <p>{item.tiempos.d3c === '0,0' ? '-' : item.tiempos.d3c}</p>
              <p>{item.tiempos.d1c === '0,0' ? '-' : item.tiempos.d1c}</p>
            </div>
          )
        })
      }
      {/* <div className="grid grid-cols-4 p-2 text-sm bg-gray-200">
        <p>{user[0].tiempos.d1c === 0 ? '-' : user[0].tiempos.d1c}</p>
        <p>{user[0].tiempos.d3c === 0 ? '-' : user[0].tiempos.d3c}</p>
        <p>{user[0].tiempos.d5c === 0 ? '-' : user[0].tiempos.d5c}</p>
        <p>{user[0].tiempos.mc === 0 ? '-' : user[0].tiempos.mc}</p>
      </div>
      <div className="grid grid-cols-4 p-2 text-sm bg-gray-300">
        <p>{user[1].tiempos.d1c === 0 ? '-' : user[1].tiempos.d1c}</p>
        <p>{user[1].tiempos.d3c === 0 ? '-' : user[1].tiempos.d3c}</p>
        <p>{user[1].tiempos.d5c === 0 ? '-' : user[1].tiempos.d5c}</p>
        <p>{user[1].tiempos.mc === 0 ? '-' : user[1].tiempos.mc}</p>
      </div>
      <div className="grid grid-cols-4 p-2 text-sm bg-gray-200">
        <p>{user[2].tiempos.d1c === 0 ? '-' : user[2].tiempos.d1c}</p>
        <p>{user[2].tiempos.d3c === 0 ? '-' : user[2].tiempos.d3c}</p>
        <p>{user[2].tiempos.d5c === 0 ? '-' : user[2].tiempos.d5c}</p>
        <p>{user[2].tiempos.mc === 0 ? '-' : user[2].tiempos.mc}</p>
      </div>
      <div className="grid grid-cols-4 p-2 text-sm bg-gray-300">
        <p>{user[3].tiempos.d1c === 0 ? '-' : user[3].tiempos.d1c}</p>
        <p>{user[3].tiempos.d3c === 0 ? '-' : user[3].tiempos.d3c}</p>
        <p>{user[3].tiempos.d5c === 0 ? '-' : user[3].tiempos.d5c}</p>
        <p>{user[3].tiempos.mc === 0 ? '-' : user[3].tiempos.mc}</p>
      </div>
      <div className="grid grid-cols-4 p-2 text-sm bg-gray-200">
        <p>{user[4].tiempos.d1c === 0 ? '-' : user[4].tiempos.d1c}</p>
        <p>{user[4].tiempos.d3c === 0 ? '-' : user[4].tiempos.d3c}</p>
        <p>{user[4].tiempos.d5c === 0 ? '-' : user[4].tiempos.d5c}</p>
        <p>{user[4].tiempos.mc === 0 ? '-' : user[4].tiempos.mc}</p>
      </div>
      <div className="grid grid-cols-4 p-2 text-sm bg-gray-300 rounded-r-md">
        <p>{''}</p>
        <p>{''}</p>
        <p>{''}</p>
        <p>{''}</p>
      </div> */}
    </div>
  )
}

export default TBody
