import React from 'react'
import HomeScreen from './components/screen/HomeScreen'
import LoginScreen from './components/screen/LoginScreen'
import UiProvider from './context/UiContext'
import useIsSignedIn from './hooks/useSignedIn'

function App() {
  const [isSigendIn] = useIsSignedIn()

  return (
    <UiProvider>
      {
        isSigendIn ? <HomeScreen /> : <LoginScreen />
      }
    </UiProvider>
  )
}

export default App