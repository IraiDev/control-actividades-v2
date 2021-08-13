import React, { createContext } from 'react'

export const ActivityContext = createContext()

function ActivityProvider({ children }) {

  const value = {
    states: {

    },
    functions: {

    }
  }
  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  )
}

export default ActivityProvider
