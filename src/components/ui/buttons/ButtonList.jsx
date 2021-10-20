import React, { useContext, useState } from 'react'
import { GraphContext } from '../../../context/GraphContext'
import { alertTimer, alertQuest } from '../../../helpers/alerts'
import { useForm } from '../../../hooks/useForm'
import Modal from "@material-tailwind/react/Modal"
import ModalHeader from "@material-tailwind/react/ModalHeader"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import Button from "@material-tailwind/react/Button"
import Input from "../inputs/Input"
import "@material-tailwind/react/tailwind.css"

let baseStyle = 'hover:bg-gray-800 rounded-md hover:shadow-inner my-1 px-4 flex justify-between items-center text-transparent hover:text-blue-400'

function ButtonList(props) {
  const {
    idList,
    title,
    icon = 'mr-4 fas fa-bars',
    actions = true,
    onclick,
    isOnclickeable = true,
    active = ''
  } = props

  const [{ input }, onChangeValues, reset] = useForm({ input: title })
  const { functions: GraphFunc } = useContext(GraphContext)
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    onclick(idList)
  }

  const handleUpdateList = () => {
    const data = { displayName: input }
    const aciton = () => {
      setShowModal(false)
      GraphFunc.updateTodoList(idList, data)
    }
    const state = input !== ''
    alertTimer(state, 'info', 1500, 'Llene el campo para actualizar') ? aciton() : setShowModal(true)
  }

  const handleDeleteList = () => {
    const action = () => GraphFunc.deleteTodoList(idList)
    alertQuest(
      'info',
      `<p>La siguiente lista: <b>"${title}"</b> se eliminará</p>`,
      'No, cancelar',
      'Si, eliminar',
      action
    )
  }

  const showModalFalse = () => {
    setShowModal(false)
    reset()
  }

  return (
    <>
      <div
        className={`${baseStyle} ${active}`}
      >
        <div className="flex items-center text-white hover:text-blue-400">
          <span>
            <i className={icon}></i>
          </span>
          <button
            className="py-3 text-left w-44 focus:outline-none"
            onClick={() => {
              isOnclickeable && handleClick();
            }}
          >
            <p className="font-semibold">{title}</p>
          </button>
        </div>
        {
          actions &&
          <div className="flex justify-between hover:text-blue-400">
            <button
              className="active:outline-none focus:outline-none"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <i className="transition duration-500 fas fa-pen hover:text-green-400"></i>
            </button>
            <button
              className="active:outline-none focus:outline-none"
              onClick={async () => {
                handleDeleteList();
              }}
            >
              <i className="transition duration-500 ml-3 fas fa-trash hover:text-red-400"></i>
            </button>
          </div>
        }
      </div>

      {/* modal create list */}

      <Modal size="sm" active={showModal} toggler={() => showModalFalse()}>
        <ModalHeader toggler={() => showModalFalse()}>
          Editar lista
        </ModalHeader>
        <ModalBody>
          <div className="w-430"></div>
          <Input
            field="Titulo"
            type="text"
            name="input"
            value={input}
            onChange={onChangeValues} />

        </ModalBody>
        <ModalFooter>
          <Button
            buttonType="link"
            size="sm"
            rounded={true}
            color="blue"
            onClick={() => handleUpdateList()}
            ripple="light"
          >
            Editar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ButtonList
