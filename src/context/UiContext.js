import React, { createContext, useState } from 'react'
import { clearParams } from '../helpers/auxFunctions'
import useTab from '../hooks/useTab'
import useToggle from '../hooks/useToggle'

export const UiContext = createContext()

const initialNavTab = {
  acivities: '',
  planner: 'text-blue-600 font-bold',
  disableActivityTab: false,
  disablePlannerTab: true,
  activeTab: false,
  filterPayActiviies: true
}

const intialSubProject = {
  label: 'Seleccione una opcion',
  value: '',
  id: null,
  name: ''
}

function UiProvider({ children }) {
  const [isViewChanged, setViewActivities, setViewPLannerTask] = useTab()
  const [isTodoOrPlanner, setviewTodo, setViewPlanner] = useTab()
  const [toggleSideBar, setToggleSideBar] = useToggle();
  const [isLoading, setIsLoading] = useState(false)
  const [disbleBtnSideBar, setDisbleBtnSideBar] = useState(true)
  const [navTab, setNavTab] = useState(initialNavTab)
  const [subProject, setSubProject] = useState(intialSubProject)
  const [filters, setFilters] = useState('')

  const saveFilters = async (param, value = '') => {
    let clearing = await clearParams(filters, param)
    let newValue = `${clearing}${value}`
    setFilters(newValue)
  }

  const saveFiltersController = async (param1, param2, value = '') => {
    let clearing1 = await clearParams(filters, param1)
    let clearing2 = await clearParams(clearing1, param2)
    let newValue = `${clearing2}${value}`
    setFilters(newValue)
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
      subProject
    },
    functions: {
      activityView,
      plannerView,
      setViewPlanner,
      setviewTodo,
      setToggleSideBar,
      setIsLoading,
      saveFilters,
      setSubProject,
      saveFiltersController
    }
  }
  return (
    <UiContext.Provider value={value}>
      {children}
    </UiContext.Provider>
  )
}

export default UiProvider