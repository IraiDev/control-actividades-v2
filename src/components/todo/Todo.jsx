import React, { useContext, useState } from 'react'
import { UiContext } from '../../context/UiContext'
import { GraphContext } from '../../context/GraphContext'
import { useForm } from '../../hooks/useForm'
import { alertTimer } from '../../helpers/alerts'
import TodoCard from './TodoCard'
import Modal from "@material-tailwind/react/Modal"
import ModalHeader from "@material-tailwind/react/ModalHeader"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import Input from "../ui/inputs/Input"
import Button from '../ui/buttons/Button'
import PResp from '../ui/text/PResp'
import TextArea from '../ui/inputs/TextArea'
import "@material-tailwind/react/tailwind.css"

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
      <div className="bg-white mb-5 p-4 rounded-md shadow-md mt-1 flex justify-end sm:justify-between items-center text-sm">
        <p className="font-semibold text-lg text-gray-600 hidden sm:inline"><i className={`${UiState.displayNameTodoList.icon} mr-2`}></i>{UiState.displayNameTodoList.title}</p>
        <Button
          className="text-blue-500 font-semibold border-2 border-blue-500 rounded-full hover:text-white hover:bg-blue-500"
          shadow={false}
          name="Agregar to-do"
          onClick={showModalTrue}
        />
      </div>
      <div className="grid grid-cols-12 gap-3">
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
                  />
                )
              })
            ) : (<PResp />)
        }
      </div>

      {/* modal create todo */}

      <Modal size="regular" active={showModal} toggler={() => showModalFalse()}>
        <ModalHeader toggler={() => showModalFalse()}>
          Crear ToDo
        </ModalHeader>
        <ModalBody>
          <div className="w-430">
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
        </ModalBody>
        <ModalFooter>
          <Button
            className="text-blue-500 hover:text-blue-600 hover:bg-blue-100 rounded-full"
            shadow={false}
            name="Crear"
            onClick={() => handleCreateTodo()}
          />
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Todo
