import React, { useContext, useEffect, useState } from 'react'
import { ActivityContext } from '../../context/ActivityContext'
import Form from '../ui/form/Form'

function ActivityDetailScreen() {

  const { states: ActState } = useContext(ActivityContext)
  const [data, setData] = useState({})

  const getData = async () => {
    const resp = await ActState.activityDetails
    setData(resp)
  }

  useEffect(() => {
    getData()
  }, [ActState.activityDetails])

  useEffect(() => {
    console.log('data: ', data);
  }, [data])

  if (Object.keys(data).length > 0) {
    return (
      <Form data={data} />
    )
  }
  return null
}

export default ActivityDetailScreen
