import React, { createContext, useState } from 'react'
import { clearParams } from '../helpers/auxFunctions'
import useTab from '../hooks/useTab'
import useToggle from '../hooks/useToggle'

export const UiContext = createContext()

const initialState = {
  acivities: '',
  planner: 'text-blue-600 font-bold',
  disableActivityTab: false,
  disablePlannerTab: true,
  activeTab: false,
  filterPayActiviies: true
}

function UiProvider({ children }) {
  const [isViewChanged, setViewActivities, setViewPLannerTask] = useTab()
  const [isTodoOrPlanner, setviewTodo, setViewPlanner] = useTab()
  const [toggleSideBar, setToggleSideBar] = useToggle();
  const [isLoading, setIsLoading] = useState(false)
  const [disbleBtnSideBar, setDisbleBtnSideBar] = useState(true)
  const [navTab, setNavTab] = useState(initialState)
  const [filters, setFilters] = useState('')

  const saveFilters = (param, value) => {
    let clearing = clearParams(filters, param)
    let newValue = clearing + value
    setFilters(newValue)
    console.log(newValue)
  }

  const activityView = () => {
    setDisbleBtnSideBar(false)
    setViewActivities()
    setNavTab({
      planner: '',
      acivities: 'text-blue-600 font-bold',
      disableActivityTab: true,
      disablePlannerTab: false,
      activeTab: true,
      filterPayActiviies: false
    })
  }

  const plannerView = () => {
    setDisbleBtnSideBar(true)
    setViewPLannerTask()
    setIsLoading(true)
    setNavTab({
      acivities: '',
      planner: 'text-blue-600 font-bold',
      disableActivityTab: false,
      disablePlannerTab: true,
      activeTab: false,
      filterPayActiviies: true
    })
  }

  const value = {
    states: {
      isViewChanged,
      navTab,
      isTodoOrPlanner,
      toggleSideBar,
      isLoading,
      disbleBtnSideBar,
      filters,
    },
    functions: {
      activityView,
      plannerView,
      setViewPlanner,
      setviewTodo,
      setToggleSideBar,
      setIsLoading,
      saveFilters,
    }
  }
  return (
    <UiContext.Provider value={value}>
      {children}
    </UiContext.Provider>
  )
}

export default UiProvider