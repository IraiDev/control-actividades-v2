import React, { useContext } from 'react'
import { ActivityContext } from '../../../context/ActivityContext'
import ColTable from './ColTable'

function THead() {

  const { states: ActState } = useContext(ActivityContext)

  return (
    <div className={`grid grid-cols-7`}>
      <ColTable />
      {
        ActState.infoTimes.length > 0 &&
        ActState.infoTimes[0].usuarios.map((item, index) => {
          return <ColTable
            key={index}
            tag={item.usuario}
            bgColor={`bg-blue-${3 + index}00`}
            first={index === 0}
            last={index === (ActState.infoTimes[0].usuarios.length - 1)} />
        })
      }
    </div>
  )
}

export default THead
