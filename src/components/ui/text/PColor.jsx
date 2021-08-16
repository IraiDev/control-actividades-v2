import React from 'react'

function PColor({ userColor, text }) {
  return (
    <div className="text-center">
      <p className="mb-2 text-sm">{text}</p>
      <p
        className={`h-7 w-7 mx-auto ${userColor} rounded-full`}
      ></p>
    </div>
  )
}

export default PColor
