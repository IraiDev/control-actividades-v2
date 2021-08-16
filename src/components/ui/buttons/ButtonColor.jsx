import React from 'react'

function ButtonColor({ color, setColor }) {
  const handleChangeColor = () => {
    setColor(color);
  }

  return (
    <button
      className={`h-7 w-7 m-1 rounded-full focus:outline-black ${color}`}
      onClick={() => {
        handleChangeColor();
      }}
    ></button>
  )
}

export default ButtonColor
