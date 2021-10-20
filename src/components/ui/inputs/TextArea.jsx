import React from 'react'
const styleDefault = 'w-full text-gray-900 text-sm border-gray-300 focus:border-blue-500'

function TextArea({ type = 'text', name, value, onChange, placeholder = 'Escriba aqui', className = styleDefault, field = 'campo' }) {
  return (
    <div className="mx-2">
      <p className="mb-1 capitalize left-0 -top-3.5 text-xs ">{field}</p>
      <textarea
        name={name}
        rows="10"
        value={value}
        onChange={onChange}
        type={type}
        className={`scroll-row border-2 p-2 text-justify rounded-md resize-none transition duration-500 focus:bg-gray-50 focus:outline-none focus:shadow-lg ${className}`}
        placeholder={placeholder}></textarea>
    </div>
  )
}

export default TextArea
