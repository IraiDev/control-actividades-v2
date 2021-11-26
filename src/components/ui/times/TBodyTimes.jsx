import moment from 'moment'
import React from 'react'

function TBodyTimes({ isBorder = false, data }) {

  const { tiempo_trabajado, tiempo_hoy, tiempo_estimado } = data
  const hoy = moment.duration(tiempo_hoy, 'hours')
  const estimado = moment.duration(tiempo_estimado, 'hours')
  const trabajado = moment.duration(tiempo_trabajado, 'hours')

  const timeFormat = (time) => {
    let hours = time._data.hours
    let minutes = time._data.minutes
    let seconds = time._data.seconds
    if (hours < 10) hours = `0${hours}`
    if (minutes < 10) minutes = `0${minutes}`
    if (seconds < 10) seconds = `0${seconds}`

    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <div className={`grid grid-cols-3 text-center text-gray-600 font-bold border-green-300 ${isBorder && 'border-b-2'}`}>
      <div className="col-span-1 p-2 border-r-2 border-green-300 bg-green-100">
        {timeFormat(estimado)}
      </div>
      <div className="col-span-1 p-2">
        {timeFormat(trabajado)}
      </div>
      <div className="col-span-1 p-2 border-l-2 border-green-300 bg-green-100">
        {timeFormat(hoy)}
      </div>
    </div>
  )
}

export default TBodyTimes
