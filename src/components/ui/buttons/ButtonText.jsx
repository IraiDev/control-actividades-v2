import React from 'react'

function ButtonText({ isIcon = true, icon = 'text-gray-700', text, color = 'hover:bg-gray-100', onclick }) {

  const handleClick = () => {
    onclick()
  }

  return (
    <button
      className={`${color} rounded-full hover:shadow-lg shadow-md py-1 px-4  focus:outline-none active:outline-none`}
      onClick={() => {
        handleClick();
      }}
    >
      {text}
      {
        isIcon && <i className={`ml-2 ${icon}`}></i>
      }
    </button>
  )
}

export default ButtonText
