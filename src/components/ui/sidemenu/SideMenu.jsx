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
import Input from "../inputs/Input"
import { useWindowSize } from '../../../hooks/useWindowSize'
import "@material-tailwind/react/tailwind.css"

function SideMenu() {
  const [{ input }, onChangeValues, reset] = useForm({ input: '' })
  const { functions: GraphFunc, states: GraphState } = useContext(GraphContext)
  const { functions: UiFunc } = useContext(UiContext)
  const [showModal, setShowModal] = useState(false)
  const [plannerActive, setPlannerActive] = useState(false)
  const [idTodoList, setIdTodoList] = useState(null)
  const size = useWindowSize();

  const handleClickTodo = (idList) => {
    setIdTodoList(idList)
    setPlannerActive(false)
    UiFunc.setIsLoading(true)
    UiFunc.setViewTodo()
    GraphFunc.getTodoTask(idList)
    GraphFunc.setIdListSelected(idList)
  }

  const handleClickPlanner = () => {
    setIdTodoList(null)
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
    setIdTodoList(null)
    setPlannerActive(false)
    setShowModal(true)
  }

  return (
    <>
      <div className={`sticky z-50 h-full px-3 ml-3 mt-5 text-white bg-gray-700 border-r rounded-md shadow-md top-52 lg:top-40 ${size.width > 1024 ? 'py-10' : 'py-3'}`}>
        <div className="relative">
          <ButtonList
            title={"Crear Lista"}
            icon="fas fa-plus"
            actions={false}
            onclick={showModalTrue}
          />
          <ButtonList
            title={"Asignados a ti"}
            icon="far fa-user"
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
                    icon={`fas ${!obj.isOwner ? 'fa-user-friends' : 'fa-home'}`}
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
                    icon="fas fa-list-ul"
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
      </div>

      {/* modal create todo */}

      <Modal size="sm" active={showModal} toggler={() => showModalFalse()}>
        <ModalHeader toggler={() => showModalFalse()}>
          Crear nueva lista
        </ModalHeader>
        <ModalBody>
          <div className="w-430"></div>
          <Input
            field="Titulo"
            type="text"
            name="input"
            value={input}
            onChange={onChangeValues} />
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
