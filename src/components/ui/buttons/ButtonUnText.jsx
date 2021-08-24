import React from 'react'
import Tippy from '@tippyjs/react'

function ButtonUnText(props) {

  const {
    disable = false,
    icon,
    tippyText = '',
    isTippy = false,
    color,
    onclick,
    isOnclickeable = true
  } = props

  const handleClick = () => {
    onclick()
  }

  return (
    <>
      {
        !disable && (
          <Tippy
            disabled={!isTippy}
            offset={[0, 2]}
            delay={[200, 0]}
            placement={"bottom"}
            content={<span>{tippyText}</span>}
          >
            <button
              className="focus:outline-none active:outline-none"
              onClick={() => {
                isOnclickeable && handleClick();
              }}
            >
              <i className={`p-2 text-gray-700 transition duration-500 rounded-full hover:bg-gray-200 ${icon} ${color}`}></i>
            </button>
          </Tippy>
        )
      }
    </>
  )
}

export default ButtonUnText
