import React, { useContext, useState } from 'react'
import { UiContext } from '../../../context/UiContext'
import { GraphContext } from '../../../context/GraphContext'
import { useForm } from '../../../hooks/useForm'
import Modal from '../modal/Modal'
import Button from '../buttons/Button'
import Input from '../inputs/Input'
import { useWindowSize } from '../../../hooks/useWindowSize'
import { Alert } from '../../../helpers/alert'

let baseStyle = 'hover:bg-gray-800 px-4 rounded-md hover:shadow-inner mb-1 flex justify-between items-center text-transparent'

function ButtonList(props) {
  const {
    idList,
    title,
    icon = 'fas fa-bars',
    actions = true,
    onClick,
    active = '',
    noSelect = false
  } = props

  const [{ input }, onChangeValues, reset] = useForm({ input: title })
  const { functions: GraphFunc } = useContext(GraphContext)
  const { functions: UiFunc } = useContext(UiContext)
  const [showModal, setShowModal] = useState(false)
  const size = useWindowSize()

  const handleClick = () => {
    onClick(idList)
    if (noSelect) return
    const data = { title, icon }
    UiFunc.setDisplayNameTodoList(data)
    size.width < 1024 && UiFunc.setToggleSideMenu(false)
  }

  const handleUpdateList = () => {
    if (input === '') {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: 'no pude crear una lista sin nombre, llene el campo y vuelva a intentarlo',
        timer: 5000,
        showCancelButton: false
      })
      return
    }
    setShowModal(false)
    GraphFunc.updateTodoList(idList, { displayName: input })
  }

  const handleDeleteList = () => {
    Alert({
      icon: 'warn',
      title: 'Atencion',
      content: `¿Seguro desea eliminar la lista: <b>"${title}"</b>?`,
      cancelText: 'No, cancelar',
      confirmText: 'Si, eliminar',
      action: () => GraphFunc.deleteTodoList(idList)
    })
  }

  const showModalFalse = () => {
    setShowModal(false)
    reset()
  }

  return (
    <>
      <div className={`${baseStyle} ${active} hover:text-blue-400 transition duration-300`}>
        <button
          className={`focus:outline-none flex items-center text-white w-full py-2`}
          onClick={() => {
            handleClick()
          }}
        >
          <span>
            <i className={icon}></i>
          </span>
          <p className="font-semibold mx-4">{title}</p>
        </button>
        {
          actions &&
          <div className={`flex justify-between hover:text-blue-400 `}>
            <button
              className="active:outline-none focus:outline-none"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <i className={`transition duration-500 fas fa-pen hover:text-green-400 `}></i>
            </button>
            <button
              className="active:outline-none focus:outline-none"
              onClick={async () => {
                handleDeleteList();
              }}
            >
              <i className={`transition duration-500 ml-3 fas fa-trash hover:text-red-400 `}></i>
            </button>
          </div>
        }
      </div>

      {/* modal create list */}

      <Modal showModal={showModal} onClose={showModalFalse} className="max-w-lg">
        <h1 className="text-xl font-semibold mb-5">Editar lista</h1>
        <div className="w-full">
          <Input
            field="Titulo"
            type="text"
            name="input"
            value={input}
            onChange={onChangeValues} />
        </div>
        <br />
        <div className="flex justify-end">
          <Button
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full font-semibold"
            name="Editar"
            onClick={() => handleUpdateList()}
          />
        </div>
      </Modal>
    </>
  )
}

export default ButtonList
