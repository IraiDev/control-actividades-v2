import React, { useContext } from 'react'
import { Login } from '@microsoft/mgt-react'
import { UiContext } from '../../../context/UiContext'
import { ActivityContext } from '../../../context/ActivityContext'
import logo25x25 from '../../../assets/logo/logo25x25.png'
import { types } from '../../../types/types'

const { plannerView, activitiesView, timesView, detailsView } = types

function NavBar() {
  const { functions: UiFunc, states: UiState } = useContext(UiContext)
  const { functions: ActFunc, states: ActState } = useContext(ActivityContext)

  const handleActivityView = async () => {
    await UiFunc.setIsLoading(true)
    await ActFunc.getActivities()
    await UiFunc.activityView()
    await ActFunc.getNotify()
    await ActFunc.getTimes()
  }

  const handlePlannerView = () => {
    UiFunc.plannerView()
    ActFunc.getNotify()
    ActFunc.getTimes()
  }

  const handleTimesView = () => {
    UiFunc.timesView()
    ActFunc.getNotify()
    ActFunc.getTimes()
  }

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between bg-white shadow-md h-14">
      <div className="flex pl-4">
        <img className="w-6 h-6 mr-3" src={logo25x25} alt="logo" />
        <h1 className="font-semibold">ZionIT</h1>
      </div>
      <div className="flex items-center">
        <button disabled={UiState.navTab.disabled === activitiesView || UiState.navTab.disabled === detailsView}
          className={`transition duration-500 hover:text-blue-700 focus:outline-none hover:bg-gray-200 rounded-full px-4 py-2 ${UiState.navTab.activities}`}
          onClick={() => { handleActivityView() }}
        >
          Actividades
        </button>
        <button disabled={UiState.navTab.disabled === plannerView}
          className={`transition duration-500 hover:text-blue-700 focus:outline-none hover:bg-gray-200 rounded-full px-4 py-2 ${UiState.navTab.planner}`}
          onClick={() => { handlePlannerView() }}
        >
          Planner
        </button>
        <button disabled={UiState.navTab.disabled === timesView}
          className={`transition duration-500 hover:text-blue-700 focus:outline-none hover:bg-gray-200 rounded-full px-4 py-2 ${UiState.navTab.times}`}
          onClick={() => { handleTimesView() }}
        >
          Informe de Tiempos
        </button>
      </div>
      <button>
        <Login />
      </button>
    </div>
  )
}

export default NavBar
