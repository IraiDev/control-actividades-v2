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
    orderDesc } = props

  return (
    <div className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded-md">
      {
        !isNumber ? (
          <div>
            <label className="text-xs">{label}:</label>
            <div className="flex items-center w-full mb-2 border-b">
              <input
                className="w-full pb-1 pl-3 bg-gray-100 outline-none"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onchange}
                type={type}
              />
              <i className="pr-2 text-gray-400 fas fa-search fa-sm"></i>
            </div>
          </div>
        ) : (
          <div>
            <label className="text-xs">{label}:</label>
            <div className="flex items-center w-full mb-2 border-b">
              <input
                className="w-full pb-1 pl-3 bg-gray-100 outline-none"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onchange}
                type={type}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <i className="pr-2 text-gray-400 fas fa-search fa-sm"></i>
            </div>
          </div>
        )
      }
      <ButtonOrderFilter orderPriority={orderPriority} bgColor={bgColor} orderAsc={orderAsc} orderDesc={orderDesc} />
    </div>
  )
}

export default InputFilter