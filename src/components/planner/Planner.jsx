import React, { useContext, useEffect, useState } from 'react'
import { GraphContext } from '../../context/GraphContext'
import PlannerContainer from './PlannerContainer'

function Planner() {
  const { states } = useContext(GraphContext)
  const [viewTask, setViewTask] = useState(0)
  const [checkP, setCheckP] = useState({ check: viewTask === 0, array: [] })
  const [check50, setCheck50] = useState({ check: false, array: [] })
  const [check100, setCheck100] = useState({ check: false, array: [] })

  const onChangeCheckP = () => {
    setCheckP({ ...checkP, check: !checkP.check })
    if (!checkP.check) {
      setViewTask(0)
      setCheck50({ ...check50, check: false })
      setCheck100({ ...check100, check: false })
    }
  }

  const onChangeCheck50 = () => {
    setCheck50({ ...check50, check: !check50.check })
    if (!check50.check) {
      setViewTask(50)
      setCheckP({ ...checkP, check: false })
      setCheck100({ ...check100, check: false })
    }
  }

  const onChangeCheck100 = () => {
    setCheck100({ ...check100, check: !check100.check })
    if (!check100.check) {
      setViewTask(100)
      setCheck50({ ...check50, check: false })
      setCheckP({ ...checkP, check: false })
    }
  }

  useEffect(() => {
    if (!checkP.check && !check50.check && !check100.check) {
      setViewTask(0)
      setCheckP({ ...checkP, check: true })
    }
  }, [checkP, check50, check100])

  useEffect(() => {
    const temp0 = states.plannerTask.filter(item => item.percentComplete === 0)
    const temp50 = states.plannerTask.filter(item => item.percentComplete === 50)
    const temp100 = states.plannerTask.filter(item => item.percentComplete === 100)
    setCheckP({ ...checkP, array: temp0 })
    setCheck50({ ...check50, array: temp50 })
    setCheck100({ ...check100, array: temp100 })
  }, [states.plannerTask])

  return (
    <>
      <div className="bg-white mb-5 p-4 rounded-md shadow-md mt-1 flex justify-around sm:flex-nowrap flex-wrap text-sm">
        <label htmlFor="check01" className={checkP.check ? 'text-blue-500' : ''}>
          <input
            className="mr-1"
            id="check01"
            type="checkbox"
            checked={checkP.check}
            onChange={onChangeCheckP}
          />
          Pendientes
        </label>
        <label htmlFor="check02" className={check50.check ? 'text-blue-500' : ''}>
          <input
            className="mr-1"
            id="check02"
            type="checkbox"
            checked={check50.check}
            onChange={onChangeCheck50}
          />
          En Trabajo
        </label>
        <label htmlFor="check03" className={check100.check ? 'text-blue-500' : ''}>
          <input
            className="mr-1"
            id="check03"
            type="checkbox"
            checked={check100.check}
            onChange={onChangeCheck100}
          />
          Completadas
        </label>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {
          viewTask === 0 ? <PlannerContainer array={checkP.array} percentComplete={viewTask} /> :
            viewTask === 50 ? <PlannerContainer array={check50.array} percentComplete={viewTask} /> :
              viewTask === 100 && <PlannerContainer array={check100.array} percentComplete={viewTask} />
        }
      </div>
    </>
  )
}

export default Planner
