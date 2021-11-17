import React, { useContext, useState } from 'react'
import { GraphContext } from '../../context/GraphContext'
import { alertQuest, alertTimer } from '../../helpers/alerts'
import { useForm } from '../../hooks/useForm'
import Button from '../ui/buttons/Button'
import Modal from '../ui/modal/Modal'
import Input from '../ui/inputs/Input'
import TextArea from '../ui/inputs/TextArea'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import Tippy from '@tippyjs/react'

function TodoCard({ idTodo, title, desc, importance }) {
  const [{ input, textArea }, onChangeValues, reset] = useForm({ input: title, textArea: desc })
  const { functions: GraphFunc, states: GraphState } = useContext(GraphContext)
  const [showModal, setShowModal] = useState(false)
  const [check, setCheck] = useState(importance === 'high')

  const handleUpdate = () => {
    const data = {
      title: input,
      importance: check ? 'high' : 'normal',
      body: {
        content: textArea,
      }
    }
    const action = async () => {
      setShowModal(false)
      await GraphFunc.updateTodo(GraphState.idListSelected, idTodo, data)
      reset()
    }
    let state = input === '' ? false : textArea === '' ? false : true
    alertTimer(state, 'info', 1500) ? action() : setShowModal(true)
  }

  const handleDelete = () => {
    const action = () => GraphFunc.deleteTodo(GraphState.idListSelected, idTodo)
    alertQuest(
      'info',
      `<p>¿Eliminar ToDo: <b>"${title}"</b>?</p>`,
      'No, cancelar',
      'Si, eliminar',
      action
    )
  }

  const showModalFalse = () => {
    setShowModal(false)
    setCheck(importance === 'high')
    reset()
  }

  const showModalTrue = () => {
    setShowModal(true)
    reset()
  }

  return (
    <>
      <div onDoubleClick={showModalTrue}
        className={`p-4 rounded-md shadow-md border-2 border-transparent  transition duration-500 ${importance === 'high' ? 'bg-gray-700 text-white hover:bg-gray-600 hover:border-black' : 'bg-white hover:bg-gray-50 hover:border-gray-600'}`}>
        <div className="mb-1 font-semibold flex justify-between items-start">
          <h5 className="capitalize">{title}</h5>
          <div className="font-normal text-left text-sm flex items-center">
            {importance === 'high' &&
              <Tippy
                offset={[0, 10]}
                delay={[700, 0]}
                placement="bottom"
                content={<span>Importante</span>}
              >
                <i className="fas fa-star text-yellow-400"></i>
              </Tippy>
            }
            <Menu
              className={importance === 'high' ? 'bg-gray-700 text-white' : 'bg-white text-black'}
              direction="left"
              menuButton={
                <MenuButton className="focus:outline-none active:outline-none h-7 w-7 rounded-full transition duration-500 hover:bg-black hover:bg-opacity-10">
                  <i className="fas fa-ellipsis-v fa-sm"></i>
                </MenuButton>
              }>
              <MenuItem
                className="hover:text-white hover:bg-blue-500"
                onClick={showModalTrue}>
                Editar
                <i className="fas fa-pen ml-2"></i>
              </MenuItem>
              <MenuItem
                className="hover:text-white hover:bg-blue-500"
                onClick={handleDelete}>
                Eliminar
                <i className="fas fa-trash-alt ml-2"></i>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <hr className="border-gray-400" />
        <p className="pr-2 mt-2 text-xs max-h-64 overflow-custom whitespace-pre-wrap">
          {desc}
        </p>
      </div>

      {/* modal update todo */}

      <Modal showModal={showModal} onClose={showModalFalse} className="max-w-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold mb-5">Editar ToDo</h1>
          <Tippy
            offset={[0, 10]}
            delay={[700, 0]}
            placement="bottom"
            content={<span>{check ? 'Quitar importante' : 'Asignar como importante'}</span>}
          >
            <label htmlFor="important">
              <input
                className="hidden"
                type="checkbox"
                id="important"
                checked={check}
                onChange={() => setCheck(!check)} />
              <i className={`transition duration-500 cursor-pointer hover:text-blue-400 fa-lg ${check ? 'fas fa-star text-blue-500' : 'far fa-star'}`}></i>
            </label>
          </Tippy>
        </div>
        <div className="w-full">
          <Input
            field="Titulo"
            type="text"
            name="input"
            value={input}
            onChange={onChangeValues} />
          <br />
          <TextArea
            className="text-sm h-44 overflow-custom whitespace-pre-wrap"
            field="descripcion"
            value={textArea}
            name="textArea"
            onChange={onChangeValues} />
        </div>
        <br />
        <div className="flex justify-end">
          <Button
            className="text-blue-500 hover:text-blue-600 hover:bg-blue-100 rounded-full"
            onClick={() => handleUpdate()}
            name="Editar"
          />
        </div>
      </Modal>
    </>
  )
}

export default TodoCard
