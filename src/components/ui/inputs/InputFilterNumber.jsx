import React from 'react'
import ButtonOrderFilter from '../buttons/ButtonOrderFilter'

function InputFilterNumber({ label, placeholder = 'Escriba aqui...', name, onchange, type, value, orderPrioridad, bgColor, onclick }) {
  return (
    <div className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded-md">
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
      <ButtonOrderFilter orderPrioridad={orderPrioridad} bgColor={bgColor} onclick={onclick} />
    </div>
  )
}

export default InputFilterNumber
