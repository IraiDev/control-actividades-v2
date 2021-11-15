import React from 'react'
import PlannerCard from './PlannerCard'

function PlannerContainer({ array = [], percentComplete }) {

  return (
    <>
      {
        array.length > 0 &&
        array.map(obj => {
          if (obj.percentComplete === percentComplete) {
            return (
              <PlannerCard
                key={obj.id}
                idTask={obj.id}
                title={obj.title}
                description={obj.details.description}
                assignments={obj.assignments}
                idPlan={obj.planId}
                createdBy={obj.createdBy}
                createdDateTime={obj.createdDateTime}
                references={obj.details.references}
                percentComplete={obj.percentComplete}
                checklist={obj.details.checklist}
                dueDateTime={obj.dueDateTime}
                etag={obj} />
            )
          } else { return null }
        })
      }
    </>
  )
}

export default PlannerContainer
