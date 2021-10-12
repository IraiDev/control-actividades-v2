import React from 'react'

function TBodyTimes({ isBorder = false }) {
  return (
    <div className={`grid grid-cols-3 text-center text-gray-600 font-bold border-green-300 ${isBorder && 'border-b-2'}`}>
      <div className="col-span-1 p-2 border-r-2 border-green-300 bg-green-100">3.34</div>
      <div className="col-span-1 p-2">4.1</div>
      <div className="col-span-1 p-2 border-l-2 border-green-300 bg-green-100">1.74</div>
    </div>
  )
}

export default TBodyTimes
