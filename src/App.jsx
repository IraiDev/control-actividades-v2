import React from 'react'
import HomeScreen from './components/screen/HomeScreen'
import LoginScreen from './components/screen/LoginScreen'
import Loading from './components/ui/loading/Loading'
import ActivityProvider from './context/ActivityContext'
import GraphProvider from './context/GraphContext'
import UiProvider from './context/UiContext'
import useIsSignedIn from './hooks/useSignedIn'


function App() {
  const [isSigendIn] = useIsSignedIn()
  return (
    <UiProvider>
      <GraphProvider>
        <ActivityProvider>
          <Loading />
          {
            isSigendIn ? <HomeScreen /> : <LoginScreen />
          }
        </ActivityProvider>
      </GraphProvider>
    </UiProvider>
  )
}

export default App