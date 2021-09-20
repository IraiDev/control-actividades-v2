import React from 'react'
import ColTable from './ColTable'

function THead() {
  return (
    <div className="grid grid-cols-7">
      <ColTable />
      <ColTable tag="RD" bgColor="bg-blue-300" first={true} />
      <ColTable tag="CA" bgColor="bg-blue-400" />
      <ColTable tag="FM" bgColor="bg-blue-500" />
      <ColTable tag="IA" bgColor="bg-blue-600" />
      <ColTable tag="SA" bgColor="bg-blue-700" />
      <ColTable tag="Totales" bgColor="bg-blue-800" last={true} />
    </div>
  )
}

export default THead
