import React, { useContext, useEffect } from 'react'
import { ActivityContext } from '../../context/ActivityContext'
import FloatCheck from '../ui/float/FloatCheck'
import Table from '../ui/table/Table'
import moment from 'moment'

const date = new Date()
const dateFormat = moment(date).format('yyyy-MM-DD')

function TimeScreen() {

  const { functions: ActFunc } = useContext(ActivityContext)

  useEffect(() => {

    const param = `fecha=${dateFormat}`
    ActFunc.getInfoTimes(param)

  }, [])

  return (
    <>
      <FloatCheck />
      <Table />
    </>
  )
}

export default TimeScreen
