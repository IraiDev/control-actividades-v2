import React from 'react'
import ReactDOM from 'react-dom'

const portal = document.getElementById('modal-root')

const Modal = ({ children, showModal, onClose, className = 'md:w-3/5' }) => {

  if (showModal) {
    return ReactDOM.createPortal(
      <div className="fixed top-0 bottom-0 left-0 right-0 z-100 animate__animated animate__fadeIn animate__faster">
        <div
          onClick={onClose}
          className="fixed top-0 bottom-0 left-0 right-0 z-1000 bg-black bg-opacity-25" />
        <div className={`relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-5 z-1100 shadow-xl h-auto w-11/12 ${className}`}>
          <button
            onClick={onClose}
            className=" focus:outline-none transition duration-500 absolute z-1200 -right-3 -top-3 h-9 w-9 bg-white hover:bg-red-400 text-gray-400 hover:text-white rounded-full shadow-lg">
            <i className="fas fa-times fa-lg"></i>
          </button>
          {children}
        </div>
      </div>, portal)
  }

  return null
}

export default Modal