/*
 * @Date: 2024-07-29 16:16:18
 * @FilePath: /AS-WEB-3.5/src/core/templates/base-ui/components/overlay/index.tsx
 * @Description:
 */
import React from 'react'
import { createPortal } from 'react-dom'
import type { IProps } from './types'
import style from './style.module.scss'

const Overlay = ({
  children,
  display,
  zIndex,
  onClose,
  className = '',
}: IProps) => {
  const thisNode = React.useRef<any>(document.createElement('div'))
  thisNode.current.className = `${style.wrapper} ${style[display ? 'block' : 'hidden']} ${style[className]}  global-overlay`
  if (zIndex === 0) {
    thisNode.current.style.zIndex = 0
  } else {
    thisNode.current.style.zIndex = zIndex || 10
  }

  // 使用Portal脱离文档流
  React.useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const h = window.innerHeight + 'px'
    html.style.height = h
    body.style.height = h
    thisNode.current.style.height = h
    document.body.appendChild(thisNode.current)
    return () => {
      window.document.body.removeChild(thisNode.current)
    }
  }, [])

  if (!display) {
    return <></>
  }

  return createPortal(
    <>
      {onClose && display && (
        <div className={style.close} onClick={() => onClose()} />
      )}
      {display && children}
    </>,
    thisNode.current,
  )
}

export default Overlay
