import React from 'react'
import ButtonOrderFilter from '../buttons/ButtonOrderFilter'

function InputFilter(props) {
  const {
    isNumber = false,
    label,
    placeholder = 'Escriba aqui...',
    name,
    onchange,
    type,
    value,
    orderPriority,
    bgColor,
    orderAsc,
    orderDesc,
    active
  } = props

  return (
    <div className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded-md">
      <div className="pl-1">
        <p className="text-xs mb-1">{label}:</p>
        <input
          className="w-full pb-1 pl-1 text-sm bg-gray-100 border-b-2 placeholder-gray-400 border-gray-300 transitions duration-500 focus:border-blue-500 outline-none "
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onchange}
          type={type}
          onKeyPress={(event) => {
            if (!isNumber) return
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>
      <ButtonOrderFilter
        orderPriority={orderPriority}
        bgColor={bgColor}
        orderAsc={orderAsc}
        orderDesc={orderDesc}
        active={active}
      />
    </div>
  )
}

export default InputFilter