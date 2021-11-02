import React, { useContext } from 'react'
import { ActivityContext } from '../../../context/ActivityContext'
import Button from '../buttons/Button'

function PDefaultNotes({ idAct, noteText, isSeparator = true, callBack, updatePriority = false, from = false }) {
  const { functions: ActFunc } = useContext(ActivityContext)

  const handleAddNote = () => {
    if (updatePriority) {
      const data = { prioridad_numero: 100, id_actividad: idAct }
      ActFunc.updatePriority(data, from, idAct)
      const data2 = { description: noteText, id_actividad: idAct }
      ActFunc.addNewNote(data2, from, idAct)
    } else {
      const data = { description: noteText, id_actividad: idAct }
      ActFunc.addNewNote(data, from, idAct)
    }
    callBack()
  }
  return (
    <>
      <div className="flex items-center justify-between my-1">
        <p className="text-sm text-gray-600 capitalize">{noteText}</p>
        <Button
          className="text-blue-500 hover:text-green-500 w-8 h-8"
          type="icon"
          icon="fas fa-tags fa-sm"
          onClick={handleAddNote} />
      </div>
      {isSeparator && <hr />}
    </>
  )
}

export default PDefaultNotes
