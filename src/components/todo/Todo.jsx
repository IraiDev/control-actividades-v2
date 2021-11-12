import React, { useContext, useState } from 'react'
import { UiContext } from '../../context/UiContext'
import { GraphContext } from '../../context/GraphContext'
import { useForm } from '../../hooks/useForm'
import { alertTimer } from '../../helpers/alerts'
import TodoCard from './TodoCard'
import Modal from '../ui/modal/Modal'
import Input from '../ui/inputs/Input'
import Button from '../ui/buttons/Button'
import TextArea from '../ui/inputs/TextArea'
import TextContent from '../ui/text/TextContent'

function Todo() {
  const [{ input, textArea }, onChangeValues, reset] = useForm({ input: '', textArea: '' })
  const { states: GraphState, functions: GraphFunc } = useContext(GraphContext)
  const { states: UiState } = useContext(UiContext)
  const [showModal, setShowModal] = useState(false)

  const handleCreateTodo = () => {
    const data = {
      title: input,
      body: {
        content: textArea,
      }
    }
    const action = () => {
      setShowModal(false)
      GraphFunc.createTodo(GraphState.idListSelected, data)
      reset()
    }
    let state = input === '' ? false : textArea === '' ? false : true
    alertTimer(state, 'info', 1500) ? action() : setShowModal(true)
  }

  const showModalFalse = () => {
    setShowModal(false)
    reset()
  }

  const showModalTrue = () => {
    setShowModal(true)
  }

  return (
    <>
      <div className="bg-white mb-5 p-4 rounded-md shadow-md mt-1 flex justify-end sm:justify-between items-center text-sm w-full">
        <p className="font-semibold text-lg text-gray-600 hidden sm:inline"><i className={`${UiState.displayNameTodoList.icon} mr-2`}></i>{UiState.displayNameTodoList.title}</p>
        <Button
          className="text-blue-500 font-semibold border-2 border-blue-500 rounded-full hover:text-white hover:bg-blue-500"
          name="Agregar to-do"
          onClick={showModalTrue}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-5 gap-3">
        {
          GraphState.todoTask.length > 0 ?
            (
              GraphState.todoTask.map(obj => {
                return (
                  <TodoCard
                    key={obj.id}
                    title={obj.title}
                    desc={obj.body.content}
                    idTodo={obj.id}
                    importance={obj.importance}
                  />
                )
              })
            ) : (<TextContent className="text-center col-span-12" type="response" value="No hay to-dos" />)
        }
      </div>

      {/* modal create todo */}

      <Modal showModal={showModal} onClose={showModalFalse} className="max-w-xl">
        <h1 className="text-xl font-semibold mb-5">Crear ToDo</h1>
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
        <br />
        <div className="flex justify-end">
          <Button
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full font-semibold"
            name="Crear"
            onClick={() => handleCreateTodo()}
          />
        </div>
      </Modal>
    </>
  )
}

export default Todo
