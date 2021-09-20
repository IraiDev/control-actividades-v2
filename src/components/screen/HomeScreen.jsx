import React, { useContext, useEffect } from 'react'
import { UiContext } from '../../context/UiContext'
import { GraphContext } from '../../context/GraphContext'
import { ActivityContext } from '../../context/ActivityContext'
import Loading from '../ui/loading/Loading'
import NavBar from '../ui/navbar/NavBar'
import SideBar from '../ui/sidebar/SideBar'
import UtilityBar from '../ui/utilitybar/UtilityBar'
import ActivitiesScreen from './ActivitiesScreen'
import PlannerScreen from './PlannerScreen'
import useIsSignedIn from '../../hooks/useSignedIn'
import { types } from '../../types/routes'
import TimeScreen from './TimeScreen'

const { plannerView, activitiesView, timesView } = types

function HomeScreen() {
  const [isSignedIn] = useIsSignedIn()
  const { states: UiState } = useContext(UiContext)
  const { functions: GraphFunc, states: GraphState } = useContext(GraphContext)
  const { functions: ActFunc, states: ActState } = useContext(ActivityContext)

  useEffect(() => {
    GraphFunc.getUserData()
  }, [])

  useEffect(() => {
    isSignedIn && ActFunc.login(GraphState.userEmail)
  }, [GraphState.userEmail])

  useEffect(() => {
    if (ActState.userData.ok) {
      ActFunc.getTimes()
      ActFunc.getNotify()
      ActFunc.getFilters()
    }
  }, [ActState.userData.ok])

  return (
    <>
      <Loading isLoading={UiState.isLoading} />
      <NavBar />
      <SideBar />
      <UtilityBar />
      {
        // !UiState.isViewChanged ? <PlannerScreen /> : <ActivitiesScreen />
        UiState.tabs === plannerView ? <PlannerScreen /> :
          UiState.tabs === activitiesView ? <ActivitiesScreen /> :
            UiState.tabs === timesView && <TimeScreen />
      }
    </>
  )
}

export default HomeScreen
