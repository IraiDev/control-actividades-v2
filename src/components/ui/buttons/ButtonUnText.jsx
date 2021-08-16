import React from 'react'
import Tippy from '@tippyjs/react'

function ButtonUnText({ disable = false, icon, tippyText = '', isTippy = false, onclick, color }) {

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
                handleClick();
              }}
            >
              <i className={`p-2 text-gray-700 rounded-full hover:bg-gray-200 ${icon} ${color}`}></i>
            </button>
          </Tippy>
        )
      }
    </>
  )
}

export default ButtonUnText
