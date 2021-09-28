import React from 'react'
import Tippy from '@tippyjs/react'

function ButtonUnText(props) {

  const {
    disable = false,
    icon,
    tippyText = '',
    isTippy = false,
    color = 'text-gray-700',
    bgColor,
    hoverBgColor = 'hover:bg-gray-300',
    styles = 'h-8 w-8',
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
              className={`focus:outline-none active:outline-none rounded-full transition duration-500 text-center ${styles} ${bgColor} ${hoverBgColor}`}
              onClick={() => {
                isOnclickeable && handleClick();
              }}
            >
              <i className={`${icon} ${color}`}></i>
            </button>
          </Tippy>
        )
      }
    </>
  )
}

export default ButtonUnText
