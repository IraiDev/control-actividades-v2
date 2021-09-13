import React from 'react'
import moment from 'moment'

const lastDate = new Date()

function PTimes(props) {

  const {
    user
  } = props

  return (
    <div className="text-center col-span-1 text-sm">
      <b>{user}</b>
      <b className="block text-red-700 mt-1">{moment(lastDate).format('DD-MM-yyyy')}</b>
      <b className="block text-red-700 text-xs mb-2">{moment(lastDate).format('HH:mm:ss')}</b>
      <hr />
      <p className="mt-2">{moment(lastDate).format('DD-MM-yyyy')}</p>
      <p className="block text-xs">{moment(lastDate).format('HH:mm:ss')}</p>
    </div>
  )
}

export default PTimes
