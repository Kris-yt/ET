/*
 * @Date: 2024-07-31 01:12:23
 * @FilePath: /AS-WEB-3.5/src/core/templates/mobile-horizontal/components/mini-panel/index.tsx
 * @Description:
 */
import Overlay from '@base-ui/components/overlay'
import Background from '@base-ui/components/background'
import { IProps } from './types'
import configs from './configs'
import style from './style.module.scss'

export default (props: IProps) => {
  const {
    title,
    children,
    className = '',
    display,
    onClose,
    size = 's',
    zIndex = 10,
  } = props

  return (
    <Overlay display={display} zIndex={zIndex}>
      <Background
        className={`${style[configs.sizeClassName[size]]} ${className}`}
        tag="div"
        src={configs.sizeBackgroundImage[size]}
      >
        <div className={style['title']}>{title}</div>
        <div className={`${style['content']}`}>{children}</div>
        {onClose && <div className={style['close']} onClick={onClose} />}
      </Background>
    </Overlay>
  )
}
