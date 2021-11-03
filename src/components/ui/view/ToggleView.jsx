import React, { useContext } from 'react'
import { ActivityContext } from '../../../context/ActivityContext'
import Button from '../buttons/Button'

function ToggleView({ onChangeGrid, onChangeList, active }) {
  const { states: ActState } = useContext(ActivityContext)

  return (
    <div className="flex justify-between items-center border-b-2 border-gray-300 mb-5 container mx-auto">
      <p className="ml-1 font-semibold text-gray-500">{ActState.activitiesRA.length} {ActState.activitiesRA.length <= 1 ? 'Actividad' : 'Actividades'}</p>
      <div>
        <Button
          className={`bg-transparent text-gray-800 rounded-md hover:bg-gray-300 px-2 py-1 mb-1 ${!active && 'text-blue-600'}`}
          type="icon"
          icon="fas fa-border-all"
          tippyText="Modo tarjeta"
          onClick={onChangeGrid}
        />
        <Button
          className={`bg-transparent text-gray-800 rounded-md hover:bg-gray-300 px-2 py-1 mb-1 ${active && 'text-blue-600'}`}
          type="icon"
          icon="fas fa-th-list"
          tippyText="Modo lista"
          onClick={onChangeList}
        />
      </div>
    </div>
  )
}

export default ToggleView
