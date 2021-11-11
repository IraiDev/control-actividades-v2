import React, { useContext, useEffect } from 'react'
import { GraphContext } from '../../context/GraphContext'
import { UiContext } from '../../context/UiContext'
import useIsSignedIn from '../../hooks/useSignedIn'
import { useWindowSize } from '../../hooks/useWindowSize'
import Planner from '../planner/Planner'
import Todo from '../todo/Todo'
import SideMenu from '../ui/sidemenu/SideMenu'

function PlannerScreen() {
  const [isSigendIn] = useIsSignedIn()
  const { states: UiStates, functions: UiFunc } = useContext(UiContext)
  const { functions: GraphFunc } = useContext(GraphContext)
  const size = useWindowSize()

  useEffect(() => {
    UiFunc.setIsLoading(true)
    GraphFunc.getPlannerTask()
    GraphFunc.getTodoList()
  }, [isSigendIn])

  return (
    <div className="flex">
      <SideMenu />
      <div className={`md:container p-5 mx-auto ${size.width < 1024 && 'min-w-full'}`}>
        {
          UiStates.isTodoOrPlanner ? <Todo /> : <Planner />
        }
      </div>
    </div>
  )
}

export default PlannerScreen
