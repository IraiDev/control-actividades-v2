import React, { createContext, useState } from 'react'
import { clearParams } from '../helpers/auxFunctions'
import useTab from '../hooks/useTab'
import useToggle from '../hooks/useToggle'
import { types } from '../types/types'

const { plannerView: plannerScreen, activitiesView: actView, timesView: timeView, detailsView: detailView } = types

export const UiContext = createContext()

const initialNavTab = {
  activities: '',
  planner: 'text-blue-600 font-bold',
  times: '',
  disabled: plannerScreen,
  disableActivityTab: false,
  disablePlannerTab: true,
  disableTimesTab: false,
  disableTime: false,
  activeTab: false,
  filterPlayActivities: true
}

function UiProvider({ children }) {

  const [tabs, setTabs] = useState(plannerScreen)
  const [isViewChanged, setViewActivities, setViewPLannerTask] = useTab()
  const [isTodoOrPlanner, setViewTodo, setViewPlanner] = useTab()
  const [toggleSideBar, setToggleSideBar] = useToggle(false);
  const [toggleSideMenu, setToggleSideMenu] = useState(false);
  const [disableBtnSideBar, setDisableBtnSideBar] = useState(true)
  const [isResetFilters, setResetFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [subProject, setSubProject] = useState(null)
  const [navTab, setNavTab] = useState(initialNavTab)
  const [activeOrder, setActiveOrder] = useState(false)
  const [allOrDetails, setAllOrDetails] = useState(true)
  const [displayNameTodoList, setDisplayNameTodoList] = useState({})
  //filtros en formato string y array
  const [filters, setFilters] = useState('')
  const [multiEncargados, setMultiEncargados] = useState([])
  const [multiProyectos, setMultiProyectos] = useState([])
  const [multiSubProyectos, setMultiSubProyectos] = useState([])
  const [multiSolicitantes, setMultiSolicitantes] = useState([])

  const saveFilters = (param, value = '') => {
    let clearing = clearParams(filters, param)
    let newValue = `${clearing}${value}`
    setFilters(newValue)
    return newValue === '' ? '_' : newValue
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

  const activityView = async () => {
    await setNavTab({
      planner: '',
      activities: 'text-blue-600 font-bold',
      times: '',
      disabled: actView
    })
    await setTabs(actView)
    await setDisableBtnSideBar(false)
    await setViewActivities()
    await setActiveOrder(true)
    await setAllOrDetails(true)
  }

  const plannerView = () => {
    setTabs(plannerScreen)
    toggleSideBar && setToggleSideBar()
    setDisableBtnSideBar(true)
    setViewPLannerTask()
    setIsLoading(true)
    setAllOrDetails(true)
    setNavTab({
      activities: '',
      planner: 'text-blue-600 font-bold',
      times: '',
      disabled: plannerScreen
    })
  }

  const timesView = () => {
    setTabs(timeView)
    toggleSideBar && setToggleSideBar()
    setDisableBtnSideBar(true)
    setViewPLannerTask()
    setIsLoading(true)
    setNavTab({
      activities: '',
      planner: '',
      times: 'text-blue-600 font-bold',
      disabled: timeView
    })
  }

  const detailsView = (btnFilter, btnPlay) => {
    toggleSideBar && setToggleSideBar()
    setDisableBtnSideBar(btnFilter)
    setNavTab({
      planner: '',
      activities: 'text-blue-600 font-bold',
      times: '',
      disabled: detailView,
      filterPlayActivities: btnPlay
    })
  }

  const value = {
    states: {
      isViewChanged,
      navTab,
      isTodoOrPlanner,
      toggleSideBar,
      isLoading,
      disableBtnSideBar,
      filters,
      subProject,
      isResetFilters,
      activeOrder,
      multiEncargados,
      multiProyectos,
      multiSubProyectos,
      multiSolicitantes,
      tabs,
      allOrDetails,
      displayNameTodoList,
      toggleSideMenu
    },
    functions: {
      activityView,
      plannerView,
      setViewPlanner,
      setViewTodo,
      setToggleSideBar,
      setIsLoading,
      saveFilters,
      setSubProject,
      saveFiltersController,
      saveFiltersInputs,
      setFilters,
      setResetFilters,
      setViewActivities,
      setActiveOrder,
      setMultiEncargados,
      setMultiProyectos,
      setMultiSubProyectos,
      setMultiSolicitantes,
      timesView,
      setAllOrDetails,
      detailsView,
      setNavTab,
      setDisplayNameTodoList,
      setToggleSideMenu
    }
  }
  return (
    <UiContext.Provider value={value}>
      {children}
    </UiContext.Provider>
  )
}

export default UiProvider