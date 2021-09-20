import React from 'react'

function TBody(props) {

  const {
    project = 'zionit',
    value = '99.9',

  } = props

  return (
    <div className="grid grid-cols-7 text-sm mt-2 text-center shadow-md rounded-md">
      <div className="p-2 text-sm bg-white rounded-l-lg">
        {project}
      </div>
      <div className="grid grid-cols-4 p-2 text-sm bg-gray-200">
        <p>{value}</p>
        <p>{value}</p>
        <p>{value}</p>
        <p>{value}</p>
      </div>
      <div className="grid grid-cols-4 p-2 text-sm bg-gray-300">
        <p>{value}</p>
        <p>{value}</p>
        <p>{value}</p>
        <p>{value}</p>
      </div>
      <div className="grid grid-cols-4 p-2 text-sm bg-gray-200">
        <p>{value}</p>
        <p>{value}</p>
        <p>{value}</p>
        <p>{value}</p>
      </div>
      <div className="grid grid-cols-4 p-2 text-sm bg-gray-300">
        <p>{value}</p>
        <p>{value}</p>
        <p>{value}</p>
        <p>{value}</p>
      </div>
      <div className="grid grid-cols-4 p-2 text-sm bg-gray-200">
        <p>{value}</p>
        <p>{value}</p>
        <p>{value}</p>
        <p>{value}</p>
      </div>
      <div className="grid grid-cols-4 p-2 text-sm bg-gray-300 rounded-r-md">
        <p>{value}</p>
        <p>{value}</p>
        <p>{value}</p>
        <p>{value}</p>
      </div>
    </div>
  )
}

export default TBody
