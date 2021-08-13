import React, { useContext, useState } from 'react'
import { GraphContext } from '../../context/GraphContext'
import { useForm } from '../../hooks/useForm'
import { alertTimer } from '../../helpers/alerts'
import TodoCard from './TodoCard'
import Modal from "@material-tailwind/react/Modal"
import ModalHeader from "@material-tailwind/react/ModalHeader"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import Button from "@material-tailwind/react/Button"
import Input from "@material-tailwind/react/Input"
import Textarea from "@material-tailwind/react/Textarea"
import "@material-tailwind/react/tailwind.css"

function Todo() {
  const [{ input, textArea }, onChangeValues, reset] = useForm({ input: '', textArea: '' })
  const { states: GraphState, functions: GraphFunc } = useContext(GraphContext)
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

  return (
    <>
      <div className="flex justify-end">
        <button
          className="px-2 pt-1 pb-2 font-semibold text-blue-500 hover:text-green-600 active:outline-none focus:outline-none"
          onClick={() => { setShowModal(true) }}
        >
          Agregar ToDo...
        </button>
      </div>
      <div className="grid grid-cols-12 gap-3">
        {
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
        }
      </div>

      {/* modal create todo */}

      <Modal size="sm" active={showModal} toggler={() => showModalFalse()}>
        <ModalHeader toggler={() => showModalFalse()}>
          Crear ToDo
        </ModalHeader>
        <ModalBody>
          <div className="w-430"></div>
          <Input
            value={input}
            name="input"
            onChange={onChangeValues}
            type="text"
            color="blue"
            size="sm"
            outline={false}
            placeholder="Titulo..."
          />
          <br />
          <Textarea
            value={textArea}
            name="textArea"
            onChange={onChangeValues}
            color="blue"
            size="sm"
            outline={true}
            placeholder="Descripcion..."
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="blue"
            onClick={() => handleCreateTodo()}
            ripple="light"
          >
            Crear
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Todo
