import React from 'react'
import Tippy from '@tippyjs/react';

function ButtonOrderFilter({ orderPriority, bgColor = 'bg-gray-100 rounded-full', orderAsc, orderDesc }) {

  const handleOrderASC = () => {
    orderAsc(`${orderPriority}=asc&`)
  }

  const handleOrderDESC = () => {
    orderDesc(`${orderPriority}=desc&`)
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
            handleOrderASC()
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
            handleOrderDESC()
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
