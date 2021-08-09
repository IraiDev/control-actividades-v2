import React, { useContext } from 'react'
import { UiContext } from '../../context/UiContext'
import Planner from '../planner/Planner'
import Todo from '../todo/Todo'
import SideMenu from '../ui/sidemenu/SideMenu'

function PlannerScreen() {
  const { isTodoOrPlanner } = useContext(UiContext)
  return (
    <div className="flex">
      <SideMenu />
      <div className="container p-5 mx-auto">
        {
          isTodoOrPlanner ? <Todo /> : < Planner />
        }
      </div>
    </div>
  )
}

export default PlannerScreen
