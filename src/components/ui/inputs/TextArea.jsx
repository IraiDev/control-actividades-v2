import React from 'react'
const styleDefault = 'w-full text-sm text-gray-800 border-gray-300 focus:border-blue-500'

function TextArea({ type = 'text', name, value, onChange, placeholder = 'Escriba aqui', className = styleDefault, field = 'campo' }) {
  return (
    <div className="relative">
      <label className="absolute z-20 -top-3 left-6 bg-white px-4 capitalize text-xs">{field}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="7"
        type={type}
        className={`border px-4 py-2 text-justify rounded-2xl resize-none transition duration-500 focus:outline-none focus:shadow-lg ${className}`}
        placeholder={placeholder}>
      </textarea>
    </div>
  )
}

export default TextArea
