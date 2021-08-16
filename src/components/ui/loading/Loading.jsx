import React from 'react'
import Loader from "react-loader-spinner";

function Loading() {
  return (
    <div className="fixed z-50 flex items-center justify-center w-full min-h-screen bg-black bg-opacity-25">
      <div className="p-5 bg-white rounded-full">
        <Loader type="TailSpin" color="black" />
      </div>
    </div>
  )
}

export default Loading