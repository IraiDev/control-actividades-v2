import React from 'react'
import ReactDOM from 'react-dom'
const protal = document.getElementById('loading-root')

function Loading({ isLoading }) {

  if (isLoading) {
    return ReactDOM.createPortal(
      <div className="fixed top-0 bottom-0 left-0 right-0 z-100 animate__animated animate__fadeIn animate__faster">
        <div className="fixed top-0 bottom-0 left-0 right-0 z-1000 bg-black bg-opacity-25" />
        <div className="fixed flex items-center gap-5 bg-white rounded-full shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent p-4 overflow-custom z-1000">
          <h5 className="font-semibold animate-pulse ">Cargando</h5>
          <i className="fas fa-spinner animate-spin fa-3x text-gray-700"></i>
        </div>
      </div>, protal)
  }

  return null

}

export default Loading