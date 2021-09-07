import React from 'react'
import Tippy from '@tippyjs/react'

function Ptext({ isTippy = false, textTippy = '', tag, value, font = '', priority = '', isPriority = false }) {
  return (
    <>
      <p>
        <Tippy
          disabled={!isTippy}
          offset={[0, 6]}
          placement="top"
          delay={[100, 0]}
          content={<span>{textTippy}</span>}
        >
          <strong className="font-bold">{tag} </strong>
        </Tippy>
        <span className={font}>{value}</span>
        {
          isPriority ?
            (<span className={font}> ({priority})</span>) : ''
        }
      </p>
    </>
  )
}

export default Ptext
