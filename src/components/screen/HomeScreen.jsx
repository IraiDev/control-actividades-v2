import React, { useContext, useEffect } from 'react'
import { GraphContext } from '../../context/GraphContext'
import { UiContext } from '../../context/UiContext'
import Loading from '../ui/loading/Loading'
import NavBar from '../ui/navbar/NavBar'
import SideBar from '../ui/sidebar/SideBar'
import UtilityBar from '../ui/utilitybar/UtilityBar'
import ActivitiesScreen from './ActivitiesScreen'
import PlannerScreen from './PlannerScreen'

function HomeScreen() {
  const { states: UiState } = useContext(UiContext)
  const { functions: GraphFunc } = useContext(GraphContext)

  useEffect(() => {
    GraphFunc.getUserData()
  }, [])

  return (
    <>
      <Loading isLoading={UiState.isLoading} />
      <NavBar />
      <SideBar />
      <UtilityBar />
      {
        !UiState.isViewChanged ? <PlannerScreen /> : <ActivitiesScreen />
      }
    </>
  )
}

export default HomeScreen
