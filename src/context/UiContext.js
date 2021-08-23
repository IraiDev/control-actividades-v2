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
  const [isResetFilters, setResetFilters] = useState(false)

  const saveFilters = (param, value = '') => {
    let clearing = clearParams(filters, param)
    let newValue = `${clearing}${value}`
    setFilters(newValue)
    return newValue
  }

  const saveFiltersController = (param1, param2, value = '') => {
    let clearing1 = clearParams(filters, param1)
    let clearing2 = clearParams(clearing1, param2)
    let newValue = `${clearing2}${value}`
    setFilters(newValue)
    return newValue
  }

  const saveFiltersInputs = (param1, param2, param3, value = '') => {
    let clearing1 = clearParams(filters, param1)
    let clearing2 = clearParams(clearing1, param2)
    let clearing3 = clearParams(clearing2, param3)
    let newValue = `${clearing3}${value}`
    setFilters(newValue)
    return newValue
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
      subProject,
      isResetFilters
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
      saveFiltersController,
      saveFiltersInputs,
      setFilters,
      setResetFilters
    }
  }
  return (
    <UiContext.Provider value={value}>
      {children}
    </UiContext.Provider>
  )
}

export default UiProvider