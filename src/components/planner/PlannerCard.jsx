import React, { useContext, useEffect, useState } from 'react'
import { ActivityContext } from '../../context/ActivityContext';
import { getFetch } from '../../helpers/fetchingGraph';
import { Person } from '@microsoft/mgt-react';
import { alertQuest } from '../../helpers/alerts';
import ButtonUnText from '../ui/buttons/ButtonUnText';
import moment from 'moment';

function PlannerCard({ idTask: id_todo, idPlan, title, desc: description, assignments, createdBy, createdDateTime, references }) {
  const [plannerPlan, setplannerPlan] = useState('')
  const { functions: ActFunc } = useContext(ActivityContext)

  const handleAddTask = () => {
    const data = { title, description, id_todo, proyect: plannerPlan }
    const action = () => ActFunc.addTaskToRA(data)
    alertQuest(
      'info',
      '¿Desea crear esta tarea como una actividad en RA?',
      'No, cancelar',
      'Si, crear',
      action
    )
  }

  useEffect(() => {
    getFetch(`/planner/plans/${idPlan}`, 'title', '')
      .then(resp => {
        setplannerPlan(resp.title)
      })
  }, [])

  return (
    <div className="transition duration-500 w-full gap-2 p-4 mb-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-semibold text-sm capitalize mb-1">{title}</h5>
          <h5 className="text-xs mb-2 capitalize"><p className="font-semibold inline">plan: </p>{plannerPlan}</h5>
          <h5 className="text-xs mb-2 capitalize"><p className="font-semibold inline">fecha: </p>{moment(createdDateTime).format('DD-MM-yyyy, HH:MM')}</h5>
        </div>
        <div className="flex text-gray-500">
          <div className="text-center mr-5">
            <p className="text-xs mr-2 capitalize mb-2">{Object.keys(assignments).length > 1 ? 'encargados' : 'encargado'}</p>
            {Object.keys(assignments).map(obj => (
              <Person className="rounded-full p-0.5 shadow-md mr-2" key={obj} userId={obj} />
            ))}
          </div>
          <div className="text-center mr-2">
            <p className="text-xs capitalize mb-2">solicita</p>
            <Person className="rounded-full p-0.5 shadow-md" userId={createdBy.user.id} />
          </div>
        </div>
      </div>
      <p className="capitalize text-xs text-gray-500">descripcion</p>
      <p className={`text-xs col-span-11 px-2 mt-1 mb-2 text-justify ${description === '' && 'text-gray-400'}`}>{description === '' ? 'No hay descripcion...' : description}</p>
      <div className="row-span-full flex items-center">
        <div className="flex items-center justify-between w-full">
          <ul>
            <p className="text-xs capitalize text-gray-400">archivos:</p>
            {
              Object.entries(references).map(r => {
                return (
                  <li className="text-sm text-gray-600 pl-2 hover:text-blue-500 w-max" key={r}>
                    <a rel="noreferrer" target="_blank" href={decodeURIComponent(r[0])}>{decodeURIComponent(r[1].alias)}</a>
                  </li>
                )
              })
            }
          </ul>
          <ButtonUnText
            icon="fas fa-reply"
            styles="h-8 w-8 mr-1 mt-4"
            onclick={handleAddTask}
            isTippy={true}
            offset={10}
            tippyText="Crear actividad en RA" />
        </div>
      </div>
    </div>
  )
}

export default PlannerCard
