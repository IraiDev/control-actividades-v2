import React from 'react'
import PlannerCard from './PlannerCard'
import TextContent from '../ui/text/TextContent'

let value

function PlannerContainer({ array = [], percentComplete }) {

  switch (percentComplete) {
    case 0:
      value = 'pendientes'
      break;
    case 50:
      value = 'en trabajo'
      break;
    case 100:
      value = 'completadas'
      break
    default:
      value = 'NN'
      break
  }

  return (
    <>
      {
        array.length > 0 ?
          array.map(obj => {
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
          })
          : <TextContent
            className="text-center col-span-2"
            type="response"
            value={`No hay tareas ${value}`} />
      }
    </>
  )
}

export default PlannerContainer
