import React from 'react'

function Button({ name = 'boton', icon = 'fas fa-bars', size, className, block = false, shadow = true, onClick, type = 'text' }) {

  return (
    <>
      {
        type === 'text' ?
          <button
            onClick={onClick}
            className={`py-1.5 px-5 focus:outline-none transition duration-500 ${className} ${shadow && 'shadow-xl'}  ${block && 'block w-full'}`}>
            {name}
          </button>
          :
          type === 'icon' ?
            <button
              onClick={onClick}
              className={`focus:outline-none transition duration-500 ${className} ${shadow && 'shadow-lg'} ${block && 'block w-full'}`}>
              <i className={`${icon} ${size}`}></i>
            </button>
            :
            type === 'iconText' &&
            <button
              onClick={onClick}
              className={`focus:outline-none transition duration-500 ${className} ${shadow && 'shadow-lg'} ${block && 'block w-full'}`}>
              {name}<i className={`${icon} ${size} ml-2`}></i>
            </button>
      }
    </>
  )
}

export default Button