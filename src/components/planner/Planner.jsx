import React, { useContext } from 'react'
import { GraphContext } from '../../context/GraphContext'
import PResp from '../ui/text/PResp'
import PlannerCard from './PlannerCard'

function Planner() {
  const { states } = useContext(GraphContext)
  return (
    <>
      {
        states.plannerTask.length > 0 ?
          states.plannerTask.map(obj => (
            <PlannerCard
              key={obj.id}
              idTask={obj.id}
              title={obj.title}
              desc={obj.details.description}
              assignments={obj.assignments}
              idPlan={obj.planId}
              createdBy={obj.createdBy}
              createdDateTime={obj.createdDateTime}
              references={obj.details.references} />))
          : (<PResp />)
      }
    </>
  )
}

export default Planner
