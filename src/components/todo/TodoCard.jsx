import React, { useContext, useRef, useState } from 'react'
import { GraphContext } from '../../context/GraphContext'
import { alertQuest, alertTimer } from '../../helpers/alerts'
import { useForm } from '../../hooks/useForm'
import Button from '../ui/buttons/Button'
import Modal from "../ui/modal/Modal"
import Input from '../ui/inputs/Input'
import TextArea from '../ui/inputs/TextArea'
import "@material-tailwind/react/tailwind.css"

function TodoCard({ idTodo, title, desc }) {
  const [{ input, textArea }, onChangeValues, reset] = useForm({ input: title, textArea: desc })
  const { functions: GraphFunc, states: GraphState } = useContext(GraphContext)
  const [showModal, setShowModal] = useState(false)

  const handleUpdate = () => {
    const data = {
      title: input,
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
    reset()
  }

  const showModalTrue = () => {
    setShowModal(true)
    reset()
  }

  return (
    <>
      <div className="col-span-12 p-4 bg-white rounded-md shadow-md lg:col-span-6 xl:col-span-4 2xl:col-span-3">
        <div className="mb-1 font-semibold text-gray-800">
          <h5 className="capitalize">{title}</h5>
        </div>
        <hr />
        <div className="pr-2 my-2 text-xs h-52 scroll-row salto">
          <p>{desc}</p>
        </div>
        <hr />
        <div className="flex justify-end pt-2 text-gray-700">
          <Button
            className="h-8 w-8 hover:bg-gray-200 rounded-full hover:text-green-500 mr-2"
            type="icon"
            icon="fas fa-pen"
            onClick={showModalTrue} />

          <Button
            className="h-8 w-8 hover:bg-gray-200 rounded-full hover:text-red-500"
            type="icon"
            icon="fas fa-trash"
            onClick={handleDelete} />
        </div>
      </div>

      {/* modal update todo */}

      <Modal showModal={showModal} onClose={showModalFalse} className="md:w-4/5 lg:w-4/6 xl:w-3/6">
        <h1 className="text-xl font-semibold mb-5">Editar ToDo</h1>
        <div className="w-full">
          <Input
            field="Titulo"
            type="text"
            name="input"
            value={input}
            onChange={onChangeValues} />
          <br />
          <TextArea
            field="descripcion"
            value={textArea}
            name="textArea"
            onChange={onChangeValues} />
        </div>
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
