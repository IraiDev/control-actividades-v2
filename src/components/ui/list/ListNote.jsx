import React, { useContext } from 'react'
import { ActivityContext } from '../../../context/ActivityContext'
import { alertQuest } from '../../../helpers/alerts'
import moment from "moment"
import Button from '../buttons/Button'

let name = "NN"

function ListNote(props) {
  const {
    idNote,
    desc,
    date,
    user,
    type = false,
    onclick,
    activeColor,
    idActivity = null,
    separator = true,
    updatePriority,
    callBack,
    from = false
  } = props

  const { functions: ActFunc } = useContext(ActivityContext)

  switch (user) {
    case "9.411.789-5":
      name = "FMRN"
      break;
    case "19.050.844-7":
      name = "IARR"
      break;
    case "18.804.066-7":
      name = "SACU"
      break;
    case "15.953.693-9":
      name = "RDCT"
      break;
    case "13.116.052-6":
      name = "CA"
      break;
    default: name = 'NN'
      break;
  }

  const handleGetidNote = () => {
    onclick(idNote, desc)
  }

  const handleDeleteNote = () => {

    if (idActivity === null) {
      const data = { id_nota: idNote }
      const action = () => ActFunc.deleteNote(data)
      let text = desc.substring(0, 15)
      alertQuest(
        'info',
        `<p>Esto eliminara la nota: <b>${text}...</b></p>`,
        'No, cancelar',
        'Si, eliminar',
        action
      )
    }
    else {
      const data = { id_nota: idNote }
      const action = () => ActFunc.deleteNote(data, true, idActivity)
      let text = desc.substring(0, 15)
      alertQuest(
        'info',
        `<p>Esto eliminara la nota: <b>${text}...</b></p>`,
        'No, cancelar',
        'Si, eliminar',
        action
      )
    }
  }

  const handleAddNote = () => {
    if (updatePriority) {
      const data = { prioridad_numero: 100, id_actividad: idActivity }
      ActFunc.updatePriority(data, from, idActivity)
      const data2 = { description: desc, id_actividad: idActivity }
      ActFunc.addNewNote(data2, from, idActivity)
    } else {
      const data = { description: desc, id_actividad: idActivity }
      ActFunc.addNewNote(data, from, idActivity)
    }
    callBack()
  }

  if (type === 'modal') {
    return (
      <>
        <li className="flex justify-between items-center">
          <button
            className={`text-left my-2 focus:outline-none hover:text-blue-500 ${activeColor}`}
            onClick={() => {
              handleGetidNote()
            }}>
            <p className="inline font-bold text-sm mr-2">{name}</p>
            <p className="inline font-semibold text-2xs">{moment(date).format("DD/MM/yyyy, HH:mm")}:</p>
            <p className="text-2xs mx-2">{desc}</p>
          </button>
          <Button
            className="text-blue-500 hover:text-red-600 transition duration-500 mr-2"
            type="icon"
            icon="fas fa-trash-alt fa-sm"
            onClick={handleDeleteNote}
          />
        </li>
        {separator && <hr className="mx-5 bg-gray-200" />}
      </>
    )
  }

  if (type === 'listAction') {
    return (
      <>
        <div className="flex items-center justify-between my-1">
          <p className="text-sm text-gray-600 capitalize">{desc}</p>
          <Button
            className="text-blue-500 hover:text-green-500 w-8 h-8"
            type="icon"
            icon="fas fa-tags fa-sm"
            onClick={handleAddNote} />
        </div>
        {separator && <hr className="mx-5 bg-gray-200" />}
      </>
    )
  }

  return (
    <li className="leading-tight">
      <p className="inline font-bold text-2xs mr-2">{name}</p>
      <p className="inline font-semibold text-xs">{moment(date).format("DD-MM-yyyy, HH:mm")}</p>
      <p className="text-justify m-2">{desc}</p>
    </li>
  )
}

export default ListNote
