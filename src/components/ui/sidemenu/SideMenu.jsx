import React, { useContext, useState } from 'react'
import { UiContext } from '../../../context/UiContext'
import { GraphContext } from '../../../context/GraphContext'
import { useForm } from '../../../hooks/useForm'
import { alertTimer } from '../../../helpers/alerts'
import ButtonList from '../buttons/ButtonList'
import Modal from "@material-tailwind/react/Modal"
import ModalHeader from "@material-tailwind/react/ModalHeader"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import Button from "@material-tailwind/react/Button"
import Input from "@material-tailwind/react/Input"
import "@material-tailwind/react/tailwind.css"

function SideMenu() {
  const [{ input }, onChangeValues, reset] = useForm({ input: '' })
  const { functions: GraphFunc, states: GraphState } = useContext(GraphContext)
  const { functions: UiFunc } = useContext(UiContext)
  const [showModal, setShowModal] = useState(false)
  const [plannerActive, setPlannerActive] = useState(false)
  const [idTodoList, setidTodoList] = useState(null)

  const handleClickTodo = (idList) => {
    setidTodoList(idList)
    setPlannerActive(false)
    UiFunc.setIsLoading(true)
    UiFunc.setviewTodo()
    GraphFunc.getTodoTask(idList)
    GraphFunc.setIdListSelected(idList)
  }

  const handleClickPlanner = () => {
    setidTodoList(null)
    setPlannerActive(true)
    UiFunc.setIsLoading(true)
    UiFunc.setViewPlanner()
    GraphFunc.getPlannerTask()
  }

  const handleCreateTodoList = () => {
    const data = { displayName: input }
    const action = () => {
      setShowModal(false)
      GraphFunc.createTodoList(data)
      reset()
    }
    let state = input === '' ? false : true
    alertTimer(state, 'info', 1500) ? action() : setShowModal(true)
  }

  const showModalFalse = () => {
    setShowModal(false)
    reset()
  }

  const showModalTrue = () => {
    setidTodoList(null)
    setPlannerActive(false)
    setShowModal(true)
  }

  return (
    <>
      <div className="sticky z-10 h-full px-3 py-10 mt-10 ml-3 text-white bg-gray-700 border-r rounded-md shadow-md top-44">
        <ButtonList
          title={"Crear Lista"}
          icon="mr-4 fas fa-plus"
          actions={false}
          onclick={showModalTrue}
        />
        <ButtonList
          title={"Asignados a ti"}
          icon="mr-4 far fa-user"
          actions={false}
          onclick={handleClickPlanner}
          active={plannerActive && 'bg-gray-800'}
        />
        {
          GraphState.todoList.map(obj => {
            if (!obj.isOwner || (obj.isOwner && obj.wellknownListName === "defaultList")) {
              return (
                <ButtonList
                  key={obj.id}
                  idList={obj.id}
                  title={obj.displayName}
                  icon="mr-4 fas fa-bars"
                  actions={false}
                  onclick={handleClickTodo}
                  active={obj.id === idTodoList && 'bg-gray-800'}
                />
              )
            } else {
              return ''
            }
          })
        }
        <hr className="my-3" />
        {
          GraphState.todoList.map(obj => {
            if (obj.wellknownListName !== "defaultList" && obj.isOwner) {
              return (
                <ButtonList
                  key={obj.id}
                  idList={obj.id}
                  title={obj.displayName}
                  icon="mr-4 fas fa-bars"
                  onclick={handleClickTodo}
                  active={obj.id === idTodoList && 'bg-gray-800'}
                />
              )
            } else {
              return ''
            }
          })
        }
      </div>

      {/* modal create todo */}

      <Modal size="sm" active={showModal} toggler={() => showModalFalse()}>
        <ModalHeader toggler={() => showModalFalse()}>
          Crear nueva lista
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
        </ModalBody>
        <ModalFooter>
          <Button
            buttonType="link"
            size="sm"
            rounded={true}
            color="blue"
            onClick={() => handleCreateTodoList()}
            ripple="light"
          >
            Crear
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default SideMenu
