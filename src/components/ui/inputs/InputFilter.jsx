import React from 'react'
import ButtonOrderFilter from '../buttons/ButtonOrderFilter'
import Tippy from '@tippyjs/react'

function InputFilter(props) {
  const {
    isNumber = false,
    placeholder = 'Escriba aqui',
    name,
    onchange,
    type,
    value,
    orderPriority,
    orderAsc,
    orderDesc,
    active,
    tippyText = ''
  } = props

  return (
    <div className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded-xl">
      <Tippy
        disabled={tippyText === ''}
        offset={[0, 10]}
        delay={[700, 0]}
        placement={'bottom'}
        content={<span>{tippyText}</span>}
      >
        <input
          className="w-3/4 p-2 ml-2 text-sm bg-gray-100 border-b placeholder-gray-500 border-gray-300 transitions duration-500 focus:border-blue-400 outline-none "
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
      </Tippy>
      <ButtonOrderFilter
        orderPriority={orderPriority}
        orderAsc={orderAsc}
        orderDesc={orderDesc}
        active={active}
      />
    </div>
  )
}

export default InputFilter