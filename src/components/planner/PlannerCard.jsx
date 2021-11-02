import React, { useContext, useEffect, useState } from 'react'
import { ActivityContext } from '../../context/ActivityContext';
import { getFetch } from '../../helpers/fetchingGraph';
import { Person } from '@microsoft/mgt-react';
import { alertQuest } from '../../helpers/alerts';
import Button from '../ui/buttons/Button';
import moment from 'moment';
import { GraphContext } from '../../context/GraphContext';

let state = ''

function PlannerCard({ idTask, idPlan, title, description, assignments, createdBy, createdDateTime, references, percentComplete, checklist, dueDateTime, etag }) {
  const [plannerPlan, setplannerPlan] = useState('')
  const { functions: ActFunc } = useContext(ActivityContext)
  const { functions: GraphFunc } = useContext(GraphContext)

  switch (percentComplete) {
    case 0:
      state = 'Pendiente'
      break
    case 50:
      state = 'En trabajo'
      break
    case 100:
      state = 'Completada'
      break
    default:
      state = 'Desconocido'
      break;
  }

  const handleAddTask = () => {
    const data = { title, description, id_todo: idTask, proyect: plannerPlan }
    const updateData = {
      percentComplete: 50
    }
    const action = async () => {
      const flag = await ActFunc.addTaskToRA(data)
      if (!flag) return
      await GraphFunc.updateTask(idTask, updateData, decodeURIComponent(Object.values(etag)[0]))
    }
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
    <div className="relative transition duration-500 w-full gap-2 p-4 bg-white border-2 rounded-md shadow-lg border-transparent hover:border-gray-500">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-semibold text-sm capitalize mb-1">{title}</h5>
          <h5 className="text-xs mb-2 capitalize"><p className="font-semibold inline">plan: </p>{plannerPlan}</h5>
          <h5 className="text-xs mb-2 capitalize">
            <p className="font-semibold inline">fecha: </p>
            {
              `${moment(createdDateTime).format('DD-MM-yyyy, HH:MM')}${dueDateTime ? ';' : ''}`
            }
            {
              dueDateTime &&
              <p className="font-semibold inline ml-1">fin:
                <span className="font-normal inline"> {moment(dueDateTime).format('DD-MM-yyyy')}</span>
              </p>
            }
          </h5>
          <h5 className="text-xs mb-2 capitalize">
            <p className="font-semibold inline">Estado: </p>
            {state}
          </h5>
        </div>
        <div className="flex text-gray-500">
          <div className="text-center mr-5">
            <p className="text-xs mr-2 capitalize mb-2">{Object.keys(assignments).length > 1 ? 'encargados' : 'encargado'}</p>
            {Object.keys(assignments).map(obj => (
              obj.length > 0 &&
              <Person className="rounded-full p-0.5 shadow-md" key={obj} userId={obj} />
            ))}
          </div>
          <div className="text-center mr-2">
            <p className="text-xs capitalize mb-2">solicita</p>
            <Person className="rounded-full p-0.5 shadow-md" userId={createdBy.user.id} />
          </div>
        </div>
      </div>
      <p className="capitalize text-xs text-gray-600">descripcion</p>
      <p className={`text-xs px-2 mt-1 mb-2 text-justify ${description === '' && 'text-gray-400'}`}>
        {description === '' ? 'No hay descripcion...' : description}
      </p>
      <p className="capitalize text-xs text-gray-600 mb-1">Lista de comprobacion</p>
      <ul className="mb-3">
        {
          Object.entries(checklist).length > 0 ?
            Object.entries(checklist).map((list) => (
              <li key={list[0]} className="text-xs text-gray-600 capitalize pl-2">{list[1].title}</li>
            ))
            : <p className="text-xs text-gray-400 mb-1 pl-2">No hay notas...</p>
        }
      </ul>
      <ul className="w-full">
        <p className="text-xs capitalize text-gray-600 mb-1">archivos</p>
        {
          Object.entries(references).length > 0 ?
            Object.entries(references).map(r => (
              <li className="text-xs text-gray-600 pl-2 hover:text-blue-500 w-max" key={r}>
                <a rel="noreferrer" target="_blank" href={decodeURIComponent(r[0])}>{decodeURIComponent(r[1].alias)}</a>
              </li>
            ))
            : <p className="text-xs text-gray-400 mb-1 pl-2">No hay archivos...</p>
        }
      </ul>
      {
        percentComplete === 0 &&
        <Button
          className="h-8 w-8 hover:bg-gray-200 rounded-full absolute bottom-3 right-3"
          type="icon"
          icon="fas fa-reply"
          tippyText="Crear actividad en RA"
          onClick={handleAddTask} />
      }
    </div>
  )
}

export default PlannerCard
