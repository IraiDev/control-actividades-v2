import React, { createContext, useState } from 'react'
import useChangeTab from '../hooks/useChangeTab'
import useToggle from '../hooks/useToggle'

export const UiContext = createContext()

function UiProvider({ children }) {
  const [isViewChanged, setViewTrue, setViewFalse] = useChangeTab()
  const [isTodoOrPlanner, setviewTodo, setViewPlanner] = useChangeTab()
  const [toggleSideBar, setToggleSideBar] = useToggle();
  const [tab, setTab] = useState({
    planner: 'text-blue-600 font-bold',
    acivities: ''
  })

  const activityView = () => {
    setViewTrue()
    setTab({
      planner: '',
      acivities: 'text-blue-600 font-bold'
    })
  }

  const plannerView = () => {
    setViewFalse()
    setTab({
      acivities: '',
      planner: 'text-blue-600 font-bold'
    })
  }

  const value = {
    states: {
      isViewChanged,
      tab,
      isTodoOrPlanner,
      toggleSideBar,
    },
    functions: {
      activityView,
      plannerView,
      setViewPlanner,
      setviewTodo,
      setToggleSideBar
    }
  }
  return (
    <UiContext.Provider value={value}>
      {children}
    </UiContext.Provider>
  )
}

export default UiProvider