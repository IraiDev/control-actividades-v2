import React, { useContext, useState } from 'react'
import { UiContext } from '../../context/UiContext'
import { ActivityContext } from '../../context/ActivityContext'
import ActivityDetailScreen from './ActivityDetailScreen'
import ToggleView from '../ui/view/ToggleView'
import ActivityHeader from '../activity/ActivityHeader'
import ActivityContainer from '../activity/ActivityContainer'

function ActivitiesScreen() {
  const { states: ActState } = useContext(ActivityContext)
  const { states: UiState, functions: UiFunc } = useContext(UiContext)
  const [view, setView] = useState(false)
  const [isExpand, setIsExpand] = useState(false)

  const handleList = () => {
    UiFunc.setIsLoading(true)
    setTimeout(() => {
      setView(true)
      UiFunc.setIsLoading(false)
    }, 1000)
  }

  const handleGrid = () => {
    UiFunc.setIsLoading(true)
    setTimeout(() => {
      setView(false)
      UiFunc.setIsLoading(false)
    }, 500)
  }

  if (UiState.allOrDetails) {
    return (
      <div className={`my-3 ${view ? 'px-5' : 'sm:container mx-2 sm:mx-auto'}`}>
        <ToggleView onChangeGrid={handleGrid} onChangeList={handleList} active={view} />
        {
          view ?
            <div className="overflow-custom text-center text-sm max-h-3/4 pb-5">
              <ActivityHeader onClick={() => setIsExpand(!isExpand)} active={isExpand} />
              <ActivityContainer array={ActState.activitiesRA} type="list" onExpand={isExpand} />
            </div>
            :
            <div className="grid gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              <ActivityContainer array={ActState.activitiesRA} />
            </div>
        }
      </div>
    )
  }
  else {
    return <ActivityDetailScreen />
  }
}

export default ActivitiesScreen
