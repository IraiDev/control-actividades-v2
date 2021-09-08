import React from 'react'
import Tippy from '@tippyjs/react';

function ButtonOrderFilter(props) {
  const {
    orderPriority,
    bgColor = 'bg-gray-100 rounded-full',
    orderAsc,
    orderDesc,
    isOnclickeable = true,
    active
  } = props

  let asc = `${orderPriority}=asc&`
  let desc = `${orderPriority}=desc&`

  const handleOrderASC = () => {
    orderAsc(`${orderPriority}=asc&`, orderPriority)
  }

  const handleOrderDESC = () => {
    orderDesc(`${orderPriority}=desc&`, orderPriority)
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
            isOnclickeable && handleOrderASC()
          }}
          className="px-2 py-1 rounded-full hover:bg-gray-200 focus:outline-none active:outline-none"
        >
          <i className={`fas fa-chevron-up ${active === asc ? 'text-blue-400' : 'text-black'}`}></i>
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
            isOnclickeable && handleOrderDESC()
          }}
          className="px-2 py-1 ml-2 rounded-full hover:bg-gray-200 focus:outline-none active:outline-none"
        >
          <i className={`fas fa-chevron-down ${active === desc ? 'text-blue-400' : 'text-black'}`}></i>
        </button>
      </Tippy>
    </div>
  )
}

export default ButtonOrderFilter
