import React, { useContext, useEffect } from 'react'
import { GraphContext } from '../../context/GraphContext'
import { UiContext } from '../../context/UiContext'
import NavBar from '../ui/navbar/NavBar'
import SideBar from '../ui/sidebar/SideBar'
import UtilityBar from '../ui/utilitybar/UtilityBar'
import ActivitiesScreen from './ActivitiesScreen'
import PlannerScreen from './PlannerScreen'

function HomeScreen() {

  const { states } = useContext(UiContext)
  const { functions } = useContext(GraphContext)

  useEffect(() => {
    functions.getUserData()
  }, [])
  return (
    <>
      <NavBar />
      <SideBar />
      <UtilityBar />
      {
        !states.isViewChanged ? <PlannerScreen /> : <ActivitiesScreen />
      }
    </>
  )
}

export default HomeScreen
