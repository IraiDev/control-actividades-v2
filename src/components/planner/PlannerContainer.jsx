import React from 'react'
import TextContent from '../ui/text/TextContent'
import PlannerCard from './PlannerCard'

function PlannerContainer({ array = [], percentComplete }) {

  let text, count = 0

  switch (percentComplete) {
    case 0:
      text = 'Pendientes'
      break
    case 50:
      text = 'En trabajo'
      break
    case 100:
      text = 'Completadas'
      break
    default:
      text = 'NN'
      break
  }

  return (
    <>
      {
        array.map((obj) => {
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
          } else {
            count++
            if (count === array.length) {
              return (
                <TextContent
                  key={count}
                  className="text-center col-span-12"
                  type="response"
                  value={`No hay tareas ${text}`} />
              )
            }
            else {
              return null
            }
          }
        })
      }
    </>
  )
}

export default PlannerContainer
