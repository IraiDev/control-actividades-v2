import React, { useContext, useEffect, useState } from 'react'
import { ActivityContext } from '../../context/ActivityContext'
import Table from '../ui/table/Table'
import moment from 'moment'
import { useForm } from '../../hooks/useForm'
import { UiContext } from '../../context/UiContext'
import ButtonUnText from '../ui/buttons/ButtonUnText'

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
            <p className={!isChecked && 'line-through'}>Cobrables</p>
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
            <ButtonUnText
              icon="fas fa-check"
              bgColor="bg-blue-500"
              hoverBgColor="hover:bg-blue-400 shadow-lg"
              color="text-white"
              onclick={handleNewDate} />
          </div>
        </div>
      </div>
      <Table toggleValue={isChecked} />
    </>
  )
}

export default TimeScreen
