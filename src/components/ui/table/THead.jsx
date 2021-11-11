import React, { useContext } from 'react'
import { ActivityContext } from '../../../context/ActivityContext'
import Column from './Column'

function THead() {
  const { states: ActState } = useContext(ActivityContext)

  return (
    <div className={`grid grid-cols-7`}>
      <Column />
      {
        ActState.infoTimes.length > 0 &&
        ActState.infoTimes[0].usuarios.map((item, index) => {
          return <Column
            key={index}
            tag={item.usuario}
            bgColor={`${index % 2 === 0 ? 'bg-gray-500' : 'bg-gray-600'}`}
            first={index === 0}
            last={index === (ActState.infoTimes[0].usuarios.length - 1)} />
        })
      }
    </div>
  )
}

export default THead
