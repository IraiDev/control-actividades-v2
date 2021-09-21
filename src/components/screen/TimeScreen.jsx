import React, { useContext, useEffect } from 'react'
import { ActivityContext } from '../../context/ActivityContext'
import FloatCheck from '../ui/float/FloatCheck'
import Table from '../ui/table/Table'
import moment from 'moment'
import { useForm } from '../../hooks/useForm'
import { UiContext } from '../../context/UiContext'

const date = new Date()
const dateFormat = moment(date).format('yyyy-MM-DD')

function TimeScreen() {

  const { functions: ActFunc, states: ActState } = useContext(ActivityContext)
  const { functions: UiFunc } = useContext(UiContext)
  const [{ input }, onChangeInput] = useForm({ input: '' })

  useEffect(() => {

    const param = `fecha=${dateFormat}`
    ActFunc.getInfoTimes(param)

  }, [])

  const handleNewDate = () => {
    UiFunc.setIsLoading(true)
    const fecha = moment(input).format('yyyy-MM-DD')
    const param = `fecha=${fecha}`
    ActFunc.getInfoTimes(param)
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-96 rounded-full bg-white shadow p-2 my-4 flex justify-between items-center">
          <input
            className="bg-gray-100 p-2 rounded-full w-full"
            type="date"
            placeholder="ingrese fecha"
            name="input"
            value={input}
            onChange={onChangeInput} />
          <div>
            <button
              className="rounded-full bg-blue-500 p-2 hover:bg-blue-600 text-white ml-2"
              onClick={() => handleNewDate()}
            >
              Cargar
            </button>
          </div>
        </div>
      </div>
      {/* {
        ActState.infoTimes.length > 0 && <FloatCheck />
      } */}
      <Table />
    </>
  )
}

export default TimeScreen
