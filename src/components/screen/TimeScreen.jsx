import React, { useContext, useEffect, useState } from 'react'
import { ActivityContext } from '../../context/ActivityContext'
import Table from '../ui/table/Table'
import moment from 'moment'
import { useForm } from '../../hooks/useForm'
import { UiContext } from '../../context/UiContext'
import Button from '../ui/buttons/Button'

const date = new Date()
const dateFormat = moment(date).format('yyyy-MM-DD')

function TimeScreen() {

  const { functions: ActFunc } = useContext(ActivityContext)
  const { functions: UiFunc } = useContext(UiContext)
  const [{ input }, onChangeInput, reset] = useForm({ input: dateFormat })
  const [isChecked, setIsChecked] = useState(true)

  const handleNewDate = () => {
    UiFunc.setIsLoading(true)
    const fecha = moment(input).format('yyyy-MM-DD')
    const param = `fecha=${fecha}`
    ActFunc.getInfoTimes(param)
  }

  const handleOnChangeCheck = () => {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    reset()
    const param = `fecha=${dateFormat}`
    ActFunc.getInfoTimes(param)
  }, [])

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="p-4 bg-white rounded-full shadow mr-4">
          <label htmlFor="floatcheck123" className="flex items-center">
            <input
              className="mr-2"
              id="floatcheck123"
              type="checkbox"
              checked={isChecked}
              onChange={handleOnChangeCheck} />
            <p className={!isChecked ? 'line-through' : ''}>Cobrables</p>
          </label>
        </div>
        <div className="rounded-full bg-white shadow p-2 my-4 flex justify-between items-center">
          <input
            className="bg-gray-100 p-2 rounded-full w-full mr-4"
            type="date"
            name="input"
            value={input}
            onChange={onChangeInput} />
          <div>
            <Button
              className="hover:bg-blue-100 text-blue-500 rounded-full h-8 w-8"
              type="icon"
              icon="fas fa-check"
              onClick={handleNewDate} />
          </div>
        </div>
      </div>
      <div className="overflow-custom mx-2 md:mx-10">
        <Table toggleValue={isChecked} />
      </div>
    </>
  )
}

export default TimeScreen
