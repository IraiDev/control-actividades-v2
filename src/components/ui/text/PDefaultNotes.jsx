import React, { useContext } from 'react'
import { ActivityContext } from '../../../context/ActivityContext'
import ButtonUnText from '../buttons/ButtonUnText'

function PDefaultNotes({ idAct, noteText, isSeparator = true, onclick, updatePriority = false, from = false }) {
  const { functions: GraphFunc } = useContext(ActivityContext)

  const handleAddNote = () => {

    if (from) {
      if (updatePriority) {
        const data = { prioridad_numero: 100, id_actividad: idAct }
        GraphFunc.updatePriority(data, true, idAct)
        const data2 = { description: noteText, id_actividad: idAct }
        GraphFunc.addNewNote(data2, true, idAct)
      } else {
        const data = { description: noteText, id_actividad: idAct }
        GraphFunc.addNewNote(data, true, idAct)
      }
      onclick()
    }
    else {
      if (updatePriority) {
        const data = { prioridad_numero: 100, id_actividad: idAct }
        GraphFunc.updatePriority(data)
        const data2 = { description: noteText, id_actividad: idAct }
        GraphFunc.addNewNote(data2)
      } else {
        const data = { description: noteText, id_actividad: idAct }
        GraphFunc.addNewNote(data)
      }
      onclick()
    }
  }
  return (
    <>
      <div className="flex items-center justify-between my-1">
        <p className="text-sm text-gray-600 capitalize">{noteText}</p>
        <ButtonUnText
          icon="fas fa-tags fa-sm"
          color="text-blue-500 hover:text-green-500 transition duration-500"
          onclick={handleAddNote} />
      </div>
      {isSeparator && <hr />}
    </>
  )
}

export default PDefaultNotes
