import React from 'react'

function ButtonText(props) {
  const {
    disable = false,
    isIcon = true,
    icon = 'text-gray-700',
    text,
    color = 'hover:bg-gray-100 transition duration-500',
    onclick,
    isOnclickeable = true,
    type
  } = props

  const handleClick = () => {
    onclick()
  }

  return (
    <>
      {
        !disable && (
          <button
            className={`${color} rounded-full hover:shadow-lg shadow-md py-1 px-4 focus:outline-none active:outline-none`}
            type={type}
            onClick={() => {
              isOnclickeable && handleClick();
            }}
          >
            {text}
            {
              isIcon && <i className={`ml-2 ${icon}`}></i>
            }
          </button>
        )
      }
    </>
  )
}

export default ButtonText
