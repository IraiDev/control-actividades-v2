import React, { useContext } from 'react'
import { ActivityContext } from '../../../context/ActivityContext'
import TBody from './TBody'
import THead from './THead'

function Table({ toggleValue }) {

  const { states: ActState } = useContext(ActivityContext)

  return (
    <div className="sm:mx-5 xl:mx-16 2xl:mx-30" >
      <THead />
      <div className="h-table scroll-row">
        {
          ActState.infoTimes.length > 0 ?
            ActState.infoTimes.map((item, index) => {
              return <TBody key={index} project={item.proy} user={item.usuarios} toggleValue={toggleValue} />
            })
            : <p className="text-center">No hay datos para mostrar</p>
        }
        {/* <TBody project="TOTAL" user={ActState.totals} toggleValue={toggleValue} /> */}
      </div>
    </div>
  )
}

export default Table
