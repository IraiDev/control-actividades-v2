import React from 'react'

function TextArea({ type = 'text', name, value, onChange, placeholder = 'Escriba aqui', className, field = 'campo' }) {
  return (
    <>
      <label className="px-4 capitalize text-xs block py-2">{field}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="7"
        type={type}
        className={`px-4 py-2 w-full text-gray-600 bg-gray-100 rounded-md resize-none transition duration-300 ring-gray-400 focus:outline-none focus:ring focus:bg-white overflow-custom ${className}`}
        placeholder={placeholder}>
      </textarea>
    </>
  )
}

export default TextArea
