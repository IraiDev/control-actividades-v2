import React from 'react'
import Loader from "react-loader-spinner";

function Loading({ isLoading = false }) {
  return (
    <>
      {
        isLoading && (
          <div className="fixed flex items-center justify-center w-full min-h-screen bg-black bg-opacity-40 z-loading">
            <div className="p-5 bg-white rounded-full">
              <Loader type="TailSpin" color="#1F2937" />
            </div>
          </div>)
      }
    </>
  )
}

export default Loading