import React from 'react'
import Button from './Button';

function ButtonOrderFilter(props) {
  const {
    orderPriority,
    orderAsc,
    orderDesc,
    active,
    className = 'bg-gray-100 rounded-full'
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
    <div className={className}>
      <Button
        className="h-7 w-7 bg-gray-100 hover:bg-gray-200 rounded-full"
        type="icon"
        icon={`fas fa-chevron-up ${active === asc ? 'text-blue-400' : 'text-black'}`}
        onClick={handleOrderASC}
        tippyText="Ascendente"
      />
      <Button
        className="h-7 w-7 bg-gray-100 hover:bg-gray-200 rounded-full ml-1"
        type="icon"
        icon={`fas fa-chevron-down ${active === desc ? 'text-blue-400' : 'text-black'}`}
        onClick={handleOrderDESC}
        tippyText="Descendente"
      />
    </div>
  )
}

export default ButtonOrderFilter
