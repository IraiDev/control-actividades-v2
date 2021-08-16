import React, { useContext } from 'react'
import { Login } from '@microsoft/mgt-react'
import { UiContext } from '../../../context/UiContext'
import logo25x25 from '../../../assets/logo/logo25x25.png'

function NavBar() {
  const { functions: UiFunc, states: UiState } = useContext(UiContext)

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between bg-white shadow-md h-14">
      <div className="flex pl-4">
        <img className="w-6 h-6 mr-3" src={logo25x25} alt="logo" />
        <h1 className="font-semibold">ZionIT</h1>
      </div>
      <div className="flex items-center">
        <button disabled={UiState.navTab.disableActivityTab}
          className={`hover:text-blue-700 focus:outline-none hover:bg-gray-100 rounded-full px-4 py-2 ${UiState.navTab.acivities}`}
          onClick={() => { UiFunc.activityView() }}
        >
          Actividades
        </button>
        <button disabled={UiState.navTab.disablePlannerTab}
          className={`hover:text-blue-700 focus:outline-none hover:bg-gray-100 rounded-full px-4 py-2 ${UiState.navTab.planner}`}
          onClick={() => { UiFunc.plannerView() }}
        >
          Planner
        </button>
      </div>
      <button>
        <Login />
      </button>
    </div>
  )
}

export default NavBar
