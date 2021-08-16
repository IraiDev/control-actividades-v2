import React, { useContext, useEffect } from 'react'
import { GraphContext } from '../../context/GraphContext'
import { UiContext } from '../../context/UiContext'
import useIsSignedIn from '../../hooks/useSignedIn'
import Planner from '../planner/Planner'
import Todo from '../todo/Todo'
import SideMenu from '../ui/sidemenu/SideMenu'

function PlannerScreen() {
  const [isSigendIn] = useIsSignedIn()
  const { states: UiStates, functions: UiFunc } = useContext(UiContext)
  const { functions: GraphFunc } = useContext(GraphContext)

  useEffect(() => {
    UiFunc.setIsLoading(true)
    GraphFunc.getPlannerTask()
    GraphFunc.getTodoList()
  }, [isSigendIn])

  return (
    <div className="flex">
      <SideMenu />
      <div className="container p-5 mx-auto">
        {
          UiStates.isTodoOrPlanner ? <Todo /> : <Planner />
        }
      </div>
    </div>
  )
}

export default PlannerScreen
