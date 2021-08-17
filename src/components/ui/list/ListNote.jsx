import React, { useContext } from 'react'
import { ActivityContext } from '../../../context/ActivityContext';
import { alertQuest } from '../../../helpers/alerts';
import moment from "moment";
import ButtonUnText from '../buttons/ButtonUnText';

let name = "NN"
let buttonStyle = 'text-sm outline-none active:outline-none focus:outline-none hover:text-blue-500'

function ListNote(props) {
  const {
    idNote,
    desc,
    date,
    dateColor,
    user,
    isModal = false,
    onclick,
    activeColor
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

  return (
    <>
      {
        !isModal ? (
          <li className="pb-3 leading-tight">
            <p className={`bg-gray-800 bg-opacity-25 px-2 rounded-full inline font-normal text-xs ${dateColor}`}>
              <label className="mr-2">{name}</label>({moment(date).format("DD-MM-yyyy, HH:mm")})
            </p>
            <p className="inline ml-1 font-semibold">: {desc}</p>
          </li>
        ) : (
          <li className="flex justify-between w-full pb-2 border-b">
            <button
              className={`${buttonStyle} ${activeColor}`}
              onClick={() => {
                handleGetidNote()
              }}>
              <p className={`flex font-bold`}>
                <label className="mr-2">{name}</label>({moment(date).format("DD-MM-yyyy, HH:mm")})
              </p>
              <p className="flex ml-1 text-left">{desc}</p>
            </button>
            <br />
            <ButtonUnText
              icon="fas fa-trash fa-sm"
              color="hover:text-red-600 transition duration-500"
              onclick={handleDeleteNote}
            />
          </li>
        )
      }
    </>
  )
}

export default ListNote
