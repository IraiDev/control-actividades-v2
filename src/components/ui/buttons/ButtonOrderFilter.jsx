import React from 'react'
import Tippy from '@tippyjs/react';

function ButtonOrderFilter({ orderPrioridad, bgColor, onclick }) {

  const handleClick = () => {
    onclick()
  }

  return (
    <div className={`mt-3 ${bgColor}`}>
      <Tippy
        offset={[0, 2]}
        placement={"top"}
        delay={[100, 0]}
        content={<span>Ascendente</span>}
      >
        <button
          onClick={() => {
            handleClick()
          }}
          className="px-2 py-1 rounded-full hover:bg-gray-200 focus:outline-none active:outline-none"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      </Tippy>
      <Tippy
        offset={[0, 2]}
        placement="top"
        delay={[100, 0]}
        content={<span>Descendente</span>}
      >
        <button
          onClick={() => {
            handleClick()
          }}
          className="px-2 py-1 ml-2 rounded-full hover:bg-gray-200 focus:outline-none active:outline-none"
        >
          <i className="fas fa-chevron-down"></i>
        </button>
      </Tippy>
    </div>
  )
}

export default ButtonOrderFilter
