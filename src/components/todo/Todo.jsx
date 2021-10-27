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
import Button from "@material-tailwind/react/Button"
import Input from "../ui/inputs/Input"
import ButtonText from '../ui/buttons/ButtonText'
import PResp from '../ui/text/PResp'
import TextArea from '../ui/inputs/TextArea'
import "@material-tailwind/react/tailwind.css"

const buttonStyle = 'text-blue-500 border-2 border-blue-500 font-semibold bg-white'
const buttonStyleHover = 'hover:bg-blue-500 hover:text-white transition duration-300'
const buttonAddToDo = `${buttonStyle} ${buttonStyleHover}`

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
      <div className="bg-white mb-5 p-4 rounded-md shadow-md mt-1 flex justify-between items-center text-sm">
        <p className="font-semibold text-lg text-gray-600"><i className={`${UiState.displayNameTodoList.icon} mr-2`}></i>{UiState.displayNameTodoList.title}</p>
        <ButtonText
          isIcon={false}
          text="Agregar To-do"
          color={buttonAddToDo}
          onclick={showModalTrue}
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
          <div className="w-430"></div>
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
        </ModalBody>
        <ModalFooter>
          <Button
            buttonType="link"
            size="sm"
            rounded={true}
            color="blue"
            onClick={() => handleCreateTodo()}
            ripple="light"
          >
            crear
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Todo
