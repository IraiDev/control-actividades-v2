import React, { useContext } from 'react'
import { Login } from '@microsoft/mgt-react'
import { UiContext } from '../../../context/UiContext'
import { ActivityContext } from '../../../context/ActivityContext'
import { types } from '../../../types/types'
import { Menu, MenuButton, MenuGroup, MenuItem } from '@szhsin/react-menu';
import logo25x25 from '../../../assets/logo/logo25x25.png'

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
    <nav className="sticky w-full top-0 z-40 flex items-center justify-between bg-white shadow-md h-14">
      <div className="pl-4 hidden md:flex">
        <img className="w-6 h-6 mr-3 hidden sm:inline" src={logo25x25} alt="logo" />
        <h1 className="font-semibold capitalize hidden md:inline">control de actividades</h1>
      </div>
      <div className="md:flex hidden items-center">
        <button
          disabled={UiState.navTab.disabled === activitiesView || UiState.navTab.disabled === detailsView}
          className={`transition duration-500 hover:text-blue-700 focus:outline-none hover:bg-gray-200 rounded-full px-4 py-2 ${UiState.navTab.activities}`}
          onClick={() => { handleActivityView() }}
        >
          Actividades
        </button>
        <button
          disabled={UiState.navTab.disabled === plannerView}
          className={`transition duration-500 hover:text-blue-700 focus:outline-none hover:bg-gray-200 rounded-full px-4 py-2 ${UiState.navTab.planner}`}
          onClick={() => { handlePlannerView() }}
        >
          Planner
        </button>
        <button
          disabled={UiState.navTab.disabled === timesView}
          className={`transition duration-500 hover:text-blue-700 focus:outline-none hover:bg-gray-200 rounded-full px-4 py-2 ${UiState.navTab.times}`}
          onClick={() => { handleTimesView() }}
        >
          Informe de Tiempos
        </button>
      </div>
      <div className="md:hidden inline">
        <Menu
          direction="bottom"
          overflow="auto"
          position="anchor"
          menuButton={
            <MenuButton className="transition duration-500 focus:outline-none active:outline-none h-8 w-8 text-gray-700 hover:bg-gray-200 ml-4 rounded-md">
              <i className="fas fa-bars"></i>
            </MenuButton>
          }
        >
          <MenuGroup takeOverflow>
            <MenuItem
              disabled={UiState.navTab.disabled === activitiesView || UiState.navTab.disabled === detailsView}
              className={`px-4 py-2 ${UiState.navTab.activities}`}
              onClick={() => { handleActivityView() }}>
              Actividades
            </MenuItem>
            <MenuItem
              disabled={UiState.navTab.disabled === plannerView}
              className={` px-4 py-2 ${UiState.navTab.planner}`}
              onClick={() => { handlePlannerView() }}>
              Planner
            </MenuItem>
            <MenuItem
              disabled={UiState.navTab.disabled === timesView}
              className={`px-4 py-2 ${UiState.navTab.times}`}
              onClick={() => { handleTimesView() }}
            >
              Informe de Tiempos
            </MenuItem>
          </MenuGroup>
        </Menu>
      </div>
      <button>
        <Login />
      </button>
    </nav>
  )
}

export default NavBar
