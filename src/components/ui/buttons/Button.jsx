import React from 'react'
import Tippy from '@tippyjs/react'

function Button({ name = 'boton', icon = 'fas fa-bars', size, className, block = false, shadow = true, onClick, type = 'text', isTippy = false, tippyText = 'tippy text', offset = 5 }) {

  return (
    <>
      <Tippy
        disabled={!isTippy}
        offset={[0, offset]}
        delay={[200, 0]}
        placement={"bottom"}
        content={<span>{tippyText}</span>}
      >
        {
          type === 'text' ?
            <button
              onClick={onClick}
              className={`py-1.5 px-5 focus:outline-none transition duration-500 ${className} ${shadow && 'shadow-xl'}  ${block && 'block w-full'}`}>
              {name}
            </button>
            :
            type === 'icon' ?
              <button
                onClick={onClick}
                className={`focus:outline-none transition duration-500 ${className} ${shadow && 'shadow-lg'} ${block && 'block w-full'}`}>
                <i className={`${icon} ${size}`}></i>
              </button>
              :
              type === 'iconText' &&
              <button
                onClick={onClick}
                className={`focus:outline-none transition duration-500 ${className} ${shadow && 'shadow-lg'} ${block && 'block w-full'}`}>
                {name}<i className={`${icon} ${size} ml-2`}></i>
              </button>
        }
      </Tippy>
    </>
  )
}

export default Button