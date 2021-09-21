import React, { useContext } from 'react'
import { ActivityContext } from '../../../context/ActivityContext'
import ColTable from './ColTable'

function THead() {

  const { states: ActState } = useContext(ActivityContext)

  return (
    <div className={`grid grid-cols-${ActState.colCount}`}>
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

      {/* <ColTable tag="CA" bgColor="bg-blue-300" first={true} />
      <ColTable tag="FM" bgColor="bg-blue-400" />
      <ColTable tag="IA" bgColor="bg-blue-500" />
      <ColTable tag="RD" bgColor="bg-blue-600" />
      <ColTable tag="SA" bgColor="bg-blue-700" />
      <ColTable tag="Totales" bgColor="bg-blue-800" last={true} /> */}
    </div>
  )
}

export default THead
