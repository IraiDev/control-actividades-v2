import React, { useEffect, useRef, useState } from 'react'

function UserTimer({ user, time, isPause }) {
  const [sec, setSec] = useState(0)
  const timeRef = useRef()
  let userTime = 0, clockColor

  useEffect(() => {
    timeRef.current && clearInterval(timeRef.current)
    timeRef.current = setInterval(() => setSec(s => s + 1), 1000)
  }, [])

  if (isPause) {
    userTime = new Date((time + sec) * 1000).toISOString().substr(11, 8)
    clockColor = 'bg-red-400 hover:bg-red-600'
  } else {
    userTime = new Date(time * 1000).toISOString().substr(11, 8)
    clockColor = 'bg-green-500 hover:bg-green-600'
  }

  return (
    <button
      className={`transition duration-500 mt-2 md:mt-0 flex justify-between p-1 ml-2 shadow-md text-white w-32 h-10 rounded-full ${clockColor}`}
    >
      <h5 className="w-8 p-1 text-black bg-white rounded-full">{user}</h5>
      <p className="pt-1 pr-1 font-semibold">{userTime}</p>
      <div></div>
    </button>
  )
}

export default UserTimer
