import React, { useContext, useEffect } from 'react'
import { ActivityContext } from './context/ActivityContext'
import HomeScreen from './components/screen/HomeScreen'
import LoginScreen from './components/screen/LoginScreen'
import useIsSignedIn from './hooks/useSignedIn'

function App() {
  const [isSigendIn] = useIsSignedIn()
  const { functions: ActFunc } = useContext(ActivityContext)

  useEffect(() => {
    !isSigendIn && ActFunc.logout()
  }, [isSigendIn])

  return (
    <>
      {
        isSigendIn ? <HomeScreen /> : <LoginScreen />
      }
    </>

  )
}

export default App