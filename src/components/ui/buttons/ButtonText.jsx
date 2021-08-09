import React from 'react'

function ButtonText({ icon = 'text-gray-700', text, color = 'hover:bg-gray-100', onclick }) {

  const handleClick = () => {
    onclick()
  }

  return (
    <button
      className={`${color} rounded-lg shadow-md py-1 px-3 border border-gray-200 focus:outline-none active:outline-none`}
      onClick={() => {
        handleClick();
      }}
    >
      {text}
      <i className={`ml-2 ${icon}`}></i>
    </button>
  )
}

export default ButtonText
