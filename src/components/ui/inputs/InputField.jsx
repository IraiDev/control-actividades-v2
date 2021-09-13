import React from 'react'

function InputField(props) {

  const {
    type,
    tag,
    value,
    name,
    onChange,
    disabled = true
  } = props

  return (
    <div className="mt-2">
      <p className="capitalize text-sm text-gray-500">{tag}:</p>
      <input
        disabled={disabled}
        className={`${disabled ? 'bg-white' : 'bg-gray-100 border'} block mt-1 w-20 rounded-md py-1 px-2 focus:border-2 focus:outline-none focus:border-blue-400`}
        type={type}
        name={name}
        value={value}
        onChange={onChange} />
    </div>
  )
}

export default InputField
