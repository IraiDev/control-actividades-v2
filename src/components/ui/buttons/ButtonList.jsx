import React, { useContext, useState } from 'react'
import { UiContext } from '../../../context/UiContext'
import { GraphContext } from '../../../context/GraphContext'
import { alertTimer, alertQuest } from '../../../helpers/alerts'
import { useForm } from '../../../hooks/useForm'
import Modal from '../modal/Modal'
import Button from '../buttons/Button'
import Input from '../inputs/Input'
import Tippy from '@tippyjs/react'
import { useWindowSize } from '../../../hooks/useWindowSize'

let baseStyle = 'hover:bg-gray-800 px-4 rounded-md hover:shadow-inner mb-1 flex justify-between items-center text-transparent'

function ButtonList(props) {
  const {
    idList,
    title,
    icon = 'fas fa-bars',
    actions = true,
    onclick,
    isOnclickeable = true,
    active = ''
  } = props

  const [{ input }, onChangeValues, reset] = useForm({ input: title })
  const { functions: GraphFunc } = useContext(GraphContext)
  const { functions: UiFunc } = useContext(UiContext)
  const [showModal, setShowModal] = useState(false)
  const size = useWindowSize();

  const handleClick = () => {
    const data = {
      title,
      icon
    }
    onclick(idList)
    UiFunc.setDisplayNameTodoList(data)
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
      <div className={`${baseStyle} ${active} ${size.width > 1024 && 'hover:text-blue-400'}`}>
        <Tippy
          disabled={size.width > 1024}
          offset={[0, 30]}
          delay={[200, 0]}
          placement={"left"}
          content={<span>{title}</span>}
        >
          <button
            className={`focus:outline-none flex items-center text-white ${size.width < 1024 ? 'w-full py-2' : 'w-44 py-3'}`}
            onClick={() => {
              isOnclickeable && handleClick();
            }}
          >
            <span>
              <i className={icon}></i>
            </span>
            {
              size.width > 1024 &&
              <p className="font-semibold ml-4">{title}</p>
            }
          </button>
        </Tippy>
        {
          actions &&
          <div className={`flex justify-between left-12 hover:text-blue-400 ${size.width < 1024 && 'absolute hover:bg-gray-800 py-2 pr-4 pl-10 -m-3 rounded-r'}`}>
            <button
              className="active:outline-none focus:outline-none"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <i className={`transition duration-500 fas fa-pen hover:text-green-400 ${size.width < 1024 && 'fa-sm'}`}></i>
            </button>
            <button
              className="active:outline-none focus:outline-none"
              onClick={async () => {
                handleDeleteList();
              }}
            >
              <i className={`transition duration-500 ml-3 fas fa-trash hover:text-red-400 ${size.width < 1024 && 'fa-sm'}`}></i>
            </button>
          </div>
        }
      </div>

      {/* modal create list */}

      <Modal showModal={showModal} onClose={showModalFalse} className="md:w-96">
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
