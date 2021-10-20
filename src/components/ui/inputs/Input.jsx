import React from 'react'
const styleDefault = 'w-full text-xs text-gray-900 border-gray-400 focus:border-blue-500'

function Input({ type = 'text', id, name, value, onChange, placeholder = 'Escriba aqui', className = styleDefault, field = 'campo' }) {
  return (
    <div className="mx-2">
      <p className="capitalize left-0 -top-3.5 text-xs">{field}</p>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={`border-b-2 pl-1 pb-1 transition duration-500 focus:outline-none focus:shadow-lg ${className}`}
        placeholder={placeholder}
        onKeyPress={(event) => {
          if (type !== 'number') return
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }} />
    </div>
  )
}

export default Input