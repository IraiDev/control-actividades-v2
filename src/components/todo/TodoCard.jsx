import React, { useContext, useState } from 'react'
import { GraphContext } from '../../context/GraphContext'
import { alertQuest, alertTimer } from '../../helpers/alerts'
import { useForm } from '../../hooks/useForm'
import ButtonUnText from '../ui/buttons/ButtonUnText'
import Modal from "@material-tailwind/react/Modal"
import ModalHeader from "@material-tailwind/react/ModalHeader"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import Button from "@material-tailwind/react/Button"
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
          <h5>{title}</h5>
        </div>
        <hr />
        <div className="pr-2 my-2 text-xs text-justify h-52 scroll-row">
          <p>{desc}</p>
        </div>
        <hr />
        <div className="flex justify-end pt-2 text-gray-700">
          <ButtonUnText
            icon="fas fa-pen"
            color="hover:text-blue-500 transition duration-500"
            onclick={showModalTrue} />

          <ButtonUnText
            icon="fas fa-trash"
            color="hover:text-red-500 transition duration-500"
            onclick={handleDelete} />
        </div>
      </div>

      {/* modal update todo */}

      <Modal size="regular" active={showModal} toggler={() => showModalFalse()}>
        <ModalHeader toggler={() => showModalFalse()}>
          Editar ToDo
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
            onClick={() => handleUpdate()}
            ripple="light"
          >
            Editar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default TodoCard
