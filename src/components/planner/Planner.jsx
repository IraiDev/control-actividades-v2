import React, { useContext } from 'react'
import { GraphContext } from '../../context/GraphContext'
import PlannerCard from './PlannerCard'

function Planner() {
  const { states } = useContext(GraphContext)
  return (
    <>
      {
        states.plannerTask.length > 0 ?
          states.plannerTask.map(obj => {
            return (
              <PlannerCard
                key={obj.id}
                title={obj.title}
                desc={obj.details.description}
                assignments={obj.assignments}
                idPlan={obj.planId} />)
          })
          :
          ("no hay tareas")
      }
    </>
  )
}

export default Planner
