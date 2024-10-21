/*
 * @Date: 2024-07-30 09:42:18
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/panel/index.tsx
 * @Description:
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '@base-ui/components/background'
import Overlay from '@base-ui/components/overlay'
import useGlobal from '@/core/hooks/useGlobal'
import { IProps, IPanelMenusProps, IPanelMiniBoardProps } from './types'
import style from './style.module.scss'

export default (props: IProps) => {
  const navigate = useNavigate()
  const { useSelector } = useGlobal()
  const route = useSelector((state) => state.base.route)
  const prevRoute = React.useRef(route.current)

  const {
    className,
    children,
    type = 'page',
    mode = 'empty',
    title,
    isShowBack,
    defalutBackPath,
    onClose,
    onBack,
    pageLeftNode,
    pageRightNode,
    ...rest
  } = props

  const handleBack = React.useCallback(() => {
    if (onBack) {
      onBack()
      return
    }
    if (defalutBackPath) {
      navigate(defalutBackPath)
      return
    }
    navigate(prevRoute.current)
  }, [onBack])

  const renderPanel = () => {
    return (
      <Background
        className={`${style['panel-container']} ${className}`}
        src={require('./i/bg.png?format=webp')}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className={style['title']}>{title}</div>
        <div className={`${style['content']} ${style[mode]}`}>{children}</div>
        {onClose && <div className={style['close']} onClick={onClose} />}
        {isShowBack && <div className={style['back']} onClick={handleBack} />}
      </Background>
    )
  }

  if (type === 'page') {
    return (
      <div className={style['panel-page']}>
        {renderPanel()}
        {pageLeftNode && (
          <div className={style['left-node']}>{pageLeftNode}</div>
        )}
        {pageRightNode && (
          <div className={style['right-node']}>{pageRightNode}</div>
        )}
      </div>
    )
  }

  return <Overlay {...rest}>{renderPanel()}</Overlay>
}

export const PanelMenus = ({ children, ...rest }: IPanelMenusProps) => {
  return (
    <div className={style['panel-menu']} {...rest}>
      {children}
    </div>
  )
}

export const PanelMiniBoard = ({ children, ...rest }: IPanelMiniBoardProps) => {
  return (
    <div className={style['panel-mini-board']} {...rest}>
      {children}
    </div>
  )
}
