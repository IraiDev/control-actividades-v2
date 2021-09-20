import React from 'react'

function ColTable(props) {

  const {
    bgColor,
    textColor = 'text-white',
    tag,
    first = false,
    last = false
  } = props

  return (
    <div className={`${bgColor} ${textColor} ${first && 'rounded-l-md'} ${last && 'rounded-r-md'} ${(tag && bgColor) && 'shadow-md'} text-center`}>
      <div className={`font-bold uppercase p-2 ${(tag && bgColor) && 'border-b'}`}>{tag}</div>
      <div className="grid grid-cols-4 text-sm">
        <div className="p-2">
          {bgColor && 'mes'}
        </div>
        <div className="p-2">
          {bgColor && '5 d.'}
        </div>
        <div className="p-2">
          {bgColor && '3 d.'}
        </div>
        <div className="p-2">
          {bgColor && '1 d.'}
        </div>
      </div>
    </div>
  )
}

export default ColTable
