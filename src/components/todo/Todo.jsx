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
import ButtonText from '../ui/buttons/ButtonText'
import PResp from '../ui/text/PResp'

const buttonStyle = 'text-blue-500 border-2 border-blue-500 font-semibold bg-white'
const buttonStyleHover = 'hover:bg-blue-500 hover:text-white transition duration-300'
const buttonAddToDo = `${buttonStyle} ${buttonStyleHover}`

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

  const showModalTrue = () => {
    setShowModal(true)
  }

  return (
    <>
      <div className="flex justify-end mb-5">
        <ButtonText
          isIcon={false}
          text="Agregar ToDo"
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
            value={input}
            name="input"
            onChange={onChangeValues}
            type="text"
            color="blue"
            size="regular"
            outline={true}
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
