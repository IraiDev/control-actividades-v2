import React from 'react'

function UserTimer() {
  return (
    <button
      className={`flex justify-between p-1 ml-2 shadow-md text-white w-32 h-10 rounded-full bg-green-500`}
    >
      <h5 className="w-8 p-1 text-black bg-white rounded-full">{"IA"}</h5>
      <p className="pt-1 pr-1 font-semibold">{"05:40:32"}</p>
      <div></div>
    </button>
  )
}

export default UserTimer
