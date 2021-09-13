import React from 'react'

function PDoubleText({ tag, time }) {
  return (
    <div className="text-center">
      <p className="capitalize font-bold">{tag}</p>
      <b className="text-red-700 text-lg">{time}</b>
    </div>
  )
}

export default PDoubleText
