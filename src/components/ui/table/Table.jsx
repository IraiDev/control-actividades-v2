import React from 'react'
import TBody from './TBody'
import THead from './THead'

function Table() {
  return (
    <div className="sm:mx-5 xl:mx-16 2xl:mx-30" >
      <THead />
      <div className="h-table scroll-row">
        <TBody />
      </div>
    </div>
  )
}

export default Table
