import React from 'react'
import Tippy from '@tippyjs/react';

function ButtonColor(props) {

  const {
    id,
    color,
    setColor,
    priority,
    updatePriority,
    isUpdate = false,
    isTippy = false,
    tippyText,
    offSet = 2,
    hwBtn = "7"
  } = props

  const handleChangeColor = () => {
    setColor(color);
  }

  const handleUpdatePriority = () => {
    updatePriority(id, priority)
  }

  return (
    <>
      <Tippy
        disabled={!isTippy}
        offset={[0, offSet]}
        delay={[100, 0]}
        placement={"bottom"}
        content={<span>{tippyText}</span>}
      >
        <button
          className={`h-${hwBtn} w-${hwBtn} m-1 rounded-full focus:outline-black ${color} transition duration-300 transform hover:-translate-y-1 hover:scale-110`}
          onClick={() => {
            isUpdate ? handleUpdatePriority() : handleChangeColor();
          }}
        ></button>
      </Tippy>
    </>
  )
}

export default ButtonColor
