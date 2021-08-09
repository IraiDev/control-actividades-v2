import Tippy from '@tippyjs/react'
import React from 'react'

function ButtonUnText({ icon, tippyText, onclick }) {

  const handleClick = () => {
    onclick()
  }

  return (
    <Tippy
      offset={[0, 2]}
      delay={[200, 0]}
      placement={"bottom"}
      content={<span>{tippyText}</span>}
    >
      <button
        className={`focus:outline-none active:outline-none`}
        onClick={() => {
          handleClick();
        }}
      >
        <i className={`p-2 text-gray-700 rounded-full hover:bg-gray-200 ${icon}`}></i>
      </button>
    </Tippy>
  )
}

export default ButtonUnText
