import React, { useContext } from 'react'
import { UiContext } from '../../../context/UiContext'
import ButtonList from '../buttons/ButtonList'

function SideMenu() {
  const { functions } = useContext(UiContext)

  const handleClickTodo = () => {
    functions.setviewTodo()
  }

  const handleClickPlanner = () => {
    functions.setViewPlanner()
  }

  return (
    <div className="sticky z-10 h-full px-3 py-10 mt-10 ml-3 text-white bg-gray-700 border-r rounded-md shadow-md top-44">
      <ButtonList title={"Crear Lista"} icon="mr-4 fas fa-plus" actions={false} />
      <ButtonList title={"Asignados a ti"} icon="mr-4 far fa-user" actions={false} onclick={handleClickPlanner} />
      <ButtonList title={"titulo"} onclick={handleClickTodo} />
      <ButtonList title={"titulo"} onclick={handleClickTodo} />
      <ButtonList title={"titulo"} onclick={handleClickTodo} />
    </div>
  )
}

export default SideMenu
