import React, { useContext, useState } from 'react'
import { UiContext } from '../../../context/UiContext'
import { GraphContext } from '../../../context/GraphContext'
import { useForm } from '../../../hooks/useForm'
import { alertTimer } from '../../../helpers/alerts'
import ButtonList from '../buttons/ButtonList'
import Modal from "../modal/Modal"
import Button from "../buttons/Button"
import Input from "../inputs/Input"
import { useWindowSize } from '../../../hooks/useWindowSize'

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
      <div className={`sticky z-40 h-full px-3 ml-3 mt-5 text-white bg-gray-700 border-r rounded-md shadow-md top-52 lg:top-40 ${size.width > 1024 ? 'py-10' : 'py-3'}`}>
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

      <Modal showModal={showModal} onClose={showModalFalse} className="md:w-96">
        <h1 className="text-xl font-semibold mb-5">Crear nueva lista</h1>
        <div className="w-430"></div>
        <Input
          field="Titulo"
          type="text"
          name="input"
          value={input}
          onChange={onChangeValues} />
        <br />
        <div className="flex justify-end">
          <Button
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full"
            name="Crear"
            onClick={() => handleCreateTodoList()}
          />
        </div>
      </Modal>
    </>
  )
}

export default SideMenu
