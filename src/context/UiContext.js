import React, { createContext, useState } from 'react'
import useTab from '../hooks/useTab'
import useToggle from '../hooks/useToggle'

export const UiContext = createContext()

function UiProvider({ children }) {
  const [isViewChanged, setViewTrue, setViewFalse] = useTab()
  const [isTodoOrPlanner, setviewTodo, setViewPlanner] = useTab()
  const [toggleSideBar, setToggleSideBar] = useToggle();
  const [isLoading, setIsLoading] = useState(false)
  const [tab, setTab] = useState({ planner: 'text-blue-600 font-bold', acivities: '' })

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
    setIsLoading(true)
  }

  const value = {
    states: {
      isViewChanged,
      tab,
      isTodoOrPlanner,
      toggleSideBar,
      isLoading,
    },
    functions: {
      activityView,
      plannerView,
      setViewPlanner,
      setviewTodo,
      setToggleSideBar,
      setIsLoading
    }
  }
  return (
    <UiContext.Provider value={value}>
      {children}
    </UiContext.Provider>
  )
}

export default UiProvider