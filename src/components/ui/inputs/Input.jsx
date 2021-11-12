import React from 'react'

function Input({ type = 'text', id, name, value, onChange, placeholder = 'Escriba aqui', className, field = 'campo' }) {
  return (
    <div>
      <label className="px-4 capitalize text-xs">{field}</label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={`px-4 py-2 bg-gray-100 text-gray-600 rounded-md w-full transition duration-500 focus:outline-none focus:ring-2 focus:bg-white ${className}`}
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