import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const portal = document.getElementById('modal-root')

const Modal = ({ children, showModal, onClose, isBlur = true, className = 'max-w-7xl', padding = 'p-5' }) => {

  const onBlur = () => {
    !isBlur && onClose()
  }

  useEffect(() => {
    if (showModal) {
      const body = document.querySelector('body')
      body.classList.add('overflow-hidden')
    }
    if (!showModal) {
      const body = document.querySelector('body')
      body.classList.remove('overflow-hidden')
    }
  }, [showModal])

  if (showModal) {
    return ReactDOM.createPortal(
      <div className="fixed top-0 bottom-0 left-0 right-0 z-100 animate__animated animate__fadeIn animate__faster">
        <div
          onClick={onBlur}
          className="fixed top-0 bottom-0 left-0 right-0 z-1000 bg-black bg-opacity-25 overflow-hidden" />
        <div className={`relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent max-h-screen p-5 overflow-custom z-1000 ${className}`}>
          <div className={`rounded-md bg-white z-1100 shadow-xl relative w-full ${padding}`}>
            <button
              onClick={onClose}
              className=" focus:outline-none transition duration-500 absolute z-1200 right-3 top-3 h-9 w-9 hover:bg-red-400 text-gray-400 hover:text-white rounded-full">
              <i className="fas fa-times fa-lg"></i>
            </button>
            {children}
          </div>
        </div>
      </div>, portal)
  }

  return null
}

export default Modal
