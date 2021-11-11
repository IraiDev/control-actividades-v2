import React, { useContext, useEffect, useState } from 'react'
import { GraphContext } from '../../context/GraphContext'
import PlannerContainer from './PlannerContainer'

function Planner() {
  const { states } = useContext(GraphContext)
  const [viewTask, setViewTask] = useState(0)
  const [checkP, setCheckP] = useState(viewTask === 0)
  const [check50, setCheck50] = useState(false)
  const [check100, setCheck100] = useState(false)

  const onChangeCheckP = () => {
    setCheckP(!checkP)
    if (!checkP) {
      setViewTask(0)
      setCheck50(false)
      setCheck100(false)
    }
  }

  const onChangeCheck50 = () => {
    setCheck50(!check50)
    if (!check50) {
      setViewTask(50)
      setCheckP(false)
      setCheck100(false)
    }
  }

  const onChangeCheck100 = () => {
    setCheck100(!check100)
    if (!check100) {
      setViewTask(100)
      setCheck50(false)
      setCheckP(false)
    }
  }

  useEffect(() => {
    if (!checkP && !check50 && !check100) {
      setViewTask(0)
      setCheckP(true)
    }
  }, [checkP, check50, check100])

  return (
    <>
      <div className="bg-white mb-5 p-4 rounded-md shadow-md mt-1 flex justify-around sm:flex-nowrap flex-wrap text-sm">
        <label htmlFor="check01" className={checkP ? 'text-blue-500' : ''}>
          <input
            className="mr-1"
            id="check01"
            type="checkbox"
            checked={checkP}
            onChange={onChangeCheckP}
          />
          Pendientes
        </label>
        <label htmlFor="check02" className={check50 ? 'text-blue-500' : ''}>
          <input
            className="mr-1"
            id="check02"
            type="checkbox"
            checked={check50}
            onChange={onChangeCheck50}
          />
          En Trabajo
        </label>
        <label htmlFor="check03" className={check100 ? 'text-blue-500' : ''}>
          <input
            className="mr-1"
            id="check03"
            type="checkbox"
            checked={check100}
            onChange={onChangeCheck100}
          />
          Completadas
        </label>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {<PlannerContainer array={states.plannerTask} percentComplete={viewTask} />}
      </div>
    </>
  )
}

export default Planner
